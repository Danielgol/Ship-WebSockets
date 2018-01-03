
function Screen(width, height){

	this.width = width;
	this.height = height;

  this.cleanScreen = function(ctx){
  	ctx.clearRect(0, 0, this.width, this.height);
  }
}
