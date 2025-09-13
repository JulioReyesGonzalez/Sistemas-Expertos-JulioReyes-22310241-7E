from flask import Flask, render_template, request, jsonify, session
from flask import g
import sqlite3
import os
import difflib

APP_NAME = "Registro_Adquirir_Conocimiento"
DATABASE = os.path.join(os.path.dirname(__file__), "knowledge.db")

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS qa (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pattern TEXT NOT NULL UNIQUE,
            answer TEXT NOT NULL
        )
    """)
    db.commit()
    # Seed defaults if table is empty
    cur = db.execute("SELECT COUNT(*) as c FROM qa")
    if cur.fetchone()["c"] == 0:
        seeds = [
            ("hola", "¡Hola! ¿Cómo estás?"),
            ("como estas", "Muy bien, gracias. ¿De qué te gustaría hablar?"),
            ("de que te gustaria hablar", "Podemos hablar de tecnología, mecatrónica o lo que quieras 😄"),
        ]
        for p, a in seeds:
            try:
                db.execute("INSERT INTO qa (pattern, answer) VALUES (?,?)", (p, a))
            except sqlite3.IntegrityError:
                pass
        db.commit()

def normalize(text):
    return ''.join(ch.lower() for ch in text.strip() if ch.isalnum() or ch.isspace())

def find_best_answer(query):
    qn = normalize(query)
    db = get_db()
    rows = db.execute("SELECT pattern, answer FROM qa").fetchall()
    patterns = [row["pattern"] for row in rows]
    answers_map = {row["pattern"]: row["answer"] for row in rows}

    # Exact match
    if qn in answers_map:
        return answers_map[qn], 1.0

    # Close match via difflib
    matches = difflib.get_close_matches(qn, patterns, n=1, cutoff=0.9)
    if matches:
        return answers_map[matches[0]], difflib.SequenceMatcher(None, qn, matches[0]).ratio()

    # Substring heuristic
    for p in patterns:
        if qn in p or p in qn:
            return answers_map[p], 0.8

    return None, 0.0

def teach_qa(pattern, answer):
    db = get_db()
    try:
        db.execute("INSERT OR REPLACE INTO qa (pattern, answer) VALUES (?,?)", (normalize(pattern), answer))
        db.commit()
        return True
    except sqlite3.Error as e:
        print("DB error:", e)
        return False

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get("SECRET_KEY","dev-secret")
    app.teardown_appcontext(close_db)

    @app.before_request
    def ensure_db():
        init_db()

    @app.route("/")
    def index():
        return render_template("index.html", app_name=APP_NAME)

    @app.post("/message")
    def message():
        data = request.get_json(force=True)
        user_msg = (data.get("message") or "").strip()
        if not user_msg:
            return jsonify({"reply": "No recibí texto. ¿Puedes repetirlo?"})

        # If we're expecting teaching input
        pending = session.get("pending_teach")
        if pending:
            taught = teach_qa(pending, user_msg)
            session.pop("pending_teach", None)
            if taught:
                return jsonify({"reply": f"¡Gracias! Aprendí cómo responder a: \"{pending}\""})
            else:
                return jsonify({"reply": "No pude guardar el conocimiento. Intenta de nuevo, por favor."})

        # Try to answer
        answer, score = find_best_answer(user_msg)
        if answer:
            return jsonify({"reply": answer})

        # Ask to teach if no good match
        session["pending_teach"] = user_msg
        return jsonify({"reply": f"No encontré una respuesta para \"{user_msg}\". ¿Qué debería responder cuando alguien me diga eso?"})

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
