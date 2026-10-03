# FlexPlyr - 技術文件

> 返回 [README](./README.zh.md)

## 前置需求

- 支援 ES2022 私有欄位（`#field`）與 CSS `:has()` 的現代瀏覽器
- 執行環境需可連線至 `cdn.jsdelivr.net`、`fonts.googleapis.com`、`www.youtube.com`、`player.vimeo.com`（載入時自動注入樣式、圖示與 SDK）
- 僅支援瀏覽器端執行：模組載入即存取 `document` 與 `navigator`，不適用 SSR
- 從原始碼建置需 Node.js 與 npm

## 安裝

### 透過 CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
```

載入後即可使用全域 `FPlyr`。

### 透過 npm

```bash
npm i @pardnchiu/flexplyr
```

```javascript
// ESM 版本匯出 FPlyr
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

### 從原始碼建置

```bash
git clone https://github.com/pardnchiu/FlexPlyr.git
cd FlexPlyr
npm install
npm run build:debug
npm run build:min
npm run build:esm
npx sass src/scss:dist/ --style compressed --no-source-map
```

| 產物 | 說明 |
|------|------|
| `dist/FlexPlyr.js` | 壓縮版，掛載全域 `window.FPlyr` |
| `dist/FlexPlyr.debug.js` | 未壓縮版，方便除錯 |
| `dist/FlexPlyr.esm.js` | 壓縮版 + `export { FPlyr, player }` |
| `dist/FlexPlyr.css` | 面板樣式 |

## 設定

### 自動注入的資源

模組載入時會在 `<head>` 內插入下列資源，不需手動引入：

| 資源 | 來源 |
|------|------|
| 面板樣式 | `https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@latest/dist/FlexPlyr.css` |
| 圖示字型 | Google Fonts `Material Symbols Outlined` |
| YouTube SDK | `https://www.youtube.com/iframe_api` |
| Vimeo SDK | `https://player.vimeo.com/api/player.js` |

樣式固定取自 `@latest`，與實際引入的 JS 版本無關。

### 容器尺寸

`.FPlyr` 容器寬高為父元素的 `100%`；影片類播放器最小尺寸為 `320 × 180`，音訊播放器僅顯示控制面板。

## 使用方式

### 基礎：HTML5 影片

```html
<div id="player"></div>

<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@2.2.9/dist/FlexPlyr.js"></script>
<script>
    const player = new FPlyr({
        id: "player",
        video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4"
    });
</script>
```

### 切換來源

`video`、`youtube`、`vimeo`、`audio` 擇一傳入；同時傳入多個時依此順序取第一個非空值。YouTube／Vimeo SDK 為非同步注入，需在 `window` 的 `load` 之後建立，否則拋出 `YT is not defined`／`Vimeo is not defined`。

```javascript
// YouTube：傳入影片 ID
addEventListener("load", () => new FPlyr({ id: "yt", youtube: "O5O3yK8DJCc" }));

// Vimeo：傳入影片 ID
addEventListener("load", () => new FPlyr({ id: "vm", vimeo: "76979871" }));

// 音訊：僅渲染控制面板，不顯示全螢幕按鈕
new FPlyr({ id: "au", audio: "https://example.com/track.mp3" });
```

### 自訂面板與事件

```javascript
const player = new FPlyr({
    id: "player",
    video: "https://example.com/video.mp4",
    option: {
        panelType: "retro",
        panelItem: ["play", "progress", "time", "volume", "rate", "full"],
        showThumb: false
    },
    when: {
        ready: () => console.log("ready"),
        playing: () => console.log("playing"),
        pause: () => console.log("pause"),
        end: () => console.log("end"),
        destroyed: () => console.log("destroyed")
    }
});
```

### 進階：不指定容器 + 程式控制 + 銷毀

未傳入 `id`（或找不到對應元素）時，播放器會建立獨立的 `div.FPlyr`，需自行將 `player.body` 插入頁面。

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";

const mount = document.querySelector("#mount");
if (mount == null) {
    throw new Error("找不到 #mount 容器");
}

const player = new FPlyr({
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { panelType: "minimal" },
    when: {
        ready: () => {
            // ready 早於內部來源旗標設定，需延到下一個 task 再操作
            setTimeout(() => {
                if (player.isPaused()) {
                    player.play();
                }
            });
        },
        end: () => player.destroy()
    }
});

if (player.body == null) {
    throw new Error("播放器初始化失敗");
}
mount.appendChild(player.body);

// 離開頁面時釋放資源
window.addEventListener("pagehide", () => player.destroy(), { once: true });
```

## API 參考

### 建構子

```javascript
new FPlyr(config)
```

`config` 非物件時會以 `console.log` 輸出錯誤並提前返回，不會拋出例外。

### `config`

| 欄位 | 型別 | 必要 | 說明 |
|------|------|------|------|
| `id` | `string` | 否 | 既有容器元素 ID；未指定或找不到時建立新的 `div.FPlyr`，需手動插入 `player.body` |
| `video` | `string` | 擇一 | HTML5 影片 URL |
| `youtube` | `string` | 擇一 | YouTube 影片 ID |
| `vimeo` | `string` | 擇一 | Vimeo 影片 ID |
| `audio` | `string` | 擇一 | 音訊 URL |
| `option` | `object` | 否 | 面板與播放設定，見下表 |
| `when` | `object` | 否 | 生命週期回呼，見下表 |

### `config.option`

| 欄位 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `panelType` | `string` | `""` | 面板風格：`""`（預設）、`minimal`、`classic`、`retro`、`simple` |
| `panelItem` | `string[]` | `["play", "progress", "time", "volumeMini", "rate", "full"]` | 控制元件，依陣列順序渲染 |
| `showThumb` | `boolean` | `true` | 是否顯示進度條／音量條拖曳把手 |
| `volume` | `number` | `100` | 初始音量（0–100） |
| `mute` | `boolean` | `false` | 初始靜音狀態 |

> 目前實作中，`option.volume` 與 `option.mute` 僅在同時傳入舊版頂層 `volume`／`mute` 時才會寫入；即使寫入，就緒時套用音量會取消靜音，初始靜音不會生效。

### `panelItem` 元件

| 值 | 說明 |
|----|------|
| `play` | 播放／暫停按鈕 |
| `progress` | 進度條，拖曳後 500ms 跳轉並自動續播 |
| `time` | 目前時間／總長度（`minimal` 風格不顯示） |
| `timeMini` | 僅目前時間（`minimal` 風格不顯示） |
| `volume` | 靜音按鈕 + 常駐音量條 |
| `volumeMini` | 收合式音量按鈕，點擊展開音量條 |
| `rate` | 倍速切換：`1 → 1.25 → 1.5 → 2 → 0.5 → 1` |
| `full` | 全螢幕切換（音訊來源不顯示） |

### `config.when`

| 回呼 | 觸發時機 |
|------|----------|
| `ready` | 媒體中繼資料載入完成／SDK 播放器就緒 |
| `playing` | 開始播放 |
| `pause` | 暫停 |
| `end` | 播放結束，進度重設為 0 |
| `destroyed` | `destroy()` 完成 DOM 移除後 |

### 方法

| 方法 | 回傳 | 說明 |
|------|------|------|
| `play(isFull?)` | `void` | 播放；`isFull` 為 `true` 時於行動裝置改由全螢幕播放器播放 |
| `pause(isFull?)` | `void` | 暫停 |
| `isPaused(isFull?)` | `boolean` | 是否處於暫停狀態 |
| `isMuted(isFull?)` | `boolean` | 是否靜音 |
| `destroy()` | `void` | 停止計時器、銷毀 SDK 播放器、移除 DOM，最後觸發 `when.destroyed` |

`when.ready` 在內部來源旗標設定之前觸發，上述方法需在 `ready` 之後的下一個 task（如 `setTimeout`）才會作用；更早呼叫會回傳 `undefined`。

### 屬性

| 屬性 | 型別 | 說明 |
|------|------|------|
| `body` | `HTMLElement` | 播放器根元素（`.FPlyr`） |
| `option` | `object` | 合併後的設定值 |
| `when` | `object` | 生命週期回呼 |
| `panel` | `playerPanel` | 控制面板實例 |
| `stateFull` | `boolean` | 是否處於全螢幕 |

### 全域與匯出

| 名稱 | 來源 | 說明 |
|------|------|------|
| `window.FPlyr` | `FlexPlyr.js` | 主要類別 |
| `window.PDPlayer` | `FlexPlyr.js` | `FPlyr` 舊名，預計 `3.x` 移除 |
| `FPlyr` | `FlexPlyr.esm.js` | ESM 具名匯出 |
| `player` | `FlexPlyr.esm.js` | `FPlyr` 舊名，預計 `3.x` 移除 |

### 預計 `3.x` 棄用的設定

| 舊設定 | 取代 |
|--------|------|
| `type` | `option.panelType` |
| `panel` | `option.panelItem` |
| `volume` | `option.volume` |
| `mute` | `option.mute` |
| `event` | `when` |

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
