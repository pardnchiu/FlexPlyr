# 生命週期事件

本頁說明 `when` 的五個回呼何時觸發、各來源對應的底層事件，以及 `ready` 回呼內的呼叫時序限制。

## 回呼一覽

| 回呼 | HTML5 video／audio | YouTube | Vimeo | FlexPlyr 同時做的事 |
|------|--------------------|---------|-------|----------------------|
| `ready` | `loadedmetadata` | `onReady` | `ready()` resolve | 設定時長、進度歸零、套用音量與靜音 |
| `playing` | `playing` | 狀態 `1` | `play` | 啟動 100ms 進度輪詢；1 秒後隱藏面板 |
| `pause` | `pause` | 狀態 `2` | `pause` | 停止輪詢、顯示面板 |
| `end` | `ended` | 狀態 `0` | `ended` | 停止輪詢、面板重設、進度跳回 0 |
| `destroyed` | `destroy()` 移除 DOM 後 | 同左 | 同左 | — |

舊版的 `event` 物件仍可使用，等同 `when`（見[棄用項目](/zh/deprecations)）。

## 範例

點擊播放、暫停後再按 `destroy()`，下方 log 會依序列出觸發的回呼：

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<button id="destroy">destroy()</button>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => console.log("ready"),
      playing: () => console.log("playing"),
      pause: () => console.log("pause"),
      end: () => console.log("end"),
      destroyed: () => console.log("destroyed"),
    },
  });
  document.getElementById("destroy").onclick = () => player.destroy();
</script>
```

## ready 早於內部狀態

`ready` 是 `#stateReady()` 的第一行（`src/js/model/player.js:397`），此時 `#isVideo`／`#isYoutube` 等來源旗標尚未設定（`:406`）。所有公開方法都依這些旗標分流，所以在 `ready` 內同步呼叫會落空：

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    when: {
      ready: () => {
        console.log("inside ready:", String(player.isPaused()));
        setTimeout(() => console.log("next tick:", player.isPaused()));
      },
    },
  });
</script>
```

需要在就緒時操作播放器，把呼叫包進 `setTimeout`。

## 相關頁面

- [實例 API](/zh/instance-api)：`destroy()` 的釋放順序
- [媒體來源](/zh/media-sources)：YouTube／Vimeo 的 SDK 時序
