# FlexPlyr - 架構

> 返回 [README](./README.zh.md)

## 概覽

```mermaid
graph TB
    A[PlayerConfig] --> B[FPlyr Core]
    B --> C[playerPanel 控制面板]
    B --> D{來源判斷}
    D -->|video/audio| E[原生 HTML5 Element]
    D -->|youtube| F[YouTube IFrame API]
    D -->|vimeo| G[Vimeo Player API]
    E --> H[when 生命週期事件]
    F --> H
    G --> H
    I[createElement / UUID / getTime] --> B
    I --> C
```

## 模組：FPlyr Core（`src/js/model/player.js`）

負責解析 `PlayerConfig`、依來源類型初始化對應播放邏輯、統一對外暴露 `play` / `pause` / `isPaused` / `isMuted` / `destroy` 等方法，並在行動裝置上維護一組獨立的全螢幕播放器實例。

```mermaid
graph TB
    subgraph FPlyr
        Config[建構子解析 config] --> Init{來源類型}
        Init -->|video| InitVideo[#initVideo]
        Init -->|audio| InitAudio[#initAudio]
        Init -->|youtube| InitYoutube[#initYoutube]
        Init -->|vimeo| InitVimeo[#initVimeo]
        InitVideo --> Mobile{isMobile?}
        Mobile -->|是| FullPlayer[建立 #fullPlayer 實例]
        Mobile -->|否| MediaPlayer[僅 #mediaPlayer]
        InitVideo --> Panel[建立 playerPanel]
        InitAudio --> Panel
        InitYoutube --> Panel
        InitVimeo --> Panel
    end
    Panel --> PanelModule[playerPanel]
```

## 模組：playerPanel（`src/js/model/playerPanel.js`）

依 `option.panelType` 與 `option.panelItem` 動態組裝控制面板 DOM（播放鍵、進度條、音量、速度、全螢幕按鈕），並提供 `setPlayIcon` / `setVolume` / `setMuteIcon` / `setCurrent` / `duration` 等方法供 FPlyr Core 同步 UI 狀態。

```mermaid
graph TB
    subgraph playerPanel
        Ctor[建構子接收 FPlyr 實例] --> Build[依 panelItem 逐項建立按鈕]
        Build --> Play[buttonPlay]
        Build --> Progress[inputProgress]
        Build --> Volume[buttonVolume / inputVolume]
        Build --> Rate[buttonRate]
        Build --> Full[buttonFull]
    end
    FPlyrCore[FPlyr Core] -->|狀態同步| playerPanel
```

## 模組：共用工具函式（`src/js/function/*.js`）

| 函式 | 職責 |
|------|------|
| `createElement` | 以 CSS selector 語法（`tag.class#id`）建立 DOM 元素並套用屬性／子節點 |
| `UUID` | 產生不重複的隨機字串，供 YouTube iframe 容器等需要唯一 DOM id 的場景使用 |
| `getTime` | 將秒數格式化為 `mm:ss` / `hh:mm:ss` 顯示字串 |

## 資料流

```mermaid
sequenceDiagram
    participant Caller
    participant FPlyr
    participant Source as 原生/YouTube/Vimeo
    participant Panel as playerPanel

    Caller->>FPlyr: new FPlyr(config)
    FPlyr->>Source: 依來源類型初始化播放器
    Source-->>FPlyr: onloadedmetadata / onReady
    FPlyr->>Panel: 同步初始音量/靜音狀態
    FPlyr-->>Caller: when.ready()

    Caller->>FPlyr: play() / pause()
    FPlyr->>Source: 呼叫對應播放來源的原生方法
    Source-->>FPlyr: onplaying / onpause / onended
    FPlyr->>Panel: 更新播放圖示與進度
    FPlyr-->>Caller: when.playing() / when.pause() / when.end()

    Caller->>FPlyr: destroy()
    FPlyr->>Source: 移除事件監聽與 DOM
    FPlyr-->>Caller: when.destroyed()
```

## 狀態機

```mermaid
stateDiagram-v2
    [*] --> Loading: new FPlyr()
    Loading --> Ready: onloadedmetadata / onReady
    Ready --> Playing: play()
    Playing --> Paused: pause()
    Paused --> Playing: play()
    Playing --> Ended: onended
    Ended --> Playing: play()（重新播放）
    Ready --> Destroyed: destroy()
    Playing --> Destroyed: destroy()
    Paused --> Destroyed: destroy()
    Destroyed --> [*]
```

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
