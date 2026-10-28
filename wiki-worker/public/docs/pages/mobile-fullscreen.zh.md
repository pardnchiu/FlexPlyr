# 行動裝置全螢幕

本頁說明 `full` 按鈕在桌面與行動裝置上的不同處理方式，以及行動裝置上隱藏全螢幕播放器的同步機制。

## 裝置判斷

FlexPlyr 在載入時以 User-Agent 判斷裝置（`src/js/*.js`）：

| 旗標 | 條件 |
|------|------|
| `isMobile` | UA 含 `iphone`、`ipad`、`ipod`、`android` |
| `isIOS` | UA 含 `iphone`、`ipad`、`ipod` |

## 桌面版

`full` 按鈕對 `.FPlyr` 容器呼叫 `requestFullscreen`（含 `webkit`／`moz`／`ms` 前綴版本），再按一次呼叫 `exitFullscreen`，並同步更新 `player.stateFull`。

## 行動裝置

行動裝置的內嵌影片受 `playsinline` 限制，無法讓自訂面板跟著進入全螢幕，因此 FlexPlyr 另建一個隱藏的全螢幕播放器（class `PDFullPlayer`，以 CSS 移出畫面）：

| 來源 | 全螢幕播放器 | 進入方式 |
|------|--------------|----------|
| `video` | 第二個 `<video>`，不帶 `playsinline` | `full` → 暫停主播放器 → `play(true)` 播放全螢幕播放器，系統原生進入全螢幕 |
| `youtube` | 第二個 `YT.Player`，`playsinline: 0` | 同上；全螢幕播放器尚未 `onReady` 時 `play(true)` 會跳出 `alert("not Ready")` |
| `vimeo` | 不另建，沿用主播放器 | `play(true)` 先 `requestFullscreen()` 再播放 |
| `audio` | 無 | `full` 按鈕不渲染 |

### 進出全螢幕的同步

| 時機 | 處理 |
|------|------|
| 全螢幕播放器開始播放（video `playing`／YouTube 狀態 `3`） | 暫停主播放器，把主播放器的進度、音量、倍速套到全螢幕播放器後播放 |
| 全螢幕播放器暫停（離開全螢幕） | 把全螢幕播放器的進度、音量、倍速寫回主播放器並更新面板進度 |
| iOS `webkitpresentationmodechanged`／其他 `fullscreenchange` | 更新 `player.stateFull` |

行動裝置上點擊影片畫面不會切換播放，只有面板按鈕有作用。

## 範例

桌面瀏覽器不會建立全螢幕播放器；在 iOS／Android 開啟本頁時數量為 1：

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: { panelItem: ["play", "progress", "full"] },
  });
  console.log("hidden fullscreen players:", document.querySelectorAll(".PDFullPlayer").length);
  console.log("stateFull:", player.stateFull);
</script>
```

## 相關頁面

- [面板控制元件](/zh/panel-controls)：`full` 按鈕
- [實例 API](/zh/instance-api)：`play(isFull)` 與 `stateFull`
