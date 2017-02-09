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
  if (clickCount === 1) {
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
            // words.getElementsByTagName("h2").style.textAlign = "center";
            ponyApi(e);
                     },3000);
    }
  });
}

function ponyApi(e) {
  var request = "http://ponyfac.es/api.json/tag";
  e.preventDefault();
  $.ajax({
    url:request,
    dataType:"json",
    jsonpCallback: 'callback',
    type: 'GET',
    success:function(parsed_json) {
      numPonies = parsed_json["total_faces"];
      ponyFaces = parsed_json["faces"];

      console.log()
    }
  });
}

function resetPonyImage() {
  var faceIndex = Math.floor(Math.random() * numPonies);
  var ponyImage = ponyFaces[faceIndex]["image"]
  ponyImage.replace(/\\/g,"");
  var floating_pony = document.getElementById("floating_pony");
  floating_pony.src = ponyImage;
  floating_pony.style.left = -50 + "px";
}

function moveRight(imgObj){
   imgObj.style.left = parseInt(imgObj.style.left) + 10 + "px";
   if (parseInt(imgObj.style.left) > window.innerWidth) {
     imgObj.style.left = -50 + "px";
   }
}
