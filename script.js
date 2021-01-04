var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rectIndex;
var temp;
var count = 3;
var click1 = "";
var click2 = "";
var swapped = "True";
var rect1 = "";
var colorList = [];
var rectList = [];
var wide = canvas.width / count;
var tall = canvas.height /count;

function createColors(){
  for(var i = 0; i < count; i++){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    for(var j = 0; j < count; j++){
      rectColor = "rgb(" + r + "," + g + "," + b + ")";
      colorList.push(rectColor);
    }
  }
}

function buildGrid(){
  document.getElementById("myLevel").innerHTML = count;
  // count = count + 1;
  colorList = [];
  rectList = [];
  rect1 = "";
  wide = canvas.width / count;
  tall = canvas.height /count;
  createColors();

  for(var i = 0; i < count; i++){
    for(var j = 0; j < count; j++){
      var xPos = i * wide;
      var yPos = j * tall;
      var c = Math.floor(Math.random() * colorList.length);
      var colorPos = colorList[c];
      rect1 = {
        x : xPos,
        y : yPos,
        width : wide,
        height: tall,
        color : colorPos
      }
      rectList.push(rect1);
      colorList.splice(c, 1);
    }
  }
  // console.log(rectList.length)
  paint();
}

function paint(){
  // buildGrid();
  for(var i = 0; i < rectList.length; i++){
    rect1 = rectList[i];
    ctx.beginPath();
    ctx.fillStyle = rect1.color;
    rect1.strokeStyle = "black";
    rect1.lineWidth = 10;
    ctx.strokeRect(rect1.x, rect1.y, rect1.width, rect1.height);
    ctx.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
    ctx.stroke();
  }
}

function getCoords(canvas, event) {
  // var mouseX = event.clientX;
  // var mouseY = event.clientY;
  var rect = canvas.getBoundingClientRect();
  var mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

  for(var k = 0; k < rectList.length; k++){
    rect1 = rectList[k];
    if (mouseX > rect1.x && mouseX < rect1.x + rect1.width && mouseY > rect1.y && mouseY < rect1.y + rect1.height){
      rectIndex = k;
      assignClick()
    }
  }
}

function assignClick(){
  if(swapped == "True"){
    click1 = rectIndex;
    swapped = "False";
  } else if(swapped == "False"){
    click2 = rectIndex;
    swap()
  }
}
//after swap --> False
function checkGame(){
  for(var r = 0; r < rectList.length; r += count){
    var rect1Color = rectList[r].color;
    for(var c = 0; c < count; c++){
      var d = c + r;
      var rect2Color = rectList[d].color;
      if(rect2Color != rect1Color){
        return false;
      }
    }
  }
  // console.log(swapped);
  return true;
}

function swap(){
  temp = rectList[click2].color;
  rectList[click2].color = rectList[click1].color;
  rectList[click1].color = temp;
  paint();
  swapped = "True";
  temp = "";
  checkGame();
  if( checkGame() ){
    count = count + 1;
    swapped = "False";
    buildGrid();
  }
}

buildGrid();
// getCoords(event);
// checkGame()