console.log("test");

var c = document.getElementById("myCanvas1");
var ctx = c.getContext('2d');

ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeDtyle = "hotpink";
ctx.moveTo(150,1);
ctx.lineTo(100,251);
ctx.lineTo(200,251);
ctx.closePath();
ctx.stroke();
ctx.fillstyle = "black";
ctx.fill();

ctx.arc(150,251,50,0,3.14)
ctx.stroke();
ctx.fillstyle = "black";
ctx.fill()