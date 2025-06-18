# ─── BACKEND ───────────────────────────────────────────
FROM python:3.12-slim AS backend
WORKDIR /app

# 1) Copio requirements.txt (ya estoy en /repo/backend como contexto)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 2) Copio TODO el backend (manage.py, apps, config…)
COPY . .

EXPOSE 8000
CMD ["gunicorn", "config.asgi:application", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000", "--log-level", "info"]
