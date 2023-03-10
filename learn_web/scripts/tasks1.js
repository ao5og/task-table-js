//1
function mean(nums) {
	let sum = 0;
	for (let n of nums) {
		sum += n;
	}
	let res = sum / nums.length;
	if (!Number.isInteger(res)) {
		res = res.toFixed(1);
	}
	return res;
}
console.log(mean([1, 2, 3, 4, 10, 32]));
console.log(mean([1, 2, 3]));

//2
let arr = [1, 2, 3, 4, 5];

// function moveToEnd(arr) {
// 	arr[arr.length] = arr[0];
// 	arr.shift();
// 	return arr;
// }

// function moveToEnd(arr) {
//  arr.push(arr[0]);
// 	arr.shift();
// 	return arr;
// }

function moveToEnd(arr) {
	arr.push(arr.shift());
}

moveToEnd(arr);
// console.log(arr)

//3
let emps = [
	{ name: "John", age: 20 },
	{ name: "Mark", age: 21 },
	{ name: "Jenny", age: 23 },
];

function empsInfoToString(emps) {
	let res = [];
	for (let e of emps) {
		res.push(`Name: ${e.name}, age: ${e.age} years.`);
	}
	return res;
}
// console.log(empsInfoToString(emps));

// Objects
//4

let salaries = {
	John: 100,
	Ann: 160,
	Pete: 130,
};

let sal = {};

function sumSals(salaries) {
	let sum = 0;
	for (key in salaries) {
		sum += salaries[key];
	}
	return sum;
}

// sumSals(salaries);
// sumSals(sal);
// console.log(sumSals(salaries));
// console.log(sumSals(sal));

//5
let menu = {
	width: 200,
	height: 300,
	title: "my menu",
};

function multiplyNumeric(obj) {
	for (key in obj) {
		if (!isNaN(obj[key])) {
			obj[key] *= 2;
		}
	}
}

// multiplyNumeric(menu)

//6
let ladder = {
	step: 0,
	showStep: function () {
		console.log(this.step);
	},
	up: function () {
		this.step += 1;
	},
	down: function () {
		this.step -= 1;
	},
};
