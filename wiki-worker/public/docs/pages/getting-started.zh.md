# 快速開始

本頁說明如何載入 FlexPlyr、在頁面上掛載第一個播放器，並在播放器就緒後呼叫它的方法。

## 前置需求

- 支援 ES2022 私有欄位（`#field`）與 CSS `:has()` 的現代瀏覽器
- 頁面可連線至 `cdn.jsdelivr.net`、`fonts.googleapis.com`、`www.youtube.com`、`player.vimeo.com`（見[執行期相依資源](/zh/runtime-dependencies)）
- 僅能在瀏覽器執行：模組一載入就存取 `document` 與 `navigator`

## 安裝

### jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
```

載入後即有全域 `FPlyr`。

### npm

```bash
npm i @pardnchiu/flexplyr
```

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

`package.json` 的 `main` 指向 `dist/FlexPlyr.js`（非模組建置，掛載 `window.FPlyr`）；要用具名匯出需引入 `dist/FlexPlyr.esm.js`。

## 第一個播放器

指定既有元素的 `id` 與一個媒體來源。播放器會把該元素變成 `.FPlyr` 容器，寬高填滿父元素，因此父元素需要有高度。

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => setTimeout(() => console.log("ready, paused:", player.isPaused())),
    },
  });
</script>
```

## 在 ready 之後才呼叫方法

`when.ready` 在播放器內部設定來源旗標**之前**觸發（`src/js/model/player.js:395`），因此在 `ready` 回呼中同步呼叫 `isPaused()`、`isMuted()`、`play()` 會得到 `undefined` 或沒有作用。把呼叫延到下一個 task（如 `setTimeout`）即可取得正確結果，詳見[生命週期事件](/zh/lifecycle-events)。

## 下一步

- [媒體來源](/zh/media-sources)：切換 YouTube、Vimeo、音訊
- [面板風格](/zh/panel-themes) 與 [面板控制元件](/zh/panel-controls)：調整外觀與按鈕
- [設定選項](/zh/configuration)：完整的建構子參數
