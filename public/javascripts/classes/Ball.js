
function sendCommand(ball){
	console.log('Sending: '+ball.x+', '+ball.y);
	socket.emit('ball', ball);
}

function Ball(){

	this.x = Math.floor(Math.random()*(canvas.width-20+1)+20);
	this.y = Math.floor(Math.random()*(canvas.height-20+1)+20);

	this.move = function(keys){
			if (38 in keys) {
				this.y -= 2;
			}
			if(40 in keys) {
				this.y += 2;
			}
			if (39 in keys) {
				this.x += 2;
			}
			if (37 in keys) {
				this.x -= 2;
			}
			ctx.clearRect(this.x-13, this.y-13, 26, 26);
			this.obeyLimit(canvas.width, canvas.height);
			this.drawBall(ctx);
			sendCommand(this);
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
			ctx.fillStyle = "white";
			ctx.fill();
	    ctx.closePath();
	}

}
