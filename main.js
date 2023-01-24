"use strict";

function init()
{	
	// Flex Container
	let flexBoxNode = document.createElement("div");
	flexBoxNode.style.display = "flex"; // flex stuff
	flexBoxNode.style.justifyContent = "center"; // flex stuff
	flexBoxNode.style.alignItems = "center"; // flex stuff
	flexBoxNode.style.flexDirection = "column";
	flexBoxNode.style.backgroundColor = "white";
	flexBoxNode.style.margin = "0px";
	
	document.body.appendChild(flexBoxNode);
		
	const colorData = [
		{name:"Black", red:0.0, green:0.0, blue:0.0},
		{name:"Blue", red:0.0, green:0.0, blue:100.0},
		{name:"Brown", red:60.0, green:40.0, blue:20.0},
		{name:"Cyan", red:0.0, green:100.0, blue:100.0},
		{name:"Golden", red:100.0, green:80.0, blue:0.0},
		{name:"Gray", red:50.0, green:50.0, blue:50.0},
		{name:"Green", red:0.0, green:100.0, blue:0.0},
		{name:"Magenta", red:100.0, green:0.0, blue:100.0},
		{name:"Orange", red:100.0, green:50.0, blue:0.0},
		{name:"Purple", red:50.0, green:0.0, blue:50.0},
		{name:"Red", red:100.0, green:0.0, blue:0.0},
		{name:"White", red:100.0, green:100.0, blue:100.0},
		{name:"Yellow", red:100.0, green:100.0, blue:0.0}
	];
	
	const flexObject = flexBoxes(flexBoxNode);
		
	flexObject.colorBox.addEventListener("mousedown", function(event)
	{
		const randomColor = createRandomColor(flexObject.colorBox);
		const colorName = findNearestNeighbors(flexObject.colorName, randomColor, colorData);
		
		flexObject.colorName.innerHTML = colorName;
		flexObject.colorBox.style.backgroundColor = "rgb(" + randomColor.red + "%," + randomColor.green + "%," + randomColor.blue + "%)";
	});
}

function findNearestNeighbors(flexBox, randomColor, colorData)
{		
	const similarityScores = [];
	
	for (let i = 0; i < colorData.length; i++)
	{
		const colorObject = colorData[i];
		colorObject.distance = euclideanDistance(randomColor, colorObject);
		similarityScores.push(colorObject);
	}
	
	similarityScores.sort(compareDistances);
	
	return similarityScores[0].name;
}

function compareDistances(objectA, objectB)
{
	return objectB.distance - objectA.distance;
}

function euclideanDistance(objectA, objectB)
{
	const colorChannelArray = ["red", "green", "blue"];
	let squares = 0;
	
	// distance = Math.sqrt((x2 - x1)^2 + (y2 - y1)^2);
	for (let i = 0; i < colorChannelArray.length; i++)
	{
		const colorChannel = colorChannelArray[i];
		const difference = objectB[colorChannel] - objectA[colorChannel];
		squares += difference * difference;
	}
	
	const distance = Math.sqrt(squares);
	const similarity = 1 / (1 + distance);
	
	return similarity;
}

function createRandomColor(colorNode)
{
	const color = {
		red:randomPercent(),
		green:randomPercent(),
		blue:randomPercent(),
	};
	
	colorNode.style.backgroundColor = "rgb(" + color.red + "%," + color.green + "%," + color.blue + "%)";

	return color;
}

function randomPercent()
{
	return Math.floor(Math.random() * 101); // 0% to 100%
}

function flexBoxes(flexBoxNode)
{	
	let colorBoxNode = document.createElement("div");	
	colorBoxNode.style.backgroundColor = "DodgerBlue";
	colorBoxNode.style.margin = "50px";
	colorBoxNode.style.fontSize = "50px";
	colorBoxNode.style.width = "300px";
	colorBoxNode.style.height = "300px";
	
	flexBoxNode.appendChild(colorBoxNode);
	
	let colorNameNode = document.createElement("div");	
	colorNameNode.style.backgroundColor = "white";
	colorNameNode.style.color = "black";
	colorNameNode.style.margin = "50px";
	colorNameNode.style.padding = "50px";
	colorNameNode.style.fontSize = "50px";
	colorNameNode.innerHTML = "Guess";
	
	flexBoxNode.appendChild(colorNameNode);
	
	return {colorBox:colorBoxNode, colorName:colorNameNode};
}
