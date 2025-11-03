// ---- 1. BASE DE DATOS DEL JUEGO ----

const SOSPECHOSOS = {
    "Piastri": "Oscar Piastri",
    "Norris": "Lando Norris",
    "Verstappen": "Max Verstappen",
    "Wolff": "Toto Wolff",
    "Brown": "Zak Brown"
};

const ARMAS = {
    "ECU": "Software de ECU Falso",
    "Combustible": "Muestra de Combustible Adulterada",
    "Suspension": "Micro-fisura en la Suspensión",
    "Telemetria": "Datos de Telemetría Robados",
    "HerramientaFIA": "Herramienta de Medición Ilegal de la FIA"
};

const LOCACIONES = {
    "GarajeMcLaren": "Garaje de McLaren",
    "GarajeRedBull": "Garaje de Red Bull",
    "ZonaPesaje": "Zona de Pesaje de la FIA",
    "ParcFerme": "Parc Fermé",
    "MotorhomeMcLaren": "Motorhome de McLaren"
};

const EVIDENCIA_INICIAL = {
    "ECU": "El reporte inicial indica un fallo de *software* crítico. La telemetría se volvió loca.",
    "Combustible": "El reporte inicial indica una *irregularidad química* en el tanque. La FIA lo está analizando.",
    "Suspension": "El reporte inicial indica un *fallo de hardware*. El coche tiene daños estructurales en un brazo de suspensión.",
    "Telemetria": "El reporte inicial es extraño: el coche está perfecto, pero sus *datos de estrategia* han sido borrados.",
    "HerramientaFIA": "El reporte inicial es un caos: ¡Los comisarios dicen que *ambos* coches McLaren son *ilegales* por un fallo de medición!"
};

const AYUDA_LOCACIONES = {
    "GarajeMcLaren": "<strong>Garaje de McLaren:</strong> El corazón del equipo. Perfecto para un sabotaje físico (suspensión) o de software (ECU) si tienes acceso.",
    "GarajeRedBull": "<strong>Garaje de Red Bull:</strong> Territorio rival. Difícil de entrar, pero ideal para encontrar pruebas de un plan de Red Bull (Verstappen/Horner).",
    "ZonaPesaje": "<strong>Zona de Pesaje FIA:</strong> Zona de alta seguridad por donde pasan todos. Ideal para sabotajes sutiles (muestras de combustible) o de inspección (Herramienta FIA).",
    "ParcFerme": "<strong>Parc Fermé:</strong> Los coches duermen aquí. Acceso muy restringido, solo pilotos y personal clave. Un lugar solitario... perfecto para un sabotaje físico (suspensión).",
    "MotorhomeMcLaren": "<strong>Motorhome McLaren:</strong> El cerebro del equipo. Aquí están los servidores. Es el único lugar para robar datos (Telemetría) o subir software falso (ECU)."
};

// ---- NUEVO: RUTAS DE IMÁGENES ----
const IMAGENES_ESCENARIOS_INICIALES = {
    1: "escenario1_inicial.jpg", // Piastri saboteando suspensión de Lando
    2: "escenario2_inicial.jpg", // Zak Brown con una tablet/ingeniero en Motorhome
    3: "escenario3_inicial.jpg", // Mecánico "tropezando" cerca de muestras de combustible
    4: "escenario4_inicial.jpg", // Toto Wolff observando a un comisario FIA con una herramienta
    5: "escenario5_inicial.jpg"  // Lando en un terminal copiando datos
};

const IMAGENES_PISTAS = {
    "Piastri": "img_piastri.jpg",
    "Norris": "img_norris.jpg",
    "Verstappen": "img_verstappen.jpg",
    "Wolff": "img_wolff.jpg",
    "Brown": "img_brown.jpg",
    "GarajeMcLaren": "img_garagemclaren.jpg",
    "GarajeRedBull": "img_garageredbull.jpg",
    "ZonaPesaje": "img_zonapesaje.jpg",
    "ParcFerme": "img_parcferme.jpg",
    "MotorhomeMcLaren": "img_motorhomemclaren.jpg"
};

const IMAGEN_GENERICA_PISTA_DEFECTO = "img_generica_pista.jpg"; // Por si falta alguna imagen específica

// ---- COARTADAS NEUTRALES ----
const COARTADAS_NEUTRALES = {
    "Piastri": "Piastri te mira fijamente. 'Estuve con mis ingenieros hasta medianoche y luego en mi habitación. Revisa los accesos si quieres'.",
    "Norris": "Norris parece distraído. 'Estuve en el simulador y luego con mi fisio hasta las 2 AM. Mi cuello estaba tenso'.",
    "Verstappen": "Max se encoge de hombros. 'Estuve en el Energy Station con Helmut y Christian. Estábamos planeando *mi* carrera, no la de ellos'.",
    "Wolff": "Wolff suspira. 'Estuve en una llamada con Mercedes hasta tarde. Créeme, tengo mis propios problemas, no necesito los de McLaren'.",
    "Brown": "Brown parece furioso. 'Estoy encerrado en reuniones con patrocinadores. ¡Quiero que encuentren al culpable ya!'",
    "GarajeMcLaren": "El garaje estuvo cerrado. Los registros de acceso de la puerta principal están limpios, todo el personal está fichado.",
    "GarajeRedBull": "El equipo Red Bull estaba trabajando hasta tarde en su propio coche. No vieron nada inusual.",
    "ZonaPesaje": "El personal de la FIA confirma que todos los procedimientos de pesaje fueron estándar y bajo supervisión.",
    "ParcFerme": "Los guardias de Parc Fermé reportan una noche tranquila, sin incidentes en los registros.",
    "MotorhomeMcLaren": "El acceso al motorhome es con tarjeta. El registro de seguridad muestra solo ingresos y salidas del personal habitual."
};

// ---- HISTORIAS CON PISTAS CLAVE ----
const HISTORIAS = [
    {
        "id": 1,
        "culpable": "Piastri",
        "arma": "Suspension",
        "locacion": "ParcFerme",
        "victima": "Lando Norris",
        "narrativa_final": "HISTORIA 1: La Traición del Compañero. Harto del favoritismo, Piastri usó su pase de piloto para colarse en Parc Fermé de noche. Usó una herramienta de torsión para crear una fisura casi invisible en la suspensión de Lando. Quería eliminar a Lando y vencer a Max por su cuenta.",
        "pistas": {
            "Piastri": "Oscar está *demasiado* tranquilo. 'En las carreras, primero debes vencer a tu compañero', te dice con una sonrisa fría.",
            "ParcFerme": "Un guardia reporta un ruido *metálico* a las 3 AM cerca del coche de Lando, 'como si se cayera una *herramienta*'.",
            "GarajeMcLaren": "Un mecánico jura que las herramientas del lado de Piastri estaban desordenadas esta mañana y encontró *virutas de metal* que no deberían estar allí.",
            "Norris": "Lando está furioso. '¡Oscar ha estado actuando raro toda la semana, lo juro!'"
        }
    },
    {
        "id": 2,
        "culpable": "Brown",
        "arma": "ECU",
        "locacion": "MotorhomeMcLaren",
        "victima": "Oscar Piastri",
        "narrativa_final": "HISTORIA 2: El Favoritismo del Director. Zak Brown decidió que Lando era su campeón. Temiendo que Piastri le quitara puntos, ordenó a un ingeniero leal que subiera un mapa de motor 'seguro' (lento) a la ECU de Piastri desde el Motorhome, justo antes de la clasificación, culpando a un 'fallo de fiabilidad'.",
        "pistas": {
            "Brown": "Zak te dice: 'Lo más importante es el equipo. Debemos asegurarnos de que el *equipo* gane, cueste lo que cueste'.",
            "MotorhomeMcLaren": "Los logs del servidor muestran un acceso de Administrador al coche de Piastri a las 4 AM, con el tag: 'ACTUALIZACIÓN DE *FIRMWARE*'.",
            "Piastri": "Oscar está frustrado. 'El coche no tenía potencia. Se sentía como un problema de *software*, me están saboteando desde dentro'.",
            "Norris": "Lando parece incómodo. 'Es una pena lo de Oscar... supongo que mala suerte'."
        }
    },
    {
        "id": 3,
        "culpable": "Verstappen",
        "arma": "Combustible",
        "locacion": "ZonaPesaje",
        "victima": "Lando Norris",
        "narrativa_final": "HISTORIA 3: El Golpe del Rival. Max sobornó a un mecánico de un equipo menor. En el caos del pesaje de la FIA, el cómplice intercambió la muestra de combustible oficial de Lando por una que Max le dio, ligeramente adulterada. Lando correrá, pero será descalificado horas después.",
        "pistas": {
            "Verstappen": "Max sonríe. 'La carrera no termina hasta la *inspección técnica*. Cualquier cosa puede pasar'.",
            "ZonaPesaje": "Un mecánico de Alpine fue visto 'tropezando' cerca de los contenedores de *muestras de combustible* de la FIA. Actuaba con nerviosismo.",
            "GarajeRedBull": "Encuentras un bidón pequeño de un *aditivo químico* no autorizado, casi vacío, escondido bajo un banco de trabajo.",
            "Wolff": "Toto está furioso. '¡Verstappen es un peligro, pero esto es demasiado!'"
        }
    },
    {
        "id": 4,
        "culpable": "Wolff",
        "arma": "HerramientaFIA",
        "locacion": "ZonaPesaje",
        "victima": "Lando y Oscar (Ambos)",
        "narrativa_final": "HISTORIA 4: Caos Político. Toto, furioso por la 'ventaja ilegal' del alerón de McLaren, no saboteó los coches. ¡Saboteó la *inspección*! Entregó anónimamente a la FIA una herramienta de medición de flexibilidad *falsa* (calibrada para fallar). La FIA, usándola, declara ambos McLaren ilegales.",
        "pistas": {
            "Wolff": "Toto sonríe. 'Solo quiero un deporte justo. Espero que los comisarios revisen esos *alerones muy* de cerca'.",
            "ZonaPesaje": "Un comisario de la FIA se queja de que 'las nuevas *herramientas de medición* de flexibilidad' están dando lecturas extrañas en los McLaren.",
            "GarajeMcLaren": "Los ingenieros están furiosos, te muestran sus datos. '¡Nuestros alerones son 100% legales! ¡Es la *herramienta* de la FIA la que está mal!'",
            "Verstappen": "Max se ríe. 'Si es ilegal, es ilegal. No es mi problema'."
        }
    },
    {
        "id": 5,
        "culpable": "Norris",
        "arma": "Telemetria",
        "locacion": "MotorhomeMcLaren",
        "victima": "Oscar Piastri",
        "narrativa_final": "HISTORIA 5: El Robo de Datos. Lando sabe que Piastri es más rápido en este circuito. No dañó el coche, pero necesitaba la ventaja. Usó su acceso de piloto N°1 para copiar la configuración completa y los datos de simulación del lado del garaje de Piastri, asegurando que él tendría la mejor estrategia.",
        "pistas": {
            "Norris": "Lando parece confiado. 'Solo estoy trabajando duro. Viendo todos los *datos* disponibles... de todo el equipo'.",
            "MotorhomeMcLaren": "Los servidores de Piastri fueron accedidos desde la terminal de Lando a las 4 AM. El log dice: 'Copia de seguridad de *datos de simulación*'.",
            "Piastri": "Oscar está lívido. '¡Es increíble, Lando está usando la *configuración* exacta que yo probé ayer! ¡Mis *datos* secretos!'",
            "Brown": "Zak parece nervioso. 'La tensión entre pilotos es normal. Ambos quieren ganar'."
        }
    }
];

// ---- 2. ESTADO DEL JUEGO ----
let historiaVerdadera;
let turnosRestantes;
let pistasEncontradas;
let botonesDeAccion;

// ---- 3. ELEMENTOS DEL DOM ----
// Pantallas
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
const accusationScreen = document.getElementById('accusation-screen');
const resultScreen = document.getElementById('result-screen');

// Intro
const introReport = document.getElementById('intro-report');
const introClue = document.getElementById('intro-clue');

// Botones
const btnStart = document.getElementById('btn-start');
const btnMakeAccusation = document.getElementById('btn-make-accusation');
const btnConfirmAccusation = document.getElementById('btn-confirm-accusation');
const btnRestart = document.getElementById('btn-restart');

// Contenido dinámico
const turnCounter = document.getElementById('turn-counter');
const clueLog = document.getElementById('clue-log');
const actionControls = document.getElementById('action-controls');
const gameScenarioImage = document.getElementById('game-scenario-image'); // NUEVO: Imagen del juego

// Formulario de Acusación
const selectCulpable = document.getElementById('select-culpable');
const selectArma = document.getElementById('select-arma');
const selectLocacion = document.getElementById('select-locacion');

// Resultado
const resultTitle = document.getElementById('result-title');
const resultStoryText = document.getElementById('result-story-text');

// Modal de Ayuda
const btnHelp = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const helpList = document.getElementById('help-list');
const modalClose = document.querySelector('.modal-close');


// ---- 4. LÓGICA DEL JUEGO ----

/** Muestra una pantalla y oculta las demás */
function showScreen(screenId) {
    introScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    accusationScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');

    document.getElementById(screenId).classList.remove('hidden');
}

/** Inicia una nueva partida */
function iniciarJuego() {
    // 1. Elegir una historia secreta
    historiaVerdadera = HISTORIAS[Math.floor(Math.random() * HISTORIAS.length)];
    
    // 2. Resetear estado
    turnosRestantes = 5;
    pistasEncontradas = [];
    
    // 3. Resetear UI
    actualizarTurnCounter();
    actualizarClueLog(true);
    btnMakeAccusation.disabled = true;

    // 4. ACTUALIZAR REPORTE DE INCIDENTE (Víctima y Método)
    introReport.textContent = `REPORTE DE INCIDENTE: ¡El coche de ${historiaVerdadera.victima} ha sido el objetivo principal!`;
    introClue.innerHTML = `REPORTE DE DAÑOS: ${EVIDENCIA_INICIAL[historiaVerdadera.arma]}`;

    // 5. Establecer la imagen inicial del escenario en la pantalla de juego
    gameScenarioImage.src = IMAGENES_ESCENARIOS_INICIALES[historiaVerdadera.id] || IMAGEN_GENERICA_PISTA_DEFECTO;
    gameScenarioImage.alt = `Escenario inicial del sabotaje - Historia ${historiaVerdadera.id}`;


    // 6. Reactivar todos los botones de acción
    if (!botonesDeAccion) {
        botonesDeAccion = document.querySelectorAll('.btn-action');
    }
    botonesDeAccion.forEach(btn => {
        btn.disabled = false;
    });

    // 7. Poblar el modal de ayuda (solo una vez)
    if(helpList.children.length === 0) {
        poblarAyuda();
    }

    // 8. Mostrar la pantalla de intro
    showScreen('intro-screen');
}

/** Maneja el clic en un botón de acción (Interrogar/Investigar) */
function manejarAccion(e) {
    if (turnosRestantes <= 0 || !e.target.classList.contains('btn-action')) {
        return;
    }

    const boton = e.target;
    const sujeto = boton.dataset.sujeto; 

    // 1. Desactivar botón
    boton.disabled = true;

    // 2. OBTENER PISTA (LÓGICA MEJORADA)
    const pista = historiaVerdadera.pistas[sujeto] || COARTADAS_NEUTRALES[sujeto];
    
    pistasEncontradas.push({
        texto: pista,
        esSospechosa: !!historiaVerdadera.pistas[sujeto] 
    });
    actualizarClueLog();

    // 3. ACTUALIZAR IMAGEN DE LA PANTALLA DE JUEGO (NUEVO)
    gameScenarioImage.src = IMAGENES_PISTAS[sujeto] || IMAGEN_GENERICA_PISTA_DEFECTO;
    gameScenarioImage.alt = `Investigando a ${sujeto}`;


    // 4. Reducir turno
    turnosRestantes--;
    actualizarTurnCounter();

    // 5. Comprobar fin de turnos
    if (turnosRestantes === 0) {
        btnMakeAccusation.disabled = false;
        botonesDeAccion.forEach(btn => btn.disabled = true);
    }
}

/** Actualiza el contador de turnos en la UI */
function actualizarTurnCounter() {
    turnCounter.textContent = `Turnos Restantes: ${turnosRestantes}`;
}

/** Actualiza el log de pistas en la UI */
function actualizarClueLog(reset = false) {
    if (reset) {
        clueLog.innerHTML = '<p class="placeholder">Aún no has encontrado pistas...</p>';
        return;
    }

    if (pistasEncontradas.length === 1) {
        clueLog.innerHTML = '';
    }

    const nuevaPista = pistasEncontradas[pistasEncontradas.length - 1];
    const nuevaPistaEl = document.createElement('p');

    if (nuevaPista.esSospechosa) {
        nuevaPistaEl.innerHTML = `Pista ${pistasEncontradas.length}: <span style="color: #f87171;">(SOSPECHOSO)</span> ${nuevaPista.texto}`;
    } else {
        nuevaPistaEl.textContent = `Pista ${pistasEncontradas.length}: ${nuevaPista.texto}`;
    }
    
    clueLog.appendChild(nuevaPistaEl);
    clueLog.scrollTop = clueLog.scrollHeight; 
}

/** Llena los menús desplegables de la pantalla de acusación */
function poblarAcusacionDropdowns() {
    selectCulpable.innerHTML = '';
    selectArma.innerHTML = '';
    selectLocacion.innerHTML = '';

    selectCulpable.innerHTML += `<option value="">Elige un culpable...</option>`;
    selectArma.innerHTML += `<option value="">Elige un método...</option>`;
    selectLocacion.innerHTML += `<option value="">Elige una locación...</option>`;

    for (const key in SOSPECHOSOS) {
        selectCulpable.innerHTML += `<option value="${key}">${SOSPECHOSOS[key]}</option>`;
    }
    for (const key in ARMAS) {
        selectArma.innerHTML += `<option value="${key}">${ARMAS[key]}</option>`;
    }
    for (const key in LOCACIONES) {
        selectLocacion.innerHTML += `<option value="${key}">${LOCACIONES[key]}</option>`;
    }
}

/** Muestra la pantalla de acusación */
function mostrarPantallaAcusacion() {
    poblarAcusacionDropdowns();
    showScreen('accusation-screen');
}

/** Comprueba la acusación final del jugador */
function comprobarAcusacion() {
    const culpable = selectCulpable.value;
    const arma = selectArma.value;
    const locacion = selectLocacion.value;

    const esVictoria = (
        culpable === historiaVerdadera.culpable &&
        arma === historiaVerdadera.arma &&
        locacion === historiaVerdadera.locacion
    );

    mostrarResultado(esVictoria);
}

/** Muestra la pantalla de resultado final */
function mostrarResultado(esVictoria) {
    if (esVictoria) {
        resultTitle.textContent = "¡Caso Resuelto!";
        resultTitle.style.color = "#22c55e"; 
    } else {
        resultTitle.textContent = "¡Incorrecto! El culpable escapó.";
        resultTitle.style.color = "#ef4444"; 
    }
    
    resultStoryText.textContent = historiaVerdadera.narrativa_final;
    showScreen('result-screen');
}

// ---- LÓGICA DEL MODAL DE AYUDA ----
function poblarAyuda() {
    helpList.innerHTML = '';
    for (const key in AYUDA_LOCACIONES) {
        const li = document.createElement('li');
        li.innerHTML = AYUDA_LOCACIONES[key];
        helpList.appendChild(li);
    }
}
function mostrarModalAyuda() {
    helpModal.classList.remove('hidden');
}
function ocultarModalAyuda() {
    helpModal.classList.add('hidden');
}

// ---- 5. EVENT LISTENERS ----
btnStart.addEventListener('click', () => showScreen('game-screen')); 
actionControls.addEventListener('click', manejarAccion);
btnMakeAccusation.addEventListener('click', mostrarPantallaAcusacion);
btnConfirmAccusation.addEventListener('click', comprobarAcusacion);
btnRestart.addEventListener('click', iniciarJuego);

btnHelp.addEventListener('click', mostrarModalAyuda);
modalClose.addEventListener('click', ocultarModalAyuda);
helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        ocultarModalAyuda();
    }
});

// Iniciar
iniciarJuego(); 
showScreen('intro-screen');