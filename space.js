"use strict";

var modelTime = 0;
var startSystemTime = new Date().getTime() / 1000;
var G = 6.67e-11;

var model1 = {
	scale: 7.446221731936018e-7,
	timeScale: 80640,
	modelDt: 1,

	spaceObjects: [
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
		},

		{
			name: "satellite",
			mass: 3e10,
			radius: 900000,
			x: 0,
			y: 250000000,
			speedX: -800,
			speedY: 0
		}
	]
};

var model2 = {
	scale: 7.446221731936018e-7,
	timeScale: 80640,
	modelDt: 1,

	spaceObjects: [
		{
			name: "Sun",
			mass: 1.9885e30,
			radius: 6.9551e11
		},

		{
			name: "Mercury",
			mass: 3.33022e23,
			radius: 2439700,
			x: 46001009000,
			y: 0,
			speedX: 0,
			speedY: 59000
		}
	]
};

var currentModel = model1;

var mainloop = function() {
	calc();
	draw();
}

setInterval(mainloop);


function draw() {
	var canvas  = document.getElementById("canvas");
	canvas.width  = 600; 
	canvas.height = 600; 
		
	var context = canvas.getContext('2d');
	context.fillStyle   = '#000'; 
	context.fillRect(0, 0, canvas.width, canvas.height);	
	
	drawObjects(context);
}

function drawObjects(context) {
	context.fillStyle = '#eee';
	context.translate(context.canvas.width / 2, context.canvas.height / 2);
	
	currentModel.spaceObjects.forEach(function(o) { 
		context.beginPath();
		context.arc(o.x * currentModel.scale, -o.y * currentModel.scale, Math.max(currentModel.scale * o.radius, 1), 0, 2*Math.PI);
		context.closePath();
		context.fill();	
	});
}

function calc() {

	var currentSystemTime = new Date().getTime() / 1000;
	
	while (modelTime < (currentSystemTime - startSystemTime) * currentModel.timeScale) {
		calcStep();
		modelTime += currentModel.modelDt;
	};
}

function calcStep() {
	currentModel.spaceObjects.forEach(function(oi) {
		var ax = 0;
		var ay = 0; 
		
		currentModel.spaceObjects.forEach(function(oj) {
			if (oj != oi) {
				var r = Math.sqrt(((oj.x - oi.x) * (oj.x - oi.x)) + 
						((oj.y - oi.y) * (oj.y - oi.y)));
				var a = G * oj.mass / (r * r);
				ax += a * (oj.x - oi.x) / r;
				ay += a * (oj.y - oi.y) / r;
			}
		});
		
		var dt = currentModel.modelDt;					
		oi.newX = oi.x + oi.speedX * dt + ax * dt * dt / 2;
		oi.newY = oi.y + oi.speedY * dt + ay * dt * dt / 2;
		oi.speedX += ax * dt;
		oi.speedY += ay * dt;
	});

	currentModel.spaceObjects.forEach(function(oi) {
		oi.x = oi.newX;
		oi.y = oi.newY;
	});
}
