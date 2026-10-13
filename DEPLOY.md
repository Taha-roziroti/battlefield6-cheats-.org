# Deploy checklist (required for live site + images)

Your **built site is already on GitHub** in the **`gh-pages`** branch (includes `deploy-revision.txt` and all WebP images).  
If `https://battlefield6-cheats.org/...` does not open, it is almost always **DNS** and/or **GitHub Pages not turned on** — not missing code.

## 1. Turn on GitHub Pages (required)

Repo: **https://github.com/Taha-roziroti/battlefield6-cheats-.org**

1. **Settings** → **Pages**
2. **Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages`
   - **Folder:** `/` (root)
3. Click **Save**

Wait 2–5 minutes, then open (project URL — works even before custom DNS):

**https://taha-roziroti.github.io/battlefield6-cheats-.org/deploy-revision.txt**

You should see a commit hash and build time. Then test:

**https://taha-roziroti.github.io/battlefield6-cheats-.org/images/battlefield/site-hero-background-1920.webp**

If those work, the site and images are live on GitHub.

## 2. Fix custom domain DNS (required for battlefield6-cheats.org)

`battlefield6-cheats.org` must exist at your **domain registrar** and point to GitHub.

At the registrar (where you bought the domain), set **either**:

**Option A — A records (apex `@`):**

| Type | Name | Value |
|------|------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Option B — CNAME (often for `www` only):**

| Type | Name | Value |
|------|------|--------|
| CNAME | www | `taha-roziroti.github.io` |

Then in **GitHub → Settings → Pages → Custom domain**, enter: `battlefield6-cheats.org`  
GitHub will verify DNS (can take up to 24–48 hours; often minutes).

The repo’s `gh-pages` branch already contains a **CNAME** file with `battlefield6-cheats.org`.

## 3. GitHub Actions (if you don’t see workflows)

1. **Settings** → **Actions** → **General**
2. **Actions permissions:** Allow all actions and reusable workflows
3. Open the **Actions** tab on the repo
4. Left sidebar: **Deploy to GitHub Pages** (runs on every push to `main`)

If the list is empty, confirm you are on repo `Taha-roziroti/battlefield6-cheats-.org` and branch `main` contains `.github/workflows/deploy.yml`.

## 4. Redeploy from your PC

```bash
git push origin main
```

Or: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

## 5. Verify live

| Check | URL |
|--------|-----|
| Revision file | `/deploy-revision.txt` |
| Hero image | `/images/battlefield/site-hero-background-1920.webp` |

Use the **github.io** URL first; after DNS propagates, the same paths on **https://battlefield6-cheats.org/** should work.
