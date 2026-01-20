# bun-react-tailwind-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

To deploy as a **pure static SPA**:

```bash
# Optional but recommended so sitemap.xml contains the correct domain
SITE_URL="https://your-domain.com" bun run build
```

- Upload `dist/` to any static host (S3/CloudFront, Netlify, Vercel static, Nginx, etc).
- Configure an SPA fallback so unknown routes serve `index.html`.
- The build generates `dist/robots.txt` and `dist/sitemap.xml`.

This project was created using `bun init` in bun v1.3.2. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
