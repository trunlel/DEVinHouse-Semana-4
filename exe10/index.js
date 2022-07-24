const input = document.getElementById("data");
const estacao = document.getElementById("estacao");
const imagem = document.getElementById("img");

const atualizaEstacao = ({ texto, url }) => {
  estacao.innerText = texto;
  imagem.src = url;
};

const verificaEstacao = (event) => {
  const dataFormatada = new Date(`${event.target.value} 00:00`);

  if (!(dataFormatada instanceof Date) || isNaN(dataFormatada)) {
    alert("Data inválida");
    return;
  }

  const dia = dataFormatada.getDate();
  const mes = dataFormatada.getMonth() + 1;

  if (
    (dia >= 22 && mes === 3) ||
    mes === 4 ||
    mes === 5 ||
    (dia <= 21 && mes === 6)
  ) {
    atualizaEstacao({ texto: "Outono", url: "./assets/outono.webp" });
    return;
  }

  if (
    (dia >= 22 && mes === 6) ||
    mes === 7 ||
    mes === 8 ||
    (dia <= 21 && mes === 9)
  ) {
    atualizaEstacao({ texto: "Iverno", url: "./assets/inverno.jpeg" });
    return;
  }

  if (
    (dia >= 22 && mes === 9) ||
    mes === 10 ||
    mes === 11 ||
    (dia <= 21 && mes === 12)
  ) {
    atualizaEstacao({ texto: "Primavera", url: "./assets/primavera.jpeg" });
    return;
  }

  atualizaEstacao({ texto: "Verão", url: "./assets/verao.webp" });
};

input.onchange = verificaEstacao;
