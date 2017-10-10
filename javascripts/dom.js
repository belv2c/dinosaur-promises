"use strict";

var outputDiv = $('#dinosaur');

var buildDomString = (dinosaur) =>{
	var domString = "";
	domString += `<div>`;
	domString += 	`<h1> ${dinosaur.name} </h1>`;	
	domString += `</div>`;
	
	writeToDom(domString);
};

const writeToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = buildDomString;