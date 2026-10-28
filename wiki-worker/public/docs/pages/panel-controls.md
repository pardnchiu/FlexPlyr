# Panel Controls

This page covers the eight controls available in `option.panelItem`, the order they render in, and the `showThumb` drag-thumb option.

## Controls at a Glance

The default is `["play", "progress", "time", "volumeMini", "rate", "full"]`.

| Value | Control | Behavior |
|-------|---------|----------|
| `play` | Play/pause button | Toggles playback; the icon follows `playing`/`pause` events |
| `progress` | Progress bar | Pauses and updates the time while dragging, seeks 500 ms after dragging stops, then resumes 500 ms later |
| `time` | Current time / duration | e.g. `0:12/0:30`; not rendered in `minimal` |
| `timeMini` | Current time | e.g. `0:12`; not rendered in `minimal` |
| `volume` | Mute button + always-visible volume slider | The button toggles mute; dragging to 0 counts as muted, and unmuting from 0 restores 50 |
| `volumeMini` | Collapsible volume button | Click to expand the slider; it collapses 1 s after the pointer leaves; the button itself does not mute |
| `rate` | Speed button | Cycles `1 → 1.25 → 1.5 → 2 → 0.5 → 1` |
| `full` | Fullscreen button | See [Mobile Fullscreen](/mobile-fullscreen); not rendered for audio sources |

The time format follows the total duration: `0:ss` under a minute, `mm:ss` under an hour, `hh:mm:ss` otherwise.

## Order and Duplicates

Controls are appended in array order, so the array order is the on-screen order. Listing a value twice renders two controls, but only the last one gets event bindings, so avoid duplicates.

## showThumb

`option.showThumb` is written to the container's `data-thumb`; when `false`, the stylesheet hides the drag thumbs on the progress and volume sliders and keeps only the filled bar.

## Example

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: {
      panelItem: ["play", "progress", "timeMini", "volume", "rate", "full"],
      showThumb: false,
    },
  });
  console.log("buttonPlay:", player.panel.buttonPlay != null);
  console.log("inputVolume:", player.panel.inputVolume != null);
  console.log("inputVolumeMini:", player.panel.inputVolumeMini != null);
  console.log("data-thumb:", player.body.dataset.thumb);
</script>
```

## Version Differences

Since `2.1.0`, `time` shows the full format (`0:00/0:30`), and the old short format was renamed `timeMini`.

## Related Pages

- [Panel Themes](/panel-themes)
- [Configuration](/configuration)
