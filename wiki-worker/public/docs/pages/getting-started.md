# Getting Started

This page covers loading FlexPlyr, mounting your first player, and calling its methods once it is ready.

## Prerequisites

- A modern browser that supports ES2022 private fields (`#field`) and CSS `:has()`
- Network access to `cdn.jsdelivr.net`, `fonts.googleapis.com`, `www.youtube.com`, and `player.vimeo.com` (see [Runtime Dependencies](/runtime-dependencies))
- Browser-only: the module touches `document` and `navigator` as soon as it loads

## Installation

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
```

The global `FPlyr` is available once the script loads.

### npm

```bash
npm i @pardnchiu/flexplyr
```

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

`main` in `package.json` points to `dist/FlexPlyr.js` (a non-module build that sets `window.FPlyr`); import `dist/FlexPlyr.esm.js` for the named export.

## Your First Player

Pass the `id` of an existing element and one media source. The player turns that element into the `.FPlyr` container, which fills its parent, so the parent needs a height.

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => setTimeout(() => console.log("ready, paused:", player.isPaused())),
    },
  });
</script>
```

## Call Methods After ready

`when.ready` fires **before** the player sets its internal source flags (`src/js/model/player.js:395`), so calling `isPaused()`, `isMuted()`, or `play()` synchronously inside `ready` returns `undefined` or does nothing. Defer the call to the next task (for example with `setTimeout`) to get correct results; see [Lifecycle Events](/lifecycle-events).

## Next Steps

- [Media Sources](/media-sources): switch to YouTube, Vimeo, or audio
- [Panel Themes](/panel-themes) and [Panel Controls](/panel-controls): change the look and the buttons
- [Configuration](/configuration): every constructor option
