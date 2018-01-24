console.log("test");
var c = document.getElementById("myCanvas1");
var ctx = c.getContext('2d');
var img = new Image();
img.src = 'handhole.png';

img.onload = function(){
	ctx.drawImage(img, 100, 100, 150, 150)
}

var img2 = new Image();
img2.src = 'sonic.png';

img2.onload = function(){
	ctx.drawImage(img2, 200, 200, 250, 250)
}

ctx.fillText("look at the bottom right",10,10)
ctx.fillText("look at the top right",400,450)
ctx.fillText("look at the bottom left",400,10)

var img3 = new Image();
img3.src = 'imgres.jpg';

img2.onload = function(){
	ctx.drawImage(img3, 10, 450, 50, 50)
}

var c2 = document.getElementById("scene");
var ctx2 = c2.getContext('2d');

ctx2.fillStyle = "cyan"
ctx2.fillRect(0,0,800,500)

ctx2.fillStyle = "grey"
ctx2.fillRect(0,300,800,500)

var img5 = new Image();
img5.src = "powerpuff.jpg"

img5.onload = function(){
	ctx2.drawImage(img5, 0, 0, 700, 300)
}
