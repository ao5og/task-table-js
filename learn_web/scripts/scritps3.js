class Worker {
	constructor(name, surname, rate, days) {
		this.name = name;
		this.surname = surname;
		this.rate = rate;
		this.days = days;
	}
	get getSalary() {
		return this.rate * this.days;
	}
	get getFullName() {
		return `${this.name} ${this.surname}`;
	}
}

class Boss extends Worker {
	#workers;
	constructor(name, surname, rate, days, workers) {
		super(name, surname, rate, days);
		this.#workers = workers;
	}
	get getSalary() {
		return super.getSalary * this.#workers;
		// return this.rate * this.days * this.#workers;
	}
}

let b = new Boss("a", "b", 20, 5, 10);

console.log(b.getSalary);
