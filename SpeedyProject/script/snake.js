// Удаление кнопки
var buttonDel = document.getElementById('btn');
buttonDel.addEventListener('click', function() {
	this.remove()
});

function startGame () {
	// Создания div для кнопки 'again'
	var div = document.createElement('div');
	div.id = 'start-again';
	document.body.appendChild(div);

	// Создание и вложение в div кнопки 'again'
	var btn = document.createElement('input');
	btn.id = 'btn2';
	btn.type = 'button';
	btn.value = 'START AGAIN';
	div.appendChild(btn);

	// Перезагрузка страницы по нажатию 'again'
	$("#btn2").click(function(){
		location.reload();
	});

	// 1) Создание поля.
	let field = document.createElement('div');
	document.body.appendChild(field);
	field.classList.add('field');

	// Отключение скролла страницы стрелками.
	var NAVIGATION = [37, 38, 39, 40]
	document.body.addEventListener("keydown", function(event) {
		if (-1 != NAVIGATION.indexOf(event.keyCode))
			event.preventDefault();
	})
	//

	// 2) Разбитие поля на ячейки.
	for (let i = 1; i < 101; i++) {
		let excel = document.createElement('div');
		field.appendChild(excel);
		excel.classList.add('excel');
	}

	// 3) Присвоение координатов каждой ячейке. X and Y.
	let excel = document.getElementsByClassName('excel');
	/*excel[0].setAttribute('posX', 'test');
	excel[0].setAttribute('posY', 'test');*/
	let x = 1,
		y = 10;

	for (let i = 0; i < excel.length; i++) {
		if (x > 10) {
			x = 1;
			y--;
		}
		excel[i].setAttribute('posX', x);
		excel[i].setAttribute('posY', y);
		x++;
	}

	// 4) Создание змеи.
	function generateSnake () {
		let posX = Math.round(Math.random() * (10 - 3) + 3);
		let posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	// Создание змейки
	let coordinates = generateSnake();
	let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + 
		coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + 
		coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + 
		coordinates[1] + '"]')];

	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}

	snakeBody[0].classList.add('head');


	// 5) Создание мыши.
	let mouse;

	function createMouse () {
		function generateMouse () {
			let posX = Math.round(Math.random() * (10 - 3) + 3);
			let posY = Math.round(Math.random() * (10 - 1) + 1);
			return [posX, posY];
		}

		let mouseCoordinates = generateMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + 
		mouseCoordinates[1] + '"]');

		while (mouse.classList.contains('snakeBody')) {
			let mouseCoordinates = generateMouse();
			mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + 
			mouseCoordinates[1] + '"]');
		}

		mouse.classList.add('mouse');
	}

	createMouse();

	let direction = 'right';
	let steps = false;

	// 10) Количество очков.
	let result = document.createElement('div');
	result.id = "score";
	document.body.appendChild(result);
	result.style.cssText = `
		margin-top: 40px;
		font-size: 30px;
		text-align: center;
		background-color: #000;
		color: #fff;
		width: 20%;
		margin: auto;
		border-radius: 15px;
		padding: 5px 0;
	`;

	let score = 0;
	result.innerHTML = `Your score: ${score}`;

	// 6) Учим змею двигаться вправо.
	function move () {
		let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
		snakeBody[0].classList.remove('head');
		snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
		snakeBody.pop();

		if (direction == 'right') {
			if (snakeCoordinates[0] < 10) {
				snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + 
				snakeCoordinates[1] + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + 
				snakeCoordinates[1] + '"]'));
			}
		} else if (direction == 'left') {
			if (snakeCoordinates[0] > 1) {
				snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + 
				snakeCoordinates[1] + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + 
				snakeCoordinates[1] + '"]'));
			}
		} else if (direction == 'up') {
			if (snakeCoordinates[1] < 10) {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
			}
		} else if (direction == 'down') {
			if (snakeCoordinates[1] > 1) {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + 
				(snakeCoordinates[1] - 1) + '"]'));
			} else {
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
			}
		}

		// 8) Учим змейку кушать мышей / яблоки.
		if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
			mouse.classList.remove('mouse');
			let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
			let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
			snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
			createMouse();
			score++;
			result.innerHTML = `Your score: ${score}`;
		}

		// 9) Конец игры.
		if (snakeBody[0].classList.contains('snakeBody')) {
			setTimeout(() => {
				alert('Game over. \n' + `Total Score: ${score}`);
			}, 200);
			clearInterval(interval);
			snakeBody[0].style.background = 'black';
			snakeBody[0].style.backgroundSize = 'cover';
			field.style.cssText = `
				box-shadow: 0 0 15px 15px rgba(235,0,31,0.7);
			`;
		}

		snakeBody[0].classList.add('head');
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].classList.add('snakeBody');
		}

		steps = true;
	}

	let interval = setInterval(move, 190);

	// 7) Учим мышь двигаться во всех направлениях.
	window.addEventListener('keydown', function (e) {
		if (steps == true) {
			if (e.keyCode == 37 && direction != 'right') {
				direction = 'left';
				steps = false;
			} else if (e.keyCode == 38 && direction != 'down') {
				direction = 'up';
				steps = false;
			} else if (e.keyCode == 39 && direction != 'left') {
				direction = 'right';
				steps = false;
			} else if (e.keyCode == 40 && direction != 'up') {
				direction = 'down';
				steps = false;
			}
		}
	});
};