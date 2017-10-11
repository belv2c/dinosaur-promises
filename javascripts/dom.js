"use strict";

let outputDiv = $('#dinosaur');

const buildDomString = (dinosaur) => {
	let domString = "";
	domString += `<div>`;
	domString += 	`<h1> ${dinosaur.type} </h1>`;	
	domString +=	`<h3> ${dinosaur.bio} </h3>`;
	domString += 	`<h3> ${dinosaur.info} </h3>`;
	domString += `</div>`;

	
	writeToDom(domString);
};

const writeToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = buildDomString;