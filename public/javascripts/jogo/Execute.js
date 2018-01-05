
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var ship;

//detecta as teclas do teclado;
var keys = [];
document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true; //alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);

//recebe as naves dos outros jogadores e dispara a função drawOtherShip;
socket.on('ship', drawOtherShip);

//desenha a nave dos outros jogadores;
function drawOtherShip(data){
	//apagar rastro da nave;
	ctx.clearRect(data.x-13, data.y-13, 26, 26);
	//desenhar a outra nave;
	if(data.imortality === true){
		drawShip(ctx, data.triangle, "#CD5C5C");
	}else{
		drawShip(ctx, data.triangle, "red");
	}
	//desenhar os tiros;
	for(i = data.shots.length-1; i>=0; i--){
			ctx.clearRect(data.shots[i].circle['pos'].x-6, data.shots[i].circle['pos'].y-6, 12, 12);
			if(data.shots[i].reach >= 0.1){
				drawShot(ctx, data.shots[i]);//.........................................DESENHA O TIRO
			}
			var response = new SAT.Response();
			var collided = SAT.testPolygonCircle
			(ship.triangle, data.shots[i].circle, response);//...........................VERIFICA COLISÃO (NAVE, ÁTOMO)
			if(collided === true){
				respawn();
			}
	}
}

//cria a sua nave;
function createShip(){
	var x = canvas.width/2;
	var y = canvas.height/2;
	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  triangle.rotate((Math.PI/180)*180);
  triangle.translate(x, y);
  ship = new Ship(triangle, x, y);
	setTimeout(function() {
		ship.imortality = false;
	}, 3000);
}

function respawn(){
	ctx.clearRect(ship.x-14, ship.y-14, 28, 28);
	ship.imortality = true;
	createShip();
}

//faz o loop da sua nave;
function loop(){
	ship.move(keys);
}

//inicia o jogo;
function start(){
	createShip();
	setInterval(loop, 10);
}

start();
