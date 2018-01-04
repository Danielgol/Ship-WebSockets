
function sendShip(ship){
	console.log('Sending: '+ship.x+', '+ship.y+', '+ship.angle);
	socket.emit('ship', ship);
}

function drawShip(ctx, triangle, color){
		ctx.beginPath();
		ctx.moveTo(triangle['points'][0]['x'], triangle['points'][0]['y']);
		ctx.lineTo(triangle['points'][1]['x'], triangle['points'][1]['y']);
		ctx.lineTo(triangle['points'][2]['x'], triangle['points'][2]['y']);
		ctx.lineTo(triangle['points'][0]['x'], triangle['points'][0]['y']);
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.closePath();
}

function Ship(triangle, x, y){

	this.triangle = triangle;
	this.x = x;
	this.y = y;
	this.forceX = 0;
	this.forceY = 0;
	this.angle = 0;

	this.move = function(keys){
			if (38 in keys) {
				this.boost();
				//this.drawFire(ctx, this.throwFire());
			}
			if (39 in keys) {
				this.turn(4);
			}
			if (37 in keys) {
				this.turn(-4)
			}
			ctx.clearRect(this.x-14, this.y-14, 28, 28);
			this.regulateVelocity(2);
			this.slide(0.001);
			this.applyForces();
			this.obeyLimit(canvas.width, canvas.height);
			drawShip(ctx, this.triangle, "white");
			sendShip(this);
	}

	this.turn = function(i){
			this.angle += i;
			if(this.angle >= 360){
	        this.angle = 0;
	    }else if(this.angle < 0){
	        this.angle = 359;
	    }
			this.triangle.translate(-this.x, -this.y);
			this.triangle.rotate((Math.PI/180)* i );
			this.triangle.translate(this.x, this.y);
	}

	this.boost = function(){
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
		           this.forceY += Math.cos(this.angle * Math.PI / 180) * 0.015;
		  }
		  if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
		           this.forceX += Math.sin(this.angle * Math.PI / 180) * 0.015;
		  }
	}

	this.applyForces = function(){
		this.triangle.translate(-this.x, -this.y);
		this.x += this.forceX;
		this.y -= this.forceY;
		this.triangle.translate(this.x, this.y);
	}

	this.slide = function(delay){
				if (this.forceX > 0) {
						if (this.forceX - delay > 0) {
								this.forceX -= delay;
						} else {
								this.forceX = 0;
						}
				} else if (this.forceX < 0) {
						if (this.forceX + delay < 0) {
								this.forceX += delay;
						} else {
								this.forceX = 0;
						}
				}
				if (this.forceY > 0) {
						if (this.forceY - delay > 0) {
								this.forceY -= delay;
						} else {
								this.forceY = 0;
						}
				} else if (this.forceY < 0) {
						if (this.forceY + delay < 0) {
								this.forceY += delay;
						} else {
								this.forceY = 0;
						}
				}
	}

	this.regulateVelocity = function(maxVelocity){
			if (this.forceX > maxVelocity) {
					this.forceX = maxVelocity;
			} else if (this.forceX < (-maxVelocity)) {
					this.forceX = (-maxVelocity);
			}
			if (this.forceY > maxVelocity) {
					this.forceY = maxVelocity;
			} else if (this.forceY < (-maxVelocity)) {
					this.forceY = (-maxVelocity);
			}
	}

	this.obeyLimit = function(width, height){
			if(this.x > width){
					this.triangle.translate(-this.x, -this.y);
					this.x = 0;
					this.triangle.translate(this.x, this.y);
			}else if(this.x < 0){
					this.triangle.translate(-this.x, -this.y);
					this.x = width;
					this.triangle.translate(this.x, this.y);
			}else if(this.y > height){
					this.triangle.translate(-this.x, -this.y);
					this.y = 0;
					this.triangle.translate(this.x, this.y);
			}else if(this.y < 0){
					this.triangle.translate(-this.x, -this.y);
					this.y = height;
					this.triangle.translate(this.x, this.y);
			}
	}

	// this.throwFire = function(){
	// 		var losangle = new SAT.Polygon(new SAT.Vector(0, 0),
	// 		[new SAT.Vector(-3, -3), new SAT.Vector(0,-5), new SAT.Vector(3,-3), new SAT.Vector(0,5)]);
	// 		losangle.translate(this.x, this.y);
	// 		losangle.translate(-this.x, -(this.y-13));
	// 		losangle.rotate((Math.PI/180)* this.angle );
	// 		losangle.translate(this.x, this.y);
	// 		return losangle;
	// }

	// this.drawFire = function(ctx, losangle){
	// 		ctx.beginPath();
	// 		ctx.lineWidth = 1;
	// 		ctx.moveTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
	// 		ctx.lineTo(losangle['points'][1]['x'], losangle['points'][1]['y']);
	// 		ctx.lineTo(losangle['points'][2]['x'], losangle['points'][2]['y']);
	// 		ctx.lineTo(losangle['points'][3]['x'], losangle['points'][3]['y']);
	// 		ctx.lineTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
	// 		ctx.strokeStyle = "white";
	// 		ctx.stroke();
	// 		ctx.closePath();
	// }

}
