
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var ship = new Ship();

var keys = [];
document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true; //alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);

socket.on('ship', drawOtherShip);

function drawOtherShip(data){
	//apagar tudo
	ctx.clearRect(data.x-13, data.y-13, 26, 26);

	//desenhar a outra nave
	ctx.beginPath();
	ctx.arc(data.x,data.y,10,0,2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
}

function loop(){
	ship.move(keys);
}

setInterval(loop, 10);
