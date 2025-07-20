const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartPopup = document.getElementById("cart-popup");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartToggle = document.getElementById("cart-toggle");

// Hiện giỏ hàng
function showCart() {
  cartPopup.style.display = "block";
  renderCart();
}

// Ẩn giỏ hàng
function hideCart() {
  cartPopup.style.display = "none";
}

// Cập nhật giỏ hàng
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()}đ`;
    cartItemsEl.appendChild(li);
    total += item.price;
  });

  cartTotalEl.textContent = total.toLocaleString() + "đ";
}

// Thêm sản phẩm
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  showCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  let hideTimer;

  const clearHideTimer = () => clearTimeout(hideTimer);
  const startHideTimer = () => hideTimer = setTimeout(hideCart, 300);

  if (cartToggle && cartPopup) {
    cartToggle.addEventListener("mouseenter", () => {
      clearHideTimer();
      showCart();
    });

    cartToggle.addEventListener("mouseleave", startHideTimer);
    cartPopup.addEventListener("mouseenter", clearHideTimer);
    cartPopup.addEventListener("mouseleave", startHideTimer);
  }

  const closeBtn = cartPopup.querySelector(".close-cart");
  if (closeBtn) {
    closeBtn.addEventListener("click", hideCart);
  }
});
