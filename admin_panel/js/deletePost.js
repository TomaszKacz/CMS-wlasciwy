// Funkcja do wysyłania zapytania DELETE do backendu w celu usunięcia posta
async function deletePost(postId) {
  try {
    const response = await fetch("http://127.0.0.1:4000/api/posts/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        postId: postId, // Nagłówek z identyfikatorem postu
      },
      body: JSON.stringify({ postId }), // Przesyłamy postId w ciele zapytania
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post with ID: ${postId}`);
    }

    // Jeśli zapytanie zakończy się sukcesem, zwrócimy odpowiedź z serwera
    const data = await response.json();
    console.log("Post deleted successfully:", data);

    // Po usunięciu, zaktualizuj listę postów na stronie
    renderPosts(); // Zakładając, że masz funkcję renderującą posty
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Funkcja do obsługi kliknięcia przycisku "Usuń"
function setupDeleteButton() {
  // Nasłuchujemy kliknięć na przyciski "Usuń"
  const deleteButtons = document.querySelectorAll(".delete-post-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Pobieramy ID posta z atrybutu przycisku
      const postId = event.target.getAttribute("data-post-id");

      if (confirm("Czy na pewno chcesz usunąć ten post?")) {
        // Usuwamy post
        deletePost(postId);
      }
    });
  });
}

// Wywołaj setupDeleteButton po załadowaniu postów
setupDeleteButton();
