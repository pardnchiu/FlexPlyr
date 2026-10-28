# Deprecations

This page lists the options and globals scheduled for removal in `3.x`, their replacements, and the legacy package names that are already gone.

## Options Scheduled for Removal in 3.x

Since `2.1.0`, these top-level fields are replaced by `option` and `when`; they still work today:

| Legacy | Replacement | Notes |
|--------|-------------|-------|
| `type` | `option.panelType` | `option.panelType` wins |
| `panel` | `option.panelItem` | `option.panelItem` wins |
| `volume` | `option.volume` | `option.volume` is written when `volume` is passed with it, see [Configuration](/configuration#how-volume-and-mute-are-applied) |
| `mute` | `option.mute` | Written the same way; the player starts unmuted when the volume is above 0 |
| `event` | `when` | `when` wins |

## Globals Scheduled for Removal in 3.x

| Legacy name | Replacement | Where |
|-------------|-------------|-------|
| `PDPlayer` | `FPlyr` | Global from `dist/FlexPlyr.js` |
| `player` | `FPlyr` | Named export of `dist/FlexPlyr.esm.js` |

## Example

Legacy fields are still mapped onto the new ones:

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new PDPlayer({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    type: "retro",
    panel: ["play", "progress", "full"],
    event: { ready: () => console.log("legacy event.ready fired") },
  });
  console.log("PDPlayer === FPlyr:", PDPlayer === FPlyr);
  console.log("panelType:", player.option.panelType);
  console.log("panelItem:", player.option.panelItem.join(","));
</script>
```

## Removed

| Item | Removed in | Replacement |
|------|------------|-------------|
| npm package `pdplayerkit` | Removed in 2.2.6 | `@pardnchiu/flexplyr` |
| `dist/PDPlayerKit.js` | Removed in 2.2.6 | `dist/FlexPlyr.js` |
| `dist/PDPlayerKit.module.js` | Removed in 2.2.6 | `dist/FlexPlyr.esm.js` |

## Related Pages

- [Instance API](/instance-api)
- [Release Notes](/released/)
