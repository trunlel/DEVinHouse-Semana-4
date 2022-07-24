const input = document.getElementsByTagName("input")[0];
const button = document.getElementsByTagName("button")[0];
const main = document.getElementsByTagName("main")[0];
const h3 = document.getElementsByTagName("h3");

function classificarIdade() {
  const idade = parseInt(input.value);
  if (isNaN(idade) || idade < 0) {
    exibeResultado("Idade inválida!");
    return;
  }

  if (idade <= 15) {
    exibeResultado(`Com ${idade} anos a pessoa é jovem.`);
    return;
  }
  if (idade >= 65) {
    exibeResultado(`Com ${idade} anos a pessoa é idosa.`);
    return;
  }
  exibeResultado(`Com ${idade} anos a pessoa é adulta.`);
}
const exibeResultado = (mensagem) => {
  if (h3[0]) {
    h3[0].remove();
  }
  const elemento = document.createElement("h3");
  elemento.innerText = mensagem;

  main.appendChild(elemento);
};
button.onclick = classificarIdade;
