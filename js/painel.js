const TABELA = document.querySelector('#sensores tbody');

async function carregarSensores() {
  const resposta = await fetch('dados/sensores.json');
  const sensores = await resposta.json();
  sensores.forEach(desenharLinha);
}

function converterTemperatura(leitura) {
 return (leitura - 32) * 5 / 9;
}

function desenharLinha(sensor) {
  const celsius = converterTemperatura(sensor.valor).toFixed(1);
  const tr = document.createElement('tr');
  tr.innerHTML =
    '<td>' + sensor.codigo + '</td>' +
    '<td>' + sensor.descricao + '</td>' +
    '<td>' + celsius + ' C</td>' +
    '<td>ok</td>';
  TABELA.appendChild(tr);
}

function marcarAtualizacao() {
  document.querySelector('#atualizado').textContent = new Date().toLocaleString('pt-BR');
}

carregarSensores();
marcarAtualizacao();
