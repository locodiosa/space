"use strict";

var modelTime = 0;

var startSystemTime = new Date().getTime() / 1000;

var scale = 7.446221731936018e-7;

var timeScale = 80640;

var modelDt = 1;

var G = 6.67e-11;

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
];

var mainloop = function() {
	calc();
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
	
	drawObjects(context, spaceObjects);
}

function drawObjects(context, spaceObjects) {
	context.fillStyle = '#eee';
	context.translate(context.canvas.width / 2, context.canvas.height / 2);
	
	spaceObjects.forEach(function(o) { 
		context.beginPath();
		context.arc(o.x * scale, -o.y * scale, o.radius * scale, 0, 2*Math.PI);
		context.closePath();
		context.fill();	
	});
}

function calc() {

	var currentSystemTime = new Date().getTime() / 1000;
	
	while (modelTime < (currentSystemTime - startSystemTime) * timeScale) {
		calcStep();
		modelTime += modelDt;
	};
}

function calcStep() {
	spaceObjects.forEach(function(oi) {
		var ax = 0;
		var ay = 0; 
		var sumax = 0;
		var sumay = 0;

		spaceObjects.forEach(function(oj) {
			if (oj != oi) {
				var r = Math.sqrt(((oj.x - oi.x) * (oj.x - oi.x)) + 
						((oj.y - oi.y) * (oj.y - oi.y)));
				var a = G * oj.mass / (r * r);
				ax = a * (oj.x - oi.x) / r;
				ay = a * (oj.y - oi.y) / r;
			}
			sumax += ax;
			sumay += ay;
		});
							
		oi.newX = oi.x + oi.speedX * modelDt + sumax * modelDt * modelDt / 2;
		oi.newY = oi.y + oi.speedY * modelDt + sumay * modelDt * modelDt / 2;
		oi.speedX += sumax * modelDt;
		oi.speedY += sumay * modelDt;
	});

	spaceObjects.forEach(function(oi) {
		oi.x = oi.newX;
		oi.y = oi.newY;
	});
}
