// ==== Indicator Nav (Thanh chỉ mục xanh) ====
const nav = document.getElementById('main-nav');
const lists = nav.querySelectorAll('.list');
const indicator = nav.querySelector('.indicator');

// Di chuyển indicator theo icon
function moveIndicatorTo(item, withTransition = true) {
  const icon = item.querySelector('.icon');
  const iconRect = icon.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const left = iconRect.left - navRect.left + icon.offsetWidth / 2 - 30;

  indicator.style.left = `${left}px`;
  indicator.style.transition = withTransition ? 'left 0.3s ease' : 'none';

  // Nếu không có hiệu ứng thì bật lại sau 1 frame
  if (!withTransition) {
    requestAnimationFrame(() => {
      indicator.style.transition = 'left 0.3s ease';
    });
  }
}

// Đặt menu active dựa vào URL
function setActiveByURL() {
  const currentPath = window.location.pathname.split("/").pop();
  let matched = false;

  lists.forEach((item) => {
    const link = item.querySelector("a");
    const href = link.getAttribute("href");

    if (href === currentPath) {
      matched = true;
      item.classList.add("active");

      if (item.classList.contains("right-action")) {
        indicator.style.opacity = 0;
      } else {
        moveIndicatorTo(item, false);
        indicator.style.opacity = 1;
      }
    } else {
      item.classList.remove("active");
    }
  });

  if (!matched) indicator.style.opacity = 0;
  localStorage.removeItem("navActiveIndex");
}

// Xử lý click vào menu
lists.forEach((item, index) => {
  const link = item.querySelector('a');

  link.addEventListener('click', (e) => {
    e.preventDefault();

    if (item.classList.contains("right-action")) {
      localStorage.removeItem("navActiveIndex");
      lists.forEach(i => i.classList.remove("active"));
      indicator.style.opacity = 0;
    } else {
      localStorage.setItem("navActiveIndex", index);
      lists.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      indicator.style.opacity = 1;
      moveIndicatorTo(item, true);
    }

    // Điều hướng sau 300ms
    setTimeout(() => {
      window.location.href = link.getAttribute("href");
    }, 300);
  });
});

// Tự set active khi load trang
window.addEventListener('load', setActiveByURL);


// ==== Ẩn hiện thanh menu khi cuộn ====
let lastScrollY = window.scrollY;
const navBar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    navBar.classList.add('nav-hidden');
  } else {
    navBar.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
});


// ==== Dropdown đăng nhập ====
const loginContainer = document.querySelector('.login-container');
const dropdown = loginContainer?.querySelector('.login-dropdown');
let hideTimeout;

if (loginContainer && dropdown) {
  loginContainer.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    dropdown.style.display = 'flex';
    dropdown.style.opacity = '1';
    dropdown.style.pointerEvents = 'auto';
  });

  loginContainer.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      dropdown.style.opacity = '0';
      dropdown.style.pointerEvents = 'none';
    }, 300);
  });
}


// ==== Popup Giỏ hàng hover ====
document.addEventListener("DOMContentLoaded", () => {
  const cartToggle = document.getElementById("cart-toggle");
  const cartPopup = document.getElementById("cart-popup");

  if (cartToggle && cartPopup) {
    let hideTimer;

    const showCart = () => {
      cartPopup.style.display = "block";
    };

    const hideCart = () => {
      cartPopup.style.display = "none";
    };

    const clearHideTimer = () => clearTimeout(hideTimer);
    const startHideTimer = () => hideTimer = setTimeout(hideCart, 300);

    cartToggle.addEventListener("mouseenter", () => {
      showCart();
      clearHideTimer();
    });

    cartToggle.addEventListener("mouseleave", startHideTimer);
    cartPopup.addEventListener("mouseenter", clearHideTimer);
    cartPopup.addEventListener("mouseleave", startHideTimer);

    // Nút đóng trong popup
    const closeBtn = cartPopup.querySelector(".close-cart");
    closeBtn?.addEventListener("click", hideCart);
  }
});
