// comments.js

// Sprawdzamy, czy zmienna isLoggedIn jest już zdefiniowana globalnie
if (typeof window.isLoggedIn === "undefined") {
  window.isLoggedIn = false; // Jeśli nie, ustawiamy ją na domyślną wartość false
}

function createCommentSection() {
  const commentSection = document.createElement("div");
  commentSection.className = "comment-section";

  const commentList = document.createElement("ul");
  commentList.className = "comment-list";
  commentSection.appendChild(commentList);

  const commentInput = document.createElement("div");
  commentInput.className = "comment-input";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = window.isLoggedIn
    ? "Dodaj komentarz..."
    : "Zaloguj się, aby dodawać komentarze";
  input.disabled = !window.isLoggedIn;
  commentInput.appendChild(input);

  const addCommentBtn = document.createElement("button");
  addCommentBtn.textContent = "Dodaj";
  addCommentBtn.disabled = !window.isLoggedIn;
  commentInput.appendChild(addCommentBtn);

  commentSection.appendChild(commentInput);

  addCommentBtn.addEventListener("click", () => {
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value.trim();
      commentList.appendChild(li);
      input.value = "";
    }
  });

  return commentSection;
}
