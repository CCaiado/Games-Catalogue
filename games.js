'use strict';


(function()
{	
	window.addEventListener("load", main);
}());

//var audio = document.getElementById('hover_container');

var jogos_xbox360 = ["Alone in the Dark","Army of Two","Army of Two the 40th Day","Assassins Creed","Assassins Creed II","Assassins Creed Brotherhood","Assassins Creed Revelations","Assassins Creed III","Batman Arkham Asylum","Batman Arkham City","Battlefield Bad Company","Battlefield Bad Company 2","Battlefield 3","Battlefield 4","Binary Domain","Bionic Commando","Bioshock 2","Bioshock Infinite","Borderlands","Borderlands 2","Borderlands 2 Add On Pack","Borderlands the Pre Sequel","Brink","Bulletstorm","Call of Juarez the Cartel","Castlevania Lords of Shadow","Condemned 2 Bloodshot","Crackdown","Crackdown 2","Crysis 2","Crysis 3","Darks Souls","Dark Void","Darksiders","Darksiders 2","Dead Island","Dead Island Riptide","Dead Rising","Dead Space","Dead Space 2","Dead Space 3","Dead Space Ignition","Dead to Rights Retribution","Deus Ex Human Revolution","Devil May Cry 4","Dishonored","Dragon Age Origins","Dragon Age Origins Awakening","Dragon Age 2","Dragons Dogma","Dynasty Warriors 6","Earth Defence Force 2017","Earth Defence Force Insect Armageddon","Enslaved","F.E.A.R.","F.E.A.R. 2","F.E.A.R. 3","Fable 2","Fallout 3","Fallout 3 Add On 1","Fallout 3 Add On 2","Fallout New Vegas","Far Cry 2","Far Cry 3","Frontlines Fuel of War","Gears of War","Gears of War 2","Gears of War 3","Gears of War Judgment","Halo 3","Halo 3 ODST","Halo Reach","Hitman Blood Money","Halo 4","Just Cause","Kane and Lynch Dead Man","Kane and Lynch Dog Days","LA Noire","Left 4 Dead","Left 4 Dead 2","Lost Planet","Lost Planet 2","Majin and the Forsaken Kingdom","Marvel Ultimate Alliance 2","Mass Effect","Mass Effect 2","Mass Effect 3","Max Payne 3","Metro 2033","Metro Last Light","Mirrors Edge","Need for Speed Prostreet","Painkiller Hell and Damnation","Prey","Prototype","Prototype 2","Quantum Theory","Rage","Red Faction Guerrilla","Red Faction Armageddon","Resident Evil 5","Resident Evil 6","Resident Evil Revelations","Saints Row","Saints Row 2","Saints Row the Third","Samurai Shodown Sen","Silent Hill Homecoming", "Sleeping Dogs", "Sniper Ghost Warrior","Sniper Ghost Warrior 2","Spec Ops The Line","The Last Remnant","Tom Clancys Endwar","Tom Clancys Ghost Recon Advanced Warfighter","Tom Clancys Ghost Recon Advanced Warfighter 2","Tom Clancys Ghost Recon Future Soldier","Tom Clancys Rainbow Six Vegas","Tom Clancys Rainbow Six Vegas 2","Tom Clancys Splinter Cell Double Agent","Tom Clancys Splinter Cell Conviction","Tomb Raider","Too Human","The Witcher 2 Assassins of Kings", "XCOM Enemy Unknown"];

var jogos_xboxone = ["Anthem", "Borderlands 3", "Call of Duty Black Ops III", "Call of Duty WWII", "Destiny", "Destiny 2", "Fallout 4", "Gears of War 4", "Hollow Knight", "Payday 2", "Sunset Overdrive", "The Elder Scrolls Online", "Titanfall", "Titanfall 2", "Yesterday Origins"];
var xboxone_video = ["https://www.youtube.com/embed/DPf-EATqFng?", "https://www.youtube.com/embed/x4o5g_PGkiA"];

var offset_top = [];
var offset_side = [];
var check_hover = true;
var i;
var aux = null;
var flex = "15%";
var img_size = "100%";
var direction = 'left';
var hover = null;
var run = true;
var games_per_line = 5;
var pltf;
var change_music = 0;
var audio1 = null;
var logo = null;
var last_game = null;
var audioId = null;
var videoId = null;

function main(){
	

	pltf = localStorage.getItem("platform");

	if(pltf == "xbox360"){

		document.getElementById("xbox360").style.display = "block";
		document.getElementById("top-header").style.background = "url(img/xbox360controller.jpg) no-repeat 50% 50% / cover ";

		var htmlElements="";
		for(i=0;i<jogos_xbox360.length;i++){
			//htmlElements+='<container class="container" id="container" onclick="playAudio('+i+')"><div class="info">'+jogos_xbox360[i]+'</div><image src="img/'+jogos_xbox360[i]+'.jpg"/></container>';
			htmlElements+='<container class="container" id="container" onclick="playAudio('+i+')"><image class="game" id="game_'+i+'" src="img/'+jogos_xbox360[i]+'.jpg"/></container>';
			//htmlElements+='<container class="container" id="container" onclick="clickHandler(this)"><image src="img/'+jogos_xbox360[i]+'.jpg"/></container>';
			//htmlElements+='<container class="container" id="container" onclick="playAudio('+i+')" onmouseout="outHandler(this)"><image src="img/'+jogos_xbox360[i]+'.jpg"/></container>';
		}
	}

	else if(pltf == "xboxone"){
		document.getElementById("xboxone").style.display = "block";
		document.getElementById("top-header").style.background = "url(img/xboxonecontroller.jpg) no-repeat 50% 50% / cover ";
		
		var htmlElements="";
		for(i=0;i<jogos_xboxone.length;i++){
			//htmlElements+='<container class="container" id="container" onclick="playAudio('+i+')"><div class="info">'+jogos_xboxone[i]+'</div><image src="img/'+jogos_xboxone[i]+'.jpg"/><canvas class="canvas" id="canvas"></canvas></container>';
			//htmlElements+='<container class="container" id="container" onclick="playAudio('+i+')" onmouseover="hoverHandler(this)" onmouseout="outHandler(this)"><image src="img/'+jogos_xboxone[i]+'.jpg"/></container>';
			htmlElements+='<container class="container" id="container" onclick="playAudio('+i+', this)"><image class="game" id="game_'+i+'" src="img/'+jogos_xboxone[i]+'.jpg"/></container>';
		}
	}

	var gallery = document.getElementById("gallery");
	gallery.innerHTML = htmlElements;

	dragElement(document.getElementById("draggable_audio"));
	dragElement(document.getElementById("draggable_video"));
}

function playAudio() {
	change_music = 1;
	var container1 = document.getElementById("draggable_audio");
	var container2 = document.getElementById("draggable_video");

	document.getElementById("current_video").setAttribute("src",xboxone_video[arguments[0]]);

	moveAudioContainer(container1);
	moveVideoContainer(container2);

	document.getElementById("current_playing_controller").style.opacity = "1";
	document.getElementById("draggable_video").style.opacity = "1";

	if(last_game != null){
		//document.getElementById("game_" + last_game).style.opacity = "1";
		//const container = document.getElementsByClassName("container")[last_game];
		const container = document.getElementById("current_playing");
		container.removeChild(container.lastChild);
	}
	last_game = arguments[0];

	if(audio1 != null){
		var current_playing_controller = document.getElementById('current_playing_controller');
		current_playing_controller.removeChild(current_playing_controller.lastChild);

		var current_playing = document.getElementById('current_playing');
		current_playing.removeChild(current_playing.lastChild);

		audio1.pause();
	}

	audio1 = document.createElement('audio');
	audio1.id = 'audio';
	audio1.controls = 'controls';
	audio1.type = 'audio/mp3';
	document.getElementById('current_playing_controller').appendChild(audio1);

	if(pltf == "xbox360"){
		audio1.src = 'music/'+jogos_xbox360[arguments[0]]+'.mp3';	 
		logo = document.createElement("img");
		logo.id = "logo";
		logo.src = "logos/" + jogos_xbox360[arguments[0]] + ".png";
		document.getElementById('current_playing').appendChild(logo); 
		const container = document.getElementById("current_playing");
		container.style.background = "url('wallpaper/"+jogos_xbox360[arguments[0]]+".jpg') no-repeat 50% 50% / cover";
	}
	else if(pltf == "xboxone"){
		audio1.src = 'music/'+jogos_xboxone[arguments[0]]+'.mp3';
		logo = document.createElement("img");
		logo.id = "logo";
		logo.src = 'logos/'+jogos_xboxone[arguments[0]]+'.png';
		document.getElementById('current_playing').appendChild(logo);
		const container = document.getElementById("current_playing");
		container.style.background = "url('wallpaper/"+jogos_xboxone[arguments[0]]+".jpg') no-repeat 50% 50% / cover";
		//clickHandler(arguments[1]);
	}

	audio1.crossOrigin = "anonymous";
	const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // for safari browser
	
	const container = document.getElementById("current_playing");
	//const container = document.getElementsByClassName("container")[arguments[0]];
	
	const canvas = document.createElement("canvas");
	canvas.id = "canvas";
	//const game = document.getElementById("game_" + arguments[0]);
	//game.style.opacity = "0.7";
	container.appendChild(canvas);

	canvas.width = container.offsetWidth;
	canvas.height = container.offsetHeight;

	const ctx = canvas.getContext("2d");
	
	let audioSource = null;
	let analyser = null;
	
	audioSource = audioCtx.createMediaElementSource(audio1); // creates an audio node from the audio source
	analyser = audioCtx.createAnalyser(); // creates an audio node for analysing the audio data for time and frequency
	audioSource.connect(analyser); // connects the audio source to the analyser. Now this analyser can explore and analyse the audio data for time and frequency
	analyser.connect(audioCtx.destination); // connects the analyser to the destination. This is the speakers
	analyser.fftSize = 128; // controls the size of the FFT. The FFT is a fast fourier transform. Basically the number of sound samples. Will be used to draw bars in the canvas
	const bufferLength = analyser.frequencyBinCount; // the number of data values that dictate the number of bars in the canvas. Always exactly one half of the fft size
	const dataArray = new Uint8Array(bufferLength); // coverting to unsigned 8-bit integer array format because that's the format we need
	
	let x = 0; // used to draw the bars one after another. This will get increased by the width of one bar
	
	function animate() {
		if(change_music == 1){
			ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas
			return 0;
		}
		x = 0;
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		analyser.getByteFrequencyData(dataArray); // copies the frequency data into the dataArray in place. Each item contains a number between 0 and 255
		drawVisualizer({ bufferLength, dataArray, barWidth });
		requestAnimationFrame(animate); // calls the animate function again. This method is built in
	}
	
	var WIDTH = canvas.width;
	var HEIGHT = canvas.height;

	var barWidth = (WIDTH / bufferLength) * 2.5;

	const drawVisualizer = ({ bufferLength, dataArray, barWidth }) => {
		let barHeight;
		for (var i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i]/2.5;
		
		var r = barHeight + (25 * (i/bufferLength));
		var g = 250 * (i/bufferLength);
		var b = 50;

		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		//ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
		var cornerRadius = 8;
		ctx.lineJoin = "round";
		ctx.lineWidth = cornerRadius;
		ctx.strokeRect(x+(cornerRadius/2), HEIGHT - barHeight+(cornerRadius/2), barWidth-cornerRadius, barHeight);
		ctx.fillRect(x+(cornerRadius/2), HEIGHT - barHeight+(cornerRadius/2), barWidth-cornerRadius, barHeight);

		x += barWidth + 1;
		}
	};
	
	change_music = 0;
	animate();
}



function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


function moveAudioContainer(elem) {
	var container = elem;
	var pos = -220;
	clearInterval(audioId);
	audioId = setInterval(frame, 1);
	function frame() {
		if (pos >= 50) {
			clearInterval(audioId);
		} else {
			pos+=4;
			container.style.right = pos + 'px';
		}
	}
}

function moveVideoContainer(elem) {
	var container = elem;
	var pos = -240;

	clearInterval(videoId);
	videoId = setInterval(frame, 1);
	function frame() {
		if (pos >= 40) {
			clearInterval(videoId);
		} else {
			pos+=4;
			container.style.right = pos + 'px';
		}
	}
}



async function clickHandler(element){
	if(element.className == "container"){
		console.log(element);
		var container = document.getElementsByClassName("container");
		
		/*var num = null;
		var line = 0;
		var container_line = 0;
		direction = 'left';

		for(i = 0; i < container.length; i++){
			if(num == null && i != 0 && i % games_per_line == 0){
				line += 1;
			}
			if(container[i].getElementsByTagName('img')[0].getAttribute('src') == element.getElementsByTagName('img')[0].getAttribute('src')){
				num = i;
			}
		}

		var hover_id = Math.floor(Math.random() * 1000);
		hover = hover_id;

		//await sleep(1000);

		if(hover == hover_id && check_hover == true){

			for(i = 0; i < container.length; i++){
				offset_top[i] = container[i].offsetTop;
				offset_side[i] = container[i].offsetLeft;
			}
			//audio.play();

			for(i = 0; i < container.length; i++){
				if(i != 0 && i % games_per_line == 0){
					container_line += 1;
				}
				if(container_line <= line){
					if(i < num-(games_per_line*(line-container_line))){
						container[i].style.animation = 'moveLeft 1s forwards';}
					else if(i > num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveRight 1s forwards';
					else if(i == num)
						var ch;//container[i].style.animation = 'moveSelectedUp 1s forwards';
					else
						container[i].style.animation = 'moveUp 1s forwards';
				}
				else if(container_line > line)
					if(i < num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveLeft 1s forwards';
					else if(i > num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveRight 1s forwards';
					else
						container[i].style.animation = 'moveDown 1s forwards';
			}
			*/
			for(i=0;i<jogos_xboxone.length;i++){
				console.log(element.getElementsByTagName('img')[0].getAttribute('src'));
				if(element.getElementsByTagName('img')[0].getAttribute('src') == "img/"+jogos_xboxone[i]+".jpg"){
					var image = element.getElementsByTagName('img')[0];
					var save_height = element.getBoundingClientRect().height;

					image.setAttribute('src',"img/"+jogos_xboxone[i]+".gif");
					image.style.width = "auto";
					image.style.position = "absolute";
					image.style.top = "-9999px";
					image.style.bottom = "-9999px";
					image.style.left = "-9999px";
					image.style.right = "-9999px";
					image.style.margin = "auto";
					element.style.height = save_height + "px";
					break;
				}
			}
	}
}


function buttonHandler(element){
	if(element.id == "flex_type"){

		if(flex == "100%"){
			flex = "15%";
			img_size = "100%";
		}
		else{
			flex = "100%";
			img_size = "15%";
		}

		for(i=0;i<jogos_xboxone.length;i++){
			var container = document.getElementById("gallery").getElementsByClassName("container")[i];
			var image = document.getElementById("gallery").getElementsByClassName("container")[i].getElementsByTagName('img')[0];

			container.style.flex=flex;
			image.style.width=img_size;
			image.style.height=img_size;
		}
	}
	else if(element.id == "return"){
		window.location.href="index.html";
	}
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	
	elmnt.onmousedown = dragMouseDown;
  
	function dragMouseDown(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // get the mouse cursor position at startup:
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  document.onmouseup = closeDragElement;
	  // call a function whenever the cursor moves:
	  document.onmousemove = elementDrag;
	}
  
	function elementDrag(e) {
	  e = e || window.event;
	  e.preventDefault();
	  // calculate the new cursor position:
	  pos1 = pos3 - e.clientX;
	  pos2 = pos4 - e.clientY;
	  pos3 = e.clientX;
	  pos4 = e.clientY;
	  // set the element's new position:
	  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
  
	function closeDragElement() {
	  /* stop moving when mouse button is released:*/
	  document.onmouseup = null;
	  document.onmousemove = null;
	}
  }

/*
async function hoverHandler(element){
	if(element.className == "container"){
		var container = document.getElementsByClassName("container");
		
		var num = null;
		var line = 0;
		var container_line = 0;
		direction = 'left';

		for(i = 0; i < container.length; i++){
			if(num == null && i != 0 && i % games_per_line == 0){
				line += 1;
			}
			if(container[i].getElementsByTagName('img')[0].getAttribute('src') == element.getElementsByTagName('img')[0].getAttribute('src')){
				num = i;
			}
		}

		var hover_id = Math.floor(Math.random() * 1000);
		hover = hover_id;

		await sleep(1000);

		if(hover == hover_id && check_hover == true){

			for(i = 0; i < container.length; i++){
				offset_top[i] = container[i].offsetTop;
				offset_side[i] = container[i].offsetLeft;
			}
			//audio.play();

			for(i = 0; i < container.length; i++){
				if(i != 0 && i % games_per_line == 0){
					container_line += 1;
				}
				if(container_line <= line){
					if(i < num-(games_per_line*(line-container_line))){
						container[i].style.animation = 'moveLeft 1s forwards';}
					else if(i > num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveRight 1s forwards';
					else if(i == num)
						var ch;//container[i].style.animation = 'moveSelectedUp 1s forwards';
					else
						container[i].style.animation = 'moveUp 1s forwards';
				}
				else if(container_line > line)
					if(i < num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveLeft 1s forwards';
					else if(i > num-(games_per_line*(line-container_line)))
						container[i].style.animation = 'moveRight 1s forwards';
					else
						container[i].style.animation = 'moveDown 1s forwards';
			}

			/*for(i=0;i<jogos_xboxone.length;i++){
				console.log(element.getElementsByTagName('img')[0].getAttribute('src'));
				if(element.getElementsByTagName('img')[0].getAttribute('src') == "img/"+jogos_xboxone[i]+".jpg"){
					var image = element.getElementsByTagName('img')[0];
					var save_height = element.getBoundingClientRect().height;

					image.setAttribute('src',"img/"+jogos_xboxone[i]+".gif");
					image.style.width = "auto";
					image.style.position = "absolute";
					image.style.top = "-9999px";
					image.style.bottom = "-9999px";
					image.style.left = "-9999px";
					image.style.right = "-9999px";
					image.style.margin = "auto";
					element.style.height = save_height + "px";
					break;
				}
			}
		}
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function outHandler(element){
	if(element.className == "container"){
		var container = document.getElementsByClassName("container");
		var num;
		var container_line = 0;
		var line = 0;
		var backUp = true;
		var backDown = true;
		var backLeft = true;
		var backRight = true;
		hover = null;

		audio.pause();
		audio.currentTime = 0;

		if(check_hover){
			check_hover = false;
			for(i = 0; i < container.length; i++){
				if(i != 0 && i % games_per_line == 0){
					line += 1;
				}
				if(container[i].getElementsByTagName('img')[0].getAttribute('src') == element.getElementsByTagName('img')[0].getAttribute('src')){
					num = i;
					break;
				}
			}

			for(i = 0; i < container.length; i++){
				if(i != 0 && i % games_per_line == 0){
					container_line += 1;
				}

				if(container_line <= line){
					if(i < num-(games_per_line*(line-container_line))){
						if(backLeft){
							document.documentElement.style.setProperty('--end-3',-(offset_side[i] - container[i].offsetLeft) + "px");
							backLeft = false;
						}
						container[i].style.animation = 'moveBackLeft 0.5s forwards';
					}
					else if(i > num-(games_per_line*(line-container_line))){
						if(backRight){
							document.documentElement.style.setProperty('--end-4',-(offset_side[i] - container[i].offsetLeft) + "px");
							backRight = false;
						}
						container[i].style.animation = 'moveBackRight 0.5s forwards';
					}
					else if(i == num)
						var ch; //container[i].style.animation = 'moveSelectedDown 1s forwards';
					else{
						if(backUp){
							document.documentElement.style.setProperty('--end-1',-(offset_top[i] - container[i].offsetTop) + "px");
							backUp = false;
						}
						container[i].style.animation = 'moveBackUp 0.5s forwards';
					}
				}
				else if(container_line > line){
					if(i < num-(games_per_line*(line-container_line))){
						if(backLeft){
							document.documentElement.style.setProperty('--end-3',-(offset_side[i] - container[i].offsetLeft) + "px");
							backLeft = false;
						}
						container[i].style.animation = 'moveBackLeft 0.5s forwards';
					}
					else if(i > num-(games_per_line*(line-container_line))){
						if(backRight){
							document.documentElement.style.setProperty('--end-4',-(offset_side[i] - container[i].offsetLeft) + "px");
							backRight = false;
						}
						container[i].style.animation = 'moveBackRight 0.5s forwards';
					}
					else{
						if(backDown){
							document.documentElement.style.setProperty('--end-2',-(offset_top[i] - container[i].offsetTop) + "px");
							backDown = false;
						}
						container[i].style.animation = 'moveBackDown 0.5s forwards';
					}
				}
			}
			/*for(i=0;i<jogos_xboxone.length;i++){
				if(element.getElementsByTagName('img')[0].getAttribute('src') == "img/"+jogos_xboxone[i]+".gif"){
					var image = element.getElementsByTagName('img')[0];
					image.setAttribute('src',"img/"+jogos_xboxone[i]+".jpg");
					break;
				}
			}
			await sleep(500);
			check_hover = true;
		}
	}
}
*/
