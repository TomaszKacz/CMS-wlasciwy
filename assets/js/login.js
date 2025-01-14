document.addEventListener("DOMContentLoaded", function () {
  // Zdefiniowanie elementów
  const loginButton = document.getElementById("modal_trigger");
  const logoutButton = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");
  const loginSignupButtons = document.getElementById("login-signup-buttons");
  const modal = document.getElementById("modal");
  const form = modal.querySelector("form"); // Formularz logowania

  // Sprawdzamy, czy użytkownik jest już zalogowany
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.isLoggedIn = true;
    const email = localStorage.getItem("email");
    updateUI(email);
  }

  // Eventy
  loginButton.addEventListener("click", openModal);
  logoutButton.addEventListener("click", logout);
  form.addEventListener("submit", login);

  // Funkcja otwierająca okno logowania
  function openModal(event) {
    event.preventDefault();
    modal.style.display = "block";
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Ustawiamy przyciemnienie tła
  }

  // Funkcja do logowania użytkownika
  async function login(event) {
    event.preventDefault(); // Zapobiega domyślnemu działaniu formularza

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Wysłanie danych logowania na serwer
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("Response Data:", data); // Debugging response data

    if (response.ok && data.token) {
      // Po zalogowaniu, zapisujemy token i email do localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email); // Zmieniamy z userName na email
      window.isLoggedIn = true; // Ustawiamy globalną zmienną na true
      modal.style.display = "none"; // Ukrywamy modal po zalogowaniu
      document.body.style.backgroundColor = "white"; // Przywracamy kolor tła

      window.location.reload(); // Przeładowanie strony od razu po zalogowaniu

      updateUI(email);
    } else {
      alert("Login failed! Please check your credentials.");
    }
  }

  // Funkcja do wylogowywania użytkownika
  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email"); // Usuwamy email z localStorage
    window.isLoggedIn = false;
    updateUI();

    window.location.reload(); // Przeładowanie strony natychmiast po wylogowaniu
  }

  // Funkcja do aktualizacji interfejsu użytkownika
  function updateUI(email) {
    if (window.isLoggedIn) {
      userInfo.querySelector("#user-name").textContent = `Welcome, ${email}`;
      userInfo.style.display = "flex";
      logoutButton.style.display = "inline-block"; // Pokazujemy przycisk logout
      loginSignupButtons.style.display = "none"; // Ukrywamy przyciski logowania/rejestracji
    } else {
      userInfo.style.display = "none";
      logoutButton.style.display = "none"; // Ukrywamy przycisk logout
      loginSignupButtons.style.display = "block"; // Pokazujemy przyciski logowania/rejestracji
    }
  }
});
