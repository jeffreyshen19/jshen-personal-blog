import NormalizeHeader from "/dist/JS/components/subcomponents/normalize.js";

class Map extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      chart: this.props.chart,
      dataset: this.props,
      svg: null,
      yvar: "total-quantity",
      normalize: "none"
    };

    this.onYVarChanged = this.onYVarChanged.bind(this);
    this.onNormalizeChanged = this.onNormalizeChanged.bind(this);
  }

  componentDidMount(){
    d3.csv(this.state.dataset.csv)
      .then((values) => {
        // Process csv data into correct format
        let ycolumns = Object.keys(values[0]).slice(2);
        let data = values.map(function(d){
          ycolumns.forEach(function(ycol){
            d[ycol] = parseFloat(d[ycol]);
          });
          return d;
        });

        // Plot graph
        d3.svg("/data/police-militarization/us-map-w-puerto-rico.svg").then((res) => {
          var svg = res.documentElement;

          //Append map
          d3.select(this.state.chart).append("div").attr("class", "svg").node().appendChild(svg);

          // Append tooltip
          d3.select(this.state.chart).select(".svg").append("div").attr("class", "tooltip hidden");

          this.setState({
            "svg": svg,
            "data": data
          })
        });
      })
  }

  getTooltipText(d, yvar){
    function formatNum(num){
      return (yvar == "total-cost" ? "$" : "") + parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Mapping from column names to display names
    let category_names = {
      "grenade-launchers": "Grenades & Launchers",
      "night-vision": "Night Vision",
      "assault-rifles": "Assault Rifles",
      "armored-vehicles" : "Armored Vehicles",
      "aircraft": "Aircraft",
      "body-armor": "Body Armor & Shields"
    }

    // Sort categories into the order they should be displayed
    let category_data = ["grenade-launchers","night-vision","assault-rifles","armored-vehicles" ,"aircraft","body-armor"].map(function(c){
      return {
        category: category_names[c],
        val: d[(yvar == "total-cost" ? "cost" : "quantity") + "-" + c]
      }
    }).sort(function(a, b){
      return b.val - a.val;
    });

    // Add tooltip text
    return `
      <h1>${d["state-name"]}</h1>
      <table>
        <thead>
          <tr>
            <th>Type of Item</h1>
            <th>${yvar == "total-cost" ? "Cost" : "Quantity"}</h1>
          </tr>
        </thead>
        <tbody>
          ${category_data.map(function(c){
            return `
              <tr>
                <td>${c.category}</td>
                <td>${formatNum(c.val)}</td>
              </tr>
            `
          }).join("")}
          <tr>
            <td>Other</td>
            <td>${formatNum(d[(yvar == "total-cost" ? "cost" : "quantity") + "-other"])}</td>
          </tr>
          <tr>
            <td><i>Total</i></td>
            <td><i>${formatNum(d["total-" + (yvar == "total-cost" ? "cost" : "quantity")])}</i></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  renderGraph(){
    var tooltipText,
        tooltip = d3.select(this.state.chart).select(".tooltip"),
        svg = this.state.svg,
        data = this.state.data;

    // Get radio options
    let yvar = this.state.yvar,
        normalize = this.state.normalize;

    let getYVal = function(d){
      if(normalize == "none") return d[yvar]
      else return d[yvar] / d[normalize];
    };

    // Get color scale
    var extent = d3.extent(data, (d) => getYVal(d));
    var colors = d3.scaleLinear().domain(extent)
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#e4f1fe"), d3.rgb('#3a539b'), d3.rgb('#24252a')]);

    let getTooltipText = this.getTooltipText;

    // Display SVG
    d3.select(svg)
      .style("width", "100%")
      .style("height", "100%")
      .attr("viewBox", "0 0 900 600")
      .select("#g4864").selectAll("*")
        .data(data, function(d) { return d ? d.state : this.className.baseVal.toUpperCase(); }) // Join svg this.state.charts to their corresponding state data
        .style("transition", "0.1s")
        .style("fill", function(d, i){
          return colors(getYVal(d));
        })
        .on("mouseover", function(d, i){
          // Change color on hover
          d3.select(this).style("fill", d3.rgb(d3.color(colors(getYVal(d))).brighter(0.2)));
          tooltip.html(getTooltipText(d, yvar));
        })
        .on("mousemove", (d) => {
          var mouse = d3.mouse(this.state.chart.children[1]);

          tooltip.classed("hidden", false).style("left", mouse[0] - Math.round(tooltip.node().offsetWidth / 2) + "px")
            .style("top", mouse[1] + 20 + "px");
        })
        .on("mouseout", function(d){
          d3.select(this).style("fill", d3.rgb(colors(getYVal(d))));
          tooltip.classed("hidden", true);
        });
  }

  onYVarChanged(e){
    this.setState({
      yvar: e.currentTarget.value
    });
  }

  onNormalizeChanged(e){
    this.setState({
      normalize: e.currentTarget.value
    });
  }

  render() {
    if(this.state.data.length && this.state.svg) this.renderGraph();

    return (
      <NormalizeHeader
        yvar = {this.state.yvar}
        normalize = {this.state.normalize}
        yVarHandler = {this.onYVarChanged}
        normalizeHandler = {this.onNormalizeChanged}
        id = "1"
        ycols = {[{
          "ycol": "total-quantity",
          "label": "Total Quantity"
        }, {
          "ycol": "total-cost",
          "label": "Total Cost"
        }]}
      >
      </NormalizeHeader>
    );
  }
}

const e = React.createElement;

// Render all line charts
let elements = document.getElementsByClassName('map');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(Map, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
