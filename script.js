
/* ===== 1. DATA SNIPPETS ===== */

let snippets = [
  {
    id: 1,
    title: "Halo Dunia",
    description: "Contoh snippet JavaScript pertama.",
    language: "JavaScript",
    code: 'console.log("Hello World!");'
  }
];


/* ===== 2. AMBIL ELEMEN HTML ===== */

const snippetList = document.getElementById("snippetList");
const searchInput = document.getElementById("searchInput");
const addButton = document.getElementById("addButton");


/* ===== 3. TAMPILKAN SNIPPETS ===== */

function renderSnippets(data = snippets) {
  snippetList.innerHTML = "";

  if (data.length === 0) {
    snippetList.innerHTML = `
      <p class="empty-state">Snippet tidak ditemukan.</p>
    `;
    return;
  }

  data.forEach(function (snippet) {
    const card = document.createElement("article");

    card.className = "snippet-card";

    card.innerHTML = `
      <h2>${escapeHTML(snippet.title)}</h2>
      <p>${escapeHTML(snippet.description)}</p>
      <p class="snippet-language">${escapeHTML(snippet.language)}</p>

      <pre><code>${escapeHTML(snippet.code)}</code></pre>

      <div class="card-actions">
        <button class="copy-button" data-id="${snippet.id}">
          Salin Kode
        </button>

        <button class="delete-button" data-id="${snippet.id}">
          Hapus
        </button>
      </div>
    `;

    snippetList.appendChild(card);
  });
}


/* ===== 4. AMANKAN TEKS HTML ===== */

function escapeHTML(text) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };

  return String(text).replace(/[&<>"']/g, function (char) {
    return entities[char];
  });
}


/* ===== 5. FITUR PENCARIAN ===== */

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase().trim();

  const filteredSnippets = snippets.filter(function (snippet) {
    return (
      snippet.title.toLowerCase().includes(keyword) ||
      snippet.description.toLowerCase().includes(keyword) ||
      snippet.language.toLowerCase().includes(keyword)
    );
  });

  renderSnippets(filteredSnippets);
});


/* ===== 6. TAMBAH SNIPPET ===== */

addButton.addEventListener("click", function () {
  const title = prompt("Masukkan judul snippet:");
  if (title === null || !title.trim()) return;

  const description = prompt("Masukkan deskripsi snippet:");
  if (description === null) return;

  const language = prompt(
    "Bahasa pemrograman? (JavaScript, HTML, CSS, Python)",
    "JavaScript"
  );

  if (language === null || !language.trim()) return;

  const code = prompt("Masukkan kode yang ingin disimpan:");
  if (code === null || !code.trim()) return;

  const newSnippet = {
    id: Date.now(),
    title: title.trim(),
    description: description.trim(),
    language: language.trim(),
    code: code
  };

  snippets.unshift(newSnippet);

  renderSnippets();
  searchInput.value = "";
});


/* ===== 7. COPY DAN DELETE ===== */

snippetList.addEventListener("click", async function (event) {
  const button = event.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);

  if (button.classList.contains("copy-button")) {
    const snippet = snippets.find(function (item) {
      return item.id === id;
    });

    if (!snippet) return;

    try {
      await navigator.clipboard.writeText(snippet.code);

      button.textContent = "Tersalin!";

      setTimeout(function () {
        button.textContent = "Salin Kode";
      }, 1500);
    } catch (error) {
      alert("Gagal menyalin. Coba jalankan melalui localhost.");
    }
  }

  if (button.classList.contains("delete-button")) {
    const confirmed = confirm("Hapus snippet ini?");

    if (!confirmed) return;

    snippets = snippets.filter(function (item) {
      return item.id !== id;
    });

    renderSnippets();
  }
});


/* ===== 8. TAMPILKAN DATA AWAL ===== */

renderSnippets();
