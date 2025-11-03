// ---- 1. CONSTANTES DE DATOS ----

// Base de conocimiento inicial (se carga si localStorage tiene < 20 jugadores)
// null = "No sé"
const baseConocimientoDefault = [
    // Europa
    { nombre: 'Kylian Mbappé', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: true, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Erling Haaland', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Jude Bellingham', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: true, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Kevin De Bruyne', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Virgil van Dijk', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: false, esDefensa: true, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Luka Modrić', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Thibaut Courtois', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: false, esDefensa: false, esPortero: true, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Zinedine Zidane', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: true, ganoMundial: true, esActivo: false, esSudamericano: false, esEuropeo: true },
    { nombre: 'Paolo Maldini', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: false, esDefensa: true, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: false, esSudamericano: false, esEuropeo: true },
    { nombre: 'Thierry Henry', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: true, esActivo: false, esSudamericano: false, esEuropeo: true },

    // América
    { nombre: 'Lionel Messi', juegaEuropa: false, juegaAmerica: true, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: true, esActivo: true, esSudamericano: true, esEuropeo: false },
    { nombre: 'Vinícius Júnior', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: true, esEuropeo: false },
    { nombre: 'Federico Valverde', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: true, esEuropeo: false },
    { nombre: 'Alphonso Davies', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: false, esDefensa: true, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false }, // Norteamérica
    { nombre: 'Diego Maradona', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: true, esActivo: false, esSudamericano: true, esEuropeo: false },
    { nombre: 'Pelé', juegaEuropa: false, juegaAmerica: true, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: true, esActivo: false, esSudamericano: true, esEuropeo: false },
    { nombre: 'Ronaldo Nazário', juegaEuropa: true, juegaAmerica: true, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: true, esActivo: false, esSudamericano: true, esEuropeo: false },
    { nombre: 'Ronaldinho', juegaEuropa: true, juegaAmerica: true, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: true, ganoMundial: true, esActivo: false, esSudamericano: true, esEuropeo: false },
    
    // Asia / Medio Oriente
    { nombre: 'Cristiano Ronaldo', juegaEuropa: false, juegaAmerica: false, juegaAsia: true, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: true },
    { nombre: 'Neymar Jr.', juegaEuropa: false, juegaAmerica: false, juegaAsia: true, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: false, esActivo: true, esSudamericano: true, esEuropeo: false },
    { nombre: 'Son Heung-min', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false }, // Asiático
    { nombre: 'Kim Min-jae', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: false, esMediocampista: false, esDefensa: true, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false }, // Asiático
    
    // África
    { nombre: 'Mohamed Salah', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: true, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: true, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false },
    { nombre: 'Victor Osimhen', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: true, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false },
    { nombre: 'Achraf Hakimi', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: true, esDelantero: false, esMediocampista: false, esDefensa: true, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false },
    { nombre: 'Sadio Mané', juegaEuropa: false, juegaAmerica: false, juegaAsia: true, juegaAfrica: true, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false },
    { nombre: 'Didier Drogba', juegaEuropa: true, juegaAmerica: true, juegaAsia: true, juegaAfrica: true, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: false, esSudamericano: false, esEuropeo: false },
    { nombre: 'Samuel Eto\'o', juegaEuropa: true, juegaAmerica: false, juegaAsia: true, juegaAfrica: true, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: true, usaDorsal10: false, ganoMundial: false, esActivo: false, esSudamericano: false, esEuropeo: false },
    
    // Oceanía
    { nombre: 'Tim Cahill', juegaEuropa: true, juegaAmerica: true, juegaAsia: true, juegaAfrica: false, esDelantero: true, esMediocampista: true, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: false, ganoMundial: false, esActivo: false, esSudamericano: false, esEuropeo: false }, // Australiano
    { nombre: 'Sam Kerr', juegaEuropa: true, juegaAmerica: false, juegaAsia: false, juegaAfrica: false, esDelantero: true, esMediocampista: false, esDefensa: false, esPortero: false, esAlto: false, usaDorsal10: false, ganoMundial: false, esActivo: true, esSudamericano: false, esEuropeo: false }, // Australiana (Bonus)
];

// Base de preguntas
const preguntasBase = {
    juegaEuropa: '¿Tu futbolista juega en un club de Europa actualmente?',
    juegaAmerica: '¿Tu futbolista juega en un club de América (Norte o Sur) actualmente?',
    juegaAsia: '¿Tu futbolista juega en un club de Asia o Medio Oriente actualmente?',
    esSudamericano: '¿Tu futbolista es de nacionalidad sudamericana?',
    esEuropeo: '¿Tu futbolista es de nacionalidad europea?',
    juegaAfrica: '¿Tu futbolista es de nacionalidad africana?',
    esActivo: '¿Tu futbolista sigue jugando profesionalmente?',
    ganoMundial: '¿Tu futbolista ha ganado la Copa del Mundo de la FIFA?',
    esDelantero: '¿Tu futbolista es conocido principalmente como delantero?',
    esMediocampista: '¿Tu futbolista es conocido principalmente como mediocampista?',
    esDefensa: '¿Tu futbolista es conocido principalmente como defensa?',
    esPortero: '¿Tu futbolista es portero?',
    esAlto: '¿Tu futbolista mide más de 1.85m (es considerado alto)?',
    usaDorsal10: '¿Tu futbolista es famoso por usar (o haber usado) el dorsal 10?',
};

// ---- 2. ESTADO DEL JUEGO ----
let jugadores = [];
let preguntasDB = {};
let candidatos = [];
let preguntasHechas = new Set();
let preguntaActual = null;
let historialRespuestas = [];
let candidatosAmbiguos = []; // Para el aprendizaje
let jugadorAdivinado = null; // Para guardar la adivinanza

// ---- 3. ELEMENTOS DEL DOM ----
const questionText = document.getElementById('question-text');
const messageText = document.getElementById('message-text');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const btnUnknown = document.getElementById('btn-unknown');
const btnRestart = document.getElementById('btn-restart');

const gameUI = document.getElementById('game-ui');
const gameControls = document.getElementById('game-controls');

// Nuevos elementos para la adivinanza
const guessControls = document.getElementById('guess-controls');
const btnGuessYes = document.getElementById('btn-guess-yes');
const btnGuessNo = document.getElementById('btn-guess-no');

// Elementos de aprendizaje
const learningUI = document.getElementById('learning-ui');
const learningTitle = document.getElementById('learning-title');
const newPlayerNameInput = document.getElementById('new-player-name');
const newQuestionTextInput = document.getElementById('new-question-text');
const btnSubmitNewPlayer = document.getElementById('btn-submit-new-player');

// ---- 4. LÓGICA DE LOCALSTORAGE ----

function cargarDBs() {
    let jugadoresGuardados = [];
    let preguntasGuardadas = {};
    try {
        jugadoresGuardados = JSON.parse(localStorage.getItem('futbolistasDB_v2')) || [];
        preguntasGuardadas = JSON.parse(localStorage.getItem('preguntasDB_v2')) || {};
    } catch (e) {
        console.error("Error al cargar localStorage:", e);
        jugadoresGuardados = [];
        preguntasGuardadas = {};
    }

    // REGLA: Si hay menos de 20 jugadores, recargar la base completa.
    if (jugadoresGuardados.length < 20) {
        console.warn("Base de datos incompleta o corrupta. Recargando base por defecto.");
        jugadores = [...baseConocimientoDefault];
        preguntasDB = { ...preguntasBase };
        guardarDBs();
    } else {
        jugadores = jugadoresGuardados;
        preguntasDB = preguntasGuardadas;
    }
}

function guardarDBs() {
    try {
        localStorage.setItem('futbolistasDB_v2', JSON.stringify(jugadores));
        localStorage.setItem('preguntasDB_v2', JSON.stringify(preguntasDB));
    } catch (e) {
        console.error("Error al guardar en localStorage:", e);
    }
}

// ---- 5. LÓGICA PRINCIPAL DEL JUEGO ----

function iniciarJuego() {
    cargarDBs(); // Carga o recarga la DB
    
    // Resetea el estado del juego
    candidatos = [...jugadores];
    preguntasHechas.clear();
    historialRespuestas = [];
    candidatosAmbiguos = [];
    preguntaActual = null;
    jugadorAdivinado = null;

    // Resetea la UI
    mostrarJuegoUI();
    messageText.classList.add('hidden');
    messageText.textContent = '';
    
    // Inicia el ciclo
    siguientePregunta();
}

function siguientePregunta() {
    // Caso 1: Adivinanza (Solo queda 1 candidato)
    if (candidatos.length === 1) {
        hacerAdivinanzaFinal(candidatos[0]);
        return;
    }

    // Caso 2: Derrota (sin candidatos)
    if (candidatos.length === 0) {
        mostrarDerrota(false);
        return;
    }

    // Caso 3: Seguir preguntando
    preguntaActual = elegirMejorPregunta();

    // Caso 4: Derrota (ambigüedad, no hay más preguntas)
    if (preguntaActual === null) {
        mostrarDerrota(true); // Derrota por ambigüedad
        return;
    }

    // Mostrar la pregunta elegida
    preguntasHechas.add(preguntaActual.clave);
    mostrarPregunta(preguntaActual.texto);
}

/**
 * Esta es la función de "desempate inteligente".
 * Busca la pregunta (no hecha) que mejor divida al grupo de candidatos restantes.
 * La "mejor" pregunta es la que tiene la división más cercana a 50/50 (menor balance).
 */
function elegirMejorPregunta() {
    let mejorPregunta = null;
    let balanceMinimo = Infinity;

    const clavesPreguntas = Object.keys(preguntasDB);

    for (const clave of clavesPreguntas) {
        if (preguntasHechas.has(clave)) {
            continue; // Ya se hizo esta pregunta
        }

        // Contar cuántos candidatos tienen 'true', 'false' o 'null'
        let conteo = { true: 0, false: 0, null: 0 };
        let valoresUnicos = new Set();

        for (const candidato of candidatos) {
            const valor = candidato[clave];
            valoresUnicos.add(valor);
            if (valor === true) conteo.true++;
            else if (valor === false) conteo.false++;
            else conteo.null++;
        }

        // Si todos los candidatos tienen el mismo valor, esta pregunta no sirve
        if (valoresUnicos.size <= 1) {
            continue;
        }

        // Heurística de balance:
        // Queremos minimizar la diferencia entre el grupo más grande y el más pequeño.
        // Un balance perfecto es (ej. 5 sí, 5 no).
        const balance = Math.abs(conteo.true - conteo.false) + conteo.null; // Penalizamos 'null' un poco

        if (balance < balanceMinimo) {
            balanceMinimo = balance;
            mejorPregunta = { clave: clave, texto: preguntasDB[clave] };
        }
    }

    return mejorPregunta;
}

function manejarRespuesta(respuesta) {
    const clave = preguntaActual.clave;
    
    // Guardar para el historial (usado en aprendizaje)
    // Guardamos la respuesta, incluso si es 'nose'
    historialRespuestas.push({ clave: clave, respuesta: respuesta });

    // --- INICIO DE LA CORRECIÓN ---

    // Solo filtramos si la respuesta es 'si' o 'no'
    if (respuesta === 'si') {
        candidatos = candidatos.filter(c => c[clave] === true);
    } else if (respuesta === 'no') {
        candidatos = candidatos.filter(c => c[clave] === false);
    }
    // Si la respuesta es 'nose', NO HACEMOS NADA.
    // Mantenemos la lista de candidatos intacta y 
    // simplemente pasamos a la siguiente pregunta.

    // --- FIN DE LA CORRECIÓN ---

    siguientePregunta();
}

// ---- 6. LÓGICA DE APRENDIZAJE ----

function guardarNuevoJugador() {
    const nombre = newPlayerNameInput.value.trim();
    const preguntaTexto = newQuestionTextInput.value.trim();
    const respuestaSiNo = document.querySelector('input[name="new-answer"]:checked').value;

    if (!nombre || !preguntaTexto) {
        alert("Por favor, completa todos los campos para aprender.");
        return;
    }

    // 1. Crear la nueva clave y la nueva pregunta
    const nuevaClave = 'custom_' + Date.now();
    preguntasDB[nuevaClave] = preguntaTexto;

    // 2. Crear el nuevo jugador
    const nuevoJugador = { nombre: nombre };
    // 2a. Aplicar el historial de respuestas
    for (const h of historialRespuestas) {
        if (h.respuesta === 'si') nuevoJugador[h.clave] = true;
        else if (h.respuesta === 'no') nuevoJugador[h.clave] = false;
        else nuevoJugador[h.clave] = null;
    }
    // 2b. Aplicar la nueva pregunta
    nuevoJugador[nuevaClave] = (respuestaSiNo === 'si');

    // 3. Diferenciar: Actualizar los jugadores ambiguos
    // (Los que sobraron en la lista de candidatos cuando nos rendimos,
    // o el jugador que adivinamos mal)
    // Se les asigna el valor OPUESTO al nuevo jugador.
    const respuestaOpuesta = (respuestaSiNo === 'si') ? false : true;

    // Iteramos sobre la DB principal de jugadores
    jugadores = jugadores.map(jugador => {
        // ¿Es este uno de los jugadores ambiguos?
        const esAmbiguo = candidatosAmbiguos.find(c => c.nombre === jugador.nombre);
        if (esAmbiguo) {
            // Asignar la respuesta opuesta para diferenciarlo
            jugador[nuevaClave] = respuestaOpuesta;
        }
        return jugador;
    });

    // 4. Añadir el nuevo jugador a la DB
    jugadores.push(nuevoJugador);

    // 5. Guardar todo en localStorage y reiniciar
    guardarDBs();
    iniciarJuego();
}

// ---- 7. FUNCIONES DE UI (VISTAS) ----

function mostrarJuegoUI() {
    gameUI.style.display = 'block';
    gameControls.style.display = 'flex'; // Muestra S/N/NoSé
    
    // Oculta la UI de aprendizaje y le devuelve la clase .hidden
    learningUI.style.display = 'none';
    learningUI.classList.add('hidden'); // <-- AÑADE ESTO POR SEGURIDAD

    // Oculta los botones de adivinanza
    guessControls.style.display = 'none';
    guessControls.classList.add('hidden'); 
    
    messageText.classList.add('hidden');
    messageText.textContent = '';
    
    // Limpiar campos de aprendizaje
    newPlayerNameInput.value = '';
    newQuestionTextInput.value = '';
    document.getElementById('new-answer-yes').checked = true;
}

function mostrarPregunta(texto) {
    questionText.textContent = texto;
}

function hacerAdivinanzaFinal(jugador) {
    // Guarda el jugador que creemos que es
    jugadorAdivinado = jugador; 
    
    // Oculta los botones de S/N/NoSé
    gameControls.style.display = 'none';
    
    // Muestra los botones de confirmación de adivinanza
    guessControls.classList.remove('hidden');
    guessControls.style.display = 'flex';
    
    // Muestra la adivinanza como una pregunta
    questionText.textContent = `¿Estás pensando en... ${jugador.nombre}?`;
}

function mostrarVictoriaReal() {
    // Oculta todos los botones
    gameControls.style.display = 'none';
    guessControls.style.display = 'none';
    guessControls.classList.add('hidden');
    
    // Muestra el mensaje de victoria
    messageText.classList.remove('hidden');
    questionText.textContent = `¡Genial! Adiviné.`;
    messageText.textContent = `Tu jugador era ${jugadorAdivinado.nombre}.`;
}

function manejarAdivinanzaFallida() {
    // La IA adivinó mal. El jugador adivinado se convierte en el "candidato ambiguo"
    // que necesita ser diferenciado del nuevo jugador que el usuario va a enseñar.
    candidatosAmbiguos = [jugadorAdivinado];
    
    // Ocultar la UI del juego
    gameUI.style.display = 'none';
    guessControls.style.display = 'none';
    guessControls.classList.add('hidden');

    // Mostrar la UI de aprendizaje
    learningUI.classList.remove('hidden'); // <-- ¡ESTA ES LA CORRECCIÓN!
    learningUI.style.display = 'flex';
    learningTitle.textContent = `¡Fallé! Ayúdame a aprender.`;
}

function mostrarDerrota(porAmbiguedad) {
    candidatosAmbiguos = [...candidatos]; // Guardar los candidatos para el aprendizaje
    
    gameControls.style.display = 'none';
    gameUI.style.display = 'none';
    
    // Mostrar la UI de aprendizaje
    learningUI.classList.remove('hidden'); // <-- ¡ESTA ES LA CORRECCIÓN!
    learningUI.style.display = 'flex';
    
    if (porAmbiguedad) {
        learningTitle.textContent = `¡No pude decidir! Ayúdame a aprender.`;
    } else {
        learningTitle.textContent = `¡Me rindo! Ayúdame a aprender.`;
    }
}

// ---- 8. EVENT LISTENERS ----

// Iniciar el juego al cargar la página
document.addEventListener('DOMContentLoaded', iniciarJuego);

// Clics en botones de respuesta
btnYes.addEventListener('click', () => manejarRespuesta('si'));
btnNo.addEventListener('click', () => manejarRespuesta('no'));
btnUnknown.addEventListener('click', () => manejarRespuesta('nose'));

// Clic en reiniciar
btnRestart.addEventListener('click', iniciarJuego);

// Clic en aprender
btnSubmitNewPlayer.addEventListener('click', guardarNuevoJugador);

// Clics en botones de adivinanza final
btnGuessYes.addEventListener('click', mostrarVictoriaReal);
btnGuessNo.addEventListener('click', manejarAdivinanzaFallida);