"use strict";

var modelTime = 0;

var sysTime = 0;

var earth = {
	mass: 5.9726e24,
	radius: 6371000,
	x: 0,
	y: 0,
	speedX: 0,
	speedY: 0
};
	
var moon = {
	mass: 7.3477e10,
	radius: 1737100,
	x: 0,
	y: 362600000,
	speedX: 1090,
	speedY: 0
};

var mainloop = function() {
	//расчет();
	draw();
};

setInterval(mainloop);

function draw() {
	var canvas  = document.getElementById("canvas");
	canvas.width  = 600; 
	canvas.height = 600; 
		
	var context = canvas.getContext('2d');
	context.fillStyle   = '#000'; 
	context.fillRect(0, 0, canvas.width, canvas.height);	
		
	context.beginPath();
	//..........
	context.stroke();	
}



