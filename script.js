'use strict';
const table = document.createElement('table');
const win = new Audio('sound/win.mp3');
let numArr = [];
let rows;
let cols;
let markup = '';
let randomIndex = 0;
let nextNumber = document.querySelector('.next-number');
function resetGame() {
  table.innerHTML = '';
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

  document.body.appendChild(table);
  table.style.marginTop = 15 + 'px';
}

let num = 0;
function cellClicked(ev) {
  if (Number(ev.innerHTML) !== num + 1) return;
  nextNumber.innerHTML = `Next number:<br><span class="number">${
    num + 2
  }</span>`;
  startTimer();

  ev.classList.add('bg-color');
  num++;

  if (num === rows * cols) {
    num = 0;
    nextNumber.innerHTML = `VERY GOOD! 🥇`;
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
