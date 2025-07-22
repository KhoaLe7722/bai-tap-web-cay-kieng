document.addEventListener("DOMContentLoaded", () => {
  const cartPopup = document.getElementById("cart-popup");
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartToggle = document.getElementById("cart-toggle");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function showCart() {
    if (cartPopup) {
      cartPopup.style.display = "block";
      renderCart();
    }
  }

  function hideCart() {
    if (cartPopup) {
      cartPopup.style.display = "none";
    }
  }

  function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const tr = document.createElement("tr");
      const itemTotal = item.price * item.quantity;

      tr.innerHTML = `
        <td>
          <div style="display: flex; gap: 10px; align-items: center;">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
            <div>
              <div>${item.name}</div>
              <a href="#" class="remove-btn" data-name="${item.name}">Xoá</a>
            </div>
          </div>
        </td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>${item.quantity}</td>
        <td>${itemTotal.toLocaleString()}đ</td>
      `;

      cartItemsEl.appendChild(tr);
      total += itemTotal;
    });

    cartTotalEl.textContent = total.toLocaleString() + "đ";

    // ✅ Gắn sự kiện "Xoá" tại đây — sau khi tạo xong nội dung
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const name = button.getAttribute("data-name");
        removeFromCart(name);
      });
    });
  }

  function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    renderCart();
  }

  window.addToCart = function ({ id, name, price, quantity = 1, image }) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === id && item.name === name);


    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id, name, price, quantity, image });
    }

    saveCart(cart);
    renderCart();
    showCart();
  };

  let hideTimer;

  if (cartToggle && cartPopup) {
    cartToggle.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
      showCart();
    });

    cartToggle.addEventListener("mouseleave", () => {
      hideTimer = setTimeout(hideCart, 300);
    });

    cartPopup.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
    });

    cartPopup.addEventListener("mouseleave", () => {
      hideTimer = setTimeout(hideCart, 300);
    });
  }

  renderCart();
});
