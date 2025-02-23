let json_dat

async function pegar() {
    let data;

    try {
        data = await fetch("http://127.0.0.1:3000",);

        if (!data.ok) {
            throw new Error(`Response status: ${data.status}`);
        }

        json_dat = JSON.parse(await data.json());
    } catch (error) {
        console.error('deu ruim: ' + error.message);
    }

    const tabela = document.getElementById('table_data').getElementsByTagName('tbody')[0];

    tabela.innerHTML = '';

    json_dat.forEach(item => {
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
    });
}

pegar()

document.addEventListener('DOMContentLoaded', function () {
    pegar();
});

