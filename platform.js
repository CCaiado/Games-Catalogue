"use strict";

(function()
{	
	window.addEventListener("load", main);
}());

var audio = document.getElementById('audio');

function main(){
}

function playAudio() {
	document.getElementById("audio").play();
}

function buttonHandler(element){
	console.log(element);
	if(element.className == "wallpaper"){
		if(element.getAttribute('src') == "img/xbox360w.jpg"){
			console.log("xbox 360");
			localStorage.setItem("platform", "xbox360");
			window.location.href="games.html";
		}
		else if(element.getAttribute('src') == "img/xboxonew.jpg"){
			console.log("xbox one");
			localStorage.setItem("platform", "xboxone");
			window.location.href="games.html";

		}
	}
	else console.log(element.className);
}

function hoverHandler(element){
	//console.log(element);
	if(element.className == "wallpaper"){

		audio.play();

		var logo = document.getElementsByClassName('logo');
		if(element.getAttribute('src') == "img/xbox360w.jpg"){
			logo[0].style.animation="fadeIn 1s linear";
			for(var i = 0; i < logo.length; i++){
				if(i!=0) logo[i].style.display = 'none';
			}
			document.getElementById('xbox360').style.display = "block";
			logo[0].style.opacity = '1';
		}
		else if(element.getAttribute('src') == "img/xboxonew.jpg"){
			logo[1].style.animation="fadeIn 1s linear";
			for(var i = 0; i < logo.length; i++){
				if(i!=1) logo[i].style.display = 'none';
			}
			logo[1].style.opacity = '1';
			document.getElementById('xboxone').style.display = "block";
		}
		else if(element.getAttribute('src') == "img/ps3w.jpg"){
			logo[2].style.animation="fadeIn 1s linear";
			for(var i = 0; i < logo.length; i++){
				if(i!=2) logo[i].style.display = 'none';
			}
			logo[2].style.opacity = '1';
			document.getElementById('ps3').style.display = "block";
		}
		else if(element.getAttribute('src') == "img/ps4w.jpg"){
			logo[3].style.animation="fadeIn 1s linear";
			for(var i = 0; i < logo.length; i++){
				if(i!=3) logo[i].style.display = 'none';
			}
			logo[3].style.opacity = '1';
			document.getElementById('ps4').style.display = "block";
		}
	}
	else console.log(element.className);
}

function outHandler(element){
	//console.log(element);
	if(element.className == "wallpaper"){

		audio.pause();
		audio.currentTime = 0;

		var logo = document.getElementsByClassName('logo');
		if(element.getAttribute('src') == 'img/xbox360w.jpg'){
			logo[0].style.animation="fadeOut 0.5s linear";
			logo[0].style.opacity = '0';
		}
		else if(element.getAttribute('src') == 'img/xboxonew.jpg'){
			logo[1].style.animation="fadeOut 0.5s linear";
			logo[1].style.opacity = '0';
		}
		else if(element.getAttribute('src') == 'img/ps3w.jpg'){
			logo[2].style.animation="fadeOut 0.5s linear";
			logo[2].style.opacity = '0';
		}
		else if(element.getAttribute('src') == 'img/ps4w.jpg'){
			logo[3].style.animation="fadeOut 0.5s linear";
			logo[3].style.opacity = '0';
		}
		else console.log(element.getAttribute('src'));
	}
	else console.log(element.className);
}

