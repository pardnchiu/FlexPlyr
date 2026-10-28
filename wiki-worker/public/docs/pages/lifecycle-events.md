# Lifecycle Events

This page covers when each of the five `when` callbacks fires, which underlying event triggers it per source, and the timing limit inside `ready`.

## Callbacks at a Glance

| Callback | HTML5 video/audio | YouTube | Vimeo | What FlexPlyr also does |
|----------|-------------------|---------|-------|-------------------------|
| `ready` | `loadedmetadata` | `onReady` | `ready()` resolves | Sets duration, resets progress, applies volume and mute |
| `playing` | `playing` | state `1` | `play` | Starts the 100 ms progress poll; hides the panel after 1 s |
| `pause` | `pause` | state `2` | `pause` | Stops the poll and shows the panel |
| `end` | `ended` | state `0` | `ended` | Stops the poll, resets the panel, seeks back to 0 |
| `destroyed` | After `destroy()` removes the DOM | Same | Same | — |

The legacy `event` object still works as an alias of `when` (see [Deprecations](/deprecations)).

## Example

Click play, then pause, then `destroy()`; the log below lists each callback as it fires:

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<button id="destroy">destroy()</button>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => console.log("ready"),
      playing: () => console.log("playing"),
      pause: () => console.log("pause"),
      end: () => console.log("end"),
      destroyed: () => console.log("destroyed"),
    },
  });
  document.getElementById("destroy").onclick = () => player.destroy();
</script>
```

## ready Runs Before Internal State

`ready` is the first line of `#stateReady()` (`src/js/model/player.js:397`), before the `#isVideo`/`#isYoutube` source flags are set (`:406`). Every public method branches on those flags, so synchronous calls inside `ready` miss:

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => {
        console.log("inside ready:", String(player.isPaused()));
        setTimeout(() => console.log("next tick:", player.isPaused()));
      },
    },
  });
</script>
```

To act on the player at readiness, wrap the call in `setTimeout`.

## Related Pages

- [Instance API](/instance-api): what `destroy()` releases and in which order
- [Media Sources](/media-sources): SDK timing for YouTube and Vimeo
