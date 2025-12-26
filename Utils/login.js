document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === 'kevinryan' && password === 'kev02937@') {
    Toastify({
      text: "Muvaffaqiyatli kirish! Dashboardga o'tkazilmoqda...",
      duration: 2000,
      gravity: "top",
      position: "center",
      backgroundColor: "#28a745"
    }).showToast();

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2100);
  } else {
    Toastify({
      text: "Noto'g'ri username yoki parol!",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#dc3545"
    }).showToast();
  }
});
