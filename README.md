# Sexy Moves by Ebaby site

Static marketing and course experience for the Sexy Moves by Ebaby membership. This version runs entirely in the browser using HTML/CSS/JS and `localStorage` to simulate accounts and memberships.

## Pages

- `index.html` – marketing home page.
- `account.html` – create a local account, toggle membership, and manage basic status.
- `course.html` – gated course layout with sidebar navigation and lesson content.

## Local development

You can open `index.html` directly in a browser, but for best results run a small static server (to keep paths and console behavior closer to production).

On macOS you can use Python:

```bash
cd /path/to/ebaby_course
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages deployment

This project is designed to be hosted from the repository root via GitHub Pages.

1. Commit and push all files to GitHub.
2. In GitHub, go to **Settings → Pages**.
3. Under **Source**, choose:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Click **Save**.

GitHub will build and serve the static site at a URL like:

- `https://<your-username>.github.io/<repo-name>/`

All links in the project are relative, so the site will work at that path.

## How the mock membership works

- Account and membership data is stored in `localStorage` with the key `ebaby_user`.
- Creating an account in `account.html` sets `hasActiveMembership: true` and unlocks the course page.
- The course page checks this flag and either:
  - Shows a “Course locked” card for non-members, or
  - Displays the Teachable-style layout with chapters on the left and the selected lesson on the right.

In a future version, these pieces can be wired to a Render backend and real billing, replacing the `localStorage` helpers in `app.js` with API calls.

