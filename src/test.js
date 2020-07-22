// ************ example1 ***************
const square1 = function(number) {
    return number * number;
}

const square2 = number => number * number;
// square 1 = square 2
console.log(square2(5));



// ************ example2 ***************
const jobs = [
    { id: 1, isActive: true },
    { id: 2, isActive: true },
    { id: 3, isActive: false },
];
const activeJobs1 = jobs.filter(function(job) { return job.isActive });
console.log(activeJobs1); // 1
const activeJobs2 = jobs.filter(job => job.isActive);
console.log(activeJobs2); // 2
// 1 equals 2



// ************ example3 ***************
const person = {
    eat() {
        console.log("this1 > ", this);
    },
    talk() {
        setTimeout(function() {
            console.log("this2 > ", this);
        }, 1000);
    },
    walk() {
        setTimeout(() => { // settimeout will change the context of this, but with using arrow function, this will point to the current context
            console.log("this3 > ", this);
        }, 1000);
    }
}
person.eat(); // result is: person object
person.talk(); // result is: window or undefine
person.walk(); // result is: person object



// ************ example4 ***************
const animal = {
    name: "sheep",
    run() {
        console.log(this);
    }
}
animal.run();
const running = animal.run.bind(animal);
running();



// ************ example5 ***************
const colors = ["red", "blue", "green"];
// way1 (classic):
const items1 = colors.map(function(color) {
    return "<li>" + color + "</li>";
});
// way2 (arrow-function with template-literal):
const items2 = colors.map(color => `<li>${color}</li>`);
console.log(items2);



// ************ example6 ***************
// object distructing
const address = {
    street: "s",
    city: "t",
    country: "c"
}
const street = address.street; //1
const city = address.city; //2
const country = address.country; //3
const { street, city, country } = address; //*
const { city: ct } = address; // if we need only city property & define alias (ct) for it
// line 1 & 2 & 3 equal line *



// ************ example7 ***************
// spread operators
// merge 2 arrays:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const res1 = arr1.concat(arr2);
console.log(res1);
const res2 = [...arr1, 'a', ...arr2, 'b']; // easy to embed extra items in the middle of them
const clone1 = {...arr1 }; // duplicate arr1
console.log(res2);
// merge 2 object:
const first = { name: 'Ehsan' };
const second = { job: 'Programmer' }
const combined = {...first, ...second, location: 'Tehran' }; // we can add another key-value in combined object
const clone2 = {...first }; // duplicate arr2
console.log(combined);



// ************ example8 ***************
//import Teacher, { teach } from './teacher';
class Person {
    constructor(name) {
        this.name = name;
    }
    walk() {
        console.log("walk");
    }
}
class Teacher extends Person {
    constructor(name, degree) {
        super(name); // when we add constructor for child class, we have to call constructor of its parent class
        this.degree = degree;
    }
    teach() {
        console.log("teach");
    }
}
const teacher = new Teacher("Ehsan", "Math");
console.log(teacher.degree);