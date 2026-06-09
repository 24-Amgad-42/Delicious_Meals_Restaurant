window.onload = function() {
    if (document.getElementById('order-body')) {
        renderOrders();
    }

    var buttons = document.getElementsByClassName('add-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            var name = this.getAttribute('data-name');
            var price = this.getAttribute('data-price');
            addToCart(name, price);
        };
    }

    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.onclick = function() {
            localStorage.removeItem('cart');
            renderOrders();
        };
    }
};

function addToCart(name, price) {
    var cart = [];
    var storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    var item = {
        name: name,
        price: Number(price)
    };

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('تمت إضافة ' + name + ' إلى طلباتك');
}

function renderOrders() {
    var orderBody = document.getElementById('order-body');
    var totalDisplay = document.getElementById('total-price');
    
    var cart = [];
    var storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    var total = 0;
    orderBody.innerHTML = '';

    for (var i = 0; i < cart.length; i++) {
        var row = document.createElement('tr');
        
        var nameCell = document.createElement('td');
        nameCell.textContent = cart[i].name;
        
        var priceCell = document.createElement('td');
        priceCell.textContent = cart[i].price;

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        orderBody.appendChild(row);
        
        total += cart[i].price;
    }

    totalDisplay.textContent = total;
}
