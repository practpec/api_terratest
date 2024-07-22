function splitText(text) {
    // Esta función usa una expresión regular para encontrar comas fuera de paréntesis
    return text.split(/,(?![^()]*\))/);
}

// Ejemplo de uso:
const text = "Parte 1, Parte 2 (incluye, esto) y otra parte, Parte 3 (más, contenido)";
const result = splitText(text);

console.log(result);
