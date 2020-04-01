import scroller from"/dist/JS/scrollytelling/scroller.js";var scrollVis=function(){function a(a){d3.select("#vis").selectAll("img").transition().duration(500).style("opacity","0"),d3.select("#"+a).transition().duration(500).style("opacity","1")}function b(a,b){d3.select("#graph").transition().duration(500).style("opacity","1");var c=d3.scaleLinear().domain([0,50]).range([0,d]),h=f(g[a]),i=d3.median(g[a]),j=c(i),k=d3.scaleLinear().range([e,0]).domain([0,d3.max(h,function(a){return a.length})]);d3.select(".y.axis").transition().duration(1e3).call(d3.axisLeft(k)),d3.select(".y-axis-label").transition().duration(1e3).text("Percent of Census Tract Area Covered By Tree Canopy ("+["Low","Middle","Upper"][a]+" Income Tracts)"),!1==b?(d3.select("svg").select(".median-text").transition().duration(1e3).style("opacity","0"),d3.select("svg").select(".median-line").transition().duration(1e3).style("opacity","0"),d3.select("svg").select(".median-arrow").transition().duration(1e3).style("opacity","0")):(d3.select("svg").select(".median-text").transition().duration(1e3).style("opacity","1").attr("transform",`translate(${j}, ${-22})`).text(`Median (${d3.format(".2%")(i/100)})`),d3.select("svg").select(".median-line").transition().duration(1e3).style("opacity","1").attr("x1",j).attr("x2",j),d3.select("svg").select(".median-arrow").transition().duration(1e3).style("opacity","1").attr("points",`${j},-5 ${j-10},-15 ${j+10},-15`)),d3.select("svg").selectAll("rect").data(h).transition().duration(1e3).attr("x",1).attr("transform",function(a){return"translate("+c(a.x0)+","+k(a.length)+")"}).attr("width",function(a){return c(a.x1)-c(a.x0)}).attr("height",function(a){return e-k(a.length)})}/**
   * activate -
   *
   * @param index - index of the activated section
   */const c={top:50,right:30,bottom:70,left:55},d=document.getElementById("vis").offsetWidth-c.left-c.right-30,e=document.getElementById("vis").offsetHeight-c.top-c.bottom;// Which visualization we currently are on
var f,g,h=-1,i=0,j=[],k=[],l=function(a){a.each(function(a){m(a),n()})},m=function(a){g=a.histogramData;// Add histogram
var b=d3.select("#graph").style("opacity","0").append("svg").attr("width",d+c.left+c.right).attr("height",e+c.top+c.bottom).append("g").attr("transform","translate("+c.left+","+c.top+")"),h=d3.scaleLinear().domain([0,50]).range([0,d]);// Add X Axis
b.append("g").attr("class","x axis").attr("transform","translate(0,"+e+")").call(d3.axisBottom(h).tickFormat(a=>a+"%")),b.append("text").attr("class","y-axis-label").attr("transform",`translate(${d/2},${e+40})`).style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",16),f=d3.histogram().value(function(a){return a})// I need to give the vector of value
.domain(h.domain())// then the domain of the graphic
.thresholds(h.ticks(25));// then the numbers of bins
// And apply this function to data to get the bins
var i=f(a.histogramData[0]);// Add median
b.append("text").attr("class","median-text").style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",14),b.append("polygon").attr("class","median-arrow").style("fill","#24252a"),b.append("line").attr("class","median-line").attr("y1",0).attr("y2",e).style("stroke","#24252a").style("stroke-width",1).style("stroke-dasharray","4"),b.append("g").attr("class","y axis"),b.append("text").attr("transform","rotate(-90)").attr("y",0-c.left).attr("x",0-e/2).attr("dy","1em").style("text-anchor","middle").style("font-family","IBMPlexSans").style("font-size",16).text("Number of Census Tracts"),b.selectAll("rect").data(i).enter().append("rect").style("fill","#4e54c8")},n=function(){j[0]=function(){a("img1")},k[0]=function(){},j[1]=function(){a("img1")},k[1]=function(){},j[2]=function(){a("img2")},k[2]=function(){},j[3]=function(){a("img2")},k[3]=function(){},j[4]=function(){a("img3"),d3.select("#graph").transition().duration(500).style("opacity","0")},k[4]=function(){},j[5]=function(){d3.select("#img3").transition().duration(500).style("opacity","0"),b(0,!1)},k[5]=function(){},j[6]=function(){b(0)},k[6]=function(){},j[7]=function(){b(1)},k[7]=function(){},j[8]=function(){b(2)},k[8]=function(){}};// return chart function
return l.activate=function(a){i=a;var b=0>i-h?-1:1,c=d3.range(h+b,i+b,b);c.forEach(function(a){j[a]()}),h=i},l.update=function(a,b){k[a](b)},l};// Load data, then display
d3.json("/data/la-shade/census-tracts-2012.geojson").then(function(a){// Process data
let b=[[],[],[]];// Store the tree canopy cover, broken down by the median income of census tracts (lower, middle, upper income)
return a.features.forEach(function(a){let c=parseFloat(a.properties["TREE-PCT"]),d=parseInt(a.properties["median-income"]);isNaN(c)||isNaN(d)||(42e3>=d?b[0].push(c):125e3>=d?b[1].push(c)://Middle income
b[2].push(c))}),{geojson:a,histogramData:b}}).then(function(a){var b=scrollVis();d3.select("#vis").datum(a).call(b);var c=scroller().container(d3.select("#scrolling-vis"));c(d3.selectAll(".step")),c.on("active",function(a){d3.selectAll(".step").classed("active",function(b,c){return c===a}).style("opacity",function(b,c){return c===a?1:.1}),b.activate(a)}),c.on("progress",function(a,c){b.update(a,c)})}).catch(function(a){// handle error here
console.log(a)});