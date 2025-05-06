const PRODUCTS = [ // Imagine this data came in via the server
    {
        name: "Elder Chocolate Truffles, 2oz",
        description: "The best of the best in chocolate truffles.",
        imageSrc: "https://placehold.co/200x200",
        price: 10,
        numInCart: 2
    },
    {
        name: "Jelly Belly Jelly Beans, 100 count",
        description: "Not for planting.",
        imageSrc: "https://placehold.co/200x200",
        price: 5,
        numInCart: 1
    },
    {
        name: "Kettle Chips, 8oz",
        description: "Delicious and unhealthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 3,
        numInCart: 0
    },
    {
        name: "Carrots, 2lb",
        description: "Delicious and healthy.",
        imageSrc: "https://placehold.co/200x200",
        price: 2,
        numInCart: 0
    }
];



/**
 * Turns a product data object into HTML.
 *
 * @param product product data
 * @return {HTMLElement} HTML element representing the product data
 */
function renderProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    // Product image
    const img = document.createElement("img");
    img.src = product.imageSrc;
    img.alt = product.name;
    article.appendChild(img);

    // Title
    const title = document.createElement("h3");
    title.textContent = product.name;
    article.appendChild(title);

    // Description
    const description = document.createElement("p");
    description.textContent = product.description;
    article.appendChild(description);

    // Price
    const price = document.createElement("p");
    price.textContent = `$${product.price}`;
    price.className = "price";
    article.appendChild(price);

    // Button + cart count
    const button = document.createElement("button");
    button.textContent = "Add to cart";
    button.className = "buy-button";
    button.addEventListener("click", () => {
        product.numInCart++;
        rerenderAllProducts();
        rerenderCart();
    });

    article.appendChild(button);

    // Cart indicator
    if (product.numInCart > 0) {
        const badge = document.createElement("span");
        badge.className = "num-in-cart";
        badge.textContent = `${product.numInCart} in cart`;
        article.appendChild(badge);
    }

    return article;
}


const testCard = renderProductCard(PRODUCTS[0]);
document.querySelector(".product-list").appendChild(testCard);


/**
 * Recreates all product cards.
 */
function rerenderAllProducts() {
    const productListSection = document.querySelector(".product-list");
    productListSection.innerHTML = "";
    const heading = document.createElement("h2");
    heading.textContent = "Search results";
    productListSection.appendChild(heading);
    for (let product of PRODUCTS) {
        if (shouldProductBeVisible(product)) {
            const card = renderProductCard(product);
            productListSection.appendChild(card);
        }
    }
}

rerenderAllProducts();

/**
 * Recreates all cart panel info.
 */
function rerenderCart() {
    const cartItemsDiv = document.querySelector(".cart-items");
    cartItemsDiv.innerHTML = "";

    for (let product of PRODUCTS) {
        if (product.numInCart > 0) {
            const item = document.createElement("p");
            item.textContent = `${product.name} x${product.numInCart}`;
            cartItemsDiv.appendChild(item);

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-button";
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => {
                product.numInCart--;
                rerenderAllProducts();
                rerenderCart();
            });
            cartItemsDiv.appendChild(removeBtn);
        }
    }
}


const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");
/**
 * Returns whether a product should be visible based on the current values of the price filters.
 *
 * @param product product data
 * @return {boolean} whether a product should be visible
 */
function shouldProductBeVisible(product) {
    const min = Number.parseFloat(minPriceInput.value);
    const max = Number.parseFloat(maxPriceInput.value);

    if (!isNaN(min) && product.price < min) return false;
    if (!isNaN(max) && product.price > max) return false;

    return true;
}

rerenderAllProducts();
rerenderCart();
minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);