const main = document.getElementById("main");

const createProductCarts = (products) => {
  products.forEach((product) => {
    console.log(product);

    const { id, title, description, price, rating, thumbnail } = product;
    const card = document.createElement("div");
    card.classList.add("card");

    const textContainer = document.createElement("div");
    textContainer.classList.add("card-container");

    const titleElement = document.createElement("h2");
    const titleText = document.createTextNode(title);
    titleElement.appendChild(titleText);

    const img = document.createElement("img");
    img.setAttribute("src", thumbnail);

    const priceEl = document.createElement("p");
    const priceText = document.createTextNode(`Price: ${price}$`);
    priceEl.appendChild(priceText);

    const ratingEl = document.createElement("p");
    const ratingText = document.createTextNode(`Rating: ${rating} ⭐`);
    ratingEl.appendChild(ratingText);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const button = document.createElement("button");
    button.setAttribute("id", `${id}`);
    button.classList.add("add-to-cart-button");
    const buttonText = document.createTextNode("Add To Cart");
    button.appendChild(buttonText);
    buttonContainer.appendChild(button);

    card.appendChild(img);
    card.appendChild(textContainer);
    textContainer.appendChild(titleElement);
    textContainer.appendChild(priceEl);
    textContainer.appendChild(ratingEl);
    textContainer.appendChild(buttonContainer);

    main.appendChild(card);
  });
};

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const { products } = await response.json();

  // console.log(products);
  createProductCarts(products);
};

fetchProducts();
