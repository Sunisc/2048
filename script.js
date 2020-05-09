let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let sizeInput = document.getElementById("size");
let changeSize = document.getElementById("change-size");
let restart = document.getElementById("restart");
let scoreLabel = document.getElementById("score");

let score = 0;
let size = 4;
let width = canvas.width / size - 6;

let cells = [];
let fontSize;
let loss = false;

startGame();

changeSize.onclick = function() {
  if (sizeInput.value >= 2 && sizeInput.value <= 5) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    clearCanvas();
    startGame();
  }
};

restart.onclick = function() {
  location.reload();
};

function clearCanvas() {
  context.clearRect(0, 0, 600, 600);
}

function startGame() {
  makeCells();
  drawAllCells();
  addNewCell();
  addNewCell();
}

function cell(row, col) {
  this.value = 0;
  this.x = col * width + 5 * (col + 1);
  this.y = row * width + 5 * (row + 1);
}

function makeCells() {
  for (let i = 0; i < size; i++) {
    cells[i] = [];
    for (let j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  context.beginPath();
  context.rect(cell.x, cell.y, width, width);
  switch (cell.value) {
    case 0:
      context.fillStyle = "#A9A9A9";
      break;
    case 2:
      context.fillStyle = "#D2691E";
      break;
    case 4:
      context.fillStyle = "#FF7F50";
      break;
    case 8:
      context.fillStyle = "#ffbf00";
      break;
    case 16:
      context.fillStyle = "#bfff00";
      break;
    case 32:
      context.fillStyle = "#40ff00";
      break;
    case 64:
      context.fillStyle = "#00bfff";
      break;
    case 128:
      context.fillStyle = "#FF7F50";
      break;
    case 256:
      context.fillStyle = "#0040ff";
      break;
    case 512:
      context.fillStyle = "#ff0080";
      break;
    case 1024:
      context.fillStyle = "#D2691E";
      break;
    case 2048:
      document.getElementById("status").innerHTML = "You won!";
      context.fillStyle = "#FF7F50";
      break;
    case 4096:
      context.fillStyle = "#ffbf00";
      break;
    default:
      context.fillStyle = "#ff0080";
  }
  context.fill();
  if (cell.value) {
    fontSize = width / 1.5;
    context.font = fontSize + "px Times New Roman";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(
      cell.value,
      cell.x + width / 2,
      cell.y + width / 2 + width / 7
    );
  }
}

function drawAllCells() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function addNewCell() {
  let empty = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        empty++;
      }
    }
  }

  if (!empty) {
    endGame();
    return;
  }

  while (true) {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    if (!cells[row][col].value) {
      cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return;
    }
  }
}

document.onkeydown = function(event) {
  if (!loss) {
    if (event.keyCode === 38) {
      moveUp();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 40) {
      moveDown();
    } else if (event.keyCode === 37) {
      moveLeft();
    }
    scoreLabel.innerHTML = "Score : " + score;
  }
};

function moveUp() {
  let i, j, row;
  for (j = 0; j < size; j++) {
    for (i = 1; i < size; i++) {
      if (cells[i][j].value) {
        row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score += cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNewCell();
}

function moveRight() {
  let i, j;
  let col;
  for (i = 0; i < size; i++) {
    for (j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        col = j;
        while (col + 1 < size) {
          if (!cells[i][col + 1].value) {
            cells[i][col + 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col++;
          } else if (cells[i][col].value == cells[i][col + 1].value) {
            cells[i][col + 1].value *= 2;
            score += cells[i][col + 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNewCell();
}

function moveDown() {
  let i, j, row;
  for (j = 0; j < size; j++) {
    for (i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score += cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNewCell();
}

function moveLeft() {
  let i, j;
  let col;
  for (i = 0; i < size; i++) {
    for (j = 1; j < size; j++) {
      if (cells[i][j].value) {
        col = j;
        while (col - 1 >= 0) {
          if (!cells[i][col - 1].value) {
            cells[i][col - 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col--;
          } else if (cells[i][col].value == cells[i][col - 1].value) {
            cells[i][col - 1].value *= 2;
            score += cells[i][col - 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  addNewCell();
}

function endGame() {
  canvas.style.opacity = ".5";
  loss = true;
  document.getElementById("status").innerHTML =
    "Game Over. Press Restart to try again!";
}
