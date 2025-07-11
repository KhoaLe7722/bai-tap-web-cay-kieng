window.onload = function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");
    const name = document.getElementById("name");
    const successBox = document.querySelector(".box__success");

    // Ẩn box thành công nếu tồn tại
    if (successBox) {
        successBox.style.display = "none";
    }

    function checkEmail() {
        const elMsg = document.getElementById("feedback-email");
        const emailValue = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (!emailValue) {
        elMsg.textContent = "⚠️ Vui lòng nhập email!";
        } else if (!emailPattern.test(emailValue)) {
        elMsg.textContent = "⚠️ Email không hợp lệ!";
        } else if (users.some(user => user.email === emailValue)) {
        elMsg.textContent = "⚠️ Email này đã được sử dụng!";
        } else {
        elMsg.textContent = "";
        return true;
        }

        return false;
    }

    function checkPassword() {
        const elMsg = document.getElementById("feedback-password");
        const pw = password.value.trim();

        if (!pw) {
        elMsg.textContent = "⚠️ Chưa nhập mật khẩu!";
        } else if (pw.length < 8) {
        elMsg.textContent = "⚠️ Mật khẩu phải có ít nhất 8 ký tự!";
        } else {
        elMsg.textContent = "";
        return true;
        }

        return false;
    }

    function checkConfirmPassword() {
        const elMsg = document.getElementById("feedback-confirm_password");
        const pw = password.value.trim();
        const confirmPw = confirmPassword.value.trim();

        if (!confirmPw) {
        elMsg.textContent = "⚠️ Chưa nhập lại mật khẩu!";
        } else if (pw !== confirmPw) {
        elMsg.textContent = "⚠️ Mật khẩu xác nhận không khớp!";
        } else {
        elMsg.textContent = "";
        return true;
        }

        return false;
    }

    function checkName() {
        const elMsg = document.getElementById("feedback-name");
        const nameValue = name.value.trim();
        const namePattern = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;

        if (!nameValue) {
        elMsg.textContent = "⚠️ Vui lòng nhập họ và tên!";
        } else if (!namePattern.test(nameValue)) {
        elMsg.textContent = "⚠️ Họ và tên chỉ được chứa chữ cái và khoảng trắng!";
        } else {
        elMsg.textContent = "";
        return true;
        }

        return false;
    }

    // Xử lý khi submit form
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const isValid =
        checkEmail() &&
        checkPassword() &&
        checkConfirmPassword() &&
        checkName();

        if (!isValid) return;

        // Lưu thông tin người dùng vào localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
            email: email.value.trim(),
            password: password.value.trim(),
            name: name.value.trim(),
        });
        localStorage.setItem("users", JSON.stringify(users));

        // Đánh dấu đã đăng ký thành công
        sessionStorage.setItem("foundUser", "true");

        // Hiển thị thông báo
        successBox.style.display = "block";
    });

    // Xử lý khi nhấn nút "Đã hiểu"
    const successBtn = document.querySelector(".box__success button");
    if (successBtn) {
        successBtn.addEventListener("click", () => {
        successBox.style.display = "none";
        window.location.href = "../trangchu/index.html";
        });
    }
    // Cho phép HTML gọi được các hàm này
    window.checkEmail = checkEmail;
    window.checkPassword = checkPassword;
    window.checkConfirmPassword = checkConfirmPassword;
    window.checkName = checkName;
};
