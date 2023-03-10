const dataChooser = document.querySelector("select");
const poemDisplay = document.querySelector("pre");
const rowCount = document.querySelector("h3");
dataChooser.addEventListener("change", () => {
	const dataSize = dataChooser.value;
	updateDisplay(dataSize);
});
let jsonData = {};
function updateDisplay(dataSize) {
	var dataURL =
		"http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";

	if (dataSize == "Large data") {
		dataURL =
			"http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
	}

	fetch(dataURL)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			console.log(response.json);
			return response.json();
		})
		.then((data) => {
			initialize(data);
			jsonData = data;
		})
		// .then((data) => {jsonData = data})

		.catch((err) => console.error(`Fetch problem: ${err.message}`));
}

// initial state
updateDisplay("Small data");
dataChooser.value = "Small data";

function initialize(data) {
	let placeholder = document.querySelector("#data-output");
	let out = "";
	console.log("clearing table");
	placeholder.innerHTML = out;
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

	rowCount.innerText = `Number of rows: ${placeholder.rows.length}`;
	console.log(data);
}

let arrowSorts = document.querySelectorAll(".arrow");

for (let arrow of arrowSorts) {
	let column = arrow.previousSibling.wholeText;
	arrow.addEventListener("click", () => {
		sortBy(column);
	});
}

function sortByProperty(property) {
	return function (a, b) {
		if (a[property] > b[property]) return 1;
		else if (a[property] < b[property]) return -1;

		return 0;
	};
}

function sortBy(columnName) {
	console.log(columnName);
	console.log(`adding new data sorted by ${columnName}`);

	jsonData = jsonData.sort(sortByProperty(columnName));
	initialize(jsonData);
}

//
class jsonHolder {
	constructor(url) {
		this.data = data;
	}

	fillTable() {
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

		rowCount.innerText = `Number of rows: ${placeholder.rows.length}`;
		console.log(data);
	}
}

// let j = jsonHolder()

