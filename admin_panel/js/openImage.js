// Funkcja otwierająca grafikę w nowej karcie
function openImage(imageUrl) {
  // Jeśli URL jest pusty, nie otwieraj
  if (imageUrl && imageUrl.trim() !== "") {
    // Otwórz plik lokalny w nowej karcie
    window.open(imageUrl, "_blank");
  } else {
    console.error("Invalid image URL");
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
      createdAt.textContent = new Date(post.created_at).toLocaleString();
      row.appendChild(createdAt);

      const actions = document.createElement("td");
      // Aktualizacja URL do obrazu
      const imageUrl = `file:///C:/Users/tomek/Documents/GitHub/cms/Backend/${post.photo_path}`;
      actions.innerHTML = `
            <button class="btn btn-info btn-sm" data-image-url="${imageUrl}">Zobacz</button>
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

  // Dodajemy nasłuchiwacze do przycisków "Usuń" oraz "Zobacz"
  addDeleteEventListeners();
  addOpenImageEventListeners();
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

// Funkcja dodająca nasłuchiwacze do przycisków "Zobacz"
function addOpenImageEventListeners() {
  const openImageButtons = document.querySelectorAll(".btn-info");

  openImageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const imageUrl = event.target.getAttribute("data-image-url");
      openImage(imageUrl); // Wywołaj funkcję otwierającą obraz
    });
  });
}

// Inicjalizacja renderowania postów
renderPosts();
