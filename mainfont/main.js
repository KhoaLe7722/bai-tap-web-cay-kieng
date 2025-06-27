const nav = document.getElementById('main-nav');
const lists = nav.querySelectorAll('.list');
const indicator = nav.querySelector('.indicator');

// Hàm tính vị trí thanh indicator dưới icon
function moveIndicatorTo(item, withTransition = true) {
  const icon = item.querySelector('.icon');
  const iconRect = icon.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const left = iconRect.left - navRect.left + icon.offsetWidth / 2 - 30;

  if (!withTransition) {
    indicator.style.transition = 'none'; // Tắt hiệu ứng
  } else {
    indicator.style.transition = 'left 0.3s ease'; // Bật lại
  }

  indicator.style.left = `${left}px`;

  // Bật lại transition sau khi set xong vị trí ban đầu
  if (!withTransition) {
    requestAnimationFrame(() => {
      indicator.style.transition = 'left 0.3s ease';
    });
  }
}

// Gán trạng thái active dựa theo URL và previous index
function setActiveByURL() {
  const currentPath = window.location.pathname.split("/").pop();
  const previousIndex = localStorage.getItem('navActiveIndex');

  lists.forEach((item, index) => {
    const link = item.querySelector("a");
    const href = link.getAttribute("href");

    if (href === currentPath) {
      item.classList.add("active");

      // Nếu có vị trí cũ → di chuyển từ vị trí cũ
      if (previousIndex !== null && previousIndex != index) {
        const prevItem = lists[previousIndex];
        moveIndicatorTo(prevItem, false); // Không hiệu ứng
        setTimeout(() => moveIndicatorTo(item, true), 10); // Animate
      } else {
        moveIndicatorTo(item, false); // Đặt đúng vị trí, không animate
      }
    } else {
      item.classList.remove("active");
    }
  });

  localStorage.removeItem('navActiveIndex');
}

// Bắt sự kiện click icon để lưu index và chuyển trang
lists.forEach((item, index) => {
  const link = item.querySelector('a');

  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Lưu index hiện tại
    localStorage.setItem('navActiveIndex', index);

    // Set active + hiệu ứng
    lists.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    moveIndicatorTo(item, true);

    // Chờ hiệu ứng xong rồi chuyển trang
    const href = link.getAttribute('href');
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});

lists.forEach((item, index) => {
  const link = item.querySelector('a');

  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Trường hợp đặc biệt: Nút Đăng nhập/Đăng ký (right-action) → bỏ active + bỏ chỉ mục
    if (item.classList.contains("right-action")) {
      localStorage.removeItem("navActiveIndex");
      lists.forEach(i => i.classList.remove("active"));  // bỏ active toàn bộ
      indicator.style.opacity = 0; // Ẩn chỉ mục xanh
    }
    // Các nút còn lại (Trang chủ, Sản phẩm, v.v.)
    else {
      localStorage.setItem("navActiveIndex", index);

      lists.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      indicator.style.opacity = 1;
      moveIndicatorTo(item, true);
    }

    // Điều hướng sau 300ms
    const href = link.getAttribute('href');
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });
});


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
        indicator.style.opacity = 0; // Không hiển thị thanh chỉ mục
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

// Khi trang load, đánh dấu active đúng
window.addEventListener('load', setActiveByURL);

// Ẩn/Hiện thanh điều hướng khi cuộn
let lastScrollY = window.scrollY;
const navBar = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Nếu cuộn xuống > 10px và đang cuộn xuống
  if (currentScrollY > lastScrollY && currentScrollY > 10) {
    navBar.classList.add('nav-hidden');
  } 
  // Nếu cuộn lên dù chỉ một chút
  else {
    navBar.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
});
  const loginContainer = document.querySelector('.login-container');
  const dropdown = loginContainer.querySelector('.login-dropdown');

  let hideTimeout;

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
    }, 300); // delay đóng 300ms
  });
