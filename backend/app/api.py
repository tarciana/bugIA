 from fastapi import APIRouter, Depends, HTTPException, status
    from fastapi.security import OAuth2PasswordBearer
    from sqlalchemy.orm import Session
    from .models import Usuario, Transacao, LoginRequest, TransferenciaRequest, PagamentoRequest
    from .services import (
        criar_usuario,
        realizar_login,
        listar_transacoes,
        realizar_transferencia,
        realizar_deposito,
        realizar_pagamento,
        obter_usuario_por_email,
        obter_usuario_por_id
    )
    from .database import get_db

    router = APIRouter()
    # Não há necessidade de instanciar o OAuth2PasswordBearer aqui, pois não estamos usando JWT

    @router.post("/usuarios/", response_model=Usuario, status_code=status.HTTP_201_CREATED)
    def criar_novo_usuario(usuario: Usuario, db: Session = Depends(get_db)):
        """Cria um novo usuário."""
        return criar_usuario(db, usuario)

    @router.post("/login/", response_model=Usuario)
    def login(login_request: LoginRequest, db: Session = Depends(get_db)):
        """Realiza o login de um usuário."""
        return realizar_login(db, login_request)

    @router.get("/usuarios/{usuario_id}", response_model=Usuario)
    def obter_usuario(usuario_id: int, db: Session = Depends(get_db)):
        """Obtém um usuário pelo ID."""
        return obter_usuario_por_id(db, usuario_id)

    @router.get("/transacoes/{usuario_id}", response_model=list[Transacao])
    def listar_transacoes_usuario(usuario_id: int, db: Session = Depends(get_db)):
        """Lista as transações de um usuário."""
        return listar_transacoes(db, usuario_id)

    @router.post("/transferencias/{usuario_id}")
    def transferir(
        usuario_id: int,
        transferencia_request: TransferenciaRequest,
        db: Session = Depends(get_db)
    ):
        """Realiza uma transferência."""
        realizar_transferencia(db, usuario_id, transferencia_request)
        return {"mensagem": "Transferência realizada com sucesso"}

    @router.post("/depositos/{usuario_id}")
    def depositar(usuario_id: int, valor: float, db: Session = Depends(get_db)):
        """Realiza um depósito."""
        realizar_deposito(db, usuario_id, valor)
        return {"mensagem": "Depósito realizado com sucesso"}

    @router.post("/pagamentos/{usuario_id}")
    def pagar(usuario_id: int, pagamento_request: PagamentoRequest, db: Session = Depends(get_db)):
        """Realiza um pagamento."""
        realizar_pagamento(db, usuario_id, pagamento_request)
        return {"mensagem": "Pagamento realizado com sucesso"}
    ```