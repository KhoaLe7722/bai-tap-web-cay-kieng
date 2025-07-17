// File: /sanpham/sanpham-data.js

const products = [
  {
    id: 1,
    name: "Terrarium bình trứng Mini",
    price: 157000,
    image: "image_sanpham/Bình trứng Mini/1.jpg"
  },
  {
    id: 2,
    name: "Terrarium bình trụ 14x9",
    price: 357000,
    image: "image_sanpham/Terrarium bình trụ 14x9 (2)/2.jpg"
  },
  {
    id: 3,
    name: "Bình Mini Cube 12x12",
    price: 599000,
    image: "image_sanpham/Bình Mini Cube 12x12/1.jpg"
  },
  {
    id: 4,
    name: "Terrarium Đa Giác 16x16x32",
    price: 957000,
    image: "image_sanpham/Terrarium Đa Giác 16x16x32/1.jpg"
  },
  {
    id: 5,
    name: "Terrarium Đa Giác 20x20x32",
    price: 957000,
    image: "image_sanpham/Terrarium Đa Giác 20x20x32/1.jpg"
  },
  {
    id: 6,
    name: "Terrarium Đa Giác 16x16x34",
    price: 1357000,
    image: "image_sanpham/Terrarium Đa Giác 16x16x34/3.jpg"
  },
  {
    id: 7,
    name: "Terrarium Đa Giác 23x23x40",
    price: 1500000,
    image: "image_sanpham/Terrarium Đa Giác 23x23x40/1.jpg"
  },
  {
    id: 8,
    name: "Đèn LED đế gổ",
    price:"160,000 - 290,000",
    image: "image_sanpham/Đèn.jpg"
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
