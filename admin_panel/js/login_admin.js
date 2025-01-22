document.addEventListener("DOMContentLoaded", function () {
  // Elementy formularza
  const emailInput = document.getElementById("exampleInputEmail");
  const passwordInput = document.getElementById("exampleInputPassword");
  const loginButton = document.querySelector(".btn-user"); // Przycisk logowania

  // Event listener dla przycisku logowania
  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
      try {
        // Wysłanie danych logowania na serwer
        const response = await fetch("http://127.0.0.1:4000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          // Zapisanie tokenu w localStorage
          localStorage.setItem("token", data.token);

          // Zapisanie emaila użytkownika w localStorage
          localStorage.setItem("email", email);

          // Odczytanie roli użytkownika z odpowiedzi serwera
          const userRole = data.userRole;

          // Wyświetlenie całego zdekodowanego tokena w konsoli
          const decodedToken = jwt_decode(data.token);
          console.log("Decoded token:", decodedToken);

          // Sprawdzanie roli użytkownika
          if (userRole === "ADMIN") {
            window.location.href = "admin_index.html"; // Przekierowanie do strony admina
          } else {
            alert("You do not have permission to access the admin panel.");
          }
        } else {
          alert("Invalid login credentials. Please try again.");
        }
      } catch (error) {
        console.error("Błąd logowania:", error);
        alert("An error occurred while trying to log in.");
      }
    } else {
      alert("Please enter both email and password.");
    }
  });
});
