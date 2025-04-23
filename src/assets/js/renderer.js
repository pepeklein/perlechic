const calc = require('./assets/js/calc'); // Import calculation module

document.addEventListener('DOMContentLoaded', () => {
    const categoriaSelect = document.getElementById('categoria');
    const tipoSelect = document.getElementById('tipo');
    const baseInput = document.getElementById('base');
    const adicionalInput = document.getElementById('adicional');
    const calcularButton = document.getElementById('calcular');
    const resultadoDiv = document.getElementById('resultado');
    const graficoCanvas = document.getElementById('grafico');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const themeIcon = toggleThemeButton.querySelector('i');

    // Toggle between light and dark themes
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Switch between moon and sun icons
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // Update types based on selected category
    categoriaSelect.addEventListener('change', () => {
        const categoria = categoriaSelect.value;
        const tipos = calc.CONFIG[categoria]?.tipos || {};

        tipoSelect.innerHTML = ''; // Clear previous options

        // Add default "Choose type" option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Escolher tipo';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        tipoSelect.appendChild(defaultOption);

        // Add type options
        Object.entries(tipos).forEach(([key, value]) => {
            const option = document.createElement('option');
            option.value = key; // Use key as value
            option.textContent = value.descricao; // Display description
            tipoSelect.appendChild(option);
        });
    });

    // Initialize types with default category
    categoriaSelect.dispatchEvent(new Event('change'));

    // Calculate costs when the button is clicked
    calcularButton.addEventListener('click', () => {
        const categoria = categoriaSelect.value;
        const tipo = tipoSelect.value; // Use key (e.g., "d", "m")
        const base = parseFloat(baseInput.value);
        const adicional = parseFloat(adicionalInput.value) || 0;

        if (!categoria || !tipo || isNaN(base) || base <= 0) {
            resultadoDiv.textContent = 'Por favor, preencha todos os campos corretamente.';
            return;
        }

        const custoProducao = calc.calcularCusto(tipo, base, adicional, categoria);
        const precoVenda = custoProducao * calc.MULTIPLICADOR_VENDA;

        resultadoDiv.innerHTML = `
            <p>Custo de Produção: ${calc.formatarMoeda(custoProducao)}</p>
            <p>Preço de Venda: ${calc.formatarMoeda(precoVenda)}</p>
        `;

        // Update the chart
        new Chart(graficoCanvas, {
            type: 'bar',
            data: {
                labels: ['Custo de Produção', 'Preço de Venda'],
                datasets: [{
                    label: 'Valores (R$)',
                    data: [custoProducao, precoVenda],
                    backgroundColor: ['#8a2be2', '#ff1493']
                }]
            }
        });
    });
});