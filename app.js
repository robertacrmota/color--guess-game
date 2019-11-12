const LEVEL_EASY = 0;
const LEVEL_HARD = 1;
var solColor;
var guessColors;
var gameLvl;
var guessRectColors = document.querySelectorAll(".rect-RGB");
var headerBgColor = getComputedStyle(document.querySelector("#header")).backgroundColor;
var bgColor = getComputedStyle(document.querySelector("body")).backgroundColor;

init();


// ----------------------------------------------------------------
//						  HELPER FUNCTIONS
// ----------------------------------------------------------------

function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);

  return {R: r, G: g, B: b};
}

function init() {
	gameLvl = Number(document.querySelector("input[type='radio']:checked").value);			

	guessRectColors.forEach((rect) => {
			rect.classList.remove("disabled");
	});

	guessColors = [];

	var nbGuess = (gameLvl === LEVEL_EASY) ? 3 : 6;
	for(var i = 0; i < nbGuess; i++) {
		var c = getRandomColor();
		guessColors.push(c);
		guessRectColors[i].style.backgroundColor = `rgb(${c.R}, ${c.G}, ${c.B})`;
	}

	solColor = guessColors[getRandomInt(0, nbGuess)];
	document.getElementById("header-R").textContent = solColor.R;
	document.getElementById("header-G").textContent = solColor.G;
	document.getElementById("header-B").textContent = solColor.B;		

	document.querySelector("#header").style.backgroundColor = headerBgColor;
	document.querySelector("#game_area > .row:nth-child(2)").style.display = (gameLvl === LEVEL_EASY) ? "none" : "flex";
	document.querySelector("#btn-reset").textContent = "New Colors";	
	document.querySelector("#txt-status").textContent = "Try Again!";
	document.querySelector("#txt-status").style.visibility = "hidden";
}

function terminate() {
	document.querySelector("#btn-reset").textContent = "Play Again?";
	document.querySelector("#txt-status").textContent = "Correct!";

	var c = `rgb(${solColor.R}, ${solColor.G}, ${solColor.B})`;
	document.querySelector("#header").style.backgroundColor = c;
	document.querySelector("#header").classList.add("gameOver");

	var guessRectColors = document.querySelectorAll(".rect-RGB");
	guessRectColors.forEach((rect) => {
								rect.style.backgroundColor = c;
								rect.classList.remove("disabled");							
								rect.classList.add("gameOver");
	});
}

// ----------------------------------------------------------------
//						  EVENT LISTENERS
// ----------------------------------------------------------------

document.querySelector("#btn-reset").addEventListener("click",()=> {
		init();
});

document.querySelectorAll("input[type='radio']").forEach((rd) => {
	rd.addEventListener("change", () => {
		init();
	});
});

document.querySelectorAll(".rect-RGB").forEach((rect) => {
	rect.addEventListener("click", (evt) => {
		var isDisabled = Array.from(evt.srcElement.classList)
							.reduce((is, currClass) => {
									is |= (currClass === "disabled");
									return is;
							}, false);

		if(isDisabled) return;

		var correctColor = `rgb(${solColor.R}, ${solColor.G}, ${solColor.B})`
		var guessColor = evt.srcElement.style.backgroundColor;;

		if (guessColor === correctColor) {
			terminate();
		}
		else {
			document.querySelector("#txt-status").style.visibility = "visible";
			evt.srcElement.style.backgroundColor = bgColor;
			evt.srcElement.classList.add("disabled");
		}
	});
});