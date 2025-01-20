document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".user_register form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Pobranie wartości z formularza
    const username = document.getElementById("rusername").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("rpassword").value;

    // Walidacja danych wejściowych
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Prosta walidacja e-maila
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Min. 6 znaków, jedna cyfra, jedna wielka litera
    const usernameRegex = /^[A-Za-z0-9_]+$/; // Tylko litery, cyfry i podkreślenia

    if (!username || !email || !password) {
      alert("Wszystkie pola muszą być wypełnione!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Podaj poprawny adres e-mail!");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Hasło musi mieć co najmniej 6 znaków, zawierać jedną wielką literę i jedną cyfrę!"
      );
      return;
    }

    if (!usernameRegex.test(username)) {
      alert(
        "Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia!"
      );
      return;
    }

    try {
      // Wysyłanie danych do backendu
      const response = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      // Obsługa odpowiedzi błędu, jeśli status odpowiedzi nie jest OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Jeśli rejestracja zakończyła się sukcesem
      const data = await response.json();
      alert("Rejestracja zakończona sukcesem! Teraz możesz się zalogować.");

      // Po rejestracji, automatycznie wyświetl formularz logowania
      const modal = document.getElementById("modal");
      const registerFormSection = document.querySelector(".user_register");
      const loginFormSection = document.querySelector(".user_login");

      registerFormSection.style.display = "none";
      loginFormSection.style.display = "block";
      document.querySelector(".header_title").textContent = "Login";
    } catch (error) {
      // Obsługa błędów
      console.error("Błąd:", error.message);
      alert(`Błąd: ${error.message}`);
    }
  });
});
