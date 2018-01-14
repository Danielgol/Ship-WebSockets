
function drawShot(ctx, shot){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(shot.circle['pos'].x, shot.circle['pos'].y, shot.circle['r'], 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function Shot(circle, angle){

	this.circle = circle;
	this.angle = angle;
	this.reach = 15;

	this.move = function(i){
		if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
	        this.circle['pos'].y -= Math.cos(this.angle * Math.PI / 180) * i;
	    }
	    if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
	        this.circle['pos'].x += Math.sin(this.angle * Math.PI / 180) * i;
	    }
	}

	this.loseReach = function(i){
		this.reach -= i;
	}

	this.obeyLimit = function(width, height){
		if(this.circle['pos'].x > width){
			socket.emit('erase my shot', {x: this.circle['pos'].x, y: this.circle['pos'].y});
			this.circle['pos'].x = 0;
		}else if(this.circle['pos'].x < 0){
			socket.emit('erase my shot', {x: this.circle['pos'].x, y: this.circle['pos'].y});
			this.circle['pos'].x = width;
		}else if(this.circle['pos'].y > height){
			socket.emit('erase my shot', {x: this.circle['pos'].x, y: this.circle['pos'].y});
			this.circle['pos'].y = 0;
		}else if(this.circle['pos'].y < 0){
			socket.emit('erase my shot', {x: this.circle['pos'].x, y: this.circle['pos'].y});
			this.circle['pos'].y = height;
		}
	}

}
