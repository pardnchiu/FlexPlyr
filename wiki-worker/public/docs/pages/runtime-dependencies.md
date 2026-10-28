# Runtime Dependencies

This page lists the external assets FlexPlyr injects into `<head>` on load and what they mean for versioning, CSP, and SSR.

## Injected Assets

As soon as the script runs, it inserts the following `preconnect`, `preload`, and loading tags into `<head>` (`src/js/*.js`), regardless of how many players you create or which sources they use:

| Asset | URL | Purpose |
|-------|-----|---------|
| Panel styles | `https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@latest/dist/FlexPlyr.css` | Container, panel, and theme styles |
| Icon font | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined...` | Panel button icons (`play_arrow`, `volume_up`, and other font ligatures) |
| YouTube SDK | `https://www.youtube.com/iframe_api` (`async`) | `YT.Player` |
| Vimeo SDK | `https://player.vimeo.com/api/player.js` (`async`) | `Vimeo.Player` |

```demo
<script>
  const urls = [...document.head.querySelectorAll('link[rel="stylesheet"], script[src]')]
    .map((e) => e.href || e.src)
    .filter((u) => !u.includes("/dist/FlexPlyr.js"));
  urls.forEach((u) => console.log(u));
</script>
```

## Implications

| Area | Details |
|------|---------|
| Style version | Styles always come from `@latest`, so even with the script pinned to `@2.2.9`, styles change when a new version ships |
| HTML5-only pages | The YouTube and Vimeo SDKs still download |
| CSP | `script-src` must allow `cdn.jsdelivr.net` (when loading from the CDN), `www.youtube.com`, and `player.vimeo.com`; `style-src` must allow `cdn.jsdelivr.net` and `fonts.googleapis.com`; `font-src` must allow `fonts.gstatic.com`; `frame-src` must allow `www.youtube.com` and `player.vimeo.com` |
| SSR | The module touches `document.head` and `navigator.userAgent` on load, so importing it in Node.js fails; load it dynamically on the client only |
| SDK timing | The SDKs load `async`, so YouTube/Vimeo players must wait for them; see [Media Sources](/media-sources) |

## Related Pages

- [Getting Started](/getting-started)
- [Architecture](/architecture)
