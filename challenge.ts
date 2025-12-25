// "SISTEMA DE GESTIÓN DE TAREAS"
// "reto integra: Interfaces, Enums, Clases, Genéricos y Promesas"

// 1. Enum para los estados de la tarea
enum EstadoTarea {
  Pendiente = 'PENDIENTE',
  EnProgreso = 'EN_PROGRESO',
  Completada = 'COMPLETADA'
}

// 2. Interface para definir la estructura de una Tarea
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
}

// 3. Clase genérica para manejar un almacén (Storage)
// Puede guardar cualquier tipo de dato <T>
class Almacen<T> {
  private items: T[] = [];

  agregar(item: T): void {
    this.items.push(item);
  }

  obtenerTodos(): T[] {
    return this.items;
  }
}

// 4. Decorador para loguear acciones
function LogAccion(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[LOG]: Ejecutando método ${propertyKey}...`);
    return originalMethod.apply(this, args);
  };
}

// 5. Clase principal para gestionar tareas
class GestorTareas {
  private almacen = new Almacen<Tarea>();
  private proximoId = 1;

  @LogAccion
  crearTarea(titulo: string, descripcion: string): Tarea {
    const nuevaTarea: Tarea = {
      id: this.proximoId++,
      titulo,
      descripcion,
      estado: EstadoTarea.Pendiente
    };
    this.almacen.agregar(nuevaTarea);
    return nuevaTarea;
  }

  @LogAccion
  async guardarEnServidor(): Promise<string> {
    return new Promise((resolve) => {
      console.log('Guardando tareas en el servidor...');
      setTimeout(() => {
        resolve('¡Tareas guardadas con éxito!');
      }, 2000);
    });
  }

  listarTareas(): void {
    console.log('\n LISTA DE TAREAS:');
    this.almacen.obtenerTodos().forEach((t) => {
      console.log(`[${t.id}] ${t.titulo} - ${t.estado}`);
    });
  }
}

// EJECUCIÓN FINAL

async function ejecutarReto() {
  const miGestor = new GestorTareas();

  // Crear algunas tareas
  miGestor.crearTarea(
    'Aprender TypeScript',
    'Completar el curso básico e intermedio'
  );
  miGestor.crearTarea(
    'Hacer el reto final',
    'Integrar todos los conocimientos'
  );

  miGestor.listarTareas();

  const resultado = await miGestor.guardarEnServidor();
  console.log(resultado);
}

ejecutarReto();
