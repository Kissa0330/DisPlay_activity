var w = 600, h = 600;


// var createGrooveShadow = function () {
//   var defs = d3.select("svg").append("defs");

//   var filter = defs.append("filter")
//     .attr("id", "inset-shadow")
//     .attr("x", "-50%")
//     .attr("y", "-50%")
//     .attr("width", "200%")
//     .attr("height", "200%");

//   filter.append("feComponentTransfer")
//     .attr("in", "SourceAlpha")
//     .append("feFuncA")
//     .attr("type", "table")
//     .attr("tableValues", "1 0");

//   filter.append("feGaussianBlur")
//     .attr("stdDeviation", 4);

//   filter.append("feOffset")
//     .attr("dx", "0")
//     .attr("dy", "5")
//     .attr("result", "offsetblur");

//   filter.append("feFlood")
//     .attr("flood-color", "rgb(0, 0, 0)")
//     .attr("result", "color")

//   filter.append("feComposite")
//     .attr("in2", "offsetblur")
//     .attr("operator", "in")

//   filter.append("feComposite")
//     .attr("in2", "SourceAlpha")
//     .attr("operator", "in")

//   filter.append("feMerge")
//     .append("feMergeNode")
//     .attr("in", "SourceGraphic");

//     filter.select("feMerge")
//     .append("feMergeNode")
// };

// createGrooveShadow()

var circle = d3.select("svg").
append('g')
  .attr({
    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
  }).append("circle").attr("r", "50").attr("fill", "red").attr("filter", "url(#inset-shadow)");