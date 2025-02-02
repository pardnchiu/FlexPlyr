<img src="https://flexplyr.pardn.io/static/image/logo.png" width=80>

# FlexPlyr

> [!NOTE]
> (原名：PDPlayerKit，自 `2.2.4` 版本起更名為 FlexPlyr)

> 純 JavaScript 打造的模組化媒體播放器，支援 HTML5、YouTube、Vimeo，提供靈活主題與完整控制面板。

![tag](https://img.shields.io/badge/tag-JavaScript%20Library-bb4444) 
![size](https://img.shields.io/github/size/pardnchiu/FlexPlyr/dist%2FFlexPlyr.js)<br>
[![npm](https://img.shields.io/npm/v/@pardnchiu/flexplyr)](https://www.npmjs.com/package/@pardnchiu/flexplyr)
[![download](https://img.shields.io/npm/dm/@pardnchiu/flexplyr)](https://www.npmjs.com/package/@pardnchiu/flexplyr)
[![jsdeliver](https://img.shields.io/jsdelivr/npm/hm/@pardnchiu/flexplyr)](https://www.jsdelivr.com/package/npm/@pardnchiu/flexplyr)<br>
[![](https://img.shields.io/badge/read-English%20Version-ffffff)](https://github.com/pardnchiu/FlexPlyr/blob/main/README.md)

## 特點

### 多媒體播放
- 支援多類型：可播放 **HTML5 影片 / 音訊**、**YouTube** 與 **Vimeo**。
- 兼容桌面與行動設備，支持 `playsinline` 和 **全螢幕模式** 切換。

### 高度自定義控制面板
- 自由定制按鈕：**播放速率調整**、**音量控制**、**進度條** 等功能按需配置。
- 提供多種內建主題： (如 Minimal、Classic、Retro、Simple)，方便自由選擇。

### 輕量與無依賴
- 基於 **原生 API** 和 **YouTube / Vimeo API**，無需額外庫，開箱即用。
- 完全移除 **PDRenderKit** 的依賴，減少耦合，提升使用便捷性。
- 文件體積小於 數 KB，即使在行動設備上也能高效運行。

### 全面的事件監聽
- 支持多種事件監聽： (如 ready、playing、pause、end)，方便深度擴展。

## 安裝方式

### 從 npm 安裝
```bash
npm i @pardnchiu/flexplyr
```

### 從 CDN 引入

#### UMD 版本
```html
<!--  2.2.4 版本以上 -->
<script src="https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.js"></script>

<!-- 2.2.3 版本以下 -->
<script src="https://cdn.jsdelivr.net/npm/pdplayerkit@[VERSION]/dist/PDPlayerKit.js"></script>
```

#### ES Module 版本
```javascript
// 2.2.4 版本以上
import { FPlyr } from "https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@[VERSION]/dist/FlexPlyr.esm.js";

// 2.2.3 版本以下
import { player } from "https://cdn.jsdelivr.net/npm/pdplayerkit@[VERSION]/dist/PDPlayerKit.module.js";
```

## 使用方法

### 初始化 `FPlyr`
```Javascript
// 2.2.4 版本以上
// 統一使用: FPlyr

// 2.2.3 版本以下
// IIFE: PDPlayer
// ESM: player

const dom = new FPlyr({
    // 選填：指定元件替換為播放器（元件的 ID）
    // 若未指定，需手動將 dom.body 加入至視圖中
    // id: "元件 ID",


    // 必填：媒體來源設定，以下選項中僅能選擇一項
    video: "[影片位置]",
    // audio: "[音訊位置]",
    // vimeo: "[Vimeo ID]",
    // youtube: "[YouTube ID]"

    // 選填：播放設置
    option: {   
        // 是否顯示滑桿，預設 true
        showThumb: true,

        // 控制面板外觀風格，例如 "minimal" 或 "classic"
        panelType: "[風格選擇]",

        // 控制面板按鈕，依需求選擇顯示的功能
        panel: [
            "play", "progress", "time", "timeMini", 
            "volume", "volumeMini", "rate", "full"
        ],
        // 播放器預設音量
        volume: 100,
        // 播放器預設靜音
        mute: false
    },

    // 選填：事件監聽器，可監聽播放過程中的特定事件
    when: {
        ready: function () {
            console.log("播放器準備完成");
        },
        playing: function () {
            console.log("播放中");
        },
        pause: function () {
            console.log("暫停");
        },
        end: function () {
            console.log("播放結束");
        },
        destroyed: function () {
            console.log("已移除");
        }
    }
});

// 若無指定元件，需手動將播放器加入至 DOM 中
(...).appendChild(dom.body);

// 移除元件
// dom.destory();
```


## 授權條款

此源代碼項目採用 [MIT](https://github.com/pardnchiu/FlexPlyr/blob/main/LICENSE) 許可證授權。

## 開發者

<img src="https://avatars.githubusercontent.com/u/25631760" align="left" width="96" height="96" style="margin-right: 0.5rem;">

<h4 style="padding-top: 0">邱敬幃 Pardn Chiu</h4>

<a href="mailto:dev@pardn.io" target="_blank">
    <img src="https://pardn.io/image/email.svg" width="48" height="48">
</a> <a href="https://linkedin.com/in/pardnchiu" target="_blank">
    <img src="https://pardn.io/image/linkedin.svg" width="48" height="48">
</a>

***

©️ 2023 [邱敬幃 Pardn Chiu](https://pardn.io)
