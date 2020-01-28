"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}for(var e=React.createElement,LineChart=/*#__PURE__*/function(a){function b(a){var c;_classCallCheck(this,b),c=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a));var d={top:5,right:20,bottom:20,left:65};return c.state={data:[],chart:null,width:0,height:(a.height||300)-d.top-d.bottom,margin:d,padding:{top:40,right:20,bottom:40,left:20},offset:0,body_width:0},d3.csv(a.csv).then(function(b){c.setState({data:b.map(function(b){return b[a.xcol]=d3.timeParse("%Y-%m-%d")(b[a.xcol]),a.ycols.split(",").forEach(function(a){b[a]=parseFloat(b[a])}),b})})}),c}return _inherits(b,a),_createClass(b,[{key:"updateDimensions",value:function updateDimensions(){//Calculate new width
var a=(d3.select("body").node().offsetWidth-d3.select("#body").node().offsetWidth)/2,b=d3.select("body").node().offsetWidth,c=d3.select("#body").node().offsetWidth-this.state.margin.left-this.state.margin.right-this.state.padding.left-this.state.padding.right+2*a;this.setState({width:c,offset:a,body_width:b})}},{key:"componentDidMount",value:function componentDidMount(){this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this));// Add D3 selector to state
var a=d3.select(this.props.chart);this.setState({chart:a})}},{key:"renderGraph",value:function renderGraph(){var a=this,b=this.state.margin,c=this.state.padding,e=this.props,f=this.state.chart,g=this.state.data,h=this.state.width,i=this.state.height,j=this.state.offset,k=this.state.body_width,l=d3.scaleTime().range([0,h]),m=d3.scaleLinear().range([i,0]),d=d3.axisBottom(l),n=d3.axisLeft(m);400>k?d.ticks(d3.timeYear.every(8)):800>k?d.ticks(d3.timeYear.every(4)):d.ticks(d3.timeYear.every(2)),f.selectAll("*").remove();// Create canvas
var o=f.append("svg").attr("width",h+b.left+b.right).attr("height",i+b.top+b.bottom).style("transform","translate(-"+j+"px,0px)").append("g").attr("transform","translate("+b.left+","+b.top+")");// Add tooltip and tooltip line
f.append("div").attr("class","tooltip hidden");// Fit Domain
var p=d3.max(g,function(a){var b=Math.max;return b.apply(Math,_toConsumableArray(e.ycols.split(",").map(function(b){return a[b]})))}),q=d3.extent(g,function(a){return a[e.xcol]});l.domain(q),m.domain([0,p]);// Render data
var r=e.linecolors.split(",");e.ycols.split(",").forEach(function(a,b){var c=d3.line().x(function(a){return l(a[e.xcol])}).y(function(b){return m(b[a])});o.append("path").attr("class","line").style("stroke",r[b]).attr("d",c(g))}),o.append("g").attr("class","x axis").attr("transform","translate(0,"+i+")").call(d),o.append("g").attr("class","y axis").call(n),f.insert("p",":first-child").html(e.title).attr("class","axis-label title"),f.append("p").attr("class","axis-label").style("text-align","center").html(e.xlabel),o.append("text").attr("transform","rotate(-90)").attr("class","axis-label").attr("y",0-b.left).attr("x",0-i/2).attr("dy","1em").text(e.ylabel);/*
      TOOLTIP
    */var s=e.ycols.split(","),t=e.linelabels.split(",");o.append("line").attr("class","tooltip-line hidden").attr("x1",l(q[0])).attr("y1",m(0)).attr("x2",l(q[0])).attr("y2",m(p)).style("stroke","black").style("stroke-width","1").style("stroke-dasharray","5,5");var u=f.select(".tooltip"),v=f.select(".tooltip-line"),w=d3.bisector(function(a){return a[e.xcol]}).right,x=function(b,c,d,e){return{left:20+b[0]+c.node().offsetWidth>a.state.width+a.state.margin.left+a.state.margin.right?b[0]-10-c.node().offsetWidth-a.state.offset:b[0]+10-a.state.offset,top:e(0)-c.node().offsetHeight+a.state.margin.top+24}};f.select("svg").on("mousemove",function(){var a=d3.mouse(this),c=l.invert(a[0]-b.left),d=w(g,c),f=g[d];null==f?(u.classed("hidden",!0),v.classed("hidden",!0)):(v.attr("x1",l(f[e.xcol])).attr("x2",l(f[e.xcol])).classed("hidden",!1),u.classed("hidden",!1).html("<strong>"+d3.timeFormat("%b %e, %Y")(f[e.xcol])+"</strong><br>"+s.map(function(a,b){return"<div class = 'tooltip-label'><div class = 'bubble' style = 'background-color:"+r[b]+"'></div>"+t[b]+": "+f[a].toFixed(2)+"</div>"}).join("")).style("left",x(a,u,l,m).left+"px").style("top",x(a,u,l,m).top+"px"))}).on("mouseout",function(){u.classed("hidden",!0),v.classed("hidden",!0)})}},{key:"render",value:function render(){return this.state.data.length&&this.state.chart&&this.renderGraph(),null}}]),b}(React.Component),elements=document.getElementsByClassName("line-chart"),i=0;i<elements.length;i++)ReactDOM.render(e(LineChart,_objectSpread({},elements[i].dataset,{chart:elements[i]})),elements[i]);