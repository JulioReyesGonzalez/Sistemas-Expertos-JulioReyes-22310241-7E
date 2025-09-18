# -*- coding: utf-8 -*-
"""

PRACTICA 1 – INTELIGENCIA ARTIFICIAL APLICADA A LA VIDA REAL

Este programa demuestra tres algoritmos de IA implementado

1) **KNN (k-Nearest Neighbors)**:
   Clasifica una talla de camiseta (S/M/L/XL) usando altura y peso.

2) **Regresión Lineal**:
   Predice el costo de transporte mensual según kilómetros diarios.

3) **K-Means**:
   Agrupa hábitos de estudio en dos grupos (tarde/noche) según
   hora de inicio y duración.

El programa genera datos sintéticos, ejecuta los algoritmos,
imprime los resultados en consola y guarda la gráfica de la
regresión en un archivo PNG.
"""

import math
import numpy as np
from collections import Counter
import matplotlib.pyplot as plt

# --------------------------- UTILIDADES GENERALES ---------------------------
rng = np.random.default_rng(42)  # Generador de números aleatorios para reproducibilidad

def kfold_indices(n, k=5, seed=42):
    """
    Genera índices para validación cruzada K-Fold.
    Sirve para dividir los datos en k subconjuntos y entrenar/probar de forma justa.
    """
    idx = np.arange(n)
    rng_local = np.random.default_rng(seed)
    rng_local.shuffle(idx)
    folds = np.array_split(idx, k)
    return folds

# --------------------------- 1) KNN -------------------------------
def generar_dataset_tallas(n_por_clase=60):
    """
    Genera datos simulados de personas con altura y peso.
    Se crean 4 grupos representando tallas S, M, L, XL.
    """
    data = []
    # Parámetros medios y desviaciones estándar de cada talla
    specs = {
        "S":  {"h_mean": 162, "h_std": 4, "w_mean": 56,  "w_std": 4},
        "M":  {"h_mean": 172, "h_std": 5, "w_mean": 70,  "w_std": 5},
        "L":  {"h_mean": 180, "h_std": 5, "w_mean": 82,  "w_std": 6},
        "XL": {"h_mean": 187, "h_std": 5, "w_mean": 95,  "w_std": 7},
    }
    for label, p in specs.items():
        alturas = rng.normal(p["h_mean"], p["h_std"], n_por_clase)
        pesos   = rng.normal(p["w_mean"], p["w_std"], n_por_clase)
        # Limitamos a rangos realistas
        alturas = np.clip(alturas, 150, 200)
        pesos   = np.clip(pesos, 45, 120)
        for h, w in zip(alturas, pesos):
            data.append([round(h, 1), round(w, 1), label])
    arr = np.array(data, dtype=object)
    X = arr[:, :2].astype(float)  # Altura y peso
    y = arr[:, 2].astype(str)     # Etiqueta de talla
    return X, y

class KNN:
    """
    Implementación simple de k-Nearest Neighbors.
    """
    def __init__(self, k=7, weighted=True):
        self.k = k
        self.weighted = weighted  # Si True, pondera vecinos por distancia
        self.X = None
        self.y = None

    @staticmethod
    def _euclidean(a, b):
        # Calcula la distancia Euclidiana entre dos puntos
        return math.sqrt(sum((ai - bi)**2 for ai, bi in zip(a, b)))

    def fit(self, X, y):
        # "Entrena" guardando los datos
        self.X = X.astype(float)
        self.y = y

    def predict_one(self, x):
        # Predice la clase de un solo ejemplo
        dists = [(self._euclidean(xi, x), yi) for xi, yi in zip(self.X, self.y)]
        dists.sort(key=lambda t: t[0])
        vecinos = dists[:self.k]
        if not self.weighted:
            # Voto simple
            votos = Counter([yi for _, yi in vecinos])
            return votos.most_common(1)[0][0]
        # Voto ponderado (más peso a vecinos cercanos)
        eps = 1e-8
        pesos = {}
        for d, yi in vecinos:
            w = 1.0 / (d + eps)
            pesos[yi] = pesos.get(yi, 0.0) + w
        return max(pesos.items(), key=lambda kv: kv[1])[0]

    def predict(self, X):
        # Predice la clase de varios ejemplos
        return np.array([self.predict_one(x) for x in X])

def accuracy(y_true, y_pred):
    """ Calcula la exactitud: % de aciertos """
    return float(np.mean(y_true == y_pred))

def correr_knn():
    # Generar dataset de tallas
    X, y = generar_dataset_tallas(60)
    folds = kfold_indices(len(y), k=5)
    knn = KNN(k=7, weighted=True)
    scores = []
    # Validación cruzada
    for i in range(5):
        test_idx = folds[i]
        train_idx = np.concatenate([folds[j] for j in range(5) if j != i])
        knn.fit(X[train_idx], y[train_idx])
        y_pred = knn.predict(X[test_idx])
        scores.append(accuracy(y[test_idx], y_pred))
    mean_acc = float(np.mean(scores))
    knn.fit(X, y)
    pred_talla = knn.predict(np.array([[174.0, 72.0]]))[0]  # Ejemplo de prueba
    return {"accuracy_5fold": round(mean_acc, 3), "pred_174_72": pred_talla}

# --------------------------- 2) REGRESIÓN LINEAL ------------------
def generar_dataset_transporte(n=40):
    """
    Genera datos de km diarios y costo de transporte.
    Modelo: costo ≈ a_real * km + b_real + ruido
    """
    a_real = 6.5
    b_real = 10.0
    kms = rng.uniform(4, 20, size=n)
    ruido = rng.normal(0, 8, size=n)
    costo = a_real * kms + b_real + ruido
    costo = np.clip(costo, 15, None)
    X = np.c_[np.ones(n), kms]  # Matriz con columna de 1's
    y = costo.reshape(-1, 1)
    return X, y, kms, costo

def regresion_lineal_normal_eq(X, y):
    """
    Ecuación normal:
    theta = (X^T X)^(-1) X^T y
    Devuelve parámetros [b, a].
    """
    XtX = X.T @ X
    Xty = X.T @ y
    theta = np.linalg.pinv(XtX) @ Xty
    return theta

def correr_regresion(fig_path="regresion_transporte_unico.png"):
    # Generar dataset de transporte
    X, y, kms, costo = generar_dataset_transporte(40)
    theta = regresion_lineal_normal_eq(X, y)
    b_est, a_est = float(theta[0, 0]), float(theta[1, 0])
    # Ejemplo: calcular costo mensual
    km_por_dia, dias_mes = 12.0, 22
    costo_diario_pred = a_est * km_por_dia + b_est
    costo_mensual_pred = float(costo_diario_pred * dias_mes)
    # Graficar dispersión + recta de regresión
    plt.figure()
    plt.scatter(kms, costo)
    xs = np.linspace(kms.min(), kms.max(), 100)
    ys = a_est * xs + b_est
    plt.plot(xs, ys)
    plt.xlabel("Kilómetros por día (ida+vuelta)")
    plt.ylabel("Costo diario (MXN)")
    plt.title("Regresión lineal: costo de transporte vs km/día")
    plt.tight_layout()
    plt.savefig(fig_path)
    plt.close()
    return {
        "a_MXN_por_km": round(a_est, 3),
        "b_MXN_base": round(b_est, 3),
        "costo_mensual_pred_12km_22dias": round(costo_mensual_pred, 2),
        "fig_guardada": fig_path
    }

# --------------------------- 3) K-MEANS ---------------------------
def generar_dataset_estudio(n=60):
    """
    Genera dataset con hora de inicio y duración de estudio.
    """
    n1 = n // 2
    n2 = n - n1
    tarde_hora = rng.normal(17.5, 0.8, size=n1)
    tarde_min = rng.normal(95, 20, size=n1)
    noche_hora = rng.normal(21.5, 0.9, size=n2)
    noche_min = rng.normal(120, 25, size=n2)
    hora = np.concatenate([tarde_hora, noche_hora])
    dur = np.concatenate([tarde_min, noche_min])
    hora = np.clip(hora, 14, 24)
    dur = np.clip(dur, 30, 240)
    return np.c_[hora, dur]

def kmeans(X, k=2, max_iter=100, seed=0):
    """
    Algoritmo K-Means:
    - Inicializa centroides al azar.
    - Reasigna puntos al centro más cercano.
    - Recalcula centroides hasta converger.
    """
    rng_local = np.random.default_rng(seed)
    n = X.shape[0]
    cent_idx = rng_local.choice(n, size=k, replace=False)
    centroids = X[cent_idx].copy()
    for _ in range(max_iter):
        dists = np.linalg.norm(X[:, None, :] - centroids[None, :, :], axis=2)
        labels = np.argmin(dists, axis=1)
        new_centroids = np.array([X[labels == j].mean(axis=0) for j in range(k)])
        for j in range(k):
            if np.isnan(new_centroids[j]).any():
                new_centroids[j] = X[rng_local.integers(0, n)]
        if np.allclose(new_centroids, centroids, atol=1e-4):
            centroids = new_centroids
            break
        centroids = new_centroids
    # SSE = suma de errores al cuadrado
    sse = 0.0
    for i in range(n):
        sse += np.sum((X[i] - centroids[labels[i]])**2)
    return labels, centroids, float(sse)

def correr_kmeans():
    X = generar_dataset_estudio(60)
    labels, centroids, sse = kmeans(X, k=2, seed=7)
    return {
        "centroides": [[round(float(centroids[i, 0]), 2), round(float(centroids[i, 1]), 1)] for i in range(2)],
        "SSE": round(float(sse), 2),
        "ejemplo_labels_conteo": [int((labels == 0).sum()), int((labels == 1).sum())]
    }

# --------------------------- PROGRAMA PRINCIPAL ---------------------------
def main():
    print(">>> CORRIENDO PRÁCTICA 1 CON 3 CASOS DE IA")
    # Caso 1: KNN
    res_knn = correr_knn()
    print("[KNN] Exactitud media 5-fold:", res_knn["accuracy_5fold"],
          "| Pred(174cm, 72kg):", res_knn["pred_174_72"])
    # Caso 2: Regresión Lineal
    res_rl = correr_regresion()
    print("[Regresión] a:", res_rl["a_MXN_por_km"], "b:", res_rl["b_MXN_base"],
          "| Costo mensual (12km/día,22d):", res_rl["costo_mensual_pred_12km_22dias"], "MXN")
    print("[Regresión] Figura guardada en:", res_rl["fig_guardada"])
    # Caso 3: K-Means
    res_km = correr_kmeans()
    print("[K-Means] Centroides:", res_km["centroides"], "| SSE:", res_km["SSE"],
          "| Conteo [cluster0, cluster1]:", res_km["ejemplo_labels_conteo"])

if __name__ == "__main__":
    main()

# --------------------------- GLOSARIO ---------------------------
"""
KNN (k-Nearest Neighbors): Algoritmo de clasificación basado en la
similaridad con los k vecinos más cercanos en el espacio de datos.

Regresión Lineal: Modelo que ajusta una línea recta para relacionar
una variable dependiente (y) con una o más variables independientes (x).

Ecuación Normal: Fórmula cerrada para calcular los parámetros de la
regresión sin iteraciones.

K-Means: Algoritmo de agrupamiento no supervisado que intenta dividir
los datos en k grupos minimizando la distancia dentro de cada grupo.

Centroides: Puntos promedio de cada grupo encontrados por K-Means.

SSE (Suma de Errores al Cuadrado): Medida de qué tan compactos están
los puntos alrededor de sus centroides (menor SSE = mejor agrupamiento).
"""
