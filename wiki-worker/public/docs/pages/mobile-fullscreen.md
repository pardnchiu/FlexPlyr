# Mobile Fullscreen

This page covers how the `full` button behaves on desktop versus mobile, and how the hidden mobile fullscreen player stays in sync.

## Device Detection

FlexPlyr detects the device from the User-Agent on load (`src/js/*.js`):

| Flag | Condition |
|------|-----------|
| `isMobile` | UA contains `iphone`, `ipad`, `ipod`, or `android` |
| `isIOS` | UA contains `iphone`, `ipad`, or `ipod` |

## Desktop

The `full` button calls `requestFullscreen` on the `.FPlyr` container (including the `webkit`/`moz`/`ms` prefixed versions), calls `exitFullscreen` on the next click, and updates `player.stateFull`.

## Mobile

Inline video on mobile is bound by `playsinline`, so a custom panel cannot follow it into fullscreen. FlexPlyr therefore creates a hidden fullscreen player (class `PDFullPlayer`, moved off-screen by CSS):

| Source | Fullscreen player | How it enters |
|--------|-------------------|---------------|
| `video` | A second `<video>` without `playsinline` | `full` → pause the main player → `play(true)` plays the fullscreen player, which the OS shows natively fullscreen |
| `youtube` | A second `YT.Player` with `playsinline: 0` | Same; calling `play(true)` before that player's `onReady` shows `alert("not Ready")` |
| `vimeo` | None; the main player is reused | `play(true)` calls `requestFullscreen()` and then plays |
| `audio` | None | The `full` button is not rendered |

### Syncing In and Out

| When | What happens |
|------|--------------|
| The fullscreen player starts (video `playing` / YouTube state `3`) | Pauses the main player, copies its time, volume, and speed to the fullscreen player, then plays |
| The fullscreen player pauses (leaving fullscreen) | Copies time, volume, and speed back to the main player and updates the panel progress |
| iOS `webkitpresentationmodechanged` / otherwise `fullscreenchange` | Updates `player.stateFull` |

On mobile, tapping the video picture does not toggle playback; only the panel buttons do.

## Example

Desktop browsers create no fullscreen player; open this page on iOS or Android and the count is 1:

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { panelItem: ["play", "progress", "full"] },
  });
  console.log("hidden fullscreen players:", document.querySelectorAll(".PDFullPlayer").length);
  console.log("stateFull:", player.stateFull);
</script>
```

## Related Pages

- [Panel Controls](/panel-controls): the `full` button
- [Instance API](/instance-api): `play(isFull)` and `stateFull`
