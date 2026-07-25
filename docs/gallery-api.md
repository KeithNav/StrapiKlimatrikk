# KlimaTrikk gallery API

The `Gallery item` collection represents one photo in the public gallery at `https://klimatrikk.hu/galeria/`.

## Local start

```bash
npm install
npm run develop
```

Open `http://localhost:1337/admin` and create the initial administrator account. In development, uploaded media is stored in `public/uploads`.

## Content editing

In **Content Manager -> Gallery item**, create a new item and upload its required image. Saving makes the image available through the public API immediately.

## Public read endpoint

Public read access is configured automatically when Strapi starts. Write operations and media uploads remain restricted to authenticated administrators.

```http
GET /api/gallery-items?populate=image&pagination[pageSize]=100
```

Example local request:

```bash
curl "http://localhost:1337/api/gallery-items?populate=image&pagination[pageSize]=100"
```

The response is paginated. The default page size is 25 and the maximum is 100. Add `pagination[pageSize]` when the frontend needs more items.

## Production

Replace the generated secrets in `.env`, configure a production database and media-storage provider, then run:

```bash
npm run build
npm run start
```

The public site fetches the gallery from its own `/api/gallery-items` path. The web server must proxy `/api/` and `/uploads/` to Strapi, which can remain bound to `127.0.0.1:1337`:

```nginx
location /api/ {
	proxy_pass http://127.0.0.1:1337;
	proxy_set_header Host $host;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /uploads/ {
	proxy_pass http://127.0.0.1:1337;
}
```

For a separate Strapi host in development or another environment, set `VITE_STRAPI_URL` to its public origin before building the frontend.