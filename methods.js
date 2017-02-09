// var started = false;
var firstX = 0;
var firstY = 0;
// var currentTool = ToolEnum.DRAW;
// var ToolEnum = {
//   DRAW:1,
//   ERASE:2,
// };

//var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=";
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
    onComplete(event);
  }
}

function onComplete(event) {
  document.getElementById("connect_container").style.display = "none";
  document.getElementById("gif_container").style.display = "block";
  testApi(event);
}


function testApi(e) {
  var request = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=My_Little_Pony&callback=?"; //wikiURL + "My%20Little%20Pony";
  e.preventDefault();
  $.ajax({
    url : request,
    dataType : "json",
    success : function(parsed_json) {
     // var group = parsed_json["query"]["pages"];
     // var allPropertyNames = Object.keys(group);
     // var name = allPropertyNames[0];
     // var value = group[name];
      var ponytalk = parsed_json["query"]["pages"]["490081"]["extract"];
      //console.log(ponytalk);
      var everything = "<h2>Wiki article on My Little Pony</h2>";
      console.log("everything");
      everything += "<p>" + ponytalk/*value*/ + "</p>";
      setTimeout(function(){
            document.body.style.backgroundImage = "url('wallpaperbackground.png')";
            document.getElementById("gif_container").style.display="none";
            var words = document.getElementById("text_here");
            words.style.display = "block";
            words.innerHTML=everything;/*wiki_info*/
            words.style.fontFamily = "Geneva";
            words.style.margin = "50px 200px 50px 500px";
            words.getElementsByTagName("h2").style.textAlign = "center";
            
                     },3000);
    }
  });
}
