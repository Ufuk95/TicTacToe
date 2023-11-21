let fields = [
    null,
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null];

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
      const symbol = fields[index] === "circle" ? circlePlayer() : fields[index] === "cross" ? crossPlayer(): "";
      tableHtml += `<td onclick="cellClicked(${index})">${symbol}</td>`;
    }
    tableHtml += "</tr>";
  }

  tableHtml += "</table>";
  contentDiv.innerHTML = tableHtml;
}

function changePlayer(){

}

function circlePlayer() {
    return '<div id="circle">' +
      '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="50" cy="50" r="30" stroke="skyblue" stroke-width="8" fill="transparent"/>' +
      '</svg>' +
      '</div>';
  }

  function crossPlayer() {
    return '<div id="cross">' +
      '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="20" y1="20" x2="80" y2="80" stroke="red" stroke-width="8"/>' +
      '<line x1="80" y1="20" x2="20" y2="80" stroke="red" stroke-width="8"/>' +
      '</svg>' +
      '</div>';
  }
  
  

function cellClicked(index) {
  if (fields[index] === null) {
    // Toggle between 'circle' and 'cross'
    fields[index] = fields[index] === "circle" ? "cross" : "circle";
    render();
  }
}
