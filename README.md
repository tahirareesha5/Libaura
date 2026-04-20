# 📚 Libaura

**Libaura** is a beautiful personal library management web application. Track the books you own, are reading, have completed, or wish to read — all in one place, with no sign-up required.

## Features

- **Add books** with title, author, genre, publication year, reading status, star rating, and personal notes
- **Three reading statuses**: Wishlist 📌 · Currently Reading 📖 · Completed ✅
- **Live statistics** dashboard (total, reading, completed, wishlist counts)
- **Search** books by title, author, genre, or notes
- **Filter** by status or genre
- **Sort** by newest, oldest, title, author, or top-rated
- **Edit** any book's details via a modal dialog
- **Delete** books you no longer need
- **Persistent storage** — books are saved in `localStorage` and survive page refreshes
- **Fully responsive** layout that works on mobile, tablet, and desktop

## Getting Started

No build step or server required — just open `index.html` in any modern browser.

```bash
# Clone the repository
git clone https://github.com/tahirareesha5/Libaura.git
cd Libaura

# Open in your browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

## Project Structure

```
Libaura/
├── index.html   – Application markup
├── style.css    – All styles (custom properties, responsive layout)
├── app.js       – Library logic, localStorage persistence, UI interactions
└── README.md
```

## Usage

1. Fill in the **Add a Book** form at the top and click **Add to Library**.
2. Your books appear as cards in **My Library**.
3. Use the search bar and dropdowns to filter or sort your collection.
4. Click ✏️ on a card to edit it, or 🗑️ to delete it.

## License

MIT
