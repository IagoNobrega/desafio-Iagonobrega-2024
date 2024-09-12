class RecintosZoo {
  constructor() {
    // Inicializa a lista de recintos do zoológico
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, ocupacao: 3, animais: ['MACACO'] },
      { numero: 2, bioma: 'floresta', tamanho: 5, ocupacao: 0, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupacao: 2, animais: ['GAZELA'] },
      { numero: 4, bioma: 'rio', tamanho: 8, ocupacao: 0, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, ocupacao: 3, animais: ['LEAO'] },
    ];

    // Inicializa as características dos animais
    this.animais = {
      'LEAO': { tamanho: 3, bioma: ['savana'] },
      'LEOPARDO': { tamanho: 2, bioma: ['savana'] },
      'CROCODILO': { tamanho: 3, bioma: ['rio'] },
      'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
      'GAZELA': { tamanho: 2, bioma: ['savana'] },
      'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] },
    };
  }

  /**
   * Analisa os recintos para determinar quais são viáveis para acomodar uma quantidade específica de um animal.
   * @param {string} animal - Nome do animal a ser alocado.
   * @param {number} quantidade - Quantidade do animal a ser alocada.
   * @returns {Object} Resultado da análise, contendo recintos viáveis ou mensagem de erro.
   */
  analisaRecintos(animal, quantidade) {
    // Verifica se o animal é válido
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    // Verifica se a quantidade é válida
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const resultado = [];
    const { tamanho, bioma } = this.animais[animal];

    // Itera sobre cada recinto para verificar se pode acomodar o animal
    this.recintos.forEach(recinto => {
      // Verifica se o bioma do recinto é compatível com o bioma do animal
      if (bioma.includes(recinto.bioma)) {
        // Calcula a ocupação total considerando a quantidade do animal
        const ocupacaoTotal = recinto.ocupacao + (quantidade * tamanho);
        const especiesPresentes = new Set(recinto.animais);
        especiesPresentes.add(animal);

        // Determina o espaço extra necessário se houver mais de uma espécie no recinto
        const espacoExtra = especiesPresentes.size > 1 ? 1 : 0;
        const espacoDisponivel = recinto.tamanho - ocupacaoTotal - espacoExtra;

        // Verifica se há espaço suficiente no recinto
        if (espacoDisponivel >= 0) {
          // Adiciona o recinto à lista de resultados viáveis
          resultado.push({
            numero: recinto.numero,
            espacoDisponivel: espacoDisponivel,
            texto: `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${recinto.tamanho})`
          });
        }
      }
    });

    // Ordena os recintos viáveis por espaço disponível e número
    if (resultado.length > 0) {
      resultado.sort((a, b) => {
        if (a.espacoDisponivel === b.espacoDisponivel) {
          return a.numero - b.numero;
        }
        return b.espacoDisponivel - a.espacoDisponivel;
      });

      return { recintosViaveis: resultado.map(r => r.texto) };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }

  /**
   * Verifica se há mistura de carnívoros no recinto.
   * @param {string} animal - Nome do animal a ser alocado.
   * @param {Array} animaisExistentes - Lista de animais já presentes no recinto.
   * @returns {boolean} Retorna verdadeiro se houver mistura de carnívoros.
   */
}

export { RecintosZoo as RecintosZoo };
