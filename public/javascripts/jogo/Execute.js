
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var scr = new Screen(canvas.width, canvas.height);
var game = new Game(ctx, scr);

function loop(){
	game.scr.cleanScreen(game.ctx);
	game.moveShip(keys);
	//game.setShots(game.ship.shoot(game.shots, keys));
	//game.moveShots();
	socket.on('ship', drawOtherShip);
	sendShip(game.ship);
}

function sendShip(myShip){
	//console.log('sending: '+myShip.x+', '+myShip.y+', '+myShip.angle);
	var data = {
		x: myShip.x,
		y: myShip.y,
		angle: myShip.angle
	}
	socket.emit('ship', data);
}

function drawOtherShip(data){
	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
	triangle.translate(data.x, data.y);
	triangle.translate(-data.x, -data.y);
	triangle.translate(data.x, data.y);
	var otherShip = new Ship(triangle, data.x, data.y);

	ctx.beginPath();
	ctx.moveTo(otherShip.triangle['points'][0]['x'], otherShip.triangle['points'][0]['y']);
	ctx.lineTo(otherShip.triangle['points'][1]['x'], otherShip.triangle['points'][1]['y']);
	ctx.lineTo(otherShip.triangle['points'][2]['x'], otherShip.triangle['points'][2]['y']);
	ctx.lineTo(otherShip.triangle['points'][0]['x'], otherShip.triangle['points'][0]['y']);
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();
}

function start(){
	game.createShip();
	game.IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
}

start();
