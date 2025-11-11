// Función que identifica el día de la semana según el número ingresado
function identificarDia() {
    const numero = parseInt(document.getElementById("numero").value);
    const resultadoElemento = document.getElementById("resultado");
    
    // Validar que se ingresó un número
    if (isNaN(numero)) {
        mostrarError("Por favor, ingresa un número válido");
        return;
    }
    
    // Identificar el día
    if (numero >= 1 && numero <= 7) {
        const dias = [
            { 
                nombre: "Lunes", 
                numero: 1,
                descripcion: "Inicio de la semana laboral",
                color: "dia-lunes",
                icono: "fas fa-1"
            },
            { 
                nombre: "Martes", 
                numero: 2,
                descripcion: "Continuamos con energía",
                color: "dia-martes",
                icono: "fas fa-2"
            },
            { 
                nombre: "Miércoles", 
                numero: 3,
                descripcion: "Mitad de semana",
                color: "dia-miercoles",
                icono: "fas fa-3"
            },
            { 
                nombre: "Jueves", 
                numero: 4,
                descripcion: "Casi llegando al fin",
                color: "dia-jueves",
                icono: "fas fa-4"
            },
            { 
                nombre: "Viernes", 
                numero: 5,
                descripcion: "¡Viernes de alegría!",
                color: "dia-viernes",
                icono: "fas fa-5"
            },
            { 
                nombre: "Sábado", 
                numero: 6,
                descripcion: "Día de descanso",
                color: "dia-sabado",
                icono: "fas fa-6"
            },
            { 
                nombre: "Domingo", 
                numero: 7,
                descripcion: "Día de familia",
                color: "dia-domingo",
                icono: "fas fa-7"
            }
        ];
        
        const dia = dias[numero - 1];
        mostrarResultado(dia);
    } else {
        mostrarError("Ha digitado un número fuera del rango permitido (1-7)");
    }
}

// Función para mostrar el resultado
function mostrarResultado(dia) {
    const resultadoElemento = document.getElementById("resultado");
    
    resultadoElemento.innerHTML = `
        <div class="dia-card ${dia.color}">
            <div class="dia-header">
                <div class="dia-icon" style="background: rgba(255,255,255,0.3);">
                    <i class="${dia.icono}"></i>
                </div>
                <div>
                    <h3>Día Identificado</h3>
                    <p class="dia-numero">Número: ${dia.numero}</p>
                </div>
            </div>
            <div class="dia-nombre">${dia.nombre}</div>
            <p class="dia-descripcion">${dia.descripcion}</p>
        </div>
    `;
    
    resultadoElemento.classList.add("active");
    
    // Desplazarse al resultado
    resultadoElemento.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para mostrar error
function mostrarError(mensaje) {
    const resultadoElemento = document.getElementById("resultado");
    
    resultadoElemento.innerHTML = `
        <div class="error-mensaje">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Error</h3>
            <p>${mensaje}</p>
        </div>
    `;
    
    resultadoElemento.classList.add("active");
    
    // Desplazarse al resultado
    resultadoElemento.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log("Aplicación de Identificación de Días cargada correctamente");
    
    // Agregar funcionalidad para identificar con la tecla Enter
    document.getElementById('numero').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            identificarDia();
        }
    });
    
    // Enfocar el input al cargar la página
    document.getElementById('numero').focus();
});