// 1. Inferencia de tipos
// TypeScript es capaz de saber qué tipo de dato es una variable sin que se lo digamos
let nombre = 'Leonardo'; // TypeScript sabe que es un string
// nombre = 2 // Esto daría error

// 2. Tipado explícito
let edad: number = 30;
let esProgramador: boolean = true;

// 3. Funciones
// Podemos tipar los parámetros y el valor de retorno
function saludar(nombre: string): string {
  return `Hola ${nombre}, ¿cómo estás?`;
}

console.log(saludar('Leonardo'));

// 4. Objetos
// Podemos definir la forma de un objeto
const persona = {
  nombre: 'Pepe',
  edad: 25
};

// 5. Arrays
const lenguajes: string[] = ['JavaScript', 'TypeScript', 'Python'];
lenguajes.push('Rust');

console.log({ nombre, edad, esProgramador, lenguajes });
