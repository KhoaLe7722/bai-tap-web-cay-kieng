// File: /sanpham/sanpham-data.js

const products = [
  {
    id: 1,
    name: "Terrarium Rêu Mini",
    price: 180000,
    image: "image_sanpham/1.jpg"
  },
  {
    id: 2,
    name: "Terrarium Lớn Sang Trọng",
    price: 320000,
    image: "image_sanpham/2.jpg"
  },
  {
    id: 3,
    name: "Bình Trang Trí Phong Cách Nhật",
    price: 250000,
    image: "image_sanpham/3.jpg"
  },
  {
    id: 4,
    name: "Combo Rêu + Phụ kiện",
    price: 480000,
    image: "image_sanpham/4.jpg"
  },
  {
    id: 5,
    name: "Terrarium Gỗ Tự Nhiên",
    price: 350000,
    image: "image_sanpham/5.jpg"
  },
  {
    id: 6,
    name: "Terrarium Gỗ Tự Nhiên",
    price: 350000,
    image: "image_sanpham/6.jpg"
  }
];


function renderProducts(list) {
  const container = document.querySelector(".product-grid");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="spchitiet.html?id=${product.id}" class="product-link">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="${product.name}">
        </div>
      </a>
      <div class="product-content">
        <div class="product-title">${product.name}</div>
        <div class="product-price">${product.price.toLocaleString()}đ</div>
      </div>
    `;
    container.appendChild(card);
  });
}




function filterProducts() {
  const checkboxes = document.querySelectorAll(".filter-item input[type='checkbox']");
  const activePrices = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(cb => cb.parentElement.textContent.trim());

  let filtered = products.filter(product => {
    if (activePrices.length === 0) return true;

    return activePrices.some(priceRange => {
      if (priceRange.includes("dưới 100")) return product.price < 100000;
      if (priceRange.includes("100.000") && priceRange.includes("200.000")) return product.price >= 100000 && product.price <= 200000;
      if (priceRange.includes("200.000") && priceRange.includes("300.000")) return product.price > 200000 && product.price <= 300000;
      if (priceRange.includes("300.000") && priceRange.includes("500.000")) return product.price > 300000 && product.price <= 500000;
      if (priceRange.includes("500.000") && priceRange.includes("1.000.000")) return product.price > 500000 && product.price <= 1000000;
      if (priceRange.includes("Trên 1.000.000")) return product.price > 1000000;
      return false;
    });
  });

  renderProducts(filtered);
}

// Gọi sau khi trang đã tải
window.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);

  // Gắn sự kiện lọc
  const checkboxes = document.querySelectorAll(".filter-item input[type='checkbox']");
  checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));
});
