 from .models import Usuario, Transacao
    from typing import List
    from datetime import datetime
    from fastapi import HTTPException, status
    from sqlalchemy.orm import Session
    from sqlalchemy.exc import IntegrityError
    from passlib.hash import bcrypt # Importa o bcrypt

    def criar_usuario(db: Session, usuario: Usuario) -> Usuario:
        """Cria um novo usuário no banco de dados."""
        hashed_senha = bcrypt.hash(usuario.senha) # Hash da senha
        db_usuario = Usuario(
            nome=usuario.nome,
            email=usuario.email,
            senha=hashed_senha, # Salva o hash, não a senha em texto plano
            saldo=usuario.saldo,
            data_criacao=datetime.now()
        )
        try:
            db.add(db_usuario)
            db.commit()
            db.refresh(db_usuario)
            return db_usuario
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já cadastrado"
            )

    def obter_usuario_por_email(db: Session, email: str) -> Usuario | None:
        """Obtém um usuário pelo email."""
        return db.query(Usuario).filter(Usuario.email == email).first()

    def verificar_senha(senha: str, hashed_senha: str) -> bool:
        """Verifica se a senha fornecida corresponde ao hash armazenado."""
        return bcrypt.verify(senha, hashed_senha)

    def realizar_login(db: Session, login_request: LoginRequest) -> Usuario:
        """Realiza o login do usuário."""
        usuario = obter_usuario_por_email(db, login_request.email)
        if not usuario or not verificar_senha(login_request.senha, usuario.senha):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos"
            )
        return usuario

    def obter_usuario_por_id(db: Session, usuario_id: int) -> Usuario:
        """Obtém um usuário pelo ID."""
        usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        return usuario

    def atualizar_saldo(db: Session, usuario_id: int, novo_saldo: float) -> Usuario:
        """Atualiza o saldo de um usuário."""
        usuario = obter_usuario_por_id(db, usuario_id)
        usuario.saldo = novo_saldo
        db.commit()
        db.refresh(usuario)
        return usuario

    def criar_transacao(db: Session, transacao: Transacao) -> Transacao:
        """Cria uma nova transação."""
        db_transacao = Transacao(
            tipo=transacao.tipo,
            valor=transacao.valor,
            data=datetime.now(),
            usuario_id=transacao.usuario_id,
            destinatario_id=transacao.destinatario_id,
            descricao=transacao.descricao
        )
        db.add(db_transacao)
        db.commit()
        db.refresh(db_transacao)
        return db_transacao

    def listar_transacoes(db: Session, usuario_id: int) -> List[Transacao]:
        """Lista as transações de um usuário."""
        return db.query(Transacao).filter(Transacao.usuario_id == usuario_id).all()

    def realizar_transferencia(
        db: Session,
        remetente_id: int,
        transferencia_request: TransferenciaRequest
    ) -> None:
        """Realiza uma transferência entre usuários."""
        remetente = obter_usuario_por_id(db, remetente_id)
        destinatario = obter_usuario_por_id(db, transferencia_request.destinatario_id)
        valor = transferencia_request.valor

        if remetente.saldo < valor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Saldo insuficiente"
            )

        novo_saldo_remetente = remetente.saldo - valor
        novo_saldo_destinatario = destinatario.saldo + valor

        atualizar_saldo(db, remetente_id, novo_saldo_remetente)
        atualizar_saldo(db, transferencia_request.destinatario_id, novo_saldo_destinatario)

        criar_transacao(
            db,
            Transacao(
                tipo="transferencia",
                valor=valor,
                usuario_id=remetente_id,
                destinatario_id=transferencia_request.destinatario_id
            )
        )
        criar_transacao(
            db,
            Transacao(
                tipo="transferencia",
                valor=valor,
                usuario_id=transferencia_request.destinatario_id,
                destinatario_id=remetente_id
            )
        )

    def realizar_deposito(db: Session, usuario_id: int, valor: float) -> None:
        """Realiza um depósito na conta do usuário."""
        if valor <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Valor de depósito inválido"
            )
        usuario = obter_usuario_por_id(db, usuario_id)
        novo_saldo = usuario.saldo + valor
        atualizar_saldo(db, usuario_id, novo_saldo)
        criar_transacao(db, Transacao(tipo="deposito", valor=valor, usuario_id=usuario_id))

    def realizar_pagamento(db: Session, usuario_id: int, pagamento_request: PagamentoRequest) -> None:
        """Realiza um pagamento."""

        valor = pagamento_request.valor
        descricao = pagamento_request.descricao
        usuario = obter_usuario_por_id(db, usuario_id)

        if usuario.saldo < valor:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Saldo insuficiente"
            )

        novo_saldo = usuario.saldo - valor
        atualizar_saldo(db, usuario_id, novo_saldo)
        criar_transacao(db, Transacao(tipo="pagamento", valor=valor, usuario_id=usuario_id, descricao=descricao))
    ```