'use strict';
const messages = [
  'VERY GOOD 🥇',
  'EXCELLENT 🏆 ',
  'AMAZING 👋',
  'WELL DONE 🙂',
];
const table = document.createElement('table');
const mainDiv = document.createElement('div');
mainDiv.classList.add(...['w-75', 'm-auto', 'text-center']);
const win = new Audio('sound/win.mp3');
let numArr = [];
let rows;
let cols;
let markup = '';
let randomIndex = 0;
let nextNumber = document.querySelector('.next-number');
let letter = document.querySelectorAll('.l');
for (let key of letter) {
  key.style.color = getRandomColor();
}

function resetGame() {
  nextNumber.style.backgroundColor = 'lightcoral';
  nextNumber.style.color = 'black';
  nextNumber.innerHTML = 'GOOD LUCK';
  timer.innerHTML = `  GAME TIME <br />
  00.000`;
  timer.style.backgroundColor = '#66133133';
  timer.style.color = 'black';
  table.innerHTML = '';
  for (let key of letter) {
    key.style.color = getRandomColor();
  }

  numArr = [];
  rows;
  cols;
  markup = '';
  randomIndex = 0;
  num = 0;
  startGame();
}
function startGame() {
  getArr();
  createBord();
}
function getArr() {
  rows = Number(prompt('Choose number of rows'));
  cols = Number(prompt('Choose number of cols'));
  for (let i = 1; i < cols * rows + 1; i++) {
    numArr.push(i);
  }
}
function createBord() {
  for (let i = 0; i < rows; i++) {
    markup += '<tr >';
    for (let j = 0; j < cols; j++) {
      randomIndex = Math.floor(Math.random() * numArr.length);
      markup += `<td onclick="cellClicked(this)">${numArr[randomIndex]}</td>`;

      numArr.splice(randomIndex, 1); // removed used value;
    } // next col;
    markup += '</tr>';
  } // next row;

  table.innerHTML = markup;
  document.body.appendChild(mainDiv);
  mainDiv.appendChild(table);
  table.classList.add(...['mb-5', 'mt-5']);
}

let num = 0;
function cellClicked(ev) {
  if (Number(ev.innerHTML) !== num + 1) return;
  nextNumber.innerHTML = `Next number:<br><span class="number">${
    num + 2
  }</span>`;
  startTimer();

  ev.classList.add(...['bg-color', 'text-muted']);

  num++;

  if (num === rows * cols) {
    num = 0;

    let tempMessage = messages[Math.floor(Math.random() * messages.length)];
    nextNumber.innerHTML = tempMessage;
    nextNumber.style.color = getRandomColor();
    nextNumber.style.backgroundColor = 'black';
    timer.style.backgroundColor = 'black';
    timer.style.color = 'white';

    win.play();
    stopTimer();
  }
}
const timer = document.getElementById('stop-watch');
const div = document.querySelector('.next-number');
const row = document.querySelector('.row');
row.appendChild(div);
row.appendChild(timer);
document.body.appendChild(row);

var mic = 0;
var sec = 0;
var stopTime = true;

function startTimer() {
  if (stopTime == true) {
    stopTime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stopTime == false) {
    stopTime = true;
  }
}

function timerCycle() {
  if (stopTime == false) {
    mic = parseInt(mic);
    sec = parseInt(sec);
    sec = sec + 1;

    if (sec === 99) {
      sec = sec + 1;
      mic = mic + 1;
      sec = 0;
    }

    timer.innerHTML = `GAME TIME <br />
    ${mic}:${sec} `;
    setTimeout('timerCycle()', 10);
  }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
