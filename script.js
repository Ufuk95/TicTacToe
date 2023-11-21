let fields = [null, null, null, null, null, null, null, null, null];

let currentPlayer = "circle";

function init() {
  render();
}

function render() {
  const contentDiv = document.getElementById("content");
  let tableHtml = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHtml += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const symbol =
        fields[index] === "circle"
          ? circlePlayer(index)
          : fields[index] === "cross"
          ? crossPlayer(index)
          : "";
      tableHtml += `<td onclick="cellClicked(${index})">${symbol}</td>`;
    }
    tableHtml += "</tr>";
  }

  tableHtml += "</table>";
  contentDiv.innerHTML = tableHtml;
}

function cellClicked(index) {
  const clickedCell = document.getElementsByTagName("td")[index];

  // Überprüfe, ob das Spiel bereits vorbei ist
  if (isGameFinished()) {
    return;
  }

  if (fields[index] === null) {
    fields[index] = currentPlayer;

    const symbol =
      currentPlayer === "circle" ? circlePlayer(index) : crossPlayer(index);

    clickedCell.innerHTML = symbol;
    clickedCell.removeAttribute("onclick");

    if (!isGameFinished()) {
      currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
      render();
    }
  }
}

function circlePlayer(index) {
  return (
    `<div id="circle${index}">` +
    '<svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">' +
    `<circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="5" fill="transparent" id="circleAnimation${index}">` +
    '<animate attributeName="r" from="0" to="30" dur="0.5s" fill="freeze" />' +
    "</circle>" +
    "</svg>" +
    "</div>"
  );
}

function crossPlayer(index) {
  return (
    `<div id="cross${index}">` +
    '<svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">' +
    `<line x1="5" y1="5" x2="65" y2="65" stroke="#FFC000" stroke-width="5" id="crossAnimation1${index}">` +
    '<animate attributeName="x2" from="5" to="65" dur="0.5s" fill="freeze" />' +
    "</line>" +
    `<line x1="65" y1="5" x2="5" y2="65" stroke="#FFC000" stroke-width="5" id="crossAnimation2${index}">` +
    '<animate attributeName="x2" from="65" to="5" dur="0.5s" fill="freeze" />' +
    "</line>" +
    "</svg>" +
    "</div>"
  );
}

// Füge die folgenden Funktionen hinzu:

function isGameFinished() {
  // Überprüfe auf einen Gewinner oder ein Unentschieden
  if (checkWinner("circle")) {
    updateWinner("circle");
    return true;
  } else if (checkWinner("cross")) {
    updateWinner("cross");
    return true;
  } else if (isBoardFull()) {
    updateWinner("draw");
    return true;
  }
  return false;
}

function updateWinner(winner) {
  const winnerElement = document.getElementById("winner");
  const winnerDiv = document.getElementById("winnerDiv");

  if (winner === "draw") {
    winnerElement.textContent = "Unentschieden!";
  } else {
    winnerElement.textContent = `The winner is ${winner}`;
  }

  winnerDiv.style.display = "block";
}

function checkWinner(player) {
  // Überprüfe alle möglichen Gewinnkombinationen
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Horizontale Reihen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Vertikale Reihen
    [0, 4, 8],
    [2, 4, 6], // Diagonale Reihen
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (fields[a] === player && fields[b] === player && fields[c] === player) {
      drawWinningLine(condition);
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  // Überprüfe, ob das Spielfeld voll ist (Unentschieden)
  return fields.every((cell) => cell !== null);
}
function drawWinningLine(cells) {
  const contentDiv = document.getElementById("content");

  for (const cell of cells) {
    const element =
      document.getElementById(`circle${cell}`) ||
      document.getElementById(`cross${cell}`);

    if (element) {
      element.classList.add("winning-element");
    }
  }

  setTimeout(() => {
    clearWinningElements();
  }, 4000); // Blinkzeit in Millisekunden
}

function clearWinningElements() {
  const winningElements = document.querySelectorAll(".winning-element");
  winningElements.forEach((element) => {
    element.classList.remove("winning-element");
  });
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";
  const winnerDiv = document.getElementById("winnerDiv");
  winnerDiv.style.display = "none";
  render();
}
