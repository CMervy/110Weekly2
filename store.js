if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initCart();
        updateTotal();
    });
} else {
    initCart();
    updateTotal();
}


// Makes all of the buttons work
function initCart() {
    // Attach listeners to the remove buttons
    document.querySelectorAll('.cart-items .btn-danger').forEach(btn => {
        btn.addEventListener('click', handleRemove);
    });

    // Attach listeners to all quantity inputs
    document.querySelectorAll('.cart-items .cart-quantity-input').forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });

    // Attach listeners to add to cart buttons
    document.querySelectorAll('.shop-item-button').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });

    // Attach listener to purchase button
    const purchaseBtn = document.querySelector('.btn-purchase');
    if (purchaseBtn) purchaseBtn.addEventListener('click', handlePurchase);
}

// When purchase button is clicked
function handlePurchase() {
    alert('Thank you for your purchase!')
    const cartItemsContainer = document.querySelector('.cart-items')
    while (cartItemsContainer.firstChild) {
        cartItemsContainer.removeChild(cartItemsContainer.firstChild)
    }
    updateTotal()
}

// Remve item from cart
function handleRemove(event) {
    const button = event.target
    button.closest('.cart-row').remove()
    updateTotal()
}

// Change quantity of item
function handleQuantityChange(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

// When add to cart button is clicked
function handleAddToCart(event) {
    const button = event.target
    const product = button.closest('.shop-item')
    const title = product.querySelector('.shop-item-title').innerText
    const price = product.querySelector('.shop-item-price').innerText
    const image = product.querySelector('.shop-item-image').src

    insertCartItem(title, price, image)
    updateTotal()
}

// Adds item to cart by creating a new row, had to look at video
function insertCartItem(title, price, imageSrc) {
    const cartContainer = document.querySelector('.cart-items')
    const existingTitles = cartContainer.querySelectorAll('.cart-item-title')

    // Avoid duplicates
    for (let i of existingTitles) {
        if (i.innerText === title) {
            alert('This item is already in the cart!')
            return
        }
    }

    const newRow = document.createElement('div')
    newRow.classList.add('cart-row')

    newRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartContainer.append(newRow)

    newRow.querySelector('.btn-danger').addEventListener('click', handleRemove)
    newRow.querySelector('.cart-quantity-input').addEventListener('change', handleQuantityChange)
}

// Update total price in cart, had to look at video
function updateTotal() {
      var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    Array.from(cartRows).forEach(function(row) {
        var priceElement = row.getElementsByClassName('cart-price')[0];
        var quantityInput = row.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        total += price * quantity;
    });
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}