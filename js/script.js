// Seleciona os elementos do formulario e da area de resposta
const formulario = document.getElementById("form-pontuacao");
const campoNome = document.getElementById("nome-partida");
const campoAutonomo = document.getElementById("pontos-autonomo");
const campoTeleop = document.getElementById("pontos-teleop");
const campoEndgame = document.getElementById("pontos-endgame");
const feedback = document.getElementById("feedback-formulario");

// Le e valida um campo numerico inteiro dentro dos limites permitidos
function lerPontuacao(valorTexto, nomeCampo, minimo, maximo) {
  const textoLimpo = valorTexto.trim();

  if (textoLimpo === "") {
    throw new Error("Preencha o campo " + nomeCampo + ".");
  }

  const numero = Number(textoLimpo);

  if (Number.isNaN(numero) || !Number.isInteger(numero)) {
    throw new Error("O campo " + nomeCampo + " deve receber um número inteiro.");
  }

  if (numero < minimo || numero > maximo) {
    throw new Error("O campo " + nomeCampo + " deve ficar entre " + minimo + " e " + maximo + ".");
  }

  return numero;
}

// Classifica o resultado da partida de acordo com a pontuacao total
function classificarPartida(total) {
  if (total >= 200) {
    return "Excelente desempenho";
  }

  if (total >= 80) {
    return "Bom desempenho";
  }

  return "Desempenho inicial";
}

// Exibe a mensagem de erro ou sucesso na pagina usando textContent
function mostrarMensagem(texto, tipo) {
  feedback.textContent = texto;
  feedback.className = "feedback " + tipo;
}

// Trata o envio do formulario, valida os dados e calcula a pontuacao
if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const nomePartida = campoNome.value.trim();

      if (nomePartida === "") {
        throw new Error("Informe o nome da partida.");
      }

      const autonomo = lerPontuacao(campoAutonomo.value, "Autônomo", 0, 100);
      const teleop = lerPontuacao(campoTeleop.value, "Teleoperado", 0, 250);
      const endgame = lerPontuacao(campoEndgame.value, "Endgame", 0, 100);

      const total = autonomo + teleop + endgame;
      const classificacao = classificarPartida(total);

      mostrarMensagem(
        'Partida "' + nomePartida + '": ' + total + ' pontos no total (Autônomo: ' + autonomo + ', Teleoperado: ' + teleop + ', Endgame: ' + endgame + ') — ' + classificacao + '.',
        "sucesso"
      );
    } catch (erro) {
      mostrarMensagem("Erro: " + erro.message, "erro");
    }
  });
}
