const audio1 = document.querySelector('.audiosrc1');
const audio2 = document.querySelector('.audiosrc2');
const audio3 = document.querySelector('.audiosrc3');
const gameover = document.querySelector('.gameover');
const pewpew = document.querySelector('.swoosh');
const groan = document.querySelector('.deflate');
const youwin = document.querySelector('.youwin');
const scoreBoard = document.querySelector('.score');
const eating = document.querySelector('.grazing');
const grunt = document.querySelector('.grunt');

const secondsLeft = document.querySelector('.secondsLeft');
let lastHole;
let min = 600;
let max = 1400;
let interval;
let timeUp = false;
//let time = 15;
let score = 0;
let shot;
let time = 15;

function randomNum() {
	let num = Math.random() * 3;
	console.log(num);
	return num;
}
const holes = document.querySelectorAll('.hole');
const game = document.querySelector('.game');
const dynos = document.querySelectorAll('.dyno');
game.addEventListener('click', () => {
	pewpew.currentTime = 0;
	pewpew.play();
	pewpew.volume = 0.5;
});
dynos.forEach((dyno) =>
	dyno.addEventListener('click', (e) => {
		console.log(e);
		if (e.isTrusted) {
			score++;
			pewpew.pause();
			grunt.currentTime = 0;
			grunt.play();

			displayScore();
		}
	})
);

function Beginner() {
	min = 600;
	max = 1400;
}
function Intermediate() {
	min = 400;
	max = 1200;
}
function Advanced() {
	min = 200;
	max = 1000;
}

function randomTime(min, max) {
	const randotime = Math.round(Math.random() * (max - min) + min);
	return randotime;
}

function displayScore() {
	scoreBoard.innerHTML = `Score ${score}`;
}

function randomHole(holes) {
	const index = Math.floor(Math.random() * holes.length);
	const hole = holes[index];
	if (hole === lastHole) {
		return randomHole(holes);
	}

	lastHole = hole;
	return hole;
}

function peep() {
	const time = randomTime(min, max);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (!timeUp) peep();
	}, time);
}
function displayTime(time) {
	secondsLeft.innerHTML = `${time} Seconds Left`;
}

function timer() {
	interval = setInterval(() => {
		time--;
		secondsLeft.innerHTML = `${time} Seconds Left`;
		if (time <= 0) {
			timeUp = true;
			clearInterval(interval);
			if (score >= 10 && timeUp) {
				secondsLeft.innerHTML = 'Game Over You Win!!';
				youwin.play();
			} else {
				secondsLeft.innerHTML = 'Game Over You Lose!!';
				gameover.play();
			}
		}
	}, 1000);
}

function startGame() {
	timeUp = false;
	clearInterval(interval);

	audio1.pause();
	audio2.pause();
	audio3.pause();
	score = 0;
	displayScore();
	time = 15;
	let num = randomNum();
	holes.forEach((hole) => hole.classList.remove('up'));

	if (num <= 1) {
		audio1.currentTime = 0;
		audio1.play();
		audio1.volume = 0.5;
	} else if (num <= 2 && num > 1) {
		audio2.currentTime = 0;
		audio2.play();
		audio2.volume = 0.5;
	} else {
		audio3.currentTime = 0;
		audio3.play();
		audio3.volume = 0.5;
	}
	eating.currentTime = 0;
	eating.play();
	eating.volume = 0.5;

	timer();
	secondsLeft.innerHTML = `${time} Seconds Left`;
	peep();
	setTimeout(() => {
		timeUp = true;
		audio1.pause();
		audio2.pause();
		audio3.pause();
	}, 15000);
}
