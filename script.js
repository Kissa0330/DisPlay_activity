var w = 307, h = 307;
var outerRadius = (w / 2) - 30;
var innerRadius = outerRadius - 60;

// グラデーション作り
var createGradient = function (svg, color, color1, id) {

  var defs = svg.append("defs");

  var gradient = defs.append("linearGradient")
    .attr("id", id)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", color)
    .attr("stop-opacity", 1);

  gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", color1)
    .attr("stop-opacity", 1);
};

// 溝の影を作る
var createGrooveShadow = function () {
  var defs = d3.select("svg").append("defs");

  var filter = defs.append("filter")
    .attr("id", "insetShadow")
    .attr("x", "-50%")
    .attr("y", "-50%")
    .attr("width", "200%")
    .attr("height", "200%");

  filter.append("feComponentTransfer")
    .attr("in", "SourceAlpha")
    .append("feFuncA")
    .attr("type", "table")
    .attr("tableValues", "1 0");

  filter.append("feGaussianBlur")
    .attr("stdDeviation", 3);

  filter.append("feOffset")
    .attr("dx", "1")
    .attr("dy", "5")
    .attr("result", "offsetblur");

  filter.append("feFlood")
    .attr("flood-color", "rgba(40, 40, 60);")
    .attr("flood-opacity", "0.6")
    .attr("result", "color")

  filter.append("feComposite")
    .attr("in2", "offsetblur")
    .attr("operator", "in")

  filter.append("feComposite")
    .attr("in2", "SourceAlpha")
    .attr("operator", "in")

  filter.append("feMerge")
    .append("feMergeNode")
    .attr("in", "SourceGraphic");

  filter.select("feMerge")
    .append("feMergeNode")
};

var createDropShadow = function () {
  var defs = d3.select("svg").append("defs");
  {/* <filter id="dropshadow">
  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
  <feOffset dx="2" dy="2"/>
  <feComponentTransfer>
    <feFuncA type="linear" slope="0.2"/>
  </feComponentTransfer>
  <feMerge> 
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/> 
  </feMerge>
</filter> */}
  var filter = defs.append("filter")
    .attr("id", "dropShadow");

  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 1)
  // .attr("result", "blur");
  filter.append("feOffset")
    // .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
  // .attr("result", "offsetBlur");
  filter.append("feComponentTransfer")
    .append("feFuncA")
    .attr("type", "linear")
    .attr("slope", "0.15")

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
  feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
};
// キャンバスを作成
var svg = d3.select("#chart")
  .append("svg")
  .attr({
    width: w,
    height: h
  }).append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  });

// 溝を作成
var createGroove = function () {
  var arcBackground = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  var pathBackground = svg.append('path')
    .attr("d", arcBackground)
    .style("fill", "url(#Gradient)")
    .style("filter", "url(#insetShadow)");
};


// 外縁と中央部分を作成
var createClock = function () {
  var circle = svg.append("circle")
    .attr("r", "63.5")
    .style("fill", "url(#Gradient)");

    var centerCircle = svg.append("circle")
    .attr("r", "6.5")
    .style("fill", "#1f242a");


    var nowTime = new Date();

    var pointer = svg.append("rect")
    .attr("width", 5)
    .attr("height", 45)
    .attr("rx", 2.5)
    .attr("ry", 2.5)
    .style("fill", "#1f242a")
    .attr("x", -2.5)
    .attr("y", -45)
    .attr("transform", "rotate(" + nowTime.getHours() * 15 + ")");

  var outerEdgeBackground = d3.svg.arc()
    .innerRadius(153.5)
    .outerRadius(123.5)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  var pathBackground = svg.append('path')
    .attr("d", outerEdgeBackground)
    .style("fill", "url(#Gradient)");
};

// 時間に応じてタスクを生成
var createTask = function (startTime, endTime, code) {
  var arcForeground = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(2 * Math.PI / 24 * startTime)
    .endAngle(2 * Math.PI / 24 * endTime);

  var pathForeground = svg.append('path')
    .attr({
      d: arcForeground
    })
    .style("fill", "url(#taskGradient" + code + ")")
    .style("filter", "url(#dropShadow)");;
};

// data
var Tasks = [
  { name: 'running', startTime: "14:00", endTime: "16:00" },
  { name: 'homework', startTime: "6:35", endTime: "9:00" },
  { name: '買い物', startTime: "22:00", endTime: "23:30" },
  { name: 'lunch', startTime: "12:00", endTime: "13:00" },
  { name: 'dinner', startTime: "19:00", endTime: "20:00" },
  { name: 'sleep', startTime: "00:00", endTime: "5:00" },
];

var Gradients = [
  { name: "red", color: "#fe08b5", color1: "#ff1410" },
  { name: "lightBlue", color: "72c3ff", color1: "61cad8" },
  { name: "pink", color: "ff729d", color1: "e86789" },
  { name: "blue", color: "#65B2FF", color1: "#5F9BE0" },
  { name: "green", color: "#BEEAA6", color1: "#89D568" },
  { name: "orange", color: "#FCB47E", color1: "#DE863C" },
  { name: "purple", color: "8872ff", color1: "7861d8" },
  { name: "lightPurple", color: "#D48BEF", color1: "#AA37DD" },
  { name: "emerald", color: "#8BEFEF", color1: "#37DDB0" },
  { name: "lightRed", color: "#EF8B8B", color1: "#EB5869" }
];

// 実行部分
createGradient(svg, '#f5f4f4', '#f0efef', 'Gradient');
createGrooveShadow();
createDropShadow();
createGroove();

// タスクのグラデーションとsvg作成
for (var i = 0; i < Tasks.length; ++i) {
  var number = Tasks[i].name.charCodeAt(0);
  var code = number.toString().split('').pop();

  var start = Tasks[i].startTime.split(":");
  var startTime = (start[0] + start[1] * 0.0166) * 0.1;

  var end = Tasks[i].endTime.split(":");
  var endTime = (end[0] + end[1] * 0.0166) * 0.1;

  createGradient(svg, Gradients[code].color, Gradients[code].color1, "taskGradient" + code + "");

  createTask(startTime, endTime, code);
};

createClock();

