// Funkcja ustawiająca email w nagłówku
function setUserEmail() {
  const userEmail = localStorage.getItem("email"); // Pobranie emaila z localStorage

  if (userEmail) {
    // Ustawiamy email użytkownika w elemencie HTML
    const userEmailElement = document.getElementById("admin-name");
    if (userEmailElement) {
      userEmailElement.textContent = userEmail;
    } else {
      console.warn("Element o ID 'admin-name' nie został znaleziony.");
    }
  } else {
    console.warn("Brak zapisanego emaila w localStorage.");
  }
}

// Wywołaj funkcję po załadowaniu strony
window.onload = function () {
  setUserEmail();
};
