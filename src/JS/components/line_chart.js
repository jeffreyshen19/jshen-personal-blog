import Chart from "/dist/JS/components/chart.js";

const e = React.createElement;

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  xScale(width, height){ // Returns the scale the x axis should use
    return d3.scaleTime();
  }

  yScale(width, height){ // Returns the scale the y axis should use
    return d3.scaleLinear();
  }

  parseXCol(val, xColParse){
    return d3.timeParse(xColParse)(val);
  }

  xAxisFormat(body_width, axis){
    if(body_width < 400) axis.ticks(d3.timeYear.every(8));
    else if(body_width < 800) axis.ticks(d3.timeYear.every(4));
    else axis.ticks(d3.timeYear.every(2));
  }

  yAxisFormat(body_width, axis, yaxisformat){
    if(yaxisformat.length) axis.tickFormat(d3.format(yaxisformat));
  }

  renderData(i, ycol, x, y, svg, state){
    let data = state.data,
        dataset = state.dataset;

    var	valueline = d3.line()
      .x(function(d) { return x(d[dataset.xcol]); })
      .y(function(d) { return y(d[ycol]); });

    svg.append("path")
      .attr("class", "line")
      .style("stroke", dataset.linecolors.split(",")[i])
      .attr("d", valueline(data));
  }

  positionTooltip(mouse, tooltip, x, y, state){
    return {
      "left": (20 + state.x + tooltip.node().offsetWidth > state.width + state.margin.left + state.margin.right ? state.x + state.margin.left - 10 - tooltip.node().offsetWidth - state.offset: state.x + state.margin.left + 10 - state.offset),
      "top": y(0) - tooltip.node().offsetHeight + state.margin.top + 24,
    };
  }

  formatTooltip(datum, tooltipformat){
    return d3.timeFormat(tooltipformat)(datum);
  }

  render() {
    let xcolparse = this.props["xcolparse"],
        tooltipformat = this.props["tooltipformat"] ? this.props["tooltipformat"] : "%b %e, %Y",
        yaxisformat = this.props["yaxisformat"] ? this.props["yaxisformat"] : "";

    return (
      <Chart {...this.props}
        margin = {this.props.margin ? JSON.parse(this.props.margin) : {top: 5, right: 20, bottom: 20, left: 65}}
        padding = {{top: 40, right: 20, bottom: 40, left: 20}}
        xScale = {this.xScale}
        yScale = {this.yScale}
        parseXCol = {(val) => this.parseXCol(val, xcolparse)}
        xAxisFormat = {this.xAxisFormat}
        yAxisFormat = {(body_width, axis) => this.yAxisFormat(body_width, axis, yaxisformat)}
        renderData = {this.renderData}
        positionTooltip = {this.positionTooltip}
        formatTooltip = {(val) => this.formatTooltip(val, tooltipformat)}
        useTooltipLine = {true}
        >
      </Chart>
    );
  }
}

// Render all line charts
let elements = document.getElementsByClassName('line-chart');
for(let i = 0; i < elements.length; i++){
  ReactDOM.render(e(LineChart, {
    ...elements[i].dataset,
    chart: elements[i]
  }), elements[i]);
}
