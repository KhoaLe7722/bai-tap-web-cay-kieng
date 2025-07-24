// Mẫu giả định sản phẩm đã thêm
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm cập nhật giỏ hàng
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-info">
        <strong>${item.name}</strong><br>
        ${item.price.toLocaleString()}₫ x ${item.quantity}
      </div>
      <div class="cart-actions">
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">X</button>
      </div>
    `;
    cartContainer.appendChild(itemEl);
  });

  cartTotal.textContent = "Tổng: " + total.toLocaleString() + "₫";
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Gọi khi load
updateCart();
