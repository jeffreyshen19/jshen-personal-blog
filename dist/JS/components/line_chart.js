function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}import Chart from"/dist/JS/components/chart.js";const e=React.createElement;class LineChart extends React.Component{constructor(a){super(a)}// renderGraph(){
//   let margin = this.state.margin,
//       padding = this.state.padding,
//       dataset = this.props,
//       chart = this.state.chart,
//       data = this.state.data,
//       width = this.state.width,
//       height = this.state.height,
//       offset = this.state.offset,
//       body_width = this.state.body_width;
//
//   // Set the ranges
//   var	x = d3.scaleTime().range([0, width]),
//       y = d3.scaleLinear().range([height, 0]);
//
//   // Define axes
//   var xAxis = d3.axisBottom(x),
//       yAxis = d3.axisLeft(y);
//
//   // Set ticks
//   if(body_width < 400) xAxis.ticks(d3.timeYear.every(8));
//   else if(body_width < 800) xAxis.ticks(d3.timeYear.every(4));
//   else xAxis.ticks(d3.timeYear.every(2));
//
//   // Reset canvas
//   chart.selectAll("*").remove();
//
//   // Create canvas
//   var	svg = chart
//     .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .style("transform", "translate(-" + offset + "px,0px)")
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
//   // Add tooltip and tooltip line
//   chart.append("div")
//     .attr("class", "tooltip hidden");
//
//   // Fit Domain
//   var ymax = d3.max(data, function(d) {
//     return Math.max(...dataset.ycols.split(",").map(function(ycol){
//       return d[ycol];
//     }));
//   });
//   var xextent = d3.extent(data, function(d) { return d[dataset.xcol]; });
//   x.domain(xextent);
//   y.domain([0, ymax]);
//
//   // Render data
//   let colors = dataset.linecolors.split(",");
//   dataset.ycols.split(",").forEach(function(ycol, i){
//     var	valueline = d3.line()
//       .x(function(d) { return x(d[dataset.xcol]); })
//       .y(function(d) { return y(d[ycol]); });
//
//     svg.append("path")
//       .attr("class", "line")
//       .style("stroke", colors[i])
//       .attr("d", valueline(data));
//   });
//
//   // Add X Axis
//   svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
//
//   // Add the Y Axis
//   svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);
//
//   // Chart title
//   chart.insert("p", ":first-child")
//     .html(dataset.title)
//     .attr("class", "axis-label title");
//
//   // X Axis Label
//   chart.append("p")
//     .attr("class", "axis-label")
//     .style("text-align", "center")
//     .html(dataset.xlabel);
//
//   // Y Axis Label
//   svg.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("class", "axis-label")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .text(dataset.ylabel);
//
//   /*
//     TOOLTIP
//   */
//
//   var ycols = dataset.ycols.split(","),
//       labels = dataset.linelabels.split(",");
//
//   svg.append("line")
//     .attr("class", "tooltip-line hidden")
//     .attr("x1", x(xextent[0]))
//     .attr("y1", y(0))
//     .attr("x2", x(xextent[0]))
//     .attr("y2", y(ymax))
//     .style("stroke", "black")
//     .style("stroke-width", "1")
//     .style("stroke-dasharray", "5,5");
//
//   var tooltip = chart.select(".tooltip"),
//       tooltipLine = chart.select(".tooltip-line");
//
//   var bisect = d3.bisector(function(d){ return d[dataset.xcol]; }).right;
//
//   let positionTooltip = (mouse, tooltip, x, y) => {
//     return {
//       "left": (20 + mouse[0] + tooltip.node().offsetWidth > this.state.width + this.state.margin.left + this.state.margin.right ? mouse[0] - 10 - tooltip.node().offsetWidth - this.state.offset: mouse[0] + 10 - this.state.offset),
//       "top": y(0) - tooltip.node().offsetHeight + this.state.margin.top + 24,
//     };
//   }
//
//   chart.select("svg").on("mousemove", function(){
//     var mouse = d3.mouse(this),
//         mouseX = x.invert(mouse[0] - margin.left),
//         index = bisect(data, mouseX),
//         datum = data[index];
//
//     if(datum == null){
//       tooltip.classed("hidden", true);
//       tooltipLine.classed("hidden", true);
//     }
//     else{
//       tooltipLine.attr("x1", x(datum[dataset.xcol]))
//         .attr("x2", x(datum[dataset.xcol]))
//         .classed("hidden", false);
//
//       tooltip.classed("hidden", false)
//         .html("<strong>" + d3.timeFormat("%b %e, %Y")(datum[dataset.xcol]) + "</strong><br>" + ycols.map(function(d, i){
//           return "<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:" + colors[i] + "'></div>" + labels[i] + ": " + datum[d].toFixed(2) + "</div>";
//         }).join(""))
//         .style("left", positionTooltip(mouse, tooltip, x, y).left + "px")
//         .style("top", positionTooltip(mouse, tooltip, x, y).top + "px");
//     }
//   }).on("mouseout", function(d){
//     tooltip.classed("hidden", true);
//     tooltipLine.classed("hidden", true);
//   });
//
// }
render(){return React.createElement(Chart,_extends({},this.props,{margin:{top:5,right:20,bottom:20,left:65},padding:{top:40,right:20,bottom:40,left:20}}))}}// Render all line charts
let elements=document.getElementsByClassName("line-chart");for(let a=0;a<elements.length;a++)ReactDOM.render(e(LineChart,{...elements[a].dataset,chart:elements[a]}),elements[a]);