// Configuration for prices and labor costs
const CONFIG = {
    pulseira: { // Bracelet settings
        base: 0.0025, // Base price per centimeter
        maoDeObra: 3.75, // Labor cost
        tipos: { // Bracelet types
            d: { fator: 0.18, descricao: 'Disco' }, // Disco
            m: { fator: 0.022, descricao: 'Miçanga chinesa' }, // Chinese bead
            b: { fator: 0.044, descricao: 'Bola emborrachada' }, // Rubberized ball
            p: { fator: 0.41, descricao: 'Bola prateada grande' }, // Large silver ball
            j: { fator: 0.05, descricao: 'Miçanga jablonex' }, // Jablonex bead
        },
    },
    colar: { // Necklace settings
        base: 0.00068, // Base price per centimeter
        maoDeObra: 5.50, // Labor cost
        tipos: { // Necklace types
            d: { fator: 0.18, descricao: 'Disco' }, // Disco
            m: { fator: 0.022, descricao: 'Miçanga' }, // Bead
            b: { fator: 0.044, descricao: 'Bola emborrachada' }, // Rubberized ball
            mp: { fator: 0.011, descricao: 'Bola prateada mini' }, // Mini silver ball
            np: { fator: 0, descricao: 'Colar simples' }, // Simple necklace
            j: { fator: 0.05, descricao: 'Miçanga jablonex' }, // Jablonex bead
        },
    },
};

// Constants for configuration
const MULTIPLICADOR_VENDA = 3; // Multiplier for sale price

// Centralized messages
const MENSAGENS = {
    categoria: 'Digite 1 para pulseira / Digite 2 para colar: ',
    tipo: 'Escolha o tipo',
    medidaBase: 'Insira os centímetros da base (pulso ou pescoço): ',
    medidaAdicional: 'Insira os centímetros do(a)',
    custoProducao: 'O custo de produção é: ',
    custoVenda: 'O custo de venda é: ',
    outraPeca: 'Deseja calcular outra peça? (s/n): ',
    erro: 'Opção inválida. Tente novamente.',
    obrigado: 'Obrigado por utilizar nosso programa!',
};

// Formats a number as currency
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Calculates the production cost based on type, measurements, and category
function calcularCusto(tipo, cmBase, cmAdicional, categoria) {
    const config = CONFIG[categoria];
    const base = config.base * (cmBase + (categoria === 'pulseira' ? 11 : 25));
    const adicional = cmAdicional * config.tipos[tipo].fator;
    const custoProducao = base + adicional + config.maoDeObra;
    return parseFloat(custoProducao.toFixed(2));
}

module.exports = { CONFIG, MULTIPLICADOR_VENDA, formatarMoeda, calcularCusto };

// Prompts the user for a valid numeric input
function obterMedida(mensagem) {
    while (true) {
        const valor = parseFloat(readline.question(mensagem));
        if (!isNaN(valor) && valor > 0) return valor;
        console.log('Por favor, insira um valor numérico válido.');
    }
}

// Handles category selection with validation
function selecionarCategoria() {
    while (true) {
        const categoria = readline.question(MENSAGENS.categoria).trim();
        if (categoria === '1') return 'pulseira';
        if (categoria === '2') return 'colar';
        console.log(MENSAGENS.erro);
    }
}

// Handles type selection and lists options with descriptions
function selecionarTipo(categoria) {
    console.log('Tipos disponíveis:');
    Object.entries(CONFIG[categoria].tipos).forEach(([key, value]) => {
        console.log(`- ${key.toUpperCase()}: ${value.descricao}`);
    });

    while (true) {
        const tipo = readline.question(`${MENSAGENS.tipo}: `).toLowerCase().trim();
        if (CONFIG[categoria].tipos[tipo]) return tipo;
        console.log(MENSAGENS.erro);
    }
}

// Displays the results
function exibirResultados(custoProducao) {
    console.log(`${MENSAGENS.custoProducao} ${formatarMoeda(custoProducao)}`);
    console.log(`${MENSAGENS.custoVenda} ${formatarMoeda(custoProducao * MULTIPLICADOR_VENDA)}`);
}

// Handles user confirmation with flexible input
function confirmarContinuacao(mensagem) {
    while (true) {
        const resposta = readline.question(mensagem).toLowerCase().trim();
        if (['s', 'sim'].includes(resposta)) return true;
        if (['n', 'não', 'nao'].includes(resposta)) return false;
        console.log(MENSAGENS.erro);
    }
}

// Main program loop
function main() {
    try {
        while (true) {
            // Select category
            const categoria = selecionarCategoria();

            // Select type
            const tipo = selecionarTipo(categoria);

            // Get measurements
            const cmBase = obterMedida(MENSAGENS.medidaBase);
            const cmAdicional = tipo !== 'np' ? obterMedida(`${MENSAGENS.medidaAdicional} ${CONFIG[categoria].tipos[tipo].descricao}: `) : 0;

            // Calculate and display costs
            const custoProducao = calcularCusto(tipo, cmBase, cmAdicional, categoria);
            exibirResultados(custoProducao);

            // Ask if the user wants to calculate another piece
            if (!confirmarContinuacao(MENSAGENS.outraPeca)) break;
        }

        console.log(MENSAGENS.obrigado);
    } catch (error) {
        console.error('Ocorreu um erro inesperado:', error.message);
    }
}

// Run the program
main();