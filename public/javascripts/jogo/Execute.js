
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var ship;

var keys = [];
document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true; //alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);

socket.on('ship', drawOtherShip);

function drawOtherShip(data){
	//apagar rastro
	ctx.clearRect(data.x-13, data.y-13, 26, 26);

	//desenhar a outra nave
	// ctx.beginPath();
	// ctx.arc(data.x,data.y,10,0,2*Math.PI);
	// ctx.fillStyle = "red";
	// ctx.fill();
	// ctx.closePath();
	ctx.beginPath();
	ctx.moveTo(data.triangle['points'][0]['x'], data.triangle['points'][0]['y']);
	ctx.lineTo(data.triangle['points'][1]['x'], data.triangle['points'][1]['y']);
	ctx.lineTo(data.triangle['points'][2]['x'], data.triangle['points'][2]['y']);
	ctx.lineTo(data.triangle['points'][0]['x'], data.triangle['points'][0]['y']);
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();
}

function createShip(){
	var x = Math.floor(Math.random()*(canvas.width-20+1)+20);
	var y = Math.floor(Math.random()*(canvas.height-20+1)+20);
	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  triangle.rotate((Math.PI/180)*180);
  triangle.translate(x, y);
  var ship = new Ship(triangle, x, y);
	return ship;
}

function loop(){
	ship.move(keys);
}

function start(){
	ship = createShip();
	setInterval(loop, 10);
}

start();
