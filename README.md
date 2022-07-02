# @himenon/template-esm-nodejs-server

```bash
docker run -e PORT=5000 -p 5000:5000 --rm ghcr.io/himenon/template-esm-nodejs-server
```

## Development

Watch

```bash
$ pnpm run watch
```

Build Step

```bash
$ pnpm run build
$ docker build --no-cache -t ghcr.io/himenon/template-esm-nodejs-server .
```

## Release

1. Merge `main` branch
2. [GitHub Action] Auto update version by semantic release
3. Create Release
4. [GitHub Action] Push docker

## LICENCE

[@Himenon/template-esm-nodejs-server](https://github.com/Himenon/template-esm-nodejs-server)・MIT
