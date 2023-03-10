// Criteria: The URL must start with http:// or https:// and end with .php or .html.
// For example - http://site.ru/index.php - valid, http://site.com - not valid, site.it/index.php  - not valid

function validateURL(url) {
	const re = /^(http:\/\/|https:\/\/).*\.(php|html)$/;
	return re.test(url);
}
console.log(validateURL("https://site.ru/index.php"));
console.log(validateURL("http://site.ru/index.html"));
console.log(validateURL("http://site.ru/index.php"));

console.log(validateURL("http://site.ru/index.phpadsad"));
console.log(validateURL("site.ru/index.phpadsad"));

//Such numbers must be valid: 39991112233, 3 (999) 1112233, +4 (999) 111-22-33, +4 (999) 111 22 33.
// the phone can start with either +4 or 3. operator code, it can be in brackets and without, and with spaces.
//  The rest can be with hyphens and spaces.

function validateNumber(number) {
	const re =
		/^(\+4|3)(999|\s\(999\)\s)(\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}\-\d{2}\-\d{2})$/;
	return re.test(number);
}

console.log(validateNumber("+49991112233"));
console.log(validateNumber("3 (999) 1112233"));
console.log(validateNumber("+4 (999) 111-22-33"));
console.log(validateNumber("+4 (999) 111 22 33"));

console.log(validateNumber("+4 999111 22 33"));
console.log(validateNumber("+4 9991112233"));
console.log(validateNumber("+4999111 22-33"));


