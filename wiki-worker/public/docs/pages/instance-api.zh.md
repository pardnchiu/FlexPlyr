# 實例 API

本頁列出 `FPlyr` 實例的公開方法與屬性，以及全域名稱與 ESM 匯出。

## 方法

| 方法 | 回傳 | 說明 |
|------|------|------|
| `play(isFull?)` | `void` | 播放並把播放按鈕切為暫停圖示；`isFull` 為 `true` 時於行動裝置改由全螢幕播放器播放 |
| `pause(isFull?)` | `void` | 暫停並把按鈕切回播放圖示 |
| `isPaused(isFull?)` | `boolean` | 是否暫停；YouTube 以播放器狀態是否為 `1` 判斷 |
| `isMuted(isFull?)` | `boolean` | 是否靜音 |
| `destroy()` | `void` | 釋放播放器，順序見下方 |

這些方法依就緒時才設定的來源旗標分流，在 `when.ready` 觸發前或於 `ready` 內同步呼叫會回傳 `undefined`、不作用於媒體（見[生命週期事件](/zh/lifecycle-events)）。

### destroy() 的釋放順序

1. 移除容器的 `mousemove`／`mouseleave` 處理
2. 停止進度輪詢
3. Vimeo／YouTube 呼叫 SDK 的 `destroy()`（YouTube 連同全螢幕播放器）；HTML5 媒體先暫停再清空 `src`
4. 從 DOM 移除容器
5. `when.destroyed` 為函式時呼叫它

## 屬性

| 屬性 | 型別 | 說明 |
|------|------|------|
| `body` | DOM 元素 | 播放器容器（`.FPlyr`） |
| `option` | `object` | 合併後的 `option`；就緒後 `volume` 會跟著音量操作更新 |
| `when` | `object` | 生命週期回呼（`when` 或舊版 `event`） |
| `panel` | `playerPanel` | 控制面板實例，可取得 `buttonPlay`、`inputProgress` 等元素 |
| `stateFull` | `boolean` | 是否處於全螢幕 |
| `video`／`youtube`／`vimeo`／`audio` | `string` | 實際採用的來源；未採用者為 `undefined` |

## 範例

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<button id="destroy">destroy()</button>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => setTimeout(() => {
        console.log("isPaused:", player.isPaused());
        console.log("isMuted:", player.isMuted());
        console.log("option:", JSON.stringify(player.option));
      }),
      destroyed: () => console.log("destroyed, in DOM:", player.body.isConnected),
    },
  });
  document.getElementById("destroy").onclick = () => player.destroy();
</script>
```

## 全域與匯出

| 名稱 | 來源 | 說明 |
|------|------|------|
| `window.FPlyr` | `dist/FlexPlyr.js` | 主要類別 |
| `window.PDPlayer` | `dist/FlexPlyr.js` | `FPlyr` 的舊名，預計 `3.x` 移除 |
| `FPlyr` | `dist/FlexPlyr.esm.js` | ESM 具名匯出 |
| `player` | `dist/FlexPlyr.esm.js` | `FPlyr` 的舊名，預計 `3.x` 移除 |

```javascript
import { FPlyr } from "@pardnchiu/flexplyr/dist/FlexPlyr.esm.js";
```

## 相關頁面

- [設定選項](/zh/configuration)
- [棄用項目](/zh/deprecations)
