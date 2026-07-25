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
GET /api/gallery-items?populate=image&sort=sortOrder:asc
```

Example local request:

```bash
curl "http://localhost:1337/api/gallery-items?populate=image&sort=sortOrder:asc"
```

The response is paginated. The default page size is 25 and the maximum is 100. Add `pagination[pageSize]` when the frontend needs more items.

## Production

Replace the generated secrets in `.env`, configure a production database and media-storage provider, then run:

```bash
npm run build
npm run start
```