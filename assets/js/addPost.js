document.addEventListener("DOMContentLoaded", function () {
  const addPostButton = document.getElementById("add-post-btn");
  const addPostForm = document.getElementById("post-form");
  const postTitleInput = document.getElementById("title");
  const postSourceInput = document.getElementById("source");
  const imageInput = document.getElementById("image");
  const addPostContainer = document.getElementById("add-post-container");

  // Funkcja do dekodowania tokenu i wyciągania authorId
  function getAuthorIdFromToken() {
    const token = localStorage.getItem("token"); // Pobierz token z localStorage
    if (token) {
      const decodedToken = jwt_decode(token); // Dekodowanie tokenu
      return decodedToken.userId; // Zwracamy userId z tokenu
    }
    return null; // Jeśli brak tokenu, zwróć null
  }

  // Sprawdzamy, czy użytkownik jest zalogowany
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.isLoggedIn = true;
    addPostContainer.style.display = "block"; // Pokaż formularz dodawania postu

    // Dodajemy obsługę wysyłania formularza
    addPostForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Zapobiegamy domyślnej akcji formularza

      const title = postTitleInput.value;
      const source = postSourceInput.value;
      const authorId = getAuthorIdFromToken(); // Wyciągamy authorId z tokenu
      const imageFile = imageInput.files[0]; // Pobranie pliku obrazu

      if (!authorId) {
        alert("You must be logged in to add a post.");
        window.location.href = "index.html";
        return;
      }

      // Przygotowanie danych do wysłania
      const formData = new FormData();
      formData.append("title", title);
      formData.append("source", source);
      formData.append("authorId", authorId); // Dodanie authorId
      formData.append("photo", imageFile); // Dodanie obrazu do formularza

      try {
        const response = await fetch("http://127.0.0.1:4000/api/posts/create", {
          method: "POST",
          body: formData, // Wysłanie danych za pomocą FormData
        });

        const data = await response.json();

        if (response.ok) {
          alert("Post added successfully!");
          // Możemy dodać logikę, aby przekierować użytkownika lub wyczyścić formularz
          postTitleInput.value = "";
          imageInput.value = ""; // Resetowanie pola obrazu
        } else {
          alert("Failed to add post: " + data.message);
        }
      } catch (error) {
        console.error("Error adding post:", error);
        alert("Error adding post. Please try again.");
      }
    });
  } else {
    alert("You must be logged in to add a post.");
    window.location.href = "index.html";
  }

  // Obsługa kliknięcia przycisku "Add Post" (np. w menu)
  addPostButton.addEventListener("click", function () {
    if (window.isLoggedIn) {
      addPostContainer.style.display = "block"; // Pokaż formularz
    } else {
      alert("Please log in to add a post.");
    }
  });
});
