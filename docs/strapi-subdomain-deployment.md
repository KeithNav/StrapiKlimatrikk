# Strapi HTTPS deployment

This configuration serves Strapi securely at `https://strapi.klimatrikk.hu` while the Node process remains private on `127.0.0.1:1337`.

## Server prerequisites

1. Point the `strapi` DNS A/AAAA record at the server.
2. Copy the production values below into `StrapiKlimatrikk/.env`. Do not use the placeholder secrets from `.env.example`.

```dotenv
HOST=127.0.0.1
PORT=1337
PUBLIC_URL=https://strapi.klimatrikk.hu
IS_PROXIED=true
```

3. Install the supplied Nginx site configuration and create its ACME web-root:

```bash
sudo install -d -m 0755 /var/www/certbot
sudo cp docs/nginx/strapi.klimatrikk.hu.conf /etc/nginx/sites-available/strapi.klimatrikk.hu
sudo ln -s /etc/nginx/sites-available/strapi.klimatrikk.hu /etc/nginx/sites-enabled/
```

4. Obtain the certificate, validate Nginx, and reload it:

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d strapi.klimatrikk.hu
sudo nginx -t
sudo systemctl reload nginx
```

5. Rebuild and restart Strapi:

```bash
npm run build
pm2 restart klimatrikk-strapi --update-env
```

## Renewal

Certbot normally installs a renewal timer. Verify it and perform a dry run:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

The Nginx configuration redirects all HTTP requests to HTTPS. Check both the certificate and the public service after deployment:

```bash
curl -I http://strapi.klimatrikk.hu/admin
curl -I https://strapi.klimatrikk.hu/admin
```