const TABELA = document.querySelector('#sensores tbody');

// Função pura para conversão
const fahrenheitParaCelsius = (f) => ((f - 32) * 5) / 9;

// Gera o HTML de uma linha usando Template Literals
function criarLinhaHTML(sensor) {
  const celsius = fahrenheitParaCelsius(sensor.valor).toFixed(1);
  return `
    <tr>
      <td>${sensor.codigo}</td>
      <td>${sensor.descricao}</td>
      <td>${celsius} °C</td>
      <td>ok</td>
    </tr>
  `;
}

// Atualiza o horário da última busca válida
function marcarAtualizacao() {
  const elementoAtualizado = document.querySelector('#atualizado');
  if (elementoAtualizado) {
    elementoAtualizado.textContent = new Date().toLocaleString('pt-BR');
  }
}

// Função principal assíncrona com tratamento de erros
async function carregarSensores() {
  if (!TABELA) return;

  try {
    const resposta = await fetch('dados/sensores.json');
    
    if (!resposta.ok) {
      throw new Error(`Erro na requisição HTTP: ${resposta.status}`);
    }

    const sensores = await resposta.json();
    
    // Atualização em lote (batching) no DOM para evitar reflows repetidos
    TABELA.innerHTML = sensores.map(criarLinhaHTML).join('');
    
    marcarAtualizacao();
  } catch (erro) {
    console.error('Falha ao carregar sensores:', erro);
    TABELA.innerHTML = `<tr><td colspan="4">Erro ao carregar os dados dos sensores.</td></tr>`;
  }
}

carregarSensores();
