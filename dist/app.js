(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require("./dom");

let dinosaurs = [];


const firstDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
	  $.ajax('./db/dinosaurs.json').done((data1) => {
			resolve(data1.dinosaurs1);
	 }).fail((error1) => {
	 	reject(error1);
	 });
  });
};

const secondDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
	  $.ajax('./db/dinosaurs2.json').done((data2) => {
			resolve(data2.dinosaurs2);
	 }).fail((error2) => {
	 	reject(error2);
	 });
  });
};

const thirdDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
	  $.ajax('./db/dinosaurs3.json').done((data3) => {
			resolve(data3.dinosaurs3);
	 }).fail((error3) => {
	 	reject(error3);
	 });
  });
};

const allTheCats = () => {
	return new Promise((resolve, reject) =>{
		$.ajax('./db/cats.json').done((data4) => {
			resolve(data4.cats);
		}).fail((error4) => {
			reject(error4);
		});
	});
};

const dinoGetter = () => {
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then((results) => {
		allTheCats().then((cats) =>{
		results.forEach((result) => {
			result.forEach((dino) => {
				dino.snacks = [];
				dino.catIds.forEach((catId) =>{
					cats.forEach((cat) => {
						if(cat.id === catId){
							dino.snacks.push(cat);
						}
					});
				});
				dinosaurs.push(dino);
			});
	      });
			makeDinos();
		});
		
		console.log("dino", dinosaurs);
		
	}).catch((error) => {
		console.log("error from Promise.all", error);
	});
};

const makeDinos = () => {
	dinosaurs.forEach((dino) => {
		dom(dino);
	});
};


const initializer = () => {
	dinoGetter();
	
};

const getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer, getDinosaurs};



},{"./dom":2}],2:[function(require,module,exports){
"use strict";

let outputDiv = $('#dinosaur');

const buildDomString = (dinosaur) => {
	let domString = "";
	domString += `<div class=${dinosaur.info === 'Carnivore' ? 'card-bad' : 'card-good'}>`;
	domString += 	`<h1> ${dinosaur.type} </h1>`;	
	domString += 	`<h4> ${dinosaur.bio} </h4>`;	
	if (dinosaur.info === 'Carnivore') {
		domString += `<h4>Has some tasty snacks.</h4>`;
	} else {
		domString += `<h4>Has some adorable (debatable) friends.</h4>`;
	}
	domString += `<div class='card-holder'>`;
	dinosaur.snacks.forEach((cat) => {
		domString += `<div class='card'>`;
		domString += `<h5>${cat.name}</h5>`;
		domString += `<div class='card-img'>`;
		domString += `<img src='${cat.imageUrl}''>`;
		domString += `</div>`;
		domString += `<p class='card-description'>${cat.specialSkill}</p>`;
		domString += `</div>`;
	});
	domString += `</div>`;
	domString += `</div>`;

	
	writeToDom(domString);
};

const writeToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = buildDomString;
},{}],3:[function(require,module,exports){
"use strict";

const data = require("./data");

$(document).ready (function(){ 
	data.initializer();
});
},{"./data":1}]},{},[3]);
