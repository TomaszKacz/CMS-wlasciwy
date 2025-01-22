const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Min. 6 znaków, jedna cyfra, jedna wielka litera

// Funkcja do zmiany hasła
async function changePassword(oldPassword, newPassword) {
  // Pobieranie tokenu z localStorage
  const token = localStorage.getItem("token");

  // Sprawdzenie, czy token istnieje
  if (!token) {
    alert("You need to be logged in to change your password.");
    window.location.href = "index.html"; // Przekierowanie na stronę główną
    return;
  }

  // Sprawdzanie, czy nowe hasło spełnia wymagania
  if (!passwordRegex.test(newPassword)) {
    alert(
      "New password must be at least 6 characters long, include at least one uppercase letter and one number."
    );
    return;
  }

  // Dekodowanie tokenu i wyciąganie userId
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;

  const url = "http://127.0.0.1:4000/api/users/change-password";
  const data = {
    userId: userId,
    oldPassword: oldPassword,
    newPassword: newPassword,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    const result = await response.json();
    alert("Password changed successfully!");
  } catch (error) {
    console.error("Error changing password:", error);
    alert("Failed to change password");
  }
}

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
function checkLoginStatus() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You need to be logged in to access this page.");
    window.location.href = "index.html"; // Jeśli brak tokenu, przekieruj do strony głównej
  }
}

// Obsługa formularza zmiany hasła
document.addEventListener("DOMContentLoaded", () => {
  // Sprawdzenie, czy użytkownik jest zalogowany przed załadowaniem strony
  checkLoginStatus();

  // Obsługa wysyłania formularza
  document
    .getElementById("change-password-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const oldPassword = document.getElementById("old-password").value;
      const newPassword = document.getElementById("new-password").value;

      if (oldPassword && newPassword) {
        changePassword(oldPassword, newPassword);
      } else {
        alert("Please fill out both fields.");
      }
    });
});
