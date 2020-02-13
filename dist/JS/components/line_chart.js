function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}import Chart from"/dist/JS/components/chart.js";const e=React.createElement;export default class LineChart extends React.Component{constructor(a){super(a)}xScale(a,b){// Returns the scale the x axis should use
return d3.scaleTime()}yScale(a,b){// Returns the scale the y axis should use
return d3.scaleLinear()}parseXCol(a,b){return d3.timeParse(b)(a)}xAxisFormat(a,b){400>a?b.ticks(d3.timeYear.every(8)):800>a?b.ticks(d3.timeYear.every(4)):b.ticks(d3.timeYear.every(2))}yAxisFormat(a,b,c){c.length&&b.tickFormat(d3.format(c))}renderData(a,b,c,e,d,f){let g=f.data,h=f.dataset;var i=d3.line().x(function(a){return c(a[h.xcol])}).y(function(a){return e(a[b])});d.append("path").attr("class","line").style("stroke",h.linecolors.split(",")[a]).attr("d",i(g))}positionTooltip(a,b,c,d,e){return{left:20+e.x+b.node().offsetWidth>e.width+e.margin.left+e.margin.right?e.x+e.margin.left-10-b.node().offsetWidth-e.offset:e.x+e.margin.left+10-e.offset,top:d(0)-b.node().offsetHeight+e.margin.top+24}}formatTooltip(a,b){return d3.timeFormat(b)(a)}render(){let a=this.props.xcolparse,b=this.props.tooltipformat?this.props.tooltipformat:"%b %e, %Y",c=this.props.yaxisformat?this.props.yaxisformat:"";return React.createElement(Chart,_extends({},this.props,{margin:this.props.margin?JSON.parse(this.props.margin):{top:5,right:20,bottom:20,left:65},padding:{top:40,right:20,bottom:40,left:20},xScale:this.xScale,yScale:this.yScale,parseXCol:b=>this.parseXCol(b,a),xAxisFormat:this.xAxisFormat,yAxisFormat:(a,b)=>this.yAxisFormat(a,b,c),renderData:this.renderData,positionTooltip:this.positionTooltip,formatTooltip:a=>this.formatTooltip(a,b),useTooltipLine:!0}))}}// Render all line charts
let elements=document.getElementsByClassName("line-chart");for(let a=0;a<elements.length;a++)ReactDOM.render(e(LineChart,{...elements[a].dataset,chart:elements[a]}),elements[a]);