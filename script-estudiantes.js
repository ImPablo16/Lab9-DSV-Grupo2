// Función para crear los campos de estudiantes
function crearCampos(event) {
    event.preventDefault();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const contenedor = document.getElementById("formulario-estudiantes");
    const resultados = document.getElementById("resultados");
    
    // Limpiar contenedores
    contenedor.innerHTML = "";
    resultados.innerHTML = "";
    
    // Validar cantidad
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
        alert("Por favor, ingresa un número válido entre 1 y 20");
        return;
    }
    
    // Crear formularios para cada estudiante
    for (let i = 1; i <= cantidad; i++) {
        const estudianteCard = document.createElement("div");
        estudianteCard.className = "estudiante-card";
        estudianteCard.innerHTML = `
            <div class="estudiante-header">
                <div class="estudiante-icon">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <h3>Estudiante ${i}</h3>
            </div>
            <div class="campos-notas">
                <div class="campo-nota">
                    <label for="nota1-${i}">Nota 1:</label>
                    <input type="number" id="nota1-${i}" min="0" max="100" required placeholder="0-100" />
                </div>
                <div class="campo-nota">
                    <label for="nota2-${i}">Nota 2:</label>
                    <input type="number" id="nota2-${i}" min="0" max="100" required placeholder="0-100" />
                </div>
            </div>
            <button class="btn-calcular" onclick="calcularPromedio(${i})">
                <i class="fas fa-calculator"></i> Calcular Promedio
            </button>
        `;
        contenedor.appendChild(estudianteCard);
    }
    
    // Desplazarse a la sección de formularios
    document.getElementById("formulario-estudiantes").scrollIntoView({ behavior: 'smooth' });
}

// Función para calcular el promedio de un estudiante
function calcularPromedio(i) {
    const nota1 = parseFloat(document.getElementById(`nota1-${i}`).value);
    const nota2 = parseFloat(document.getElementById(`nota2-${i}`).value);
    
    // Validar notas
    if (isNaN(nota1) || isNaN(nota2)) {
        alert("Por favor, ingresa ambas notas válidas para el Estudiante " + i);
        return;
    }
    
    if (nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100) {
        alert("Las notas deben estar entre 0 y 100 para el Estudiante " + i);
        return;
    }
    
    // Calcular promedio
    const promedio = ((nota1 + nota2) / 2).toFixed(2);
    
    // Determinar estado del promedio
    let estado = "";
    let icono = "";
    
    if (promedio >= 90) {
        estado = "Excelente desempeño";
        icono = "fas fa-star";
    } else if (promedio >= 80) {
        estado = "Buen desempeño";
        icono = "fas fa-thumbs-up";
    } else if (promedio >= 70) {
        estado = "Desempeño regular";
        icono = "fas fa-check";
    } else if (promedio >= 60) {
        estado = "Desempeño mínimo";
        icono = "fas fa-exclamation";
    } else {
        estado = "Necesita mejorar";
        icono = "fas fa-redo";
    }
    
    // Crear o actualizar resultado
    let resultadoCard = document.getElementById(`resultado-${i}`);
    
    if (!resultadoCard) {
        resultadoCard = document.createElement("div");
        resultadoCard.id = `resultado-${i}`;
        resultadoCard.className = "resultado-card";
        document.getElementById("resultados").appendChild(resultadoCard);
    }
    
    resultadoCard.innerHTML = `
        <div class="resultado-header">
            <div class="resultado-icon">
                <i class="${icono}"></i>
            </div>
            <h3>Resultado - Estudiante ${i}</h3>
        </div>
        <div class="promedio-valor">${promedio}</div>
        <p class="estado-promedio">${estado}</p>
        <p style="text-align: center; margin-top: 1rem;">
            Nota 1: ${nota1} | Nota 2: ${nota2}
        </p>
    `;
    
    // Mostrar resultado
    resultadoCard.classList.add("active");
    
    // Desplazarse al resultado
    resultadoCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicación de Promedio de Estudiantes cargada correctamente");
    
    // Agregar evento al formulario
    document.getElementById('cantidad-form').addEventListener('submit', crearCampos);
    
    // Agregar funcionalidad para calcular con la tecla Enter
    document.getElementById('cantidad').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('cantidad-form').dispatchEvent(new Event('submit'));
        }
    });
});