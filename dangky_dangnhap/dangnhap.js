window.onload = function () {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const form = document.getElementById("loginForm");
    const successBox = document.querySelector(".box__success");
    const failBox= document.querySelector(".box__fail");
    // Ẩn box thành công lúc đầu
    successBox.style.display = "none";
    failBox.style.display="none";
    // Xử lý khi người dùng submit form
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        const userRecord = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = userRecord.find(
        user => user.email === emailValue && user.password === passwordValue
        );

        if (foundUser) {
        sessionStorage.setItem("foundUser", "true");
        successBox.style.display = "block";
        } 
        else {
            failBox.style.display = "block";
        }
    });

    // Khi nhấn nút "Đã hiểu", ẩn box và chuyển hướng về trang chủ
    document.querySelector(".box__success button").addEventListener("click", () => {
        successBox.style.display = "none";
        window.location.href = "../trangchu/index.html"; 
    });
    document.querySelector(".box__fail button").addEventListener("click", () => {
        failBox.style.display = "none"; 
    });
};
