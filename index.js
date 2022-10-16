const main = document.getElementById("main");

const createProductCarts = (products) => {
  const urlArray = window.location.href.split(/[/.]/);
  const page = urlArray[urlArray.length - 2];

  console.log("page", page);

  if (page === "index") {
    products.forEach((product) => {
      // console.log(product);

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
      button.addEventListener("click", addToCart);
      buttonContainer.appendChild(button);

      card.appendChild(img);
      card.appendChild(textContainer);
      textContainer.appendChild(titleElement);
      textContainer.appendChild(priceEl);
      textContainer.appendChild(ratingEl);
      textContainer.appendChild(buttonContainer);

      main.appendChild(card);
    });
    return;
  }

  if (page === "cart") {
    let cart = JSON.parse(localStorage.getItem("cart"));

    console.log("cart", cart);

    cart.forEach((cartItem) => {
      const product = products.find((product) => product.id === cartItem.id);
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

      const quantiteContainer = document.createElement("div");
      quantiteContainer.style.marginBottom = "10px";

      const quantitePluseButton = document.createElement("button");
      quantitePluseButton.setAttribute("id", `${id}`);
      quantitePluseButton.innerText = "+";
      quantitePluseButton.addEventListener("click", (e) => {
        addToCart(e);
        main.innerText = "";
        createProductCarts(products);
      });
      const quantiteMinusButton = document.createElement("button");
      quantiteMinusButton.setAttribute("id", `${id}`);
      quantiteMinusButton.innerText = "-";
      quantiteMinusButton.addEventListener("click", (e) => {
        reduceFromCart(e);
        main.innerText = "";
        createProductCarts(products);
      });

      const quantiteEl = document.createElement("p");
      quantiteEl.innerText = cartItem.amount;
      quantiteContainer.append(
        quantiteMinusButton,
        quantiteEl,
        quantitePluseButton
      );

      const removeButton = document.createElement("button");
      removeButton.innerText = "remove from cart";
      removeButton.setAttribute("id", `${id}`);

      removeButton.addEventListener("click", (e) => {
        removeFromCart(e);
        main.innerText = "";
        createProductCarts(products);
      });

      card.appendChild(img);
      card.appendChild(textContainer);
      textContainer.appendChild(titleElement);
      textContainer.appendChild(quantiteContainer);
      textContainer.appendChild(removeButton);

      main.appendChild(card);
    });
  }
};

let cart = [];

const fetchProducts = async () => {
  const response = await fetch(
    "https://dummyjson.com/products?skip=5&limit=100"
  );
  const { products } = await response.json();
  // console.log(products);
  createProductCarts(products);

  createSearch(products);
};

fetchProducts();

function addToCart(e) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  const idProductToAdd = parseInt(e.target.id);

  //contain the product in cart if it exist, or undifind unless
  const productInCart = cart.find((product) => product.id === idProductToAdd);
  if (productInCart) {
    productInCart.amount++;

    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  //the product doesn't exist in cart so we neet to push it to the cart
  cart.push({
    id: idProductToAdd,
    amount: 1,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function reduceFromCart(e) {
  const idProductToReduce = parseInt(e.target.id);
  let cart = JSON.parse(localStorage.getItem("cart"));

  const itemToReduce = cart.find(
    (cartItem) => cartItem.id === idProductToReduce
  );
  if (itemToReduce.amount === 1) {
    const indexOfItemToRemove = cart.indexOf(itemToReduce);
    cart.splice(indexOfItemToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }
  itemToReduce.amount--;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(e) {
  const idProductToRemove = parseInt(e.target.id);
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.filter((cartItem) => cartItem.id !== idProductToRemove);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function createSearch(products) {
  const urlArray = window.location.href.split(/[/.]/);
  const page = urlArray[urlArray.length - 2];

  const searchInput = document.querySelector("input");
  if (page === "index") {
    searchInput.addEventListener("keyup", () => {
      console.log("products", products);
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      main.innerText = "";
      if (filteredProducts.length === 0) {
        main.innerText = "no products were found";
      }
      createProductCarts(filteredProducts);
    });
  }
}
