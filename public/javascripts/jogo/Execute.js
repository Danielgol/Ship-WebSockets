
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

//recebe as naves dos outros jogadores;
socket.on('ship', function (data){

	ctx.clearRect(data.x-13, data.y-13, 26, 26);

	if(data.imortality === true){
		drawShip(ctx, data.triangle, "#CD5C5C");
	}else{
		drawShip(ctx, data.triangle, "red");
	}

	for(i = data.shots.length-1; i>=0; i--){
		ctx.clearRect(data.shots[i].circle['pos'].x-6, data.shots[i].circle['pos'].y-6, 12, 12);
		if(data.shots[i].reach >= 0.1){
			drawShot(ctx, data.shots[i]);//.........................................DESENHA O TIRO
		}
		if(ship.imortality === false){
			var response = new SAT.Response();
			var collided = SAT.testPolygonCircle
			(ship.triangle, data.shots[i].circle, response);//...........................VERIFICA COLISÃO (NAVE, ÁTOMO)
			if(collided === true){
				socket.emit('increase points', data.name);
				socket.emit('erase my ship', {x: ship.x, y: ship.y});
				respawn();
			}
		}
	}
});

//apagar nave (destruida/nas bordas)
socket.on('erase ship', function(data){
	ctx.clearRect(data.x-14, data.y-14, 28, 28);
});

//apagar o tiro nas bordas
socket.on('erase shot', function(data){
	ctx.clearRect(data.x-6, data.y-6, 12, 12);
});

//apagar tudo
socket.on('erase all', function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function createShip(x, y){
	var x = x;
	var y = y;
	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  	triangle.rotate((Math.PI/180)*180);
  	triangle.translate(x, y);
  	ship = new Ship(triangle, x, y);

  	ship.name = user.name;

	setTimeout(function() {
		ship.imortality = false;
	}, 6000);
}

function respawn(){
	ship.imortality = true;
	createShip(canvas.width/2, canvas.height/2);
	ship.visible = false;
	setTimeout(function() {
		ship.visible = true;
	}, 3000);
}

function loop(){
	ship.move(keys);
}

function start(){
	createShip(Math.floor(Math.random()*(canvas.width-20+1)+20),Math.floor(Math.random()*(canvas.height-20+1)+20));
	setInterval(loop, 10);
}

start();
