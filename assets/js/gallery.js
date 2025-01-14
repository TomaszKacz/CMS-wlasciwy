// assets/js/gallery.js

// Generujemy tablicę obrazów o nazwach obX.jpg
const images = Array.from(
  { length: 100 },
  (_, i) => `assets/images/ob${i + 1}.jpg`
);

let currentPage = 1;
const imagesPerPage = 10;

function renderImages() {
  const imageList = document.getElementById("image-list");
  const start = (currentPage - 1) * imagesPerPage;
  const end = start + imagesPerPage;

  imageList.innerHTML = ""; // Clear previous images

  images.slice(start, end).forEach((src, index) => {
    const container = document.createElement("div");
    container.className = "image-item-container";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.className = "image-item";
    container.appendChild(img);

    const actions = document.createElement("div");
    actions.className = "image-actions";

    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Lubię to";
    actions.appendChild(likeBtn);

    const dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = "Nie lubię";
    actions.appendChild(dislikeBtn);

    const commentBtn = document.createElement("button");
    commentBtn.textContent = "Dodaj komentarz";
    commentBtn.addEventListener("click", () => showCommentSection(container));
    actions.appendChild(commentBtn);

    container.appendChild(actions);
    container.appendChild(createCommentSection());
    imageList.appendChild(container);
  });

  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled =
    currentPage === Math.ceil(images.length / imagesPerPage);
}

function showCommentSection(container) {
  const commentSection = container.querySelector(".comment-section");
  commentSection.style.display = "block";
}

function createCommentSection() {
  const section = document.createElement("div");
  section.className = "comment-section";
  section.style.display = "none"; // initially hidden

  const commentInput = document.createElement("textarea");
  commentInput.placeholder = "Dodaj komentarz...";
  section.appendChild(commentInput);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Wyślij";
  section.appendChild(submitBtn);

  return section;
}

document.getElementById("prev-page").addEventListener("click", () => {
  currentPage--;
  renderImages();
});

document.getElementById("next-page").addEventListener("click", () => {
  currentPage++;
  renderImages();
});

// Initial render
renderImages();
