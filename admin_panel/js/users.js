document.addEventListener("DOMContentLoaded", function () {
  // Funkcja do pobierania i wyświetlania użytkowników
  async function fetchUsers() {
    try {
      // Wysyłanie zapytania GET do API
      const response = await fetch("http://127.0.0.1:4000/api/users/allUsers");

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania użytkowników");
      }

      // Parsowanie odpowiedzi JSON
      const users = await response.json();

      // Znajdowanie tabeli w DOM
      const usersTableBody = document.querySelector("#usersTable tbody");

      // Sprawdzanie, czy są użytkownicy
      if (users.length === 0) {
        usersTableBody.innerHTML =
          "<tr><td colspan='7'>Brak użytkowników</td></tr>";
      } else {
        // Tworzenie wierszy tabeli z danymi
        usersTableBody.innerHTML = ""; // Czyszczenie tabeli przed dodaniem nowych danych

        users.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.login}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>${new Date(user.created_at).toLocaleString()}</td>
              <td>${new Date(user.updated_at).toLocaleString()}</td>
              <td>${user.is_blocked ? "Tak" : "Nie"}</td>
            `;
          usersTableBody.appendChild(row);
        });
      }
    } catch (error) {
      console.error("Błąd: ", error);
      alert("Wystąpił problem podczas ładowania użytkowników.");
    }
  }

  // Wywołanie funkcji do pobrania użytkowników po załadowaniu strony
  fetchUsers();
});
