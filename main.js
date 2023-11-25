let pizzas = [];

function addPizza() {
    const name = document.getElementById('pizzaName').value;
    const type = document.getElementById('pizzaType').value;
    let size;  // Declarar size fora do bloco condicional

    if (type === 'retangular') {
        const width = document.getElementById('pizzaWidth').value;
        const length = document.getElementById('pizzaSize').value;
        size = `${width}x${length}`;
    } else {
        size = document.getElementById('pizzaSize').value;
    }

    const price = parseFloat(document.getElementById('pizzaPrice').value);

    // Verifica se algum campo está vazio
    if (!name || !type || !size || isNaN(price)) {
        alert('Por favor, preencha todos os campos antes de adicionar uma pizza.');
        return;
    }

    if (pizzas.some(pizza => pizza.size === size)) {
        alert('Este tamanho de pizza já foi adicionado. Por favor, escolha outro tamanho.');
        return;
    }

    const pizza = { name, type, size, price };
    pizzas.push(pizza);

    document.getElementById('pizzaName').value = '';
    document.getElementById('pizzaType').value = '';
    document.getElementById('pizzaSize').value = '';
    document.getElementById('pizzaWidth').value = '';
    document.getElementById('pizzaPrice').value = '';

    console.log('Pizza added:', pizza);
}

function calculateDifferencePercent(currentPizza, previousPizza) {
    if (!previousPizza) {
        return 'Melhor CB';
    }

    const currentPrice = currentPizza.price;
    const previousPrice = previousPizza.price;

    // Verifica se previousPrice é zero para evitar divisão por zero
    if (previousPrice === 0) {
        return 'Divisão por zero';
    }

    const differencePercent = ((currentPrice - previousPrice) / Math.abs(previousPrice)) * 100;

    // Adiciona o sinal de mais (+) para indicar um aumento no preço
    return `+${differencePercent.toFixed(2)}%`;
}

function calculate() {
    pizzas.sort((a, b) => calculateCostBenefit(a) - calculateCostBenefit(b));

    const reportBodyElement = document.getElementById('reportBody');
    reportBodyElement.innerHTML = '';

    pizzas.forEach((pizza, index) => {
        const costBenefit = calculateCostBenefit(pizza);
        const previousPizza = pizzas[index - 1];

        const className = costBenefit === Math.min(...pizzas.map(p => calculateCostBenefit(p))) ? 'table-success' : '';

        reportBodyElement.innerHTML += `<tr class="${className}">
        <td>${pizza.name}</td>
        <td>${pizza.type}</td>
        <td>${pizza.size}</td>
        <td>R$ ${pizza.price.toFixed(2)}</td>
        <td>R$ ${costBenefit.toFixed(2)}</td>
        <td>${calculateDifferencePercent(pizza, previousPizza)}</td>
      </tr>`;
    });
}

function calculateCostBenefit(pizza) {
    const area = calculateArea(pizza);
    const costPerSquareCm = pizza.price / area;
    return costPerSquareCm;
}

function calculateArea(pizza) {
    if (pizza.type === 'circular') {
        const radius = parseFloat(pizza.size) / 2;
        return Math.PI * radius * radius;
    } else if (pizza.type === 'quadrada') {
        const side = parseFloat(pizza.size);
        return side * side;
    } else if (pizza.type === 'retangular') {
        const dimensions = pizza.size.split('x');
        const width = parseFloat(dimensions[0]);
        const length = parseFloat(dimensions[1]);
        return width * length;
    }

    return 0;
}

function showRectangularSizeInputs() {
    const pizzaType = document.getElementById('pizzaType').value;
    const pizzaRetangular = document.getElementById('pizzaRetangular');
    const pizzaSizeLabel = document.getElementById('pizzaSizeLabel');

    if (pizzaType === 'circular') {
        pizzaRetangular.style.display = 'none';
        pizzaSizeLabel.innerHTML = 'Diâmetro:';
    } else if (pizzaType === 'quadrada') {
        pizzaRetangular.style.display = 'none';
        pizzaSizeLabel.innerHTML = 'Lado:';
    } else if (pizzaType === 'retangular') {
        pizzaRetangular.style.display = 'block';
        pizzaSizeLabel.innerHTML = 'Comprimento:';
    }
}
