# Configuration

This page lists every field of `new FPlyr(config)`, the defaults, and how the initial `volume` and `mute` values are applied.

## config

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | No | ID of an existing element that becomes the player container; if omitted or not found, a new `div.FPlyr` is created and `player.body` must be inserted manually |
| `video` | `string` | One of | Video URL |
| `youtube` | `string` | One of | YouTube video ID |
| `vimeo` | `string` | One of | Vimeo video ID |
| `audio` | `string` | One of | Audio URL |
| `option` | `object` | No | Panel and playback options, see below |
| `when` | `object` | No | Lifecycle callbacks, see [Lifecycle Events](/lifecycle-events) |

For the priority order when several sources are set, see [Media Sources](/media-sources).

## option

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `panelType` | `string` | `""` | Panel theme, see [Panel Themes](/panel-themes) |
| `panelItem` | `string[]` | `["play", "progress", "time", "volumeMini", "rate", "full"]` | Controls, see [Panel Controls](/panel-controls) |
| `showThumb` | `boolean` | `true` | Show slider drag thumbs |
| `volume` | `number` | `100` | Initial volume (0–100), see [How volume and mute Are Applied](#how-volume-and-mute-are-applied) |
| `mute` | `boolean` | `false` | Initial mute, see [How volume and mute Are Applied](#how-volume-and-mute-are-applied) |

## Without an id

Without `id`, the player stays off the page until you insert `player.body`:

```demo
<section id="mount" style="max-width: 480px; aspect-ratio: 16 / 9"></section>
<script>
  const player = new FPlyr({
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { panelType: "simple" },
  });
  console.log("attached before append:", player.body.isConnected);
  document.getElementById("mount").appendChild(player.body);
  console.log("attached after append:", player.body.isConnected);
  console.log("class:", player.body.className);
</script>
```

## Invalid Config

If `config` is not an object, the constructor logs `config: 不存在。` with `console.log` and returns without throwing; the instance has no `body`:

```demo
<script>
  const player = new FPlyr("player");
  console.log("body:", String(player.body));
</script>
```

## How volume and mute Are Applied

- **`option.volume`**: the constructor writes it when the top-level `volume` is passed alongside it (`src/js/model/player.js:61`); with `option` alone the volume is `100`.
- **`option.mute`**: written the same way from the top-level `mute` (`:65`). At readiness the player applies the volume (`:424`), and any volume above 0 sets the player unmuted (`:243`), so the player starts unmuted; to silence it, the viewer presses the mute button of the `volume` control ([Panel Controls](/panel-controls)) or drag the volume to 0.

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9; margin-bottom: 12px"><div id="a"></div></div>
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="b"></div></div>
<script>
  const a = new FPlyr({
    id: "a",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { volume: 30, mute: true },
    when: { ready: () => setTimeout(() => console.log("option only ->", a.option.volume, a.isMuted())) },
  });
  const b = new FPlyr({
    id: "b",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    volume: 30,
    mute: true,
    option: { volume: 30, mute: true },
    when: { ready: () => setTimeout(() => console.log("option + legacy ->", b.option.volume, b.isMuted())) },
  });
</script>
```

## Related Pages

- [Instance API](/instance-api)
- [Deprecations](/deprecations): the legacy top-level fields
