// script.js

let pizzas = [];

function addPizza() {
    const name = document.getElementById('pizzaName').value;
    const size = document.getElementById('pizzaSize').value;
    const price = parseFloat(document.getElementById('pizzaPrice').value);

    // Verificar se o tamanho já existe
    if (pizzas.some(pizza => pizza.size === size)) {
        alert('Este tamanho de pizza já foi adicionado. Por favor, escolha outro tamanho.');
        return;
    }

    const pizza = { name, size, price };
    pizzas.push(pizza);

    // Clear input fields
    document.getElementById('pizzaName').value = '';
    document.getElementById('pizzaSize').value = '';
    document.getElementById('pizzaPrice').value = '';

    console.log('Pizza added:', pizza);
}

function calculateDifferencePercent(currentPizza, previousPizza) {
    if (!previousPizza) {
        return 'Melhor CB';
    }

    const currentCostBenefit = calculateCostBenefit(currentPizza);
    const previousCostBenefit = calculateCostBenefit(previousPizza);

    const differencePercent = ((previousCostBenefit - currentCostBenefit) / previousCostBenefit) * 100;
    return `-${differencePercent.toFixed(2)}%`;
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
    const dimensions = pizza.size.split('x');
    if (dimensions.length === 1) {
        // Pizza redonda
        const radius = parseFloat(dimensions[0]) / 2;
        return Math.PI * radius * radius;
    } else if (dimensions.length === 2) {
        // Pizza retangular
        const length = parseFloat(dimensions[0]);
        const width = parseFloat(dimensions[1]);
        return length * width;
    }

    return 0;
}
