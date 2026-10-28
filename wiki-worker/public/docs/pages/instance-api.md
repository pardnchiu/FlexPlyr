# Instance API

This page lists the public methods and properties of an `FPlyr` instance, plus the globals and ESM exports.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `play(isFull?)` | `void` | Plays and switches the play button to the pause icon; with `isFull` set to `true` on mobile, plays through the fullscreen player |
| `pause(isFull?)` | `void` | Pauses and switches the button back to the play icon |
| `isPaused(isFull?)` | `boolean` | Whether playback is paused; for YouTube, whether the player state is not `1` |
| `isMuted(isFull?)` | `boolean` | Whether audio is muted |
| `destroy()` | `void` | Releases the player in the order below |

These methods branch on source flags that are set only at readiness, so calling them before `when.ready` fires, or synchronously inside `ready`, returns `undefined` and does not reach the media (see [Lifecycle Events](/lifecycle-events)).

### What destroy() Releases, in Order

1. Removes the container's `mousemove`/`mouseleave` handlers
2. Stops the progress poll
3. Vimeo/YouTube call the SDK's `destroy()` (YouTube also destroys its fullscreen player); HTML5 media is paused and its `src` cleared
4. Removes the container from the DOM
5. Calls `when.destroyed` if it is a function

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `body` | DOM element | Player container (`.FPlyr`) |
| `option` | `object` | Merged `option`; after readiness, `volume` tracks volume changes |
| `when` | `object` | Lifecycle callbacks (`when` or the legacy `event`) |
| `panel` | `playerPanel` | Control panel instance exposing elements such as `buttonPlay` and `inputProgress` |
| `stateFull` | `boolean` | Whether the player is in fullscreen |
| `video`/`youtube`/`vimeo`/`audio` | `string` | The source actually used; the others are `undefined` |

## Example

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<button id="destroy">destroy()</button>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => setTimeout(() => {
        console.log("isPaused:", player.isPaused());
        console.log("isMuted:", player.isMuted());
        console.log("option:", JSON.stringify(player.option));
      }),
      destroyed: () => console.log("destroyed, in DOM:", player.body.isConnected),
    },
  });
  document.getElementById("destroy").onclick = () => player.destroy();
</script>
```

## Globals and Exports

| Name | Source | Description |
|------|--------|-------------|
| `window.FPlyr` | `dist/FlexPlyr.js` | Main class |
| `window.PDPlayer` | `dist/FlexPlyr.js` | Legacy alias of `FPlyr`, scheduled for removal in `3.x` |
| `FPlyr` | `dist/FlexPlyr.esm.js` | ESM named export |
| `player` | `dist/FlexPlyr.esm.js` | Legacy alias of `FPlyr`, scheduled for removal in `3.x` |

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

## Related Pages

- [Configuration](/configuration)
- [Deprecations](/deprecations)
