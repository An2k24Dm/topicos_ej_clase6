type Persona = {
    nombre: string;
    fechaNacimiento: Date;
};

const arregloPersonas: Persona[] = [
    { nombre: "Juan", fechaNacimiento: new Date("1990-01-01") },
    { nombre: "Maria", fechaNacimiento: new Date("1985-05-15") },
    { nombre: "Pedro", fechaNacimiento: new Date("2000-10-20") },
    { nombre: "Ana", fechaNacimiento: new Date("1995-03-30") },
    { nombre: "Luis", fechaNacimiento: new Date("1988-07-25") }
]

function calcularEdad(fecha: Date): number {
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fecha.getFullYear();
    const mes = fechaActual.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fecha.getDate())) {
        return edad - 1;
    }
    return edad;
}

function mostrarArreglo(texto: string, arreglo: [string, number][]): void {
    console.log(texto);
    arreglo.map(persona => {
        console.log("Nombre: " + persona[0] + ", Edad: " + persona[1]);
    });
}

// FUNCION CALLBACK
function calculoCallback(
    arreglo: Persona[], 
    callback: (fecha: Date) => number, 
    mostrar: (texto: string, arreglo: [string, number][]) => void
): void{
    setTimeout(() => {
        const resultado: [string, number][] = arreglo.map(persona => {
            const edad = callback(persona.fechaNacimiento);
            return [persona.nombre, edad];
        });
        mostrar("Callback: ", resultado);
    }, 4000);
}

calculoCallback(arregloPersonas, calcularEdad, mostrarArreglo);

// FUNCION PROMESA
function calculoPromesa(arreglo: Persona[]): Promise<[string, number][]>{
    return new Promise((resolve) => {
        setTimeout(() => {
            const resultado: [string, number][] = arreglo.map(persona => {
                const edad = calcularEdad(persona.fechaNacimiento);
                return [persona.nombre, edad];
            });
            resolve(resultado);
        }, 4000);
    });
}

calculoPromesa(arregloPersonas).then(resultado => {
    mostrarArreglo("Promesa: ", resultado);
});