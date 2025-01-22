// Funkcja czyszcząca token z localStorage po wylogowaniu
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Usuwanie tokenu z localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  // Przekierowanie na stronę logowania
  window.location.href = "admin_login.html"; // lub inny adres
});
