# FlexPlyr - 技術文件

> 返回 [README](./README.zh.md)

## 前置需求

- 支援 ES2020+ 的現代瀏覽器（使用 private class field）
- 若播放 YouTube／Vimeo 來源，需允許瀏覽器載入對應的第三方 iframe SDK（`youtube.com/iframe_api`、`player.vimeo.com/api/player.js`）

## 安裝

### 透過 npm 安裝

```bash
npm i @pardnchiu/flexplyr
```

### 透過 CDN 引入

#### UMD 版本

```html
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.js"></script>
```

#### ES Module 版本

```javascript
import { FPlyr } from "https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.esm.js";
```

## 使用方式

### 基礎用法

```javascript
const dom = new FPlyr({
    // 可選：指定要替換為播放器的元素 ID，未指定時需手動掛載 dom.body
    // id: "player-container",

    // 必要：媒體來源設定，四選一
    video: "https://example.com/video.mp4",
    // audio: "https://example.com/audio.mp3",
    // youtube: "dQw4w9WgXcQ",
    // vimeo: "76979871",
});

// 若未指定 id，需手動將播放器掛載到畫面上
document.body.appendChild(dom.body);
```

### 進階用法

```javascript
const dom = new FPlyr({
    id: "player-container",
    video: "https://example.com/video.mp4",

    option: {
        // 是否顯示縮圖，預設 true
        showThumb: true,
        // 面板風格：minimal / classic / retro / simple
        panelType: "classic",
        // 控制面板顯示的按鈕
        panelItem: ["play", "progress", "time", "volumeMini", "rate", "full"],
        // 預設音量
        volume: 100,
        // 預設靜音
        mute: false
    },

    when: {
        ready: () => console.log("播放器已就緒"),
        playing: () => console.log("播放中"),
        pause: () => console.log("已暫停"),
        end: () => console.log("播放結束"),
        destroyed: () => console.log("播放器已移除")
    }
});

// 手動控制播放
dom.play();
dom.pause();

// 移除播放器與其事件監聽
dom.destroy();
```

## API 參考

### `FPlyr`

```javascript
new FPlyr(config)
```

依 `config` 建立播放器實例；`video` / `audio` / `youtube` / `vimeo` 四個來源欄位擇一填入即會自動初始化對應的播放邏輯。

#### PlayerConfig

| 欄位 | 型別 | 必要 | 說明 |
|------|------|------|------|
| `id` | `string` | 否 | 要替換為播放器的元素 ID，未指定則需手動掛載 `dom.body` |
| `video` / `audio` / `youtube` / `vimeo` | `string` | 四選一 | 對應的媒體來源（URL 或 YouTube／Vimeo ID） |
| `option.showThumb` | `boolean` | 否 | 是否顯示縮圖，預設 `true` |
| `option.panelType` | `string` | 否 | 面板風格：`minimal` / `classic` / `retro` / `simple` |
| `option.panelItem` | `string[]` | 否 | 面板按鈕組合，可選 `play`、`progress`、`time`、`timeMini`、`volume`、`volumeMini`、`rate`、`full` |
| `option.volume` | `number` | 否 | 預設音量（0–100），預設 `100` |
| `option.mute` | `boolean` | 否 | 預設靜音狀態，預設 `false` |
| `when` | `PlayerEvent` | 否 | 生命週期事件回調 |

#### PlayerEvent

| 欄位 | 型別 | 說明 |
|------|------|------|
| `ready` | `() => void` | 播放器準備完成時觸發 |
| `playing` | `() => void` | 開始播放時觸發 |
| `pause` | `() => void` | 暫停時觸發 |
| `end` | `() => void` | 播放結束時觸發 |
| `destroyed` | `() => void` | 播放器被移除時觸發 |

#### 方法

| 方法 | 簽章 | 說明 |
|------|------|------|
| `isPaused` | `isPaused(isFull?: boolean): boolean` | 取得目前是否為暫停狀態 |
| `play` | `play(isFull?: boolean): void` | 開始播放 |
| `pause` | `pause(isFull?: boolean): void` | 暫停播放 |
| `isMuted` | `isMuted(isFull?: boolean): boolean` | 取得目前是否為靜音狀態 |
| `destroy` | `destroy(): void` | 移除播放器並解除所有事件監聽 |

> [!NOTE]
> `type`、`panel`、`volume`（頂層）、`mute`（頂層）、`event` 為舊版設定欄位，將於 `3.*.*` 版本移除，請改用 `option.panelType`、`option.panelItem`、`option.volume`、`option.mute`、`when`。

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
