const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

let contasClientes = [
  {
    id: 1,
    nome: "Cliente 01",
    saldo: 500,
    senha: "1234",
  },
  {
    id: 2,
    nome: "Cliente 02",
    saldo: 3000,
    senha: "1234",
  },
  {
    id: 3,
    nome: "Cliente 03",
    saldo: 5000,
    senha: "1234",
  },
];

const selectConta = document.getElementById("conta");
const strongMensagem = document.getElementById("mensagem");
const form = document.getElementById("form");
const body = document.body;

const adicionaOpcao = (value, text) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  option.id = value;

  selectConta.appendChild(option);
};

const populaSelect = () => {
  selectConta.innerHTML = "";
  adicionaOpcao("0", "Selecione");

  contasClientes.forEach((conta) => {
    adicionaOpcao(conta.id, conta.nome);
  });
};

body.onload = populaSelect;

const exibeMensagem = (mensagem, type = "error") => {
  strongMensagem.textContent = mensagem;

  strongMensagem.className = type === "error" ? "error" : "success";
};

const validaValor = (valor) => {
  if (isNaN(valor) || valor <= 0) {
    exibeMensagem("Valor inválido.");
    return false;
  }

  return true;
};

const atualizaSaldo = (contaAtual, saldo) => {
  const contasSemContaAtual = contasClientes.filter(
    (c) => c.id !== contaAtual.id
  );

  const contaAtualizada = { ...contaAtual, saldo };

  const contasAtualizadas = [...contasSemContaAtual, contaAtualizada];

  contasClientes = contasAtualizadas;
};

const sacar = (contaAtual, valor) => {
  if (!validaValor(valor)) {
    return;
  }

  if (valor > contaAtual.saldo) {
    exibeMensagem(`Saldo insuficiente. Saldo atual: ${contaAtual.saldo}`);
    return;
  }

  const novoSaldo = contaAtual.saldo - valor;

  atualizaSaldo(contaAtual, novoSaldo);

  exibeMensagem(
    `Saque efetuado com sucesso! Saldo atual: ${novoSaldo}`,
    "sucesso"
  );
};

const depositar = (contaAtual, valor) => {
  if (!validaValor(valor)) {
    return;
  }

  const novoSaldo = contaAtual.saldo + valor;

  atualizaSaldo(contaAtual, novoSaldo);

  exibeMensagem(
    `Deposito efetuado com sucesso! Saldo atual: ${novoSaldo}`,
    "sucesso"
  );
};

const operacoes = (event) => {
  event.preventDefault();

  const contaId = parseInt(event.target.conta.value);
  const valor = parseFloat(event.target.valor.value);
  const operacao = parseInt(event.target.operacao.value);
  const senha = event.target.senha.value;

  if (!validaValor(contaId) || !validaValor(valor) || !validaValor(operacao)) {
    return;
  }

  const contaAtual = contasClientes.find((conta) => conta.id === contaId);
  if (!contaAtual) {
    exibeMensagem("Conta inválida!");
    return;
  }

  if (contaAtual.senha !== senha) {
    exibeMensagem("Senha inválida!");
    return;
  }

  switch (operacao) {
    case 1:
      sacar(contaAtual, valor);
      break;
    case 2:
      depositar(contaAtual, valor);
      break;
    default:
      exibeMensagem("Operação inválida");
      break;
  }
};

form.onsubmit = operacoes;
