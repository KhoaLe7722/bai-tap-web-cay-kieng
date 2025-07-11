const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

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
    image: "../images/sp2.jpg"
  },
  {
    id: 3,
    name: "Bình Trang Trí Phong Cách Nhật",
    price: 250000,
    image: "../images/sp3.jpg"
  },
  {
    id: 4,
    name: "Combo Rêu + Phụ kiện",
    price: 480000,
    image: "../images/sp4.jpg"
  },
  {
    id: 5,
    name: "Terrarium Gỗ Tự Nhiên",
    price: 350000,
    image: "../images/sp5.jpg"
  }
];

const product = products.find(p => p.id === id);
const detail = document.getElementById("product-detail");

if (product) {
  detail.innerHTML = `
    <h1>${product.name}</h1>
    <img src="${product.image}" style="max-width:300px">
    <p>Giá: ${product.price.toLocaleString()}đ</p>
    <p>Mô tả sản phẩm ở đây...</p>
    <button onclick="history.back()">Quay lại</button>
  `;
} else {
  detail.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
}