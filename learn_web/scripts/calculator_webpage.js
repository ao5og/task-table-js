const display = document.querySelector("input#display");
const clearButton = document.querySelector("button.clear");
const calcButton = document.querySelector("button.calc");
const buttons = document.querySelectorAll("button.nums");


function clearDisplay() {
	// display.textContent = "0";
	display.value = "0";
}

clearButton.addEventListener("click", clearDisplay);

function addToDisplay(digit) {
	const currentContent = display.value;
	if (currentContent == "0" || currentContent.includes("Error")) {
		display.value = "";
	}
	if (currentContent.length <= 15) {
		display.value += digit;
	}
}

function displayResult() {
	const result = finalCalc(display.value);
	display.value = result;
}

calcButton.addEventListener("click", displayResult);

display.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		calcButton.click();
	}
});

for (const button of buttons) {
	const digit = button.textContent;
	button.addEventListener("click", function () {
		addToDisplay(this.textContent);
	});
}

///////

class Stack {
	constructor() {
		this.items = [];
	}

	push(element) {
		return this.items.push(element);
	}

	pop() {
		if (this.items.length > 0) {
			return this.items.pop();
		}
	}

	peek() {
		return this.items[this.items.length - 1];
	}

	isEmpty() {
		return this.items.length == 0;
	}

	size() {
		return this.items.length;
	}

	clear() {
		this.items = [];
	}
}

function precedence(c) {
	if (c == "/" || c == "*") return 2;
	else if (c == "+" || c == "-") return 1;
	else return -1;
}

// deal with parantheses
function validatePara(exp) {
	// parantheses missing multiplication sign
	const re1 = /\d\(/;
	const re2 = /\)\d/;
	const re_err = /\(\)/;

	if (re_err.test(exp)) {
		throw new Error("Empty parantheses!");
	}

	const leftParsCount = exp.split(/\(/).length - 1;
	const rightParsCount = exp.split(/\)/).length - 1;

	if (leftParsCount && rightParsCount && leftParsCount != rightParsCount) {
		throw new Error("Missing parantheses pair!");
	}

	let ind = 0;
	let res = exp;
	while (re1.test(res)) {
		ind = re1.exec(res).index;
		res = res.slice(0, ind + 1) + "*" + res.slice(ind + 1);
	}
	while (re2.test(res)) {
		ind = re2.exec(res).index;
		res = res.slice(0, ind + 1) + "*" + res.slice(ind + 1);
	}
	if (res == exp) {
		console.log("no multiplication signs missing");
	} else {
		console.log("multiplication sign added where implicit");
		console.log(res);
	}
	return res;
}

// to recognize whole integers, convert string to array of operands, operators, parentheses
function strToArray(exp) {
	console.log(`this is the param: ${exp}`);
	let resultArray = [];
	const re = /\d+/;
	ind = 0;
	let match = "";
	const toParse = exp;
	for (let i = 0; i < toParse.length; i++) {
		// console.log(`this is INDEX ${i}`);
		if (re.test(toParse.slice(i))) {
			ind = i + toParse.slice(i).match(re).index;
			if (ind == i) {
				match = toParse.slice(i).match(re)[0];
				// console.log(match);
				resultArray.push(match);
				i = ind + match.length - 1;
			} else {
				resultArray.push(toParse[i]);
				// console.log(toParse[i]);
			}
		} else {
			resultArray.push(toParse[i]);
			// console.log(toParse[i]);
		}
	}
	// console.log(toParse[i]);
	console.log(`string to array parsed: ${resultArray}`);

	return resultArray;
}

function removeNumInPar(expArr) {
	let res = expArr;
	for (i = 0; i < res.length - 2; i++) {
		if (res[i] == "(" && /\d+/.test(res[i + 1]) && res[i + 2] == ")") {
			res = res
				.slice(0, i)
				.concat(res[i + 1])
				.concat(res.slice(i + 3));
		}
	}
	console.log(`removed single numbers in para: ${res}`);
	return res;
}

function validateNeg(expArr) {
	let res = expArr;
	if (res[0] == "-") {
		res = ["(-1)", "*"].concat(res.slice(1));
	}

	for (i = 0; i < res.length - 2; i++) {
		if (["+", "-", "/", "*", "("].includes(res[i]) && res[i + 1] == "-") {
			res = res
				.slice(0, i + 1)
				.concat(["(-1)", "*"])
				.concat(res.slice(i + 2));
		}
	}
	console.log(`validated negatives: ${res}`);
	return res;
}

function infixToPostfix(s) {
	let st = new Stack();
	let result = [];

	for (let i = 0; i < s.length; i++) {
		let c = s[i];

		// if operand, push to stack
		if (!["+", "-", "/", "*", "(", ")"].includes(c)) {
			result.push(c);

			// if (, push to stack
		} else if (c == "(") {
			st.push(c);

			// if ) pop to result until ( is found in stack
			// pop the (
		} else if (c == ")") {
			while (st.peek() != "(") {
				result.push(st.peek());
				st.pop();
			}
			st.pop();

			// if operator
		} else {
			if (st.isEmpty() || st.peek() == "(") {
				while (precedence(c) > precedence(st.peek())) {
					st.push(c);
				}
			} else {
				result.push(st.peek());
				st.pop();
				st.push(c);
			}
		}
	}
	while (!st.isEmpty()) {
		result.push(st.peek());
		st.pop();
	}
	console.log("infix to postfix conversion performed");
	console.log(`	postfix: ${result}`);
	return result;
}

function evalPostfix(postfixStr) {
	let st = new Stack();
	let toEval = "";
	let operand = 0;

	for (let i = 0; i < postfixStr.length; i++) {
		let c = postfixStr[i];
		// should be stack ?
		if (!["+", "-", "/", "*"].includes(c)) {
			st.push(c);
		} else {
			operand = st.pop();
			toEval = st.pop() + c + operand;
			console.log(`to evaluate ${toEval}`);
			st.push(eval(toEval));
			console.log(`   postfix_log: evaluated expression: ${toEval}`);
		}
	}
	const result = st.pop();
	console.log(`postfix evaluated; result is: ${result}`);

	return result;
}
// evalPostfix(infixToPostfix(['1',"-","(","-2",")"]))
function finalCalc(s) {
	try {
		const validatedStr = validatePara(s);
		console.log(`this is the validate str: ${validatedStr}`);

		const wholeIntsArray = strToArray(validatedStr);

		const postfixStr = infixToPostfix(
			validateNeg(removeNumInPar(wholeIntsArray))
		);

		const finalResult = evalPostfix(postfixStr);
		console.log(`Complete evaluation: ${finalResult}`);
		console.log(finalResult);
		console.log(typeof finalResult);
		if (Number.isNaN(finalResult)) {
			return "E:bad expression";
		} else {
			return finalResult;
		}
	} catch (e) {
		console.error(e);
		return "Error: parantheses";
	}
}
