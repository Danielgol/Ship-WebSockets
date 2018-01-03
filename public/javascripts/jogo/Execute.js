
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var scr = new Screen(canvas.width, canvas.height);
var game = new Game(ctx, scr);

function loop(){
	game.scr.cleanScreen(game.ctx);
	for(i=0; i<game.ships.length; i++){
		game.moveShip(keys, i);
		game.setShots(game.ships[i].shoot(game.shots, keys));
		game.moveShots();
	}
}

function start(){
	game.createShip();
	game.IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
}

start();
