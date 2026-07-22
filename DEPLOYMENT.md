# Deployment

Production domain: <https://joeyandana2026.com>

This project builds a static Next.js export into `out/`. The GitHub Actions workflow in
`.github/workflows/deploy.yml` publishes that folder to a VPS over SSH after every push to
`main`.

## Required GitHub Secrets

Configure these in `https://github.com/jnrahme/wedding/settings/secrets/actions`:

- `DEPLOY_HOST`: VPS hostname or IP address, currently `187.124.94.28`.
- `DEPLOY_USER`: SSH user, currently `root`.
- `DEPLOY_PATH`: absolute web root on the VPS, currently `/opt/wedding/site`.
- `DEPLOY_SSH_KEY`: private SSH key with write access to `DEPLOY_PATH`.

## VPS Requirements

- Port `22` must be reachable from GitHub Actions.
- The deploy user's public key must be present in `~/.ssh/authorized_keys`.
- The `wedding-web` nginx container serves `DEPLOY_PATH`.
- The shared `/opt/edge` Caddy proxy routes `joeyandana2026.com` and `www.joeyandana2026.com` to `wedding-web:80`.
- Caddy manages TLS automatically.

## Manual Build Check

```bash
npm ci
npm run lint
npm run build
```
