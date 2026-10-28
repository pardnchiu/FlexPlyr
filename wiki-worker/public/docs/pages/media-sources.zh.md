# 媒體來源

本頁說明 FlexPlyr 支援的四種媒體來源、同時設定多個來源時的取捨，以及 YouTube／Vimeo 必須等 SDK 載入後才能建立的原因。

## 四種來源

| 設定欄位 | 值 | 底層播放器 | 備註 |
|----------|----|------------|------|
| `video` | 影片 URL | `<video preload="auto" playsinline>` | 桌面版點擊畫面切換播放；行動裝置另建全螢幕播放器 |
| `audio` | 音訊 URL | `<audio>`（隱藏） | 只顯示控制面板；`full` 按鈕不渲染 |
| `youtube` | YouTube 影片 ID | `YT.Player` | 以 `controls: 0`、`modestbranding: 1` 等參數嵌入，FlexPlyr 面板取代原生控制列 |
| `vimeo` | Vimeo 影片 ID | `Vimeo.Player` | 以 `background=1&controls=0` 嵌入 iframe |

值會先 `String()` 再 `trim()`，空字串視為未設定。

其他網頁播放器涵蓋的來源各有重疊。Video.js 自述為支援 HTML 與 React 的開源媒體播放器框架，支援 HLS 與 DASH 串流；Plyr 是支援 HTML5、YouTube 與 Vimeo 的簡易播放器，維護者已標示停止開發、改推 Video.js 10；MediaElement.js 把 HTML5 影音與 YouTube、Vimeo、SoundCloud、Facebook、HLS、DASH 統一在同一套 API；vLitejs 以極簡主題替 HTML5、YouTube、Vimeo、Dailymotion 播放器換膚。FlexPlyr 專注四種來源（`video`、`audio`、`youtube`、`vimeo`），以單一 `FPlyr` 設定驅動；只需一支腳本，載入時自行注入樣式表與兩個 SDK；透過 `option.panelType` 切換五種內建面板風格；`video` 與 `youtube` 來源在行動裝置全螢幕時以隱藏的第二個播放器同步進度（見[行動裝置全螢幕](/mobile-fullscreen)）。

## 優先順序

同時設定多個來源時，依 `video` → `youtube` → `vimeo` → `audio` 取第一個非空值（`src/js/model/player.js:100`），其餘欄位不會被寫入實例。

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    youtube: "O5O3yK8DJCc",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
  });
  console.log("video:", player.video);
  console.log("youtube:", player.youtube);
</script>
```

## 音訊

```demo
<div id="player"></div>
<script>
  const player = new FPlyr({
    id: "player",
    audio: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    option: { panelType: "classic" },
    when: {
      ready: () => console.log("audio ready, full button:", player.panel.buttonFull != null),
    },
  });
</script>
```

## YouTube 與 Vimeo：等待 SDK

FlexPlyr 在載入時以 `async` 注入 `iframe_api` 與 `player.js`，但建構子會**立即**建立 `YT.Player`／`Vimeo.Player`（`src/js/model/player.js:824`、`:864`）。若在 SDK 尚未載入完成時建立播放器，會拋出 `ReferenceError: YT is not defined` 或 `Vimeo is not defined`，且之後不會重試。

由腳本注入的 `async` script 會延後 `window` 的 `load` 事件，因此在 `load` 之後建立播放器即可：

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  addEventListener("load", () => {
    const player = new FPlyr({
      id: "player",
      youtube: "O5O3yK8DJCc",
      when: {
        ready: () => setTimeout(() => console.log("youtube ready, paused:", player.isPaused())),
      },
    });
  });
</script>
```

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  addEventListener("load", () => {
    const player = new FPlyr({
      id: "player",
      vimeo: "76979871",
      when: {
        ready: () => setTimeout(() => console.log("vimeo ready, paused:", player.isPaused())),
      },
    });
  });
</script>
```

`load` 已經觸發後（例如 SPA 中途建立播放器）才建立時，SDK 已存在，可直接建立。

## 相關頁面

- [執行期相依資源](/zh/runtime-dependencies)：注入了哪些 SDK
- [生命週期事件](/zh/lifecycle-events)：各來源對應的事件
