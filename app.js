/**
 * Libaura – app.js
 * Personal library manager: add, edit, delete, filter and sort books.
 * Data is persisted to localStorage so it survives page refreshes.
 */

/* ===========================
   Constants & State
   =========================== */

const STORAGE_KEY = 'libaura_books';

const STATUS_LABELS = {
  wishlist:  '📌 Wishlist',
  reading:   '📖 Reading',
  completed: '✅ Completed',
};

/** @type {Book[]} */
let books = [];

/** @typedef {{ id: string, title: string, author: string, genre: string, status: string, year: string, rating: number, notes: string, createdAt: number }} Book */

/* ===========================
   Persistence
   =========================== */

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    books = raw ? JSON.parse(raw) : [];
  } catch {
    books = [];
  }
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

/* ===========================
   DOM References
   =========================== */

const bookList        = document.getElementById('book-list');
const emptyState      = document.getElementById('empty-state');
const addForm         = document.getElementById('add-book-form');
const searchInput     = document.getElementById('search-input');
const filterStatus    = document.getElementById('filter-status');
const filterGenre     = document.getElementById('filter-genre');
const sortBooks       = document.getElementById('sort-books');
const toastEl         = document.getElementById('toast');
const editModal       = document.getElementById('edit-modal');
const modalOverlay    = document.getElementById('modal-overlay');
const modalClose      = document.getElementById('modal-close');
const cancelEdit      = document.getElementById('cancel-edit');
const editForm        = document.getElementById('edit-book-form');
const formError       = document.getElementById('form-error');
const editFormError   = document.getElementById('edit-form-error');
const footerYear      = document.getElementById('footer-year');

/* ===========================
   Utility Functions
   =========================== */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function starsHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? '<span>★</span>'
      : '<span class="empty-star">★</span>';
  }
  return html;
}

/* ===========================
   Toast Notifications
   =========================== */

let toastTimer = null;

/**
 * Show a brief toast message.
 * @param {string} message
 * @param {'success'|'error'|'info'} [type='info']
 */
function showToast(message, type = 'info') {
  toastEl.textContent = message;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.className = 'toast';
  }, 3000);
}

/* ===========================
   Stats
   =========================== */

function updateStats() {
  document.getElementById('total-books').textContent    = books.length;
  document.getElementById('reading-books').textContent  = books.filter(b => b.status === 'reading').length;
  document.getElementById('completed-books').textContent = books.filter(b => b.status === 'completed').length;
  document.getElementById('wishlist-books').textContent  = books.filter(b => b.status === 'wishlist').length;
}

/* ===========================
   Genre Filter Options
   =========================== */

function refreshGenreFilter() {
  const genres = [...new Set(books.map(b => b.genre).filter(Boolean))].sort();
  const current = filterGenre.value;
  filterGenre.innerHTML = '<option value="all">All Genres</option>';
  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    if (g === current) opt.selected = true;
    filterGenre.appendChild(opt);
  });
}

/* ===========================
   Render Books
   =========================== */

function getFilteredSortedBooks() {
  const query  = searchInput.value.trim().toLowerCase();
  const status = filterStatus.value;
  const genre  = filterGenre.value;
  const sort   = sortBooks.value;

  let list = books.filter(book => {
    if (status !== 'all' && book.status !== status) return false;
    if (genre  !== 'all' && book.genre  !== genre)  return false;
    if (query) {
      const haystack = `${book.title} ${book.author} ${book.genre} ${book.notes}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  list = [...list].sort((a, b) => {
    switch (sort) {
      case 'oldest': return a.createdAt - b.createdAt;
      case 'title':  return a.title.localeCompare(b.title);
      case 'author': return a.author.localeCompare(b.author);
      case 'rating': return b.rating - a.rating;
      default:       return b.createdAt - a.createdAt; // newest
    }
  });

  return list;
}

function renderBooks() {
  const list = getFilteredSortedBooks();

  // Clear non-empty-state children
  [...bookList.children].forEach(child => {
    if (child !== emptyState) child.remove();
  });

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  list.forEach(book => {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.status = book.status;
    card.dataset.id = book.id;

    card.innerHTML = `
      <div class="book-card-header">
        <h3 class="book-title">${escapeHtml(book.title)}</h3>
        <div class="book-actions">
          <button class="btn btn-icon btn-edit" data-action="edit" data-id="${escapeHtml(book.id)}" title="Edit book" aria-label="Edit ${escapeHtml(book.title)}">✏️</button>
          <button class="btn btn-icon btn-delete" data-action="delete" data-id="${escapeHtml(book.id)}" title="Delete book" aria-label="Delete ${escapeHtml(book.title)}">🗑️</button>
        </div>
      </div>
      <p class="book-author">by ${escapeHtml(book.author)}</p>
      <div class="book-meta">
        <span class="badge badge-status" data-status="${escapeHtml(book.status)}">${STATUS_LABELS[book.status] || book.status}</span>
        ${book.genre ? `<span class="badge badge-genre">${escapeHtml(book.genre)}</span>` : ''}
        ${book.year  ? `<span class="badge badge-year">${escapeHtml(book.year)}</span>` : ''}
      </div>
      ${book.rating > 0 ? `<div class="book-stars">${starsHtml(book.rating)}</div>` : ''}
      ${book.notes ? `<p class="book-notes">${escapeHtml(book.notes)}</p>` : ''}
    `;

    bookList.appendChild(card);
  });
}

/* ===========================
   Star Rating Widgets
   =========================== */

function initStarRating(containerId, hiddenInputId) {
  const container = document.getElementById(containerId);
  const hidden    = document.getElementById(hiddenInputId);
  if (!container || !hidden) return;

  function setRating(value) {
    hidden.value = value;
    container.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value, 10) <= value);
    });
  }

  container.addEventListener('click', e => {
    const star = e.target.closest('.star');
    if (!star) return;
    const value = parseInt(star.dataset.value, 10);
    // Toggle off if clicking the already-selected star
    setRating(parseInt(hidden.value, 10) === value ? 0 : value);
  });

  container.addEventListener('mouseover', e => {
    const star = e.target.closest('.star');
    if (!star) return;
    const hoverVal = parseInt(star.dataset.value, 10);
    container.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value, 10) <= hoverVal);
    });
  });

  container.addEventListener('mouseleave', () => {
    const current = parseInt(hidden.value, 10);
    container.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value, 10) <= current);
    });
  });

  return { setRating };
}

/* ===========================
   Add Book Form
   =========================== */

const addStarRating = initStarRating('star-rating', 'book-rating');

addForm.addEventListener('submit', e => {
  e.preventDefault();
  formError.hidden = true;

  const title  = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();

  if (!title || !author) {
    formError.textContent = 'Title and Author are required.';
    formError.hidden = false;
    return;
  }

  const book = {
    id:        generateId(),
    title,
    author,
    genre:     document.getElementById('book-genre').value,
    status:    document.getElementById('book-status').value,
    year:      document.getElementById('book-year').value.trim(),
    rating:    parseInt(document.getElementById('book-rating').value, 10) || 0,
    notes:     document.getElementById('book-notes').value.trim(),
    createdAt: Date.now(),
  };

  books.unshift(book);
  saveBooks();
  refreshGenreFilter();
  updateStats();
  renderBooks();
  showToast(`"${title}" added to your library!`, 'success');

  // Reset form
  addForm.reset();
  document.getElementById('book-rating').value = '0';
  document.querySelectorAll('#star-rating .star').forEach(s => s.classList.remove('active'));
});

/* ===========================
   Delete Book
   =========================== */

function deleteBook(id) {
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return;
  const title = books[idx].title;
  books.splice(idx, 1);
  saveBooks();
  refreshGenreFilter();
  updateStats();
  renderBooks();
  showToast(`"${title}" removed from your library.`, 'info');
}

/* ===========================
   Edit Book Modal
   =========================== */

const editStarRating = initStarRating('edit-star-rating', 'edit-rating');

function openEditModal(id) {
  const book = books.find(b => b.id === id);
  if (!book) return;

  document.getElementById('edit-book-id').value  = book.id;
  document.getElementById('edit-title').value    = book.title;
  document.getElementById('edit-author').value   = book.author;
  document.getElementById('edit-genre').value    = book.genre || '';
  document.getElementById('edit-status').value   = book.status;
  document.getElementById('edit-year').value     = book.year || '';
  document.getElementById('edit-notes').value    = book.notes || '';
  document.getElementById('edit-rating').value   = book.rating || 0;
  editStarRating.setRating(book.rating || 0);
  editFormError.hidden = true;

  editModal.hidden = false;
  document.getElementById('edit-title').focus();
}

function closeEditModal() {
  editModal.hidden = true;
}

modalClose.addEventListener('click', closeEditModal);
cancelEdit.addEventListener('click', closeEditModal);
modalOverlay.addEventListener('click', closeEditModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !editModal.hidden) closeEditModal();
});

editForm.addEventListener('submit', e => {
  e.preventDefault();
  editFormError.hidden = true;

  const id     = document.getElementById('edit-book-id').value;
  const title  = document.getElementById('edit-title').value.trim();
  const author = document.getElementById('edit-author').value.trim();

  if (!title || !author) {
    editFormError.textContent = 'Title and Author are required.';
    editFormError.hidden = false;
    return;
  }

  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) { closeEditModal(); return; }

  books[idx] = {
    ...books[idx],
    title,
    author,
    genre:  document.getElementById('edit-genre').value,
    status: document.getElementById('edit-status').value,
    year:   document.getElementById('edit-year').value.trim(),
    rating: parseInt(document.getElementById('edit-rating').value, 10) || 0,
    notes:  document.getElementById('edit-notes').value.trim(),
  };

  saveBooks();
  refreshGenreFilter();
  updateStats();
  renderBooks();
  closeEditModal();
  showToast(`"${title}" updated.`, 'success');
});

/* ===========================
   Book List Event Delegation
   =========================== */

bookList.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'edit')   openEditModal(id);
  if (action === 'delete') deleteBook(id);
});

/* ===========================
   Search & Filter Events
   =========================== */

searchInput.addEventListener('input',  renderBooks);
filterStatus.addEventListener('change', renderBooks);
filterGenre.addEventListener('change',  renderBooks);
sortBooks.addEventListener('change',    renderBooks);

/* ===========================
   Bootstrap
   =========================== */

footerYear.textContent = new Date().getFullYear();

loadBooks();
refreshGenreFilter();
updateStats();
renderBooks();
