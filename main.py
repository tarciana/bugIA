from fastapi import FastAPI, HTTPException, Depends
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()

# Definições de Segurança
SECRET_KEY = "seu_segredo_super_seguro"  # Mantenha isso em um ambiente seguro!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Definição do modelo de dados para Usuário
class User(BaseModel):
    id: int = None
    name: str = Field(..., min_length=1, max_length=50, description="Nome do usuário")
    email: EmailStr = Field(..., description="Email do usuário")
    password: str = Field(..., min_length=8, description="Senha do usuário (mínimo 8 caracteres)")

    @validator("password")
    def validate_password(cls, password):
        if not any(char.isdigit() for char in password):
            raise ValueError("Senha deve conter pelo menos um dígito")
        if not any(char.isupper() for char in password):
            raise ValueError("Senha deve conter pelo menos uma letra maiúscula")
        return password


# Definição do modelo de dados para Transação
class Transaction(BaseModel):
    id: int = None
    sender_id: int = Field(..., description="ID do remetente")
    receiver_id: int = Field(..., description="ID do destinatário")
    amount: float = Field(..., gt=0, description="Valor da transação (maior que zero)")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Data e hora da transação")
    description: Optional[str] = Field(None, description="Descrição opcional da transação")

# Armazenamento de dados em memória (para demonstração)
users_db: List[User] = []
transactions_db: List[Transaction] = []
next_user_id = 1
next_transaction_id = 1

# Função para hashear a senha
def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Função para verificar a senha
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# Função para criar um token JWT
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Função para decodificar o token JWT (simples, sem verificação de expiração)
def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

# Dependência para obter o usuário autenticado
async def get_current_user(token: str = Depends(decode_access_token)) -> User:
    """
    Obtém o usuário autenticado a partir do token JWT.
    """
    # Esta é uma versão simplificada. Em produção, você buscaria o usuário do banco de dados.
    for user in users_db:
        if user.id == token["sub"]:
            return user
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Rota para a raiz da API
@app.get("/")
async def root():
    return {"message": "Bem-vindo à API do Banco Financeiro"}

# Rota para obter a especificação OpenAPI (Swagger)
@app.get("/openapi.json")
async def get_openapi_spec():
    return get_openapi(
        title="Banco Financeiro API",
        version="1.0.0",
        summary="API para operações bancárias",
        routes=app.routes,
    )

# Rota para cadastro de usuário
@app.post("/users/", response_model=User, summary="Cadastro de Usuário")
async def create_user(user: User):
    """
    Cadastra um novo usuário no sistema.

    Retorna o usuário cadastrado com o ID gerado.
    """
    global next_user_id
    # Validação de email único
    for u in users_db:
        if u.email == user.email:
            raise HTTPException(status_code=400, detail="Email já cadastrado")
    # Hash da senha
    hashed_password = get_password_hash(user.password)
    user.password = hashed_password
    user.id = next_user_id
    users_db.append(user)
    next_user_id += 1
    return user

# Rota para login de usuário
@app.post("/login/", summary="Login de Usuário")
async def login_user(email: str, password: str):
    """
    Realiza o login de um usuário e retorna um token de acesso.
    """
    # Validação de email e senha
    for user in users_db:
        if user.email == email and verify_password(password, user.password):
            # Gerar token JWT
            access_token_data = {"sub": user.id}
            access_token = create_access_token(access_token_data)
            return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Credenciais inválidas")

# Rota para realizar transferência (PROTEGIDA)
@app.post("/transactions/", response_model=Transaction, summary="Criar Transação")
async def create_transaction(transaction: Transaction, current_user: User = Depends(get_current_user)):
    """
    Realiza uma transferência entre duas contas.

    Requer autenticação e validação de saldo.
    """
    global next_transaction_id

    if transaction.sender_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a fazer transferências desta conta")

    # Validação de saldo suficiente (simples para demonstração)
    sender = None
    for u in users_db:
        if u.id == transaction.sender_id:
            sender = u
            break
    if not sender:
        raise HTTPException(status_code=400, detail="Remetente não encontrado")
    if transaction.receiver_id == sender.id:
        raise HTTPException(status_code=400, detail="Remetente e destinatário não podem ser os mesmos")
    if transaction.amount <= 0:
        raise HTTPException(status_code=400, detail="Valor da transação inválido")
    # Simulando saldo na conta (isso seria armazenado no banco de dados)
    sender_balance = 1000  # Saldo inicial para demonstração
    if sender_balance < transaction.amount:
        raise HTTPException(status_code=400, detail="Saldo insuficiente")

    # Atualizar saldos (simulação - em produção, isso seria feito no banco de dados)
    # sender_balance -= transaction.amount
    # receiver_balance += transaction.amount

    # Registrar a transação
    transaction.id = next_transaction_id
    transactions_db.append(transaction)
    next_transaction_id += 1
    return transaction

# Rota para depósito (PROTEGIDA)
@app.post("/deposits/", response_model=Transaction, summary="Realizar Depósito")
async def create_deposit(account_id: int, amount: float, current_user: User = Depends(get_current_user)):
    """
    Realiza um depósito em uma conta.

    Requer autenticação.
    """
    global next_transaction_id
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Valor do depósito inválido")
    if account_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a depositar nesta conta")
    # Encontrar a conta do usuário
    receiver = None
    for u in users_db:
        if u.id == account_id:
            receiver = u
            break
    if not receiver:
        raise HTTPException(status_code=400, detail="Conta não encontrada")

    # Simular atualização de saldo
    # receiver_balance += amount

    #Registrar a transação
    transaction = Transaction(
        id=next_transaction_id,
        sender_id=0,  # 0 para representar depósito
        receiver_id=account_id,
        amount=amount,
        timestamp=datetime.utcnow(),
        description= "Depósito"
    )
    transactions_db.append(transaction)
    next_transaction_id += 1
    return transaction

# Rota para extrato (PROTEGIDA)
@app.get("/transactions/{account_id}", response_model=List[Transaction], summary="Obter Extrato de Transações")
async def get_transactions(account_id: int, current_user: User = Depends(get_current_user)):
    """
    Retorna o histórico de transações de uma conta.

    Requer autenticação.
    """
    if account_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a acessar esta conta")
    # Filtrar transações por ID da conta
    account_transactions = [
        t for t in transactions_db if t.sender_id == account_id or t.receiver_id == account_id
    ]
    if not account_transactions:
        raise HTTPException(status_code=404, detail="Nenhuma transação encontrada para esta conta")
    return account_transactions

# Rota para pagamento (simulação - PROTEGIDA)
@app.post("/payments/", response_model=Transaction, summary="Realizar Pagamento")
async def create_payment(sender_id: int, receiver_id: int, amount: float, payment_method: str, current_user: User = Depends(get_current_user)):
    """
    Realiza um pagamento de uma conta para outra.

    Requer autenticação e validação do método de pagamento.
    """
    global next_transaction_id

    if sender_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a fazer pagamentos desta conta")

    if amount <= 0:
        raise HTTPException(status_code=400, detail="Valor do pagamento inválido")
    if payment_method not in ["boleto", "pix", "transferencia"]:
        raise HTTPException(status_code=400, detail="Método de pagamento inválido")
        
    sender = None
    for u in users_db:
        if u.id == sender_id:
            sender = u
            break
    if not sender:
        raise HTTPException(status_code=400, detail="Conta do remetente não encontrada")
    
    receiver = None
    for u in users_db:
        if u.id == receiver_id:
            receiver = u
            break
    if not receiver:
        raise HTTPException(status_code=400, detail="Conta do destinatário não encontrada")
        
    # Simular saldo
    sender_balance = 1000
    if sender_balance < amount:
        raise HTTPException(status_code=400, detail="Saldo insuficiente")
    
    transaction = Transaction(
        id=next_transaction_id,
        sender_id=sender_id,
        receiver_id=receiver_id,
        amount=amount,
        timestamp=datetime.utcnow(),
        description=f"Pagamento via {payment_method}"
    )
    transactions_db.append(transaction)
    next_transaction_id += 1
    return transaction