var firstX = 0;
var firstY = 0;
var clickCount = 0;
var numPonies = 0;
var ponyFaces;

function onLoad() {
    var gifTxt = "<img src=\"pony.gif\"";
    gifTxt += " width=\"" + window.innerWidth + "\"";
    gifTxt += " height=\"" + (window.innerHeight) + "\"";
    gifTxt += "/>"
    var info = "<div id=\"wiki_info\"></div>"
    var txt = "<canvas onclick=onCanvasClick(this,event)";
    txt += " id=\"connect\"";
    txt += " width=\"" + window.innerWidth + "\"";
    txt += " height=\"" + (window.innerHeight) + "\"";
    txt += "/>"
    txt += "<p id=\"instructions\">Connect the dots. Click on A, B, C...</p>";
    console.log(txt);
    document.getElementById("connect_container").innerHTML = txt;
    document.getElementById("gif_container").innerHTML = gifTxt;
    document.getElementById("text_here").innerHTML = info;
}

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
  wikiApi(event);
}

function wikiApi(e) {
  var request = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=My_Little_Pony&callback=?";
  e.preventDefault();
  $.ajax({
    url : request,
    dataType : "json",
    success : function(parsed_json) {
      var ponytalk = parsed_json["query"]["pages"]["490081"]["extract"];
      var everything = "<h2>Wiki article on My Little Pony</h2>";
      console.log("everything");
      everything += "<p>" + ponytalk/*value*/ + "</p>";
      everything += "<img id=\"floating_pony\" />"
      setTimeout(function(){
            document.body.style.backgroundImage = "url('wallpaperbackground.png')";
            document.getElementById("gif_container").style.display="none";
            var words = document.getElementById("text_here");
            words.style.display = "block";
            words.innerHTML=everything;/*wiki_info*/
            words.style.fontFamily = "Geneva";
            words.style.margin = "50px 200px 50px 500px";
            ponyApi(e);
                     },3000);
    }
  });
}

function ponyApi(e) {
  var request = "http://ponyfac.es/api.jsonp:parsePonyData/tag";
  e.preventDefault();
  $.ajax({
    url:request,
    dataType:"jsonp"
  });
}

function parsePonyData(data) {
  numPonies = data["total_faces"];
  ponyFaces = data["faces"]
  resetPonyImage();
}

function resetPonyImage() {
  console.log(ponyFaces);
  var faceIndex = Math.floor(Math.random() * numPonies);
  var ponyImage = ponyFaces[faceIndex]["thumbnail"]
  ponyImage.replace(/\\/g,"");
  var floating_pony = document.getElementById("floating_pony");
  floating_pony.src = ponyImage;
  floating_pony.style.left = 0 + "px";
  var width = "+=" + (window.innerWidth - $("#floating_pony").width());
  $("#floating_pony").animate({left: width}, 5000, function() {
    setInterval(resetPonyImage(), 5000);
  });
}
