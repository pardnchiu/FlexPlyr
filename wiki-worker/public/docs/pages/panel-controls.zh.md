# 面板控制元件

本頁說明 `option.panelItem` 可用的八種控制元件、渲染順序，以及控制拖曳把手的 `showThumb`。

## 元件一覽

預設值為 `["play", "progress", "time", "volumeMini", "rate", "full"]`。

| 值 | 元件 | 行為 |
|----|------|------|
| `play` | 播放／暫停按鈕 | 切換播放狀態；圖示隨 `playing`／`pause` 事件更新 |
| `progress` | 進度條 | 拖曳時先暫停並即時更新時間，停止拖曳 500ms 後跳轉，再 500ms 後續播 |
| `time` | 目前時間／總長度 | 例：`0:12/0:30`；`minimal` 風格不渲染 |
| `timeMini` | 目前時間 | 例：`0:12`；`minimal` 風格不渲染 |
| `volume` | 靜音按鈕＋常駐音量條 | 按鈕切換靜音；音量拉到 0 視為靜音，從 0 取消靜音時回到 50 |
| `volumeMini` | 收合式音量按鈕 | 點擊展開音量條，滑鼠離開 1 秒後收合；按鈕本身不切換靜音 |
| `rate` | 倍速按鈕 | 依序切換 `1 → 1.25 → 1.5 → 2 → 0.5 → 1` |
| `full` | 全螢幕按鈕 | 見[行動裝置全螢幕](/zh/mobile-fullscreen)；音訊來源不渲染 |

時間格式依總長自動切換：未滿 1 分鐘為 `0:ss`，未滿 1 小時為 `mm:ss`，其餘為 `hh:mm:ss`。

## 順序與重複

元件依陣列順序插入面板，因此陣列順序即畫面順序。同一個值寫兩次會渲染兩個元件，但只有最後一個會綁定事件，應避免重複。

## showThumb

`option.showThumb` 寫入容器的 `data-thumb`；為 `false` 時樣式表隱藏進度條與音量條的拖曳把手，只保留進度色條。

## 範例

```demo
<div style="max-width: 480px; aspect-ratio: 16 / 9"><div id="player"></div></div>
<script>
  const player = new FPlyr({
    id: "player",
    video: "https://cdn.pixabay.com/video/2023/11/28/191159-889246512_tiny.mp4",
    option: {
      panelItem: ["play", "progress", "timeMini", "volume", "rate", "full"],
      showThumb: false,
    },
  });
  console.log("buttonPlay:", player.panel.buttonPlay != null);
  console.log("inputVolume:", player.panel.inputVolume != null);
  console.log("inputVolumeMini:", player.panel.inputVolumeMini != null);
  console.log("data-thumb:", player.body.dataset.thumb);
</script>
```

## 版本差異

`2.1.0` 起 `time` 改為完整格式（`0:00/0:30`），原本的簡短格式改名為 `timeMini`。

## 相關頁面

- [面板風格](/zh/panel-themes)
- [設定選項](/zh/configuration)
