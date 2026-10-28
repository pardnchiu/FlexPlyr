# Media Sources

This page covers the four media sources FlexPlyr supports, which one wins when several are set, and why YouTube and Vimeo players must wait for their SDKs.

## The Four Sources

| Config field | Value | Underlying player | Notes |
|--------------|-------|-------------------|-------|
| `video` | Video URL | `<video preload="auto" playsinline>` | Clicking the picture toggles playback on desktop; mobile also gets a fullscreen player |
| `audio` | Audio URL | `<audio>` (hidden) | Renders only the control panel; the `full` button is skipped |
| `youtube` | YouTube video ID | `YT.Player` | Embedded with `controls: 0`, `modestbranding: 1`, and similar params so the FlexPlyr panel replaces the native controls |
| `vimeo` | Vimeo video ID | `Vimeo.Player` | Embedded as an iframe with `background=1&controls=0` |

Values go through `String()` and `trim()`; an empty string counts as unset.

Other web players cover overlapping source sets. Video.js describes itself as an open source media player framework for HTML and React with HLS and DASH streaming; Plyr is a simple HTML5, YouTube and Vimeo player that its maintainers now mark as deprecated in favour of Video.js 10; MediaElement.js unifies HTML5 video and audio with YouTube, Vimeo, SoundCloud, Facebook, HLS, and DASH; vLitejs skins HTML5, YouTube, Vimeo, and Dailymotion players with a minimalist theme. FlexPlyr stays with four sources (`video`, `audio`, `youtube`, `vimeo`) behind one `FPlyr` config, ships one script that injects its own stylesheet and both SDKs, switches between five built-in panel themes through `option.panelType`, and, for `video` and `youtube` sources, keeps a hidden second player in sync for mobile fullscreen (see [Mobile Fullscreen](/mobile-fullscreen)).

## Priority Order

When several sources are set, the first non-empty value in the order `video` → `youtube` → `vimeo` → `audio` wins (`src/js/model/player.js:100`); the other fields are never written to the instance.

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    youtube: "O5O3yK8DJCc",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
  });
  console.log("video:", player.video);
  console.log("youtube:", player.youtube);
</script>
```

## Audio

```demo
<div id="player"></div>
<script>
  const player = new FPlyr({
    id: "player",
    audio: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    option: { panelType: "classic" },
    when: {
      ready: () => console.log("audio ready, full button:", player.panel.buttonFull != null),
    },
  });
</script>
```

## YouTube and Vimeo: Wait for the SDK

FlexPlyr injects `iframe_api` and `player.js` as `async` scripts on load, but the constructor creates `YT.Player`/`Vimeo.Player` **immediately** (`src/js/model/player.js:824`, `:864`). Constructing a player before the SDK finishes loading throws `ReferenceError: YT is not defined` or `Vimeo is not defined`, and the player never retries.

Script-inserted `async` scripts delay the window `load` event, so constructing the player after `load` works:

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  addEventListener("load", () => {
    const player = new FPlyr({
      id: "player",
      youtube: "O5O3yK8DJCc",
      when: {
        ready: () => setTimeout(() => console.log("youtube ready, paused:", player.isPaused())),
      },
    });
  });
</script>
```

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  addEventListener("load", () => {
    const player = new FPlyr({
      id: "player",
      vimeo: "76979871",
      when: {
        ready: () => setTimeout(() => console.log("vimeo ready, paused:", player.isPaused())),
      },
    });
  });
</script>
```

If `load` has already fired (for example, a SPA creating a player later), the SDKs are present and you can construct directly.

## Related Pages

- [Runtime Dependencies](/runtime-dependencies): which SDKs get injected
- [Lifecycle Events](/lifecycle-events): the events each source maps to
