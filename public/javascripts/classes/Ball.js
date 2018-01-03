
function sendCommand(ball){
	console.log('Sending: '+ball.x+', '+ball.y);
	socket.emit('ball', ball);
}

function Ball(){

	this.x = 100;
	this.y = 100;

	this.move = function(keys){
			if (38 in keys) {
				this.y -= 2;
				this.obeyLimit(canvas.width, canvas.height);
				this.drawBall(ctx);
				sendCommand(this);
			}
			if(40 in keys) {
				this.y += 2;
				this.obeyLimit(canvas.width, canvas.height);
				this.drawBall(ctx);
				sendCommand(this);
			}
			if (39 in keys) {
				this.x += 2;
				this.obeyLimit(canvas.width, canvas.height);
				this.drawBall(ctx);
				sendCommand(this);
			}
			if (37 in keys) {
				this.x -= 2;
				this.obeyLimit(canvas.width, canvas.height);
				this.drawBall(ctx);
				sendCommand(this);
			}
	}

	this.obeyLimit = function(width, height){
			if(this.x > width){
					this.x = 0;
			}else if(this.x < 0){
					this.x = width;
			}else if(this.y > height){
					this.y = 0;
			}else if(this.y < 0){
					this.y = height;
			}
	}

	this.drawBall = function(ctx){
			ctx.beginPath();
			ctx.arc(this.x,this.y,10,0,2*Math.PI);
			ctx.lineWidth = 1.5;
			ctx.strokeStyle = "white";
	    ctx.stroke();
	    ctx.closePath();
	}

}
