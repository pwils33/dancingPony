// var started = false;
var firstX = 0;
var firstY = 0;
// var currentTool = ToolEnum.DRAW;
// var ToolEnum = {
//   DRAW:1,
//   ERASE:2,
// };

var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";
var clickCount = 0;

function onCanvasClick(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  console.log("x: " + x + " y: " + y);
  if (firstX != 0 && firstY != 0) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(firstX,firstY);
    ctx.lineTo(x,y);
    ctx.lineWidth = 10;
    // ctx.s;
    ctx.stroke();
  }
  firstX = x;
  firstY = y;
  clickCount++;
  if (clickCount === 26) {
    onComplete();
  }
}

function onComplete() {
  document.getElementById("connect_container").style.display = "none";
  document.getElementById("gif_container").style.display = "block";
}

function testApi() {
  var request = wikiURL + "horse";
  e.preventDefault();
  $.ajax({
    url : request,
    dataType : "json",
    success : function(parsed_json) {
      console.log(parsed_json);
      var items = parsed_json["items"];
      var everything = "<ul>";
      $.each(items, function(index, item) {
        // console.log(item);
        everything += "<li>Title: " + item["title"] + "</li>";
        everything += "<li>Link: <a href=\"" + item["link"] + "\">" + item["link"] + "</a></li>";
        everything += "<p></p>";
      });
      everything += "</ul>";
      console.log($("#stackResults"));
      $("#test").html(everything);
    }
  });
}
