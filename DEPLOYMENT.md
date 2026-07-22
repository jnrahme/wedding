# Deployment

Production domain: <https://joeyandana2026.com>

This project builds a static Next.js export into `out/`. The GitHub Actions workflow in
`.github/workflows/deploy.yml` publishes that folder to a VPS over SSH after every push to
`main`.

## Required GitHub Secrets

Configure these in `https://github.com/jnrahme/wedding/settings/secrets/actions`:

- `DEPLOY_HOST`: VPS hostname or IP address, for example `2.57.91.91`.
- `DEPLOY_USER`: SSH user, for example `root` or the site deploy user.
- `DEPLOY_PATH`: absolute web root on the VPS, for example `/var/www/joeyandana2026.com/html`.
- `DEPLOY_SSH_KEY`: private SSH key with write access to `DEPLOY_PATH`.

## VPS Requirements

- Port `22` must be reachable from GitHub Actions.
- The deploy user's public key must be present in `~/.ssh/authorized_keys`.
- Nginx or Apache must serve `DEPLOY_PATH` for `joeyandana2026.com` and `www.joeyandana2026.com`.
- TLS should be issued after the vhost is active, usually with Certbot.

## Manual Build Check

```bash
npm ci
npm run lint
npm run build
```
