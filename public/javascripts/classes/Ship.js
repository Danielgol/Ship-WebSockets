
function sendShip(ship){
	console.log('Sending: '+ship.x+', '+ship.y+', '+ship.angle);
	socket.emit('ship', ship);
}

function Ship(triangle, x, y){

	this.triangle = triangle;
	this.x = x;
	this.y = y;
	this.angle = 0;

	this.move = function(keys){
			if (38 in keys) {
				this.triangle.translate(-this.x, -this.y);
				this.boost();
				this.triangle.translate(this.x, this.y);
			}
			if (39 in keys) {
				this.turn(4);
			}
			if (37 in keys) {
				this.turn(-4)
			}
			ctx.clearRect(this.x-14, this.y-14, 28, 28);
			this.obeyLimit(canvas.width, canvas.height);
			this.drawShip(ctx);
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
		        this.y -= Math.cos(this.angle * Math.PI / 180)*2;
		  }
		  if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
		        this.x += Math.sin(this.angle * Math.PI / 180)*2;
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

	this.drawShip = function(ctx){
			ctx.beginPath();
	    ctx.moveTo(this.triangle['points'][0]['x'], this.triangle['points'][0]['y']);
	    ctx.lineTo(this.triangle['points'][1]['x'], this.triangle['points'][1]['y']);
	    ctx.lineTo(this.triangle['points'][2]['x'], this.triangle['points'][2]['y']);
	    ctx.lineTo(this.triangle['points'][0]['x'], this.triangle['points'][0]['y']);
			ctx.lineWidth = 1.5;
			ctx.strokeStyle = "white";
	    ctx.stroke();
	    ctx.closePath();
	}

}
