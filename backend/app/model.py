# backend/app/models.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

    class Usuario(BaseModel):
        id: Optional[int] = None
        nome: str
        email: str
        senha: str
        saldo: float = 0.0
        data_criacao: datetime = datetime.now()

    class Transacao(BaseModel):
        id: Optional[int] = None
        tipo: str  # "deposito", "transferencia", "pagamento"
        valor: float
        data: datetime = datetime.now()
        usuario_id: int
        destinatario_id: Optional[int] = None # Para transferências
        descricao: Optional[str] = None # Para pagamentos

    class LoginRequest(BaseModel):
        email: str
        senha: str

    class TransferenciaRequest(BaseModel):
        destinatario_id: int
        valor: float

    class PagamentoRequest(BaseModel):
        valor: float
        descricao: str