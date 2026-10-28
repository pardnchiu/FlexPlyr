# 棄用項目

本頁列出預計於 `3.x` 移除的設定與全域名稱、替代寫法，以及已經移除的舊套件名稱。

## 預計 3.x 移除的設定

`2.1.0` 起以下頂層欄位改由 `option` 與 `when` 取代，目前仍可使用：

| 舊寫法 | 替代寫法 | 備註 |
|--------|----------|------|
| `type` | `option.panelType` | `option.panelType` 優先 |
| `panel` | `option.panelItem` | `option.panelItem` 優先 |
| `volume` | `option.volume` | 同時傳入 `volume` 時寫入 `option.volume`，見[設定選項](/zh/configuration#volume-與-mute-的套用方式) |
| `mute` | `option.mute` | 寫入方式同上；音量大於 0 時播放器以非靜音開始 |
| `event` | `when` | `when` 優先 |

## 預計 3.x 移除的全域名稱

| 舊名稱 | 替代 | 位置 |
|--------|------|------|
| `PDPlayer` | `FPlyr` | `dist/FlexPlyr.js` 的全域 |
| `player` | `FPlyr` | `dist/FlexPlyr.esm.js` 的具名匯出 |

## 範例

舊寫法仍會被轉換成新欄位：

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

## 已移除

| 項目 | 移除於 | 替代 |
|------|--------|------|
| npm 套件 `pdplayerkit` | 移除於 2.2.6 | `@pardnchiu/flexplyr` |
| `dist/PDPlayerKit.js` | 移除於 2.2.6 | `dist/FlexPlyr.js` |
| `dist/PDPlayerKit.module.js` | 移除於 2.2.6 | `dist/FlexPlyr.esm.js` |

## 相關頁面

- [實例 API](/zh/instance-api)
- [版本紀錄](/released/)
