
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var ball = new Ball();

var keys = [];
document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true; //alert(e.keyCode);
	ball.move(keys);
}, false);
document.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);

socket.on('ball', drawOtherShip);

function drawOtherShip(data){
	//apagar tudo
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//desenhar a outra nave
	ctx.beginPath();
	ctx.arc(data.x,data.y,10,0,2*Math.PI);
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();
	//desenhar a sua nave
}
