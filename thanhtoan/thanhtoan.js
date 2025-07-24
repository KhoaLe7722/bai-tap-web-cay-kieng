// Lấy giỏ hàng từ localStorage và tính tổng
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const totalEl = document.getElementById("total-amount");
const box = document.querySelector(".success-box");
let total = 0;
cart.forEach(item => {
  total += item.price * item.quantity;
});

document.getElementById("total-amount").textContent = total.toLocaleString() + "đ";

// Xoá giỏ hàng sau khi thanh toán xong
localStorage.removeItem("cart");

// Nếu giỏ hàng rỗng
if (cart.length === 0) {
  box.innerHTML = `
    <div class="empty-icon">
      <ion-icon name="cart-outline" style="font-size: 50px; color: #999;"></ion-icon>
    </div>
    <div class="empty-message" style="font-size: 24px; color: #555; margin-top: 10px;">
      Giỏ hàng của bạn đang trống!
    </div>
    <a href="/sanpham/sanpham.html" class="home-link">Mua sản phẩm ngay</a>
  `;
} else {
  // Nếu có sản phẩm thì hiển thị thông báo thành công
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  totalEl.textContent = total.toLocaleString() + "đ";

  // Xoá giỏ hàng sau khi thanh toán
  localStorage.removeItem("cart");
}
