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

// 6. Interfaces (El "Contrato" de los objetos)
interface Heroe {
  id: number;
  nombre: string;
  poder?: string; // El '?' significa que es opcional
  nivel: number | string; // Union Type: Puede ser número o texto
}

const ironman: Heroe = {
  id: 1,
  nombre: 'Tony Stark',
  nivel: 'S' // usamos un string
};

const spiderman: Heroe = {
  id: 2,
  nombre: 'Peter Parker',
  poder: 'Trepar paredes',
  nivel: 100 // usamos un número
};

// 7. Type Aliases (Alias de tipos)
type EstadoPedido = 'pendiente' | 'enviado' | 'entregado';

function actualizarPedido(id: number, estado: EstadoPedido) {
  console.log(`Pedido ${id} cambiado a: ${estado}`);
}

actualizarPedido(123, 'enviado');
// actualizarPedido(124, 'cancelado'); // ERROR: 'cancelado' no es un EstadoPedido válido

console.log({ nombre, edad, esProgramador, lenguajes, ironman, spiderman });

// 8. Clases (Lógica de Programación Orientada a Objetos)
// En TypeScript podemos usar modificadores de acceso: public, private, protected
class Rectangulo {
  // private: solo se puede acceder dentro de esta clase
  private ancho: number;
  private alto: number;

  constructor(ancho: number, alto: number) {
    this.ancho = ancho;
    this.alto = alto;
  }

  // public: se puede acceder desde fuera (es el valor por defecto)
  public calcularArea(): number {
    return this.ancho * this.alto;
  }
}

const miRectangulo = new Rectangulo(10, 5);
console.log(`El área del rectángulo es: ${miRectangulo.calcularArea()}`);
// console.log(miRectangulo.ancho); // ERROR: 'ancho' es privado y no es accesible

// 9. Promesas y APIs (Lógica de datos externos)
// Definimos la forma de los datos que esperamos de la API
interface Usuario {
  id: number;
  name: string;
  email: string;
}

async function obtenerUsuario(id: number): Promise<Usuario> {
  // Simulamos una llamada a una API (como JSONPlaceholder)
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    throw new Error('Usuario no encontrado');
  }

  // Aquí está la magia: le decimos a TS que el resultado es un 'Usuario'
  const data: Usuario = await response.json();
  return data;
}

// Usamos la función
obtenerUsuario(1)
  .then((usuario) => {
    console.log(`Usuario obtenido: ${usuario.name} (${usuario.email})`);
  })
  .catch((error) => console.error(error));

// 10. Enums (Enumeraciones)
// Permiten definir un conjunto de constantes con nombre
// Es como crear un "diccionario" de opciones permitidas
enum Color {
  Rojo, // 0
  Verde, // 1
  Azul // 2
}

let colorFavorito: Color = Color.Verde;
console.log(`Mi color favorito tiene el índice: ${colorFavorito}`);

// También pueden tener valores de texto (más comunes en APIs)
enum DiaSemana {
  Lunes = 'LUN',
  Martes = 'MAR',
  Miercoles = 'MIE'
}

let hoy: DiaSemana = DiaSemana.Lunes;
console.log(`Hoy es: ${hoy}`);

// 11. Genéricos (La lógica de la reutilización)
// Los genéricos permiten que una función o clase trabaje con VARIOS tipos
// sin perder la seguridad del tipado. Se usa la letra <T> por convención.

function envolverEnArray<T>(elemento: T): T[] {
  return [elemento];
}

const arrayDeNumeros = envolverEnArray<number>(10);
const arrayDeStrings = envolverEnArray<string>('Hola');

console.log({ arrayDeNumeros, arrayDeStrings });

// Ejemplo más real: Una interfaz genérica para respuestas de API
interface RespuestaAPI<T> {
  datos: T;
  error: boolean;
}

const respuestaUsuario: RespuestaAPI<Usuario> = {
  datos: { id: 1, name: 'Leonardo', email: 'leo@dev.com' },
  error: false
};

console.log(`Respuesta de API para usuario: ${respuestaUsuario.datos.name}`);

// 12. Decoradores (Lógica de Metadatos y Modificación)
// Los decoradores son funciones que se ejecutan sobre clases, métodos o propiedades.
// Se usan mucho en frameworks como Angular o NestJS.
// Nota: Requieren "experimentalDecorators": true en el tsconfig.json

function Logger(constructor: Function) {
  console.log('Clase Decorada');
  console.log(`Se ha definido la clase: ${constructor.name}`);
}

@Logger
class MiApp {
  constructor() {
    console.log('Instancia de MiApp creada');
  }
}

const app = new MiApp();
