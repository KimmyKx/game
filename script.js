const container = document.querySelector('.board');
const start = document.querySelector('.start');
const settings = document.querySelector('.settings');
const scoring = document.querySelector('.scoring');
const cHealth = document.querySelector('.healthNow');
const close = document.querySelector('.close');
const gameOver = document.querySelector('.gameOver');
const retry = document.querySelector('.retry');
const count = document.querySelector('.count');
const second = document.querySelector('.second');
const closeSet = document.querySelector('.closeSet');
const moreSet = document.querySelector('.moreSet');

let score;
let health;
let speed;

let high = 0;
let times = 0;
let counts = 3;
function countDown() {
	if(counts == -1) {
		count.style.fontSize = '0';
		counts = 3;
		times = 0;
		game();
		time();
		reset();
		return reset;
	};
	reset();
	count.style.fontSize = '40px';
	count.style.width = '40px';
		if(counts == 0){
			count.innerHTML = 'GO!';
		} else {
			count.innerHTML = counts;
		}
	counts--;
	setTimeout(countDown, 1000);	
};

function reset() {
	health = 5;
	score = 0;
	speed = 1;
	times = 0;
	cHealth.innerHTML = health;
	scoring.innerHTML = score;
	second.innerHTML = times + 's';
}

function over() {

	if(health < 1) {
		const boxes = [...container.children];
		boxes.map((b) => {
			b.classList.remove('checking');
			container.removeChild(b);
	});
	const end = document.querySelector('.end');
	const endTime = document.querySelector('.end-time');
	const endHigh = document.querySelector('.end-high');
	
	end.innerHTML = score;
	endTime.innerHTML = times + 's';
	if(score > high) {
		high = score;
	}
	endHigh.innerHTML = high;
	gameOver.style.bottom = '0';
	gameOver.style.right = '0';
	gameOver.style.width = 'auto';
	start.style.fontSize = '30px';
	settings.style.fontSize = '30px';
	return true;
	}
}


function time() {
	if(over()) return true;
	times++;
	second.innerHTML = times + 's';
	setTimeout(time, 1000);
}

function game() {

	
	if (over()) return;
	let ran1 = Math.floor(Math.random() * 400 - 100 + 50) + 100;
	let ran2 = Math.floor(Math.random() * 400 - 100 + 50) + 100;
	let click =  false;
	const newBox = document.createElement('div');
	container.appendChild(newBox);
	newBox.classList.add('box');
	newBox.classList.add('checking');
	newBox.style.top = ran1+'px';
	newBox.style.left = ran2+'px';
	newBox.style.animation = 'pop 5s ease-in forwards';

	newBox.onclick = function() {
	score++
	scoring.innerHTML = score;
	container.removeChild(this);
	newBox.classList.remove('checking');
	speed += .2;
	click = true;
	};
	setTimeout(game, 2000 / speed); // bagian loop

	setTimeout(() => {
		if (newBox.classList.contains('checking')) {
		if(click == false) {
			health--;
			cHealth.textContent = health;
		} 
	}
		if (health < 0) {
			health = 5;
			cHealth.innerHTML = health;
			return;
		} 
	}, 5000);
};

// Event listeners
start.addEventListener('click', function() {
	start.style.fontSize = '0px';
	settings.style.fontSize = '0px';
	moreSet.style.width = '0';
	reset();
	countDown();
});

close.addEventListener('click', function() {
	gameOver.style.right = '';
	gameOver.style.bottom = '';
	gameOver.style.width = '0';
	reset();
});

retry.addEventListener('click', function() {
	start.style.fontSize = '0px';
	settings.style.fontSize = '0px';
	gameOver.style.right = '';
	gameOver.style.bottom = '';
	gameOver.style.width = '0';
	reset();
	countDown();
});

settings.addEventListener('click', function() {
	moreSet.style.width = '200px';
	settings.classList.add('active');
});

closeSet.addEventListener('click', function() {
	closeSet.parentElement.style.width = '0px';
	settings.classList.remove('active');
});