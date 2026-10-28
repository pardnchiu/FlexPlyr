# 設定選項

本頁列出 `new FPlyr(config)` 的所有設定欄位、預設值，以及初始 `volume`、`mute` 的套用方式。

## config

| 欄位 | 型別 | 必要 | 說明 |
|------|------|------|------|
| `id` | `string` | 否 | 既有元素的 ID，該元素會成為播放器容器；未指定或找不到時建立新的 `div.FPlyr`，需手動插入 `player.body` |
| `video` | `string` | 擇一 | 影片 URL |
| `youtube` | `string` | 擇一 | YouTube 影片 ID |
| `vimeo` | `string` | 擇一 | Vimeo 影片 ID |
| `audio` | `string` | 擇一 | 音訊 URL |
| `option` | `object` | 否 | 面板與播放設定，見下表 |
| `when` | `object` | 否 | 生命週期回呼，見[生命週期事件](/zh/lifecycle-events) |

多個來源同時設定時的優先順序見[媒體來源](/zh/media-sources)。

## option

| 欄位 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `panelType` | `string` | `""` | 面板風格，見[面板風格](/zh/panel-themes) |
| `panelItem` | `string[]` | `["play", "progress", "time", "volumeMini", "rate", "full"]` | 控制元件，見[面板控制元件](/zh/panel-controls) |
| `showThumb` | `boolean` | `true` | 是否顯示滑桿拖曳把手 |
| `volume` | `number` | `100` | 初始音量（0–100），見 [volume 與 mute 的套用方式](#volume-與-mute-的套用方式) |
| `mute` | `boolean` | `false` | 初始靜音，見 [volume 與 mute 的套用方式](#volume-與-mute-的套用方式) |

## 不指定 id

未指定 `id` 時播放器不會出現在頁面上，直到你插入 `player.body`：

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

## 無效設定

`config` 不是物件時，建構子以 `console.log` 輸出 `config: 不存在。` 後直接返回，不拋出例外，實例沒有 `body`：

```demo
<script>
  const player = new FPlyr("player");
  console.log("body:", String(player.body));
</script>
```

## volume 與 mute 的套用方式

- **`option.volume`**：同時傳入頂層 `volume` 時由建構子寫入（`src/js/model/player.js:61`）；只傳 `option` 時音量為 `100`。
- **`option.mute`**：同樣由頂層 `mute` 寫入（`:65`）。就緒時播放器套用音量（`:424`），音量大於 0 即設為非靜音（`:243`），因此播放器以非靜音狀態開始；需要靜音時，由觀看者按下 `volume` 控制元件的靜音鈕（[面板控制元件](/zh/panel-controls)）或把音量拖到 0。

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

## 相關頁面

- [實例 API](/zh/instance-api)
- [棄用項目](/zh/deprecations)：舊版頂層欄位
