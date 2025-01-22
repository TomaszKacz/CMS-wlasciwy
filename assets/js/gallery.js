let currentPage = 0; // Aktualna strona (początkowo 0)
const postsPerPage = 10; // Ilość postów na stronie

// Funkcja do pobierania postów z backendu
async function fetchPosts(page = 0) {
  try {
    const response = await fetch(
      `http://127.0.0.1:4000/api/posts/?pagination=${postsPerPage}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Funkcja renderująca posty
async function renderPosts() {
  const posts = await fetchPosts(currentPage);
  const postList = document.getElementById("image-list");
  postList.innerHTML = ""; // Wyczyść poprzednie posty

  if (posts && Array.isArray(posts)) {
    posts.forEach((post, index) => {
      const container = document.createElement("div");
      container.className = "image-item-container";

      // Dodanie tytułu obrazka
      const title = document.createElement("h3");
      title.className = "image-title";
      title.textContent = post.title || "Brak tytułu"; // Jeśli brak tytułu, wyświetl "Brak tytułu"
      container.appendChild(title);

      const img = document.createElement("img");
      img.src = `C:/Users/tomek/Documents/GitHub/cms/Backend/${post.photo_path}`;
      img.alt = `Post ${index + 1}`;
      img.className = "image-item";
      container.appendChild(img);

      const info = document.createElement("p");
      const authorLogin = post.author ? post.author.login : "Nieznany autor";
      const createdAt = new Date(post.created_at).toLocaleString();
      info.textContent = `Autor: ${authorLogin} | Źródło: ${post.source} | Data utworzenia: ${createdAt}`;
      container.appendChild(info);

      // Przyciski "Lubię to" i "Nie lubię" - tylko wizualnie, bez logiki
      const likeDislikeContainer = document.createElement("div");
      likeDislikeContainer.className = "like-dislike-buttons";

      const likeBtn = document.createElement("button");
      likeBtn.textContent = `Lubię to`;
      likeBtn.className = "like-btn";
      likeDislikeContainer.appendChild(likeBtn);

      const dislikeBtn = document.createElement("button");
      dislikeBtn.textContent = `Nie lubię`;
      dislikeBtn.className = "dislike-btn";
      likeDislikeContainer.appendChild(dislikeBtn);

      container.appendChild(likeDislikeContainer);

      // Dodanie przycisku "Dodaj komentarz" - tylko wizualnie, bez logiki
      const addCommentButton = document.createElement("button");
      addCommentButton.textContent = "Dodaj komentarz";
      addCommentButton.className = "add-comment-btn";

      // Ukryj przycisk, jeśli użytkownik nie jest zalogowany
      if (!isUserLoggedIn()) {
        addCommentButton.style.display = "none";
      }

      container.appendChild(addCommentButton);

      // Sekcja komentarzy - zwiększona wysokość sekcji
      const commentSection = document.createElement("div");
      commentSection.className = "comment-section";
      commentSection.style.height = "100px"; // Zwiększona wysokość sekcji komentarzy

      // Przykładowe komentarze (można je dynamicznie dodać później)
      const exampleComment = document.createElement("div");
      exampleComment.className = "comment-item";
      exampleComment.textContent = "comment-section";
      commentSection.appendChild(exampleComment);

      container.appendChild(commentSection);
      postList.appendChild(container);
    });

    // Paginacja
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = posts.length < postsPerPage;
  }
}

// Funkcja sprawdzająca, czy użytkownik jest zalogowany
function isUserLoggedIn() {
  // Możesz zaktualizować tą logikę na podstawie Twojego systemu autentykacji.
  // Na przykład, jeśli masz token w localStorage, możesz go sprawdzić:
  const token = localStorage.getItem("token");
  return token !== null; // Jeśli token istnieje, użytkownik jest zalogowany
}

// Obsługa przycisku "poprzednia strona"
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPosts();
  }
});

// Obsługa przycisku "następna strona"
document.getElementById("next-page").addEventListener("click", () => {
  currentPage++;
  renderPosts();
});

// Inicjalizacja renderowania postów
renderPosts();
