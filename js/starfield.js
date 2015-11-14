//starfield class
function Starfield() {
	this.fps = 30;
	this.canvas = null;
	this.width = 0;
	this.height = 0;
	this.minVelocity = 15;
	this.maxVelocity = 30;
	this.stars = 1000; //density of stars
	this.intervalId = 0;
}
Starfield.prototype.initialise = function(div){
	var self = this;
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;	
	window.addEventListener('resize', function resize(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
	});
	//canvas creation
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function(){
	//star creation
	var stars = [];
	for(var i = 0; i< this.stars; i++){
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;
	var self = this;
	//timer start
	this.intervalId = setInterval(function(){
			self.update();
			self.draw();
	}, 1000 / this.fps);
};
Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};
Starfield.prototype.update = function(){
	var dt = 1/this.fps;
	for(var i = 0; i <this.stars.length; i++){
		var star = this.stars[i];
		star.x += dt * star.velocity;
		//if star has moved from bottom of screen, then spawn at top
		if(star.x > this.width){
			this.stars[i] = new Star(0,Math.random()*this.height,Math.random()*3+1, (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
};
Starfield.prototype.draw = function(){
	//get drawing context
	var ctx = this.canvas.getContext("2d");
	//draw background black
	ctx.fillStyle = '#000000';
	ctx.fillRect(0,0,this.width,this.height);
	//draw stars white
	ctx.fillStyle = '#ffffff';
	for(var i=0; i<this.stars.length; i++){
		var star = this.stars[i];
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
};
function Star(x, y, size, velocity){
	this.x= x;
	this.y = y;
	this.size = size;
	this.velocity = velocity;
}
