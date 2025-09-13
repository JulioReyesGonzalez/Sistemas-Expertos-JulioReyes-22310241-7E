# Registro_Adquirir_Conocimiento

Chat sencillo con adquisición de conocimiento (incremental).

## Características
- 3 líneas precargadas (semillas): "Hola", "¿Cómo estás?", "¿De qué te gustaría hablar?"
- Si no hay *match* perfecto, el bot pregunta cómo debería responder y **aprende** (guarda Q/A en SQLite).
- Coincidencia por:
  - Normalización y *match* exacto.
  - Semejanza por `difflib` (umbral 0.9).
  - Heurística de subcadenas.

## Stack
- Python 3.10+
- Flask
- SQLite (archivo local `knowledge.db`)

## Cómo ejecutar
```bash
pip install -r requirements.txt
python app.py
# abre http://localhost:5000
```

## Estructura
```
Registro_Adquirir_Conocimiento/
├── app.py
├── knowledge.db (se crea automáticamente)
├── requirements.txt
├── templates/
│   └── index.html
└── README.md
```

## Notas de evaluación
- El flujo de **adquisición** se gestiona con `session["pending_teach"]`: 
  - Cuando el bot no encuentra respuesta, pregunta qué contestar para ese enunciado.
  - La siguiente entrada del usuario se guarda como conocimiento.
- El patrón se guarda normalizado para robustez.
