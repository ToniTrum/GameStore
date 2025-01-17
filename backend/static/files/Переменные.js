'use strict' // устанавливает строгий режим

/* let -- директива, позволяющая объявить локальную переменную с областью 
    видимости, ограниченной текущим блоком кода. */
let message = "Hello";

/* const -- директива, значение которого не может быть изменено новым 
    присваиванием, а также не может быть переопределено. */
const pi = 3.14;

/* var -- объявляет переменную, всегда обрабатывая до выполнения кода, 
    где бы она ни находилась. Не использовать! */
var a = 10;

/* typeof <variable> -- оператор, возвращающий строку, указывающую тип операнда. */
console.log(typeof pi);

// STRING
const str = '${message}';
console.log(str);

/* String() -- преобразует значение в строки */
console.log(String(100));

// NUMBER
const num = 1;

console.log(99_000_000_000_000_000n + 1n); // для работы с очень большими числами

const exp = 2.7;

/* Number() -- преобразует значение в число */
console.log(Number("1000"));

// BOOLEAN
const logicVariableTrue = true;
const logicVariableFalse = false;

/* Boolean() -- преобразует значение в буллевое значение */
console.log(Boolean(-1));

// OBJECT
const dict = {
    name: "Sergey",
    surname: "Kulahszyan"
};

const array = [1, "str", 3.3];

// SPECIAL MEANINGS
let voidVariable;

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("a" / 1); // NaN
console.log(null); // null
console.log(voidVariable); // undefined
