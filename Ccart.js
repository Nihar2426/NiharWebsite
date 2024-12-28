document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('totalAmount'); 
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const updateCart = () => {
        cartContainer.innerHTML = '';  
        let totalAmount = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Rs. ${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            
            cartContainer.appendChild(cartItem);
            
            totalAmount += item.price * item.quantity;
        });
        
        totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
    };
    
    const updateCartInLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-quantity')) {
            const productId = event.target.getAttribute('data-id');
            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity++;
                updateCartInLocalStorage();
            }
        }
        
        if (event.target.classList.contains('decrease-quantity')) {
            const productId = event.target.getAttribute('data-id');
            const product = cart.find(item => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity--;
                updateCartInLocalStorage();
            }
        }

        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== productId);
            updateCartInLocalStorage();
        }
    });

    updateCart();
});
