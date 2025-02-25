let json_dat;
let paginaAtual = 1; // Página inicial
let itensPorPagina = 10;

async function pegar() {
    let data;

    try {
        data = await fetch("http://127.0.0.1:3000",);

        if (!data.ok) {
            throw new Error(`Response status: ${data.status}`);
        }

        json_dat = JSON.parse(await data.json());

        atualizarTabela();
        atualizarPaginacao();
    } catch (error) {
        console.error('deu ruim: ' + error.message);
    }
}

function atualizarTabela() {
    const tabela = document.getElementById('table_data').getElementsByTagName('tbody')[0];
     tabela.innerHTML = ''; 

    // Páginas são baseadas no índice, então calculamos o intervalo de dados a exibir
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = Math.min(inicio + itensPorPagina, json_dat.length);

    for (let i = inicio; i < fim; i++) {
        const item = json_dat[i];
        const linha = document.createElement('tr');

        const celulaNome = document.createElement('td');
        celulaNome.textContent = item.nome;

        const celulaCargo = document.createElement('td');
        celulaCargo.textContent = item.cargo;

        const celulaSetor = document.createElement('td');
        celulaSetor.textContent = item.setor;

        const celulaSalario = document.createElement('td');
        celulaSalario.textContent = item.liquido;

        linha.appendChild(celulaNome);
        linha.appendChild(celulaCargo);
        linha.appendChild(celulaSetor);
        linha.appendChild(celulaSalario);

        tabela.appendChild(linha);
    }
}

// Função para atualizar os controles de navegação
function atualizarPaginacao() {
    const totalPaginas = Math.ceil(json_dat.length / itensPorPagina);

    // Exibir número da página atual
    document.getElementById('paginaAtual').textContent = `Página ${paginaAtual} de ${totalPaginas}`;

    // Desabilitar botão "Anterior" se estiver na primeira página
    document.getElementById('prevBtn').disabled = paginaAtual === 1;

    // Desabilitar botão "Próxima" se estiver na última página
    document.getElementById('nextBtn').disabled = paginaAtual === totalPaginas;
}

// Função para mudar a página
function mudarPagina(direcao) {
    const totalPaginas = Math.ceil(json_dat.length / itensPorPagina);
    if (direcao === 'prev' && paginaAtual > 1) {
        paginaAtual--;
    } else if (direcao === 'next' && paginaAtual < totalPaginas) {
        paginaAtual++;
    }
    atualizarTabela();
    atualizarPaginacao();
}

// Função para alterar a quantidade de itens por página
function alterarItensPorPagina() {
    itensPorPagina = parseInt(document.getElementById('itensPorPagina').value);
    paginaAtual = 1; // Resetar para a primeira página
    atualizarTabela();
    atualizarPaginacao();
}

// Adicionar eventos aos botões de navegação
document.getElementById('prevBtn').addEventListener('click', () => mudarPagina('prev'));
document.getElementById('nextBtn').addEventListener('click', () => mudarPagina('next'));
document.getElementById('itensPorPagina').addEventListener('change', alterarItensPorPagina);

document.addEventListener('DOMContentLoaded', function () {
    pegar();

    document.getElementById("filtroValor").addEventListener("input", function () {
        let filtroTipo = document.getElementById("filtroTipo").value;
        let filtroValor = this.value.toLowerCase();
        let linhas = document.querySelectorAll("#tabelaDados tr");

        linhas.forEach(linha => {
            let coluna;
            switch (filtroTipo) {
                case "nome": coluna = 0; break;
                case "cargo": coluna = 1; break;
                case "setor": coluna = 2; break;
                case "salario": coluna = 3; break;
            }

            let textoColuna = linha.cells[coluna].textContent.toLowerCase();
            linha.style.display = textoColuna.includes(filtroValor) ? "" : "none";
        });
    });
});

