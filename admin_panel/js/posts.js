let currentPage = 0; // Aktualna strona
const postsPerPage = 10; // Ilość postów na stronie
let totalPostsFetched = 0; // Liczba pobranych postów

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

    if (data && Array.isArray(data)) {
      totalPostsFetched = data.length; // Zapisz liczbę pobranych postów
      return data; // Zwróć tylko posty
    } else {
      console.error("Invalid data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Funkcja do usuwania posta
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

    const data = await response.json();
    console.log("Post deleted successfully:", data);

    // Po usunięciu, zaktualizuj listę postów na stronie
    renderPosts(); // Ponownie renderuj posty
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Funkcja renderująca posty na stronie
async function renderPosts() {
  const posts = await fetchPosts(currentPage);
  const postList = document.getElementById("post-list");
  postList.innerHTML = ""; // Wyczyść poprzednie posty

  if (posts && Array.isArray(posts)) {
    posts.forEach((post) => {
      const row = document.createElement("tr");

      const postId = document.createElement("td");
      postId.textContent = post.id;
      row.appendChild(postId);

      const authorLogin = document.createElement("td");
      authorLogin.textContent = post.author
        ? post.author.login
        : "Nieznany autor";
      row.appendChild(authorLogin);

      const source = document.createElement("td");
      source.textContent = post.source;
      row.appendChild(source);

      const createdAt = document.createElement("td");
      createdAt.textContent = new Date(post.created_at).toLocaleString("pl-PL"); // Formatowanie daty zgodnie z ustawieniami polskimi
      row.appendChild(createdAt);

      const actions = document.createElement("td");
      actions.innerHTML = `
        <button class="btn btn-info btn-sm" onclick="openPost(${post.id})">Zobacz</button>
        <button class="btn btn-danger btn-sm delete-btn" data-post-id="${post.id}">Usuń</button>
      `;
      row.appendChild(actions);

      postList.appendChild(row);
    });

    // Ustawienie widoczności przycisków do zmiany stron
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = currentPage === 0; // Disable "prev" button on the first page
    nextButton.disabled = totalPostsFetched < postsPerPage; // Jeśli pobrano mniej postów niż na stronie, to nie ma więcej stron

    document.getElementById("page-number").textContent = currentPage + 1; // Pokazujemy numer aktualnej strony
  } else {
    console.error("No posts found or posts is not an array.");
  }

  // Dodajemy nasłuchiwacze do przycisków "Usuń"
  addDeleteEventListeners();
}

// Funkcja dodająca nasłuchiwacze do przycisków "Usuń"
function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const postId = event.target.getAttribute("data-post-id");

      if (confirm("Czy na pewno chcesz usunąć ten post?")) {
        deletePost(postId); // Wywołaj funkcję usuwania
      }
    });
  });
}

// Funkcja do otwierania posta w nowej karcie
function openPost(postId) {
  const imageUrl = `file:///C:/Users/tomek/Documents/GitHub/cms/Backend/data/images/${postId}.png`;
  window.open(imageUrl, "_blank");
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
