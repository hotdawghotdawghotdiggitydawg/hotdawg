console.log("test");

var c = document.getElementById("myCanvas1");
var ctx = c.getContext('2d');

var WIDTH = 2000;
var HEIGHT = 1000;

var x,y;
var mx, my;

function circle(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,6.28);
	ctx.closePath();
	ctx.strokeStyle = "rgb(" + random() + "," + random() + "," + random() + ")";
	ctx.lineWidth = 10;
	//ctx.stroke()
	//ctx.fillStyle = "lime";
	//ctx.fill();
}

function init(){
	x = 300;
	y = 200;
	mx = 3;
	my = 4;
	return setInterval(draw,1/1000);
}

function random(){
	return Math.floor(Math.random()*255)
}

function draw(){
	//clear();
	circle(x,y,60)
	ctx.fillStyle = "rgb(" + random() + "," + random() + "," + random() + ")";
	ctx.fill();
	if(x+mx < 0 || x+mx > WIDTH){
		mx = -mx;
	}
	if(y+my < 0 || y+my > HEIGHT){
		my = -my;
	}
	x = x + mx;
	y = y + my;
}

//function clear(){
//	ctx.clearRect(0,0,WIDTH,HEIGHT);
//}

init();