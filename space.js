"use strict";

var modelTime = 0;

var sysTime = new Date().getTime() / 1000;

var scale = 7.446221731936018e-7;

var timeScale = 80640;

var modelDt = 1;

var spaceObjects = [
	{
		name: "Earth",
		mass: 5.9726e24,
		radius: 6371000,
		x: 0,
		y: 0,
		speedX: 0,
		speedY: 0
	},
	
	{
		name: "Moon",
		mass: 7.3477e10,
		radius: 1737100,
		x: 0,
		y: 362600000,
		speedX: 1090,
		speedY: 0
	}
];

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
	drawObjects(context, spaceObjects);
	context.fill();	
}

function drawObjects(context, spaceObjects) {
	context.fillStyle = '#eee';
	context.translate(context.canvas.width / 2, context.canvas.height / 2);
	
	for (var i in spaceObjects) {
		var o = spaceObjects[i];
		context.arc(o.x * scale, -o.y * scale, o.radius * scale, 0, 2*Math.PI);
	}
}

