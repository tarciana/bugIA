const homeButton = document.getElementById("home-button");
const cadastroButton = document.getElementById("cadastro-button");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");

const homeSection = document.getElementById("home");
const cadastroSection = document.getElementById("cadastro");
const loginSection = document.getElementById("login");
const contaSection = document.getElementById("conta");

const cadastroForm = document.getElementById("cadastro-form");
const loginForm = document.getElementById("login-form");
const cadastroMensagem = document.getElementById("cadastro-mensagem");
const loginMensagem = document.getElementById("login-mensagem");
const operacaoMensagem = document.getElementById("operacao-mensagem");

const saldoElement = document.getElementById("saldo");
const extratoLista = document.getElementById("extrato").querySelector("ul");

const valorDepositoInput = document.getElementById("valor-deposito");
const depositarButton = document.getElementById("depositar-button");
const valorSaqueInput = document.getElementById("valor-saque");
const sacarButton = document.getElementById("sacar-button");
const valorTransferenciaInput = document.getElementById("valor-transferencia");
const contaTransferenciaInput = document.getElementById("conta-transferencia");
const transferirButton = document.getElementById("transferir-button");
const valorPagamentoInput = document.getElementById("valor-pagamento");
const descricaoPagamentoInput = document.getElementById("descricao-pagamento");
const pagarButton = document.getElementById("pagar-button");

let clienteLogado = null;
let contaLogada = null;

function mostrarSecao(secao) {
    homeSection.classList.remove("active");
    cadastroSection.classList.remove("active");
    loginSection.classList.remove("active");
    contaSection.classList.remove("active");
    secao.classList.add("active");
}

homeButton.addEventListener("click", () => mostrarSecao(homeSection));
cadastroButton.addEventListener("click", () => mostrarSecao(cadastroSection));
loginButton.addEventListener("click", () => mostrarSecao(loginSection));
logoutButton.addEventListener("click", () => {
    clienteLogado = null;
    contaLogada = null;
    mostrarSecao(homeSection);
    contaSection.classList.add("hidden");
    alert("Logout realizado com sucesso!");
});

cadastroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const novoCliente = { nome, email, senha };

    const resposta = await fetch("/clientes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        cadastroMensagem.className = "mensagem sucesso";
        cadastroMensagem.textContent = "Cliente cadastrado com sucesso! Faça login.";
        cadastroForm.reset();
        mostrarSecao(loginSection);
    } else {
        cadastroMensagem.className = "mensagem erro";
        cadastroMensagem.textContent = `Erro ao cadastrar: ${resultado.detail}`;
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email-login").value;
    const senha = document.getElementById("senha-login").value;

    const clienteLogin = { email, senha };

    const resposta = await fetch("/login/", {  // Corrigido para "/login/"
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(clienteLogin),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        clienteLogado = resultado;  // Armazena o cliente retornado
        loginMensagem.className = "mensagem sucesso";
        loginMensagem.textContent = "Login realizado com sucesso!";
        loginForm.reset();
        await buscarOuCriarConta(clienteLogado.id); // Busca ou cria a conta
        mostrarSecao(contaSection);
    } else {
        loginMensagem.className = "mensagem erro";
        loginMensagem.textContent = `Erro ao fazer login: ${resultado.detail}`;
    }
});

async function buscarOuCriarConta(cliente_id) {
    const resposta = await fetch(`/contas/?cliente_id=${cliente_id}`, {  // Use query parameter
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (resposta.ok) {
        contaLogada = await resposta.json();
        atualizarSaldo();
        atualizarExtrato();
    } else if (resposta.status === 404) {
        // Se a conta não existe, cria uma nova
        const respostaCriar = await fetch(`/contas/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cliente_id: cliente_id }),
        });
        if(respostaCriar.ok){
            contaLogada = await respostaCriar.json();
            atualizarSaldo();
            atualizarExtrato();
        } else {
            const resultadoCriar = await respostaCriar.json();
            alert(`Erro ao criar conta: ${resultadoCriar.detail}`);
        }

    } else {
        const resultado = await resposta.json();
        alert(`Erro ao buscar conta: ${resultado.detail}`);
    }
}

async function atualizarSaldo() {
    if (contaLogada) {
        saldoElement.textContent = `Saldo: R$ ${contaLogada.saldo.toFixed(2)}`;
    }
}

async function atualizarExtrato() {
    if (contaLogada) {
        const resposta = await fetch(`/transacoes/${contaLogada.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const extrato = await resposta.json();
        extratoLista.innerHTML = ""; // Limpa a lista
        extrato.forEach(transacao => {
            const item = document.createElement("li");
            item.textContent = `${transacao.tipo}: R$ ${transacao.valor.toFixed(2)} - ${transacao.descricao} (${new Date(transacao.data).toLocaleString()})`;
            extratoLista.appendChild(item);
        });
    }
}

depositarButton.addEventListener("click", async () => {
    const valor = parseFloat(valorDepositoInput.value);
    if (isNaN(valor)) {
        alert("Por favor, insira um valor válido para o depósito.");
        return;
    }

    const resposta = await fetch("/transacoes/depositar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conta_id: contaLogada.id, valor: valor }),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        operacaoMensagem.className = "mensagem sucesso";
        operacaoMensagem.textContent = `Depósito de R$ ${valor.toFixed(2)} realizado com sucesso!`;
        valorDepositoInput.value = "";
        await atualizarSaldo();
        await atualizarExtrato();
    } else {
        operacaoMensagem.className = "mensagem erro";
        operacaoMensagem.textContent = `Erro ao depositar: ${resultado.detail}`;
    }
});

sacarButton.addEventListener("click", async () => {
    const valor = parseFloat(valorSaqueInput.value);
    if (isNaN(valor)) {
        alert("Por favor, insira um valor válido para o saque.");
        return;
    }

    const resposta = await fetch("/transacoes/sacar/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conta_id: contaLogada.id, valor: valor }),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        operacaoMensagem.className = "mensagem sucesso";
        operacaoMensagem.textContent = `Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`;
        valorSaqueInput.value = "";
         await atualizarSaldo();
         await atualizarExtrato();
    } else {
        operacaoMensagem.className = "mensagem erro";
        operacaoMensagem.textContent = `Erro ao sacar: ${resultado.detail}`;
    }
});

transferirButton.addEventListener("click", async () => {
    const valor = parseFloat(valorTransferenciaInput.value);
    const paraContaId = parseInt(contaTransferenciaInput.value);
    if (isNaN(valor) || isNaN(paraContaId)) {
        alert("Por favor, insira valores válidos para a transferência.");
        return;
    }

    const resposta = await fetch("/transacoes/transferir/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ de_conta_id: contaLogada.id, para_conta_id: paraContaId, valor: valor }),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        operacaoMensagem.className = "mensagem sucesso";
        operacaoMensagem.textContent = `Transferência de R$ ${valor.toFixed(2)} para a conta ${paraContaId} realizada com sucesso!`;
        valorTransferenciaInput.value = "";
        contaTransferenciaInput.value = "";
        await atualizarSaldo();
        await atualizarExtrato();
    } else {
        operacaoMensagem.className = "mensagem erro";
        operacaoMensagem.textContent = `Erro ao transferir: ${resultado.detail}`;
    }
});

pagarButton.addEventListener("click", async () => {
    const valor = parseFloat(valorPagamentoInput.value);
    const descricao = descricaoPagamentoInput.value;
    if (isNaN(valor) || !descricao) {
        alert("Por favor, insira valores válidos para o pagamento e a descrição.");
        return;
    }

    const resposta = await fetch("/transacoes/pagar/", {method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ conta_id: contaLogada.id, valor: valor, descricao: descricao }),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
        operacaoMensagem.className = "mensagem sucesso";
        operacaoMensagem.textContent = `Pagamento de R$ ${valor.toFixed(2)} (${descricao}) realizado com sucesso!`;
        valorPagamentoInput.value = "";
        descricaoPagamentoInput.value = "";
        await atualizarSaldo();
        await atualizarExtrato();
    } else {
        operacaoMensagem.className = "mensagem erro";
        operacaoMensagem.textContent = `Erro ao pagar: ${resultado.detail}`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    mostrarSecao(homeSection);
});