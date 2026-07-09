# FlexPlyr - Documentation

> Back to [README](../README.md)

## Prerequisites

- A modern browser with ES2020+ support (uses private class fields)
- If playing YouTube/Vimeo sources, the browser must be allowed to load the corresponding third-party iframe SDKs (`youtube.com/iframe_api`, `player.vimeo.com/api/player.js`)

## Installation

### Install via npm

```bash
npm i @pardnchiu/flexplyr
```

### Include via CDN

#### UMD Version

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.js"></script>
```

#### ES Module Version

```javascript
import { FPlyr } from "https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.esm.js";
```

## Usage

### Basic

```javascript
const dom = new FPlyr({
    // Optional: element ID to replace with the player; if omitted, mount dom.body manually
    // id: "player-container",

    // Required: pick one media source
    video: "https://example.com/video.mp4",
    // audio: "https://example.com/audio.mp3",
    // youtube: "dQw4w9WgXcQ",
    // vimeo: "76979871",
});

// If no id was specified, mount the player manually
document.body.appendChild(dom.body);
```

### Advanced

```javascript
const dom = new FPlyr({
    id: "player-container",
    video: "https://example.com/video.mp4",

    option: {
        // Whether to show the thumbnail, default true
        showThumb: true,
        // Panel style: minimal / classic / retro / simple
        panelType: "classic",
        // Buttons shown in the control panel
        panelItem: ["play", "progress", "time", "volumeMini", "rate", "full"],
        // Default volume
        volume: 100,
        // Default mute state
        mute: false
    },

    when: {
        ready: () => console.log("Player is ready"),
        playing: () => console.log("Playing"),
        pause: () => console.log("Paused"),
        end: () => console.log("Playback ended"),
        destroyed: () => console.log("Player removed")
    }
});

// Control playback manually
dom.play();
dom.pause();

// Remove the player and detach its listeners
dom.destroy();
```

## API Reference

### `FPlyr`

```javascript
new FPlyr(config)
```

Creates a player instance from `config`. One of `video` / `audio` / `youtube` / `vimeo` must be provided; the matching playback logic is initialized automatically.

#### PlayerConfig

| Field | Type | Required | Description |
|------|------|------|------|
| `id` | `string` | No | Element ID to replace with the player; mount `dom.body` manually if omitted |
| `video` / `audio` / `youtube` / `vimeo` | `string` | One of | Media source (URL, or YouTube/Vimeo ID) |
| `option.showThumb` | `boolean` | No | Whether to show the thumbnail, default `true` |
| `option.panelType` | `string` | No | Panel style: `minimal` / `classic` / `retro` / `simple` |
| `option.panelItem` | `string[]` | No | Panel buttons, choose from `play`, `progress`, `time`, `timeMini`, `volume`, `volumeMini`, `rate`, `full` |
| `option.volume` | `number` | No | Default volume (0–100), default `100` |
| `option.mute` | `boolean` | No | Default mute state, default `false` |
| `when` | `PlayerEvent` | No | Lifecycle event callbacks |

#### PlayerEvent

| Field | Type | Description |
|------|------|------|
| `ready` | `() => void` | Fires when the player is ready |
| `playing` | `() => void` | Fires when playback starts |
| `pause` | `() => void` | Fires on pause |
| `end` | `() => void` | Fires when playback ends |
| `destroyed` | `() => void` | Fires when the player is removed |

#### Methods

| Method | Signature | Description |
|------|------|------|
| `isPaused` | `isPaused(isFull?: boolean): boolean` | Returns whether playback is currently paused |
| `play` | `play(isFull?: boolean): void` | Starts playback |
| `pause` | `pause(isFull?: boolean): void` | Pauses playback |
| `isMuted` | `isMuted(isFull?: boolean): boolean` | Returns whether playback is currently muted |
| `destroy` | `destroy(): void` | Removes the player and detaches all event listeners |

> [!NOTE]
> `type`, `panel`, top-level `volume`, top-level `mute`, and `event` are legacy config fields slated for removal in `3.*.*` — use `option.panelType`, `option.panelItem`, `option.volume`, `option.mute`, and `when` instead.

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
