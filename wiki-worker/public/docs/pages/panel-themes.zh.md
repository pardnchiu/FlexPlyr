# 面板風格

本頁說明 `option.panelType` 的五種面板風格與它們的套用方式。

## 設定方式

`option.panelType` 會寫入容器的 `data-type` 屬性，樣式表以 `.FPlyr[data-type="..."]` 選擇器套用對應外觀（`src/scss/panelType/`）。未列出的值等同預設風格。

| 值 | 外觀 | 額外行為 |
|----|------|----------|
| `""`（預設） | 懸浮於畫面底部的半透明控制列 | — |
| `minimal` | 置中、上方圓角的精簡控制列 | 寬度依元件數量計算為固定值；不渲染 `time`／`timeMini` |
| `classic` | 底部漸層遮罩＋圓角膠囊控制列 | — |
| `retro` | 灰色立體邊框、等寬字型的復古控制列 | — |
| `simple` | 淺灰扁平、等寬字型的控制列 | — |

所有風格在播放 1 秒後自動隱藏面板，滑鼠移動或暫停時重新顯示。

## 範例

依序建立五個風格的播放器（未指定 `id`，手動插入 `player.body`）：

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

## 樣式來源

風格樣式包含在 `FlexPlyr.css` 中，由腳本自動從 jsDelivr 的 `@latest` 載入（見[執行期相依資源](/zh/runtime-dependencies)）。要自訂外觀，可在自己的樣式表以 `.FPlyr[data-type="..."] > div.panel` 覆寫。

## 相關頁面

- [面板控制元件](/zh/panel-controls)：每種風格中可放的按鈕
