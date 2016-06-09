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
			mass: 5.9724e24,
			radius: 6371000,
			x: 0,
			y: 0,
			speedX: 0,
			speedY: 0
		},
		
		{
			name: "Moon",
			mass: 7.346e10,
			radius: 1737400,
			x: 0,
			y: -363300000,
			speedX: 1076,
			speedY: 0
		},

		{
			name: "satellite",
			mass: 1,
			radius: 1,
			x: 0,
			y: -42164000,
			speedX: 3070,
			speedY: 0
		}
	]
};

var model2 = {
	scale: 6.75e-11,
	timeScale: 10005120,
	modelDt: 100,

	spaceObjects: [
		{
			name: "Sun",
			mass: 1.9885e30,
			radius: 695700000,
			x: 0,
			y: 0,
			speedX: 0,
			speedY: 0
		},

		{
			name: "Mercury",
			mass: 0.333011e24,
			radius: 2439700,
			x: 46000000000,
			y: 0,
			speedX: 0,
			speedY: 55980
		},
			
		{
			name: "Venus",
			mass: 4.8675e24,
			radius: 6051800,
			x: 107480000000,
			y: 0,
			speedX: 0,
			speedY: 35260
		},

		{
			name: "Earth",
			mass: 5.9724e24,
			radius: 6371000,
			x: 147090000000,
			y: 0,
			speedX: 0,
			speedY: 30290
		},

		{
			name: "Mars",
			mass: 0.64171e24,
			radius: 3389500,
			x: 206620000000,
			y: 0,
			speedX: 0,
			speedY: 26500
		},

		{
			name: "Jupiter",
			mass: 1.89819e27,
			radius: 69911000,
			x: 740520000000,
			y: 0,
			speedX: 0,
			speedY: 13720
		},

		{
			name: "Saturn",
			mass: 568.34e24,
			radius: 58232,
			x: 1352550000000,
			y: 0,
			speedX: 0,
			speedY: 10180
		},

		{
			name: "Uranus",
			mass: 86.813e24,
			radius: 25362,
			x: 2741300000000,
			y: 0,
			speedX: 0,
			speedY: 7110
		},

		{
			name: "Neptune",
			mass: 102.413e24,
			radius: 24622,
			x: 4444450000000,
			y: 0,
			speedX: 0,
			speedY: 5500
		}
	]
};

var currentModel = model2;

function chooseModel1() {
	currentModel = model1;
	modelTime = 0;
	startSystemTime = new Date().getTime() / 1000;
}

function chooseModel2() {
	currentModel = model2;
	modelTime = 0;
	startSystemTime = new Date().getTime() / 1000;
}

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
