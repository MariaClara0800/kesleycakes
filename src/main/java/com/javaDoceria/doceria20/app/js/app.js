/**
 * ========================================
 * KESLEY CAKES - SISTEMA DE VENDAS
 * ========================================
 * Arquivo: app.js
 * Descrição: Gerenciamento de produtos, carrinho e pagamentos
 */

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let carrinho = [];
let total = 0;
let produtoAtual = { nome: '', preco: 0 };

// ========================================
// FUNÇÕES DE NAVEGAÇÃO E INTERFACE
// ========================================

/**
 * Realiza o login e exibe a página da loja
 */
function login() {
    const loginPage = document.getElementById('login-page');
    const storePage = document.getElementById('store-page');

    if (loginPage && storePage) {
        loginPage.style.display = 'none';
        storePage.style.display = 'block';
    }
}

/**
 * Fecha o modal de pagamento Pix
 */
function fecharPix() {
    const modalPagamento = document.getElementById('pagamento');
    if (modalPagamento) {
        modalPagamento.style.display = 'none';
    }
}

/**
 * Fecha o modal da nota fiscal
 */
function fecharNota() {
    const modalNota = document.getElementById('notaFiscal');
    if (modalNota) {
        modalNota.style.display = 'none';
    }
}

/**
 * Fecha o modal de pagamento no caixa
 */
function fecharModalCaixa() {
    const modalCaixa = document.getElementById('modalCaixa');
    if (modalCaixa) {
        modalCaixa.style.display = 'none';
    }
    fecharNota();
}

/**
 * Fecha o modal de dados do cliente e limpa os campos
 */
function fecharModalDados() {
    const modal = document.getElementById('modalDadosCliente');
    if (modal) {
        modal.style.display = 'none';
    }

    // Limpa os campos do formulário
    limparFormularioDados();
}

/**
 * Limpa todos os campos do formulário de dados do cliente
 */
function limparFormularioDados() {
    const campos = ['nomeCliente', 'telefoneCliente', 'idCliente'];
    campos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.value = '';
    });
}

// ========================================
// FUNÇÕES DE COMPRA E PAGAMENTO
// ========================================

/**
 * Seleciona o método de pagamento
 * @param {string} metodo - Tipo de pagamento (dinheiro, cartao)
 */
function selecionarPagamento(metodo) {
    if (metodo === 'dinheiro' || metodo === 'cartao') {
        const modalCaixa = document.getElementById('modalCaixa');
        if (modalCaixa) {
            modalCaixa.style.display = 'flex';
        }
    }
}

/**
 * Inicia o processo de compra de um produto
 * @param {string} nome - Nome do produto
 * @param {number} preco - Preço do produto
 */
function comprarProduto(nome, preco) {
    // Valida os parâmetros
    if (!nome || typeof preco !== 'number' || preco <= 0) {
        console.error('Produto inválido:', { nome, preco });
        alert('Erro ao adicionar produto. Por favor, tente novamente.');
        return;
    }

    // Armazena o produto selecionado
    produtoAtual = { nome, preco };

    // Abre o modal de dados do cliente
    const modal = document.getElementById('modalDadosCliente');
    if (modal) {
        modal.style.display = 'flex';

        // Foca no primeiro campo
        const primeiroInput = document.getElementById('nomeCliente');
        if (primeiroInput) {
            setTimeout(() => primeiroInput.focus(), 100);
        }
    }
}

/**
 * Valida os dados do cliente e continua para o pagamento
 */
function continuarParaPagamento() {
    // Captura e limpa os dados do cliente
    const nomeCliente = document.getElementById('nomeCliente')?.value.trim() || '';
    const telefoneCliente = document.getElementById('telefoneCliente')?.value.trim() || '';
    const idCliente = document.getElementById('idCliente')?.value.trim() || '';

    // Validação dos campos obrigatórios
    if (!validarDadosCliente(nomeCliente, telefoneCliente)) {
        return;
    }

    // Fecha o modal de dados
    fecharModalDados();

    // Adiciona ao carrinho
    adicionarAoCarrinho(produtoAtual.nome, produtoAtual.preco);

    // Gera e exibe a nota fiscal
    exibirNotaFiscal(nomeCliente, telefoneCliente, idCliente);
}

/**
 * Valida os dados do cliente
 * @param {string} nome - Nome do cliente
 * @param {string} telefone - Telefone do cliente
 * @returns {boolean} - True se válido, False se inválido
 */
function validarDadosCliente(nome, telefone) {
    // Validação de nome
    if (!nome) {
        alert('Por favor, preencha seu Nome Completo antes de continuar.');
        return false;
    }

    // Validação de telefone
    if (!telefone) {
        alert('Por favor, preencha seu Telefone (com DDD) antes de continuar.');
        return false;
    }

    // Validação do formato do telefone (mínimo 10 dígitos)
    const apenasNumeros = telefone.replace(/\D/g, '');
    if (apenasNumeros.length < 10) {
        alert('Por favor, verifique se o Telefone foi preenchido corretamente (mínimo 10 dígitos com DDD).');
        return false;
    }

    return true;
}

/**
 * Adiciona produto ao carrinho
 * @param {string} nome - Nome do produto
 * @param {number} preco - Preço do produto
 */
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
}

/**
 * Exibe a nota fiscal com os dados do cliente e produto
 * @param {string} nomeCliente - Nome do cliente
 * @param {string} telefoneCliente - Telefone do cliente
 * @param {string} idCliente - CPF ou CNPJ do cliente (opcional)
 */
function exibirNotaFiscal(nomeCliente, telefoneCliente, idCliente) {
    const idDisplay = idCliente || "Não informado";

    const detalhesNota = `
        <div class="nota-cliente-info">
            <p><strong>Cliente:</strong> ${escaparHTML(nomeCliente)}</p>
            <p><strong>Telefone:</strong> ${escaparHTML(telefoneCliente)}</p>
            <p><strong>CPF/CNPJ:</strong> ${escaparHTML(idDisplay)}</p>
        </div>
        <p><strong>Produto:</strong> ${escaparHTML(produtoAtual.nome)}</p>
        <p><strong>Preço:</strong> R$ ${formatarPreco(produtoAtual.preco)}</p>
        <p>Obrigado pela sua compra! Escolha a forma de pagamento:</p>
    `;

    const notaDetalhes = document.getElementById('notaDetalhes');
    const modalNota = document.getElementById('notaFiscal');

    if (notaDetalhes && modalNota) {
        notaDetalhes.innerHTML = detalhesNota;
        modalNota.style.display = 'flex';
    }

    // Limpa o carrinho após exibir a nota
    limparCarrinho();
}

/**
 * Limpa o carrinho e reseta o total
 */
function limparCarrinho() {
    carrinho = [];
    total = 0;
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

/**
 * Formata o preço para o padrão brasileiro
 * @param {number} preco - Valor a ser formatado
 * @returns {string} - Preço formatado (ex: 20,00)
 */
function formatarPreco(preco) {
    return preco.toFixed(2).replace('.', ',');
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} texto - Texto a ser escapado
 * @returns {string} - Texto escapado
 */
function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ========================================
// MÁSCARAS E VALIDAÇÕES DE ENTRADA
// ========================================

/**
 * Aplica máscara de telefone no input
 * @param {string} valor - Valor do input
 * @returns {string} - Valor formatado
 */
function aplicarMascaraTelefone(valor) {
    let numeros = valor.replace(/\D/g, '');

    // Limita a 11 dígitos
    if (numeros.length > 11) {
        numeros = numeros.substring(0, 11);
    }

    let resultado = '';

    if (numeros.length > 0) {
        resultado = '(' + numeros.substring(0, 2);
    }
    if (numeros.length > 2) {
        resultado += ') ';
        const isCelular = numeros.length > 10;
        const fim = isCelular ? 7 : 6;
        resultado += numeros.substring(2, fim);
    }
    if (numeros.length > 6) {
        if (numeros.length > 10) {
            resultado += '-' + numeros.substring(7, 11);
        } else {
            resultado += '-' + numeros.substring(6, 10);
        }
    }

    return resultado;
}

/**
 * Aplica máscara de CPF ou CNPJ no input
 * @param {string} valor - Valor do input
 * @returns {string} - Valor formatado
 */
function aplicarMascaraCPFouCNPJ(valor) {
    let numeros = valor.replace(/\D/g, '');
    let resultado = '';

    if (numeros.length <= 11) {
        // CPF: 000.000.000-00
        if (numeros.length > 11) numeros = numeros.substring(0, 11);

        resultado = numeros
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        // CNPJ: 00.000.000/0000-00
        if (numeros.length > 14) numeros = numeros.substring(0, 14);

        resultado = numeros
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    }

    return resultado;
}

/**
 * Valida se o caractere é uma letra ou espaço
 * @param {string} char - Caractere a ser validado
 * @returns {boolean} - True se válido
 */
function isLetraOuEspaco(char) {
    return /^[A-Za-zÀ-ú\s]$/.test(char);
}

/**
 * Valida se o caractere é um número
 * @param {number} charCode - Código do caractere
 * @returns {boolean} - True se for número
 */
function isNumero(charCode) {
    return charCode >= 48 && charCode <= 57;
}

// ========================================
// INICIALIZAÇÃO E EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Define o ano no rodapé
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Evento do botão Pix
    configurarBotaoPix();

    // Configurar validações e máscaras dos inputs
    configurarInputNome();
    configurarInputTelefone();
    configurarInputCPFouCNPJ();
});

/**
 * Configura o botão Pix para copiar a chave
 */
function configurarBotaoPix() {
    const pixBtn = document.getElementById('pixBtn');
    if (pixBtn) {
        pixBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica real de copiar a chave Pix
            alert('Chave Pix copiada! (Simulação)');
            // Exemplo com clipboard API:
            // navigator.clipboard.writeText('sua-chave-pix').then(() => {
            //     alert('Chave Pix copiada com sucesso!');
            // });
        });
    }
}

/**
 * Configura validação do input de nome
 */
function configurarInputNome() {
    const nomeInput = document.getElementById('nomeCliente');
    if (!nomeInput) return;

    nomeInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.charCode);
        if (!isLetraOuEspaco(char)) {
            e.preventDefault();
        }
    });
}

/**
 * Configura máscara e validação do input de telefone
 */
function configurarInputTelefone() {
    const telefoneInput = document.getElementById('telefoneCliente');
    if (!telefoneInput) return;

    // Permite apenas números
    telefoneInput.addEventListener('keypress', function(e) {
        if (!isNumero(e.charCode)) {
            e.preventDefault();
        }
    });

    // Aplica a máscara
    telefoneInput.addEventListener('input', function(e) {
        e.target.value = aplicarMascaraTelefone(e.target.value);
    });
}

/**
 * Configura máscara e validação do input de CPF/CNPJ
 */
function configurarInputCPFouCNPJ() {
    const idInput = document.getElementById('idCliente');
    if (!idInput) return;

    // Permite apenas números
    idInput.addEventListener('keypress', function(e) {
        if (!isNumero(e.charCode)) {
            e.preventDefault();
        }
    });

    // Aplica a máscara
    idInput.addEventListener('input', function(e) {
        const valor = e.target.value;
        const numeros = valor.replace(/\D/g, '');

        // Define maxLength dinamicamente
        e.target.maxLength = numeros.length <= 11 ? 14 : 18;

        e.target.value = aplicarMascaraCPFouCNPJ(valor);
    });
}