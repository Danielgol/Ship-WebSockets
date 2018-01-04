
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
	drawShip(ctx, data.triangle, "red");
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
				ship = createShip();
			}
	}
}

//cria a sua nave;
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

//faz o loop da sua nave;
function loop(){
	ship.move(keys);
}

//inicia o jogo;
function start(){
	ship = createShip();
	setInterval(loop, 10);
}

start();
