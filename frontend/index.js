<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BugIA - Seu Banco Divertido</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <h1>BugIA</h1>
        <nav>
            <button id="home-button">Home</button>
            <button id="cadastro-button">Cadastro</button>
            <button id="login-button">Login</button>
        </nav>
    </header>

    <main id="content">
        <section id="home" class="active">
            <h2>Bem-vindo ao BugIA!</h2>
            <p>O seu banco de brinquedo para aprender sobre finanças e programação.</p>
        </section>

        <section id="cadastro">
            <h2>Cadastre-se</h2>
            <form id="cadastro-form">
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
            <div id="cadastro-mensagem" class="mensagem"></div>
        </section>

        <section id="login">
            <h2>Login</h2>
            <form id="login-form">
                <div class="form-group">
                    <label for="email-login">Email:</label>
                    <input type="email" id="email-login" name="email" required>
                </div>
                <div class="form-group">
                    <label for="senha-login">Senha:</label>
                    <input type="password" id="senha-login" name="senha" required>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <div id="login-mensagem" class="mensagem"></div>
        </section>

        <section id="conta" class="hidden">
            <h2>Minha Conta</h2>
            <div id="saldo">
                <strong>Saldo:</strong> R$ 0,00
            </div>
            <div id="extrato">
                <h3>Extrato:</h3>
                <ul></ul>
            </div>
            <div class="form-group">
                <label for="valor-deposito">Depositar:</label>
                <input type="number" id="valor-deposito" name="valor-deposito" placeholder="Valor" required>
                <button id="depositar-button">Depositar</button>
            </div>
            <div class="form-group">
                <label for="valor-saque">Sacar:</label>
                <input type="number" id="valor-saque" name="valor-saque" placeholder="Valor" required>
                <button id="sacar-button">Sacar</button>
            </div>
            <div class="form-group">
                <label for="valor-transferencia">Transferir:</label>
                <input type="number" id="valor-transferencia" name="valor-transferencia" placeholder="Valor" required>
                <label for="conta-transferencia">Conta Destino:</label>
                <input type="number" id="conta-transferencia" name="conta-transferencia" placeholder="Número da Conta" required>
                <button id="transferir-button">Transferir</button>
            </div>
            <div class="form-group">
                <label for="valor-pagamento">Pagar:</label>
                <input type="number" id="valor-pagamento" name="valor-pagamento" placeholder="Valor" required>
                <label for="descricao-pagamento">Descrição:</label>
                <input type="text" id="descricao-pagamento" name="descricao-pagamento" placeholder="Descrição do Pagamento" required>
                <button id="pagar-button">Pagar</button>
            </div>
            <div id="operacao-mensagem" class="mensagem"></div>
            <button id="logout-button">Logout</button>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>