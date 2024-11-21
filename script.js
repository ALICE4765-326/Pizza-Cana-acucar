const pizzas = [
    { name: "Pizza Cana de Açúcar", ingredients: "molho de tomate, mozarela, fiambre, bacon, chourição, azeitona, pimento et orégãos", priceIndividual: 5.50, priceFamilial: 12.50, image: "images/cana-de-açucar.jpg" },
    { name: "Pizza Suprema", ingredients: "molho de tomate, mozarela, fiambre, bacon, chourição, cogumelos, azeitona, pimento et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/suprema.jpg" },
    { name: "Pizza Tropical", ingredients: "molho de tomate, mozarela, fiambre, ananás, pêssego et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/tropical.jpg" },
    { name: "Pizza Mozzarella", ingredients: "molho de tomate, mozarela, fiambre, azeitona et orégãos", priceIndividual: 4.80, priceFamilial: 11.50, image: "images/mozzarella.jpg" },
    { name: "Pizza Americana", ingredients: "molho de tomate, mozarela, fiambre, cogumelos, cebola, azeitona, pimento et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/americana.jpg" },
    { name: "Pizza Atum", ingredients: "molho de tomate, mozarela, atum, cebola, ovo, azeitona et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/atum.jpg" },
    { name: "Pizza Milaneza", ingredients: "molho de tomate, mozarela, fiambre, chourição, salsicha, azeitona, pimento et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/milaneza.jpg" },
    { name: "Pizza Kebab", ingredients: "molho de tomate, mozarela, carne de kebab, molho de kebab et orégãos * option cebola frita", priceIndividual: 6.50, priceFamilial: 13.50, image: "images/kebab.jpg" },
    { name: "Pizza Alheira", ingredients: "molho de tomate, mozarela, alheira, ovo et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/alheira.jpg" },
    { name: "Calzone", ingredients: "molho de tomate, mozarela, fiambre, bacon, ovo et orégãos", priceIndividual: 6, priceFamilial: 13, image: "images/calzone.jpg" },
    { name: "Calzone de Frango", ingredients: "molho de tomate, mozarela, frango grelhado, bacon, cogumelos et orégãos", priceIndividual: 6.75, priceFamilial: 14, image: "images/frango.jpg" },
    { name: "Calzone de Kebab", ingredients: "molho de tomate, mozarela, carne de kebab, molho de kebab et orégãos * option cebola frita", priceIndividual: 6.50, priceFamilial: 13.50, image: "images/calzone-kebab.jpg" },
    { name: "Calzone Alheira", ingredients: "molho de tomate, mozarela, alheira, ovo et orégãos", priceIndividual: 6.50, priceFamilial: 13.50, image: "images/calzone-alheira.jpg" },
];

const extras = [
    { name: "Queijo", price: 1 },
    { name: "Cebola frita", price: 0.50 },
    { name: "Cogumelo", price: 0.50 },
    { name: "Pimento", price: 0.50 },
    { name: "Fiambre", price: 0.50 },
    { name: "Bacon", price: 0.50 },
    { name: "Chourição", price: 0.50 },
    { name: "Azeitona", price: 0.50 },
    { name: "Cebola", price: 0.50 },
    { name: "Atum", price: 0.50 },
    { name: "Ananás", price: 0.50 },
    { name: "Pêssego", price: 0.50 },
    { name: "Salsicha", price: 0.50 },
    { name: "Carne de kebab", price: 0.50 },
    { name: "Alheira", price: 0.50 },
    { name: "Ovo", price: 0.50 }
];

let cart = [];
let customerName = "";
let customerPhone = "";
let restaurantAddress = "Restaurant XYZ, Rue de la Pizza, 75000 Paris"; // Exemple d'adresse

function afficherPizzas() {
    const pizzaMenu = document.getElementById("pizza-menu");
    pizzaMenu.innerHTML = "";

    pizzas.forEach((pizza, index) => {
        const pizzaItem = document.createElement("div");
        pizzaItem.classList.add("pizza-item");

        // Créer le menu déroulant des extras
        const extrasMenu = extras.map(extra => 
            `<label><input type="checkbox" class="extra-checkbox" data-price="${extra.price}" value="${extra.name}">${extra.name} (+€${extra.price})</label><br>`
        ).join('');

        pizzaItem.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}">
            <div class="pizza-details">
                <h3>${pizza.name}</h3>
                <p>${pizza.ingredients}</p>
                <p>Prix : ${pizza.priceIndividual.toFixed(2)} € (Individual) / ${pizza.priceFamilial.toFixed(2)} € (Familial)</p>
                <label for="size-${index}">Taille :</label>
                <select id="size-${index}">
                    <option value="individual">Individual</option>
                    <option value="familial">Familial</option>
                </select>
                <button onclick="toggleExtras(${index})">Extras</button>
                <div id="extras-menu-${index}" class="extras-menu" style="display:none;">
                    ${extrasMenu}
                </div>
                <input type="number" id="quantity-${index}" min="0" value="0" />
                <button onclick="ajouterPizza(${index})" class="btn-primary">Ajouter</button>
            </div>
        `;
        pizzaMenu.appendChild(pizzaItem);
    });
}

function toggleExtras(index) {
    const extrasMenu = document.getElementById(`extras-menu-${index}`);
    extrasMenu.style.display = (extrasMenu.style.display === "none" || extrasMenu.style.display === "") ? "block" : "none";
}

function ajouterPizza(index) {
    const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
    const size = document.getElementById(`size-${index}`).value;

    if (quantity > 0) {
        const pizza = pizzas[index];
        const price = size === "individual" ? pizza.priceIndividual : pizza.priceFamilial;
        let totalCost = price * quantity;

        // Calcul du coût des extras
        const selectedExtras = Array.from(document.querySelectorAll(`#extras-menu-${index} .extra-checkbox:checked`));
        let extrasCost = 0;
        const extrasNames = selectedExtras.map(extra => {
            extrasCost += parseFloat(extra.getAttribute("data-price")) * quantity;
            return extra.value;
        }).join(", ");

        totalCost += extrasCost;

        const comment = prompt("ELIMINER INGREDIENT(S) (laisser vide si aucun) :");

        const cartItem = {
            pizza: pizza.name,
            size: size,
            quantity: quantity,
            totalCost: totalCost,
            extras: extrasNames || "Aucun extra",
            comment: comment || "Aucun ingrédient supprimé"
        };

        cart.push(cartItem);
        afficherPanier();
    } else {
        alert("Veuillez sélectionner une quantité supérieure à 0.");
    }
}

function afficherPanier() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const orderSummary = document.getElementById("order-summary"); // Ajout du résumé de commande
    cartItemsDiv.innerHTML = "";
    orderSummary.innerHTML = ""; // Réinitialiser le résumé de commande
    let total = 0;

    cart.forEach((item, index) => {
        total += item.totalCost;
        cartItemsDiv.innerHTML += `
            <div>
                <p>Pizza : ${item.pizza}, Taille : ${item.size}, Quantité : ${item.quantity}, Coût total : ${item.totalCost.toFixed(2)} €, Extras : ${item.extras}, Ingrédients supprimés : ${item.comment}</p>
                <button onclick="supprimerPizza(${index})">Supprimer</button>
            </div>
        `;
    });

    cartTotal.innerHTML = `Total : €${total.toFixed(2)}`;

    // Affichage du résumé de la commande
    orderSummary.innerHTML = `
        <h3>Résumé de la commande</h3>
        <p><strong>Nom :</strong> ${customerName}</p>
        <p><strong>Téléphone :</strong> ${customerPhone}</p>
        <p><strong>Adresse de livraison :</strong> ${restaurantAddress}</p>
        <p><strong>Total de la commande :</strong> €${total.toFixed(2)}</p>
    `;
}

function supprimerPizza(index) {
    cart.splice(index, 1);
    afficherPanier();
}

document.getElementById("submit-order").addEventListener("click", function() {
    customerName = document.getElementById("customer-name").value;
    customerPhone = document.getElementById("customer-phone").value;

    if (!customerName || !customerPhone) {
        alert("Veuillez remplir tous les champs obligatoires.");
    } else if (cart.length === 0) {
        alert("Veuillez ajouter des pizzas à votre panier.");
    } else {
        afficherPanier();
        alert("Commande enregistrée !");
    }
});

// Initialiser l'affichage des pizzas
afficherPizzas();
