const smallDataUrl =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";
const largeDataUrl =
  "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

const poemDisplay = document.querySelector("pre");
const rowCount = document.querySelector("h3");

const smallButton = document.querySelector("#small-data");
const largeButton = document.querySelector("#large-data");

smallButton.addEventListener("click", () => {
  updateDisplay(1);
});

largeButton.addEventListener("click", () => {
  updateDisplay(2);
});

// store data right away
let jsonData = {};

// initial state
updateDisplay(1);

function updateDisplay(dataSize) {
  let dataURL = dataSize == 2 ? largeDataUrl : smallDataUrl;

  fetch(dataURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      console.log(response.json);
      return response.json();
    })
    .then((data) => {
      fillTable(data);
      jsonData = data;
    })
    .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

function fillTable(data) {
  let placeholder = document.querySelector("#data-output");
  let out = "";

  for (let row of data) {
    out += `<tr>
              <td>${row.id}</td>
              <td>${row.firstName}</td>
              <td>${row.lastName}</td>
              <td>${row.email}</td>
              <td>${row.phone}</td>
            </tr>`;
  }

  placeholder.innerHTML = out;
  console.log("Filled table with data.");
  rowCount.innerText = `Number of rows: ${placeholder.rows.length}`;
  // console.log(data);
}

let arrowSorts = document.querySelectorAll(".arrow");

for (let arrow of arrowSorts) {
  let column = arrow.previousElementSibling.textContent;
  arrow.addEventListener("click", () => {
    sortBy(column);
  });
}

// sorting logic
function sortByPropertyAsc(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    return 0;
  };
}

function sortByPropertyDesc(property) {
  return function (a, b) {
    if (a[property] < b[property]) return 1;
    else if (a[property] > b[property]) return -1;
    return 0;
  };
}

function sortBy(columnName) {
  console.log(columnName);
  console.log(`adding new data sorted by ${columnName}`);

  jsonData = jsonData.sort(sortByPropertyAsc(columnName));
  fillTable(jsonData);
}

// pagination
const rowsPerPage = 10;
const rows = jsonData.length;
const pages = Math.ceil(rows / rowsPage);

let currentPage = 1;

const nav = document.querySelector("#pag-nav");

function showPage(currentPage) {
  currentView = jsonData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  fillTable(currentView);
}
