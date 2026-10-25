
const bookList = document.querySelector("#book-list");
const bookForm = document.querySelector("#book-form");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const message = document.querySelector("#message");

async function loadBooks(search = "") {
  try {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    const response = await fetch(`/books?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Could not load books");
    }

    const data = await response.json();
    const books = Array.isArray(data) ? data : data.books;

    bookList.replaceChildren();

    books.forEach((book) => {
      const item = document.createElement("li");
      const details = document.createElement("div");
      details.className = "book-details";

      const title = document.createElement("strong");
      title.textContent = book.title;

      const info = document.createElement("p");
      info.textContent =
        `${book.genre ?? "Unknown genre"} · ` +
        `${book.published_year ?? "Year unknown"}`;

      details.append(title, info);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => deleteBook(book.id));

      item.append(details, deleteButton);
      bookList.append(item);
    });

    message.textContent = `${books.length} book(s) loaded.`;
  } catch (error) {
    message.textContent = error.message;
  }
}

bookForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const genre = document.querySelector("#genre").value.trim();
  const yearInput = document.querySelector("#published-year").value;

  const body = {
    title,
    genre: genre || null,
    published_year: yearInput === "" ? null : Number(yearInput),
  };

  try {
    const response = await fetch("/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not add book");
    }

    bookForm.reset();
    message.textContent = "Book added successfully.";
    await loadBooks(searchInput.value);
  } catch (error) {
    message.textContent = error.message;
  }
});

async function deleteBook(id) {
  if (!confirm("Are you sure you want to delete this book?")) {
    return;
  }

  try {
    const response = await fetch(`/books/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not delete book");
    }

    message.textContent = "Book deleted successfully.";
    await loadBooks(searchInput.value);
  } catch (error) {
    message.textContent = error.message;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loadBooks(searchInput.value);
});

document.querySelector("#show-all").addEventListener("click", () => {
  searchInput.value = "";
  loadBooks();
});

loadBooks();
