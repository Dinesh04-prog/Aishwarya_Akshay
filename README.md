# Wedding Invitation Website (Vite)

A Vite-based frontend project. This repository is prepared for GitHub hosting and CI.

## Quick start

Install dependencies:

```bash
npm ci
# or: npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to GitHub Pages (optional):

1. Set the `repository.url` and `homepage` fields in `package.json` (replace `your-username/your-repo`).
2. Push the repo to GitHub.
3. Publish using the included `deploy` script (it uses `gh-pages`):

```bash
npm run deploy
```

Or enable the included GitHub Actions workflow to automatically build and deploy the `dist` folder when pushing to `main`.

## CI

This repository includes a simple GitHub Actions workflow at `.github/workflows/ci.yml` that installs dependencies and builds the project on push and pull requests. On pushes to `main`, it will also attempt to publish the `dist` directory to GitHub Pages using the `GITHUB_TOKEN`.

## Notes

- Replace placeholders in `package.json` (`repository` and `homepage`) with your real repo URL before relying on automated deploys.
- If you prefer a different deploy method, remove or adjust the `deploy` script and CI step accordingly.

  # Wedding Invitation Website

  This is a code bundle for Wedding Invitation Website. The original project is available at https://www.figma.com/design/117kW2Pv8srionqXlxkKbi/Wedding-Invitation-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  