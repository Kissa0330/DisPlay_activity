var w = 307, h = 307;
var outerRadius = w / 2;
var innerRadius = outerRadius - 60;

var createGradient = function (svg, color1, color2, id) {

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
    .attr("stop-color", color1)
    .attr("stop-opacity", 1);

  gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", color2)
    .attr("stop-opacity", 1);
};

var createGrooveShadow = function () {
  var defs = svg.append("defs");

  var filter = defs.append("filter")
    .attr("id", grooveShadow);

  filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", stdDeviation)
    .attr("result", "blur");
  filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", dx)
    .attr("dy", dy)
    .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
    .attr("in", "offsetBlur");
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
    .style("fill", "url(#grooveGradient)");
};

// 時間に応じてタスクを生成
var createTask = function (startTime, endTime ,random) {
  var arcForeground = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(2 * Math.PI / 12 * startTime)
    .endAngle(2 * Math.PI / 12 * endTime)

  var pathForeground = svg.append('path')
    .attr({
      d: arcForeground
    })
    .style("fill", "url(#taskGradient"+random+")");
};


// var addGradient = function (path, id) {
//   d3.path.style({
//     fill: "url('#" + id + "')"
//   });
// };

var Tasks = [
  { name: 'activity1', startTime: 0, endTime: 3 },
  { name: 'activity2', startTime: 4, endTime: 6 },
  { name: 'activity3', startTime: 9, endTime: 11 }
];

var Gradients = [
  { name: "red", color: "#fe08b5", color1: "#ff1410" },
  { name: "lightBlue", color: "72c3ff", color1: "61cad8" },
  { name: "pink", color: "ff729d", color1: "e86789" },
  { name: "purple", color: "8872ff", color1: "7861d8" },
  { name: "blue", color: "#65B2FF", color1: "#5F9BE0" },
  { name: "green", color: "#BEEAA6", color1: "#89D568" },
  { name: "orange", color: "#FCB47E", color1: "#DE863C" },
  { name: "lightPurple", color: "#D48BEF", color1: "#AA37DD" },
  { name: "emerald", color: "#8BEFEF", color1: "#37DDB0"},
  { name: "lightRed", color: "#EF8B8B", color1: "#EB5869" }
];

createGradient(svg, '#f5f4f4', '#f0efef', 'grooveGradient');
createGroove();

// TODOグラデーションの処理を追加
// 色を定着させる処理を追加
for (var i = 0; i < Tasks.length; ++i) {
  var random = Math.floor(Math.random() * 10);
  createGradient(svg, Gradients[random].color, Gradients[random].color1, "taskGradient"+random+"");

  createTask(Tasks[i].startTime, Tasks[i].endTime, random);

  console.log(random)
  console.log("taskGradient"+random+"");
};


