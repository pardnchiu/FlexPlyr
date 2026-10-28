# Panel Themes

This page covers the five panel themes selected by `option.panelType` and how they are applied.

## How It Works

`option.panelType` is written to the container's `data-type` attribute, and the stylesheet applies each look through `.FPlyr[data-type="..."]` selectors (`src/scss/panelType/`). Any value not listed behaves like the default theme.

| Value | Look | Extra behavior |
|-------|------|----------------|
| `""` (default) | Translucent bar floating at the bottom of the picture | — |
| `minimal` | Compact centered bar with rounded top corners | Width is fixed from the item count; `time`/`timeMini` are not rendered |
| `classic` | Bottom gradient overlay with a rounded pill bar | — |
| `retro` | Grey bevelled borders with a monospace font | — |
| `simple` | Flat light-grey bar with a monospace font | — |

Every theme hides the panel 1 second into playback and shows it again on mouse movement or pause.

## Example

One player per theme (no `id`, so each `player.body` is inserted manually):

```demo
<style>.box { max-width: 480px; aspect-ratio: 16 / 9; margin-bottom: 12px }</style>
<script>
  for (const panelType of ["", "minimal", "classic", "retro", "simple"]) {
    const box = document.createElement("div");
    box.className = "box";
    document.body.appendChild(box);
    const player = new FPlyr({
      video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
      option: { panelType },
    });
    box.appendChild(player.body);
    console.log(JSON.stringify(panelType), "->", JSON.stringify(player.body.dataset.type));
  }
</script>
```

## Where the Styles Come From

Theme styles live in `FlexPlyr.css`, which the script loads automatically from jsDelivr `@latest` (see [Runtime Dependencies](/runtime-dependencies)). To customize a theme, override `.FPlyr[data-type="..."] > div.panel` in your own stylesheet.

## Related Pages

- [Panel Controls](/panel-controls): the buttons each theme can hold
