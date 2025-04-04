from fastapi import FastAPI
from app.api import router as api_router  # Fixed import
from app.database import create_db_and_tables  # Corrected import
from fastapi.middleware.cors import CORSMiddleware  # Importar o CORS

app = FastAPI()

# Configurar o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens (em desenvolvimento)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(api_router)

@app.on_event("startup")
def on_startup():
    """Cria o banco de dados e as tabelas na inicialização da aplicação."""
    create_db_and_tables()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```

Este arquivo é o "botão de ligar" do banco. Ele faz o seguinte:

* Cria uma "instância" do FastAPI, que é o que faz o "cérebro" do banco funcionar.
* Inclui as "portas" que definimos em `api.py`.
* Cria o banco de dados e as tabelas onde as informações serão guardadas.
* Inicia o servidor, que é o programa que fica esperando os clientes se conectarem ao banco.

* `database.py`: A "caixa forte" do banco (configuração do banco de dados).

```python
# backend/app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL do banco de dados (SQLite no exemplo)
SQLALCHEMY_DATABASE_URL = "sqlite:///./bugia.db"

# Cria o engine do banco de dados
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False} #Necessário para SQLite
)

# Cria uma "fábrica" de sessões do banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define a classe base para os modelos do SQLAlchemy
Base = declarative_base()

def get_db():
    """Função para obter uma sessão do banco de dados."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_db_and_tables():
    """Cria o banco de dados e as tabelas se eles não existirem."""
    Base.metadata.create_all(bind=engine)
```