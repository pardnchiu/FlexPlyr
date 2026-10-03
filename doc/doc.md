# FlexPlyr - Documentation

> Back to [README](../README.md)

## Prerequisites

- A modern browser that supports ES2022 private fields (`#field`) and CSS `:has()`
- Network access to `cdn.jsdelivr.net`, `fonts.googleapis.com`, `www.youtube.com`, and `player.vimeo.com` (styles, icons, and SDKs are injected on load)
- Browser-only: the module touches `document` and `navigator` at load time, so SSR is not supported
- Node.js and npm to build from source

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
```

The global `FPlyr` is available once the script loads.

### Via npm

```bash
npm i @pardnchiu/flexplyr
```

```javascript
// The ESM build exports FPlyr
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

### From Source

```bash
git clone https://github.com/pardnchiu/FlexPlyr.git
cd FlexPlyr
npm install
npm run build:debug
npm run build:min
npm run build:esm
npx sass src/scss:dist/ --style compressed --no-source-map
```

| Output | Description |
|--------|-------------|
| `dist/FlexPlyr.js` | Minified build, attaches `window.FPlyr` |
| `dist/FlexPlyr.debug.js` | Unminified build for debugging |
| `dist/FlexPlyr.esm.js` | Minified build + `export { FPlyr, player }` |
| `dist/FlexPlyr.css` | Panel styles |

## Configuration

### Auto-Injected Assets

On load, the module inserts the following into `<head>`; no manual includes are needed:

| Asset | Source |
|-------|--------|
| Panel styles | `https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@latest/dist/FlexPlyr.css` |
| Icon font | Google Fonts `Material Symbols Outlined` |
| YouTube SDK | `https://www.youtube.com/iframe_api` |
| Vimeo SDK | `https://player.vimeo.com/api/player.js` |

Styles always come from `@latest`, regardless of the JS version you load.

### Container Size

The `.FPlyr` container fills `100%` of its parent; video players have a minimum size of `320 × 180`, and audio players render only the control panel.

## Usage

### Basic: HTML5 Video

```html
<div id="player"></div>

<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
<script>
    const player = new FPlyr({
        id: "player",
        video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4"
    });
</script>
```

### Switching Sources

Pass exactly one of `video`, `youtube`, `vimeo`, or `audio`; if several are given, the first non-empty value in that order wins. The YouTube/Vimeo SDKs are injected asynchronously, so create those players after the window `load` event, or the constructor throws `YT is not defined`/`Vimeo is not defined`.

```javascript
// YouTube: pass the video ID
addEventListener("load", () => new FPlyr({ id: "yt", youtube: "O5O3yK8DJCc" }));

// Vimeo: pass the video ID
addEventListener("load", () => new FPlyr({ id: "vm", vimeo: "76979871" }));

// Audio: renders the control panel only, without a fullscreen button
new FPlyr({ id: "au", audio: "https://example.com/track.mp3" });
```

### Custom Panel and Events

```javascript
const player = new FPlyr({
    id: "player",
    video: "https://example.com/video.mp4",
    option: {
        panelType: "retro",
        panelItem: ["play", "progress", "time", "volume", "rate", "full"],
        showThumb: false
    },
    when: {
        ready: () => console.log("ready"),
        playing: () => console.log("playing"),
        pause: () => console.log("pause"),
        end: () => console.log("end"),
        destroyed: () => console.log("destroyed")
    }
});
```

### Advanced: Detached Container + Programmatic Control + Teardown

Without `id` (or when the element is not found), the player creates a standalone `div.FPlyr`; insert `player.body` into the page yourself.

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";

const mount = document.querySelector("#mount");
if (mount == null) {
    throw new Error("#mount container not found");
}

const player = new FPlyr({
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { panelType: "minimal" },
    when: {
        ready: () => {
            // ready fires before the internal source flags are set; act on the next task
            setTimeout(() => {
                if (player.isPaused()) {
                    player.play();
                }
            });
        },
        end: () => player.destroy()
    }
});

if (player.body == null) {
    throw new Error("Player failed to initialize");
}
mount.appendChild(player.body);

// Release resources when leaving the page
window.addEventListener("pagehide", () => player.destroy(), { once: true });
```

## API Reference

### Constructor

```javascript
new FPlyr(config)
```

If `config` is not an object, the constructor logs an error via `console.log` and returns early without throwing.

### `config`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | No | ID of an existing container element; if omitted or not found, a new `div.FPlyr` is created and `player.body` must be inserted manually |
| `video` | `string` | One of | HTML5 video URL |
| `youtube` | `string` | One of | YouTube video ID |
| `vimeo` | `string` | One of | Vimeo video ID |
| `audio` | `string` | One of | Audio URL |
| `option` | `object` | No | Panel and playback options, see below |
| `when` | `object` | No | Lifecycle callbacks, see below |

### `config.option`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `panelType` | `string` | `""` | Panel theme: `""` (default), `minimal`, `classic`, `retro`, `simple` |
| `panelItem` | `string[]` | `["play", "progress", "time", "volumeMini", "rate", "full"]` | Control items, rendered in array order |
| `showThumb` | `boolean` | `true` | Show the drag thumb on progress and volume sliders |
| `volume` | `number` | `100` | Initial volume (0–100) |
| `mute` | `boolean` | `false` | Initial mute state |

> In the current implementation, `option.volume` and `option.mute` are only applied when the legacy top-level `volume`/`mute` are also passed; even then, applying the volume at readiness unmutes, so the initial mute never takes effect.

### `panelItem` Values

| Value | Description |
|-------|-------------|
| `play` | Play/pause button |
| `progress` | Progress bar; seeks 500 ms after dragging and resumes playback |
| `time` | Current time / total duration (hidden in `minimal`) |
| `timeMini` | Current time only (hidden in `minimal`) |
| `volume` | Mute button + always-visible volume slider |
| `volumeMini` | Collapsible volume button that expands a slider on click |
| `rate` | Speed cycle: `1 → 1.25 → 1.5 → 2 → 0.5 → 1` |
| `full` | Fullscreen toggle (hidden for audio sources) |

### `config.when`

| Callback | Fires When |
|----------|------------|
| `ready` | Media metadata loads / the SDK player becomes ready |
| `playing` | Playback starts |
| `pause` | Playback pauses |
| `end` | Playback ends and progress resets to 0 |
| `destroyed` | `destroy()` finishes removing the DOM |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `play(isFull?)` | `void` | Play; when `isFull` is `true` on mobile, plays through the fullscreen player |
| `pause(isFull?)` | `void` | Pause |
| `isPaused(isFull?)` | `boolean` | Whether playback is paused |
| `isMuted(isFull?)` | `boolean` | Whether audio is muted |
| `destroy()` | `void` | Stops timers, destroys SDK players, removes the DOM, then fires `when.destroyed` |

`when.ready` fires before the internal source flags are set, so these methods take effect only from the next task after `ready` (for example via `setTimeout`); earlier calls return `undefined`.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `body` | `HTMLElement` | Player root element (`.FPlyr`) |
| `option` | `object` | Merged options |
| `when` | `object` | Lifecycle callbacks |
| `panel` | `playerPanel` | Control panel instance |
| `stateFull` | `boolean` | Whether the player is in fullscreen |

### Globals and Exports

| Name | Source | Description |
|------|--------|-------------|
| `window.FPlyr` | `FlexPlyr.js` | Main class |
| `window.PDPlayer` | `FlexPlyr.js` | Legacy alias of `FPlyr`, scheduled for removal in `3.x` |
| `FPlyr` | `FlexPlyr.esm.js` | ESM named export |
| `player` | `FlexPlyr.esm.js` | Legacy alias of `FPlyr`, scheduled for removal in `3.x` |

### Options Deprecated in `3.x`

| Legacy | Replacement |
|--------|-------------|
| `type` | `option.panelType` |
| `panel` | `option.panelItem` |
| `volume` | `option.volume` |
| `mute` | `option.mute` |
| `event` | `when` |

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
