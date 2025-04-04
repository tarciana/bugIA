``html
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BugIA Bank</title>
        <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap](https://www.google.com/search?q=https://fonts.googleapis.com/css2%3Ffamily%3DInter:wght%40400%3B600%26display%3Dswap)" rel="stylesheet">
        <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
        <style>
          body {
            font-family: 'Inter', sans-serif;
          }
        </style>
    </head>
    <body class="bg-gray-100">
        <header class="bg-indigo-500 text-white py-4">
            <div class="container mx-auto px-4">
                <h1 class="text-3xl font-semibold text-center">BugIA Bank</h1>
            </div>
        </header>

        <main class="container mx-auto px-4 py-8">
            <div id="mensagem-container" class="mt-4 text-center"></div>
            <div id="login-cadastro" class="bg-white rounded-lg shadow-md p-8">
                <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Login / Cadastro</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="form-container">
                        <form id="login-form" class="space-y-4">
                            <div>
                                <label for="email-login" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input type="email" id="email-login" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div>
                                <label for="senha-login" class="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
                                <input type="password" id="senha-login" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Entrar</button>
                        </form>
                    </div>
                    <div class="form-container">
                        <form id="cadastro-form" class="space-y-4">
                            <div>
                                <label for="nome-cadastro" class="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                                <input type="text" id="nome-cadastro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div>
                                <label for="email-cadastro" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input type="email" id="email-cadastro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div>
                                <label for="senha-cadastro" class="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
                                <input type="password" id="senha-cadastro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
</div>
                            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>

            <div id="operacoes" class="bg-white rounded-lg shadow-md p-8 mt-8 hidden">
                <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Operações</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="operacao-container">
                        <h3 class="text-lg font-semibold mb-4 text-center text-gray-700">Depósito</h3>
                        <form id="deposito-form" class="space-y-4">
                            <div>
                                <label for="valor-deposito" class="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
                                <input type="number" id="valor-deposito" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Depositar</button>
                        </form>
                    </div>
                    <div class="operacao-container">
                        <h3 class="text-lg font-semibold mb-4 text-center text-gray-700">Transferência</h3>
                        <form id="transferencia-form" class="space-y-4">
                            <div>
                                <label for="destinatario-id" class="block text-gray-700 text-sm font-bold mb-2">ID do Destinatário:</label>
                                <input type="number" id="destinatario-id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <div>
                                <label for="valor-transferencia" class="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
                                <input type="number" id="valor-transferencia" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <button type="submit" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Transferir</button>
                        </form>
                    </div>
                    <div class="operacao-container">
                        <h3 class="text-lg font-semibold mb-4 text-center text-gray-700">Pagamento</h3>
                        <form id="pagamento-form" class="space-y-4">
                            <div>
                                <label for="valor-pagamento" class="block text-gray-700 text-sm font-bold mb-2">Valor:</label>
                                <input type="number" id="valor-pagamento" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                             <div>
                                <label for="descricao-pagamento" class="block text-gray-700 text-sm font-bold mb-2">Descrição:</label>
                                <input type="text" id="descricao-pagamento" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                            </div>
                            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Pagar</button>
                        </form>
                    </div>
                </div>

                <div class="mt-8">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">Extrato</h3>
                    <div id="extrato" class="bg-gray-50 rounded-md p-4 overflow-auto max-h-60">
                        <p class="text-gray-600">Nenhuma transação realizada.</p>
                    </div>
                </div>
            </div>
        </main>

        <script>
            const BASE_URL = "http://localhost:8000"; // Ou o endereço do seu servidor

            const loginForm = document.getElementById("login-form");
            const cadastroForm = document.getElementById("cadastro-form");
            const mensagemContainer = document.getElementById("mensagem-container");
            const operacoesDiv = document.getElementById("operacoes");
            const extratoDiv = document.getElementById("extrato");

            const depositoForm = document.getElementById("deposito-form");
            const transferenciaForm = document.getElementById("transferencia-form");
            const pagamentoForm = document.getElementById("pagamento-form");

            let usuarioLogado = null;

            function mostrarMensagem(mensagem, tipo = "sucesso") {
                mensagemContainer.textContent = mensagem;
                mensagemContainer.className = `mt-4 text-center ${tipo === "sucesso" ? "text-green-600" : "text-red-600"}`;
            }

            function limparFormulario(formulario) {
                const inputs = formulario.querySelectorAll('input');
                inputs.forEach(input => input.value = '');
            }

            async function buscarTransacoes() {
                if (!usuarioLogado) return;

                try {
                    const response = await fetch(`${BASE_URL}/transacoes/${usuarioLogado.id}`);
                    if (!response.ok) {
                        throw new Error(`Erro ao buscar transações: ${response.status}`);
                    }
                    const transacoes = await response.json();
                    extratoDiv.innerHTML = ""; // Limpa o extrato

                    if (transacoes.length === 0) {
                        extratoDiv.innerHTML = "<p class='text-gray-600'>Nenhuma transação realizada.</p>";
                        return;
                    }

                    const listaTransacoes = document.createElement("ul");
                    transacoes.forEach(transacao => {
const itemTransacao = document.createElement("li");
                        itemTransacao.className = "py-2 border-b border-gray-200";
                        let descricao = `${transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)} - R$${transacao.valor.toFixed(2)} - ${new Date(transacao.data).toLocaleString()}`;
                        if(transacao.tipo === 'transferencia'){
                           descricao += ` (Dest: ${transacao.destinatario_id})`
                        }
                        if (transacao.descricao) {
                            descricao += ` - ${transacao.descricao}`;
                        }
                        itemTransacao.textContent = descricao;
                        listaTransacoes.appendChild(itemTransacao);
                    });
                    extratoDiv.appendChild(listaTransacoes);

                } catch (error) {
                    mostrarMensagem(`Erro ao buscar transações: ${error.message}`, "erro");
                }
            }

            loginForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const email = document.getElementById("email-login").value;
                const senha = document.getElementById("senha-login").value;

                const loginRequest = {
                    email,
                    senha,
                };

                try {
                    const response = await fetch(`${BASE_URL}/login/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(loginRequest),
                    });

                    if (!response.ok) {
                        throw new Error("Credenciais inválidas");
                    }

                    const usuario = await response.json();
                    usuarioLogado = usuario;
                    mostrarMensagem(`Login realizado com sucesso, ${usuario.nome}!`, "sucesso");
                    loginCadastroDiv.classList.add("hidden");
                    operacoesDiv.classList.remove("hidden");
                    await buscarTransacoes(); // Carrega o extrato ao logar
                    limparFormulario(loginForm);

                } catch (error) {
                    mostrarMensagem(error.message, "erro");
                }
            });

            cadastroForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const nome = document.getElementById("nome-cadastro").value;
                const email = document.getElementById("email-cadastro").value;
                const senha = document.getElementById("senha-cadastro").value;

                const novoUsuario = {
                    nome,
                    email,
                    senha,
                };

                try {
                    const response = await fetch(`${BASE_URL}/usuarios/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(novoUsuario),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || "Erro ao cadastrar usuário");
                    }

                    const usuarioCriado = await response.json();
                    mostrarMensagem(`Cadastro realizado com sucesso, ${usuarioCriado.nome}! Faça login.`, "sucesso");
                    limparFormulario(cadastroForm);

                } catch (error) {
                    mostrarMensagem(error.message, "erro");
                }
            });

            depositoForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                if (!usuarioLogado) {
                    mostrarMensagem("Você precisa estar logado para fazer um depósito.", "erro");
                    return;
                }

                const valor = parseFloat(document.getElementById("valor-deposito").value);

                try {
                    const response = await fetch(`${BASE_URL}/depositos/${usuarioLogado.id}?valor=${valor}`, {
                        method: "POST",
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || "Erro ao realizar depósito");
                    }
                    mostrarMensagem(`Depósito de R$${valor.toFixed(2)} realizado com sucesso!`, "sucesso");
                    await buscarTransacoes();
                    limparFormulario(depositoForm);

                } catch (error) {
                    mostrarMensagem(error.message, "erro");
                }
            });

            transferenciaForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                if (!usuarioLogado) {
                    mostrarMensagem("Você precisa estar logado para fazer uma transferência.", "erro");
                    return;
                }

                const destinatarioId = parseInt(document.getElementById("destinatario-id").value);
                const valor = parseFloat(document.getElementById("valor-transferencia").value);

                const transferenciaRequest = {
                    destinatario_id: destinatarioId,
                    valor,
                };

                try {
                    const response = await fetch(`${BASE_URL}/transferencias/${usuarioLogado.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(transferenciaRequest),
                    });

                    if (!response.ok) {
                         const errorData = await response.json();
                        throw new Error(errorData.detail || "Erro ao realizar transferência");
                    }

                    mostrarMensagem(`Transferência de R$${valor.toFixed(2)} realizada com sucesso!`, "sucesso");
                    await buscarTransacoes();
                    limparFormulario(transferenciaForm);

                } catch (error) {
                    mostrarMensagem(error.message, "erro");
                }
            });

            pagamentoForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                if (!usuarioLogado) {
                    mostrarMensagem("Você precisa estar logado para fazer um pagamento.", "erro");
                    return;
                }

                const valor = parseFloat(document.getElementById("valor-pagamento").value);
                const descricao = document.getElementById("descricao-pagamento").value;

                const pagamentoRequest = {
                    valor,
                    descricao
                };

                try {
                    const response = await fetch(`${BASE_URL}/pagamentos/${usuarioLogado.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(pagamentoRequest),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || "Erro ao realizar pagamento");
                    }

                    mostrarMensagem(`Pagamento de R$${valor.toFixed(2)} realizado com sucesso!`, "sucesso");
                    await buscarTransacoes();
                    limparFormulario(pagamentoForm);

                } catch (error) {
                    mostrarMensagem(error.message, "erro");
                }
            });
        </script>
    </body>
    </html>
    ```