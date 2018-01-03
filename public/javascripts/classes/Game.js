
function Game(ctx, scr){

  this.ctx = ctx;
  this.scr = scr;

  this.ships = [];
  this.shots = [];
  this.IntervalId;

  this.createShip = function(){
  	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  	triangle.rotate((Math.PI/180)*180);
  	triangle.translate(this.scr.width/2, this.scr.height/2);
  	var ship = new Ship(triangle, this.scr.width/2, this.scr.height/2);
  	this.ships.push(ship);
  }

  this.moveShip = function(keys, i){
    this.ships[i].move(keys);//..........................................................MOVE A NAVE
    this.ships[i].regulateVelocity(1.5);//...............................................LIMITA A VELOCIDADE DA NAVE (FORÇAS)
    this.ships[i].slide(0.001);//........................................................FAZ COM QUE A NAVE RETARDE
    this.ships[i].applyForces();//.......................................................FAZ COM QUE A NAVE GANHE "VELOCIDADE" (FORÇA)
    this.ships[i].obeyLimit(this.scr.width, this.scr.height);//..........................FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
    this.ships[i].drawShip(this.ctx);
  }

  this.moveShots = function(){
    for(i = 0; i<this.shots.length; i++){
				this.shots[i].move(3);//......................................................MOVE O TIRO
				this.shots[i].obeyLimit(this.scr.width, this.scr.height);//...................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				this.shots[i].LoseReach(0.1);//...............................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
				if(this.shots[i].reach <= 0){//...............................................VERIFICA O TEMPO DE VIDA DO TIRO
					this.shots.splice(i, 1);//..................................................REMOVE O TIRO
				}else{
					this.shots[i].drawShot(this.ctx);//.........................................DESENHA O TIRO
				}
		}
  }

  this.setShots = function(shots){
    this.shots = shots;
  }

}
