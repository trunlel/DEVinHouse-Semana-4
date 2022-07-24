const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const main = document.getElementsByTagName("main")[0];
const h2 = document.getElementsByTagName("h2");

const verificarParImpar = () => {
  const numero = parseInt(input.value);

  if (isNaN(numero)) {
    exibeResultado("Número inválido");
    return;
  }

  const resultado = numero % 2 === 0 ? "par" : "ímpar";
  exibeResultado(`O número ${numero} é ${resultado}.`);
};

const exibeResultado = (mensagem) => {
  if (h2[0]) {
    h2[0].remove();
  }

  const elemento = document.createElement("h2");

  elemento.innerText = mensagem;

  main.appendChild(elemento);
};
button.onclick = verificarParImpar;
