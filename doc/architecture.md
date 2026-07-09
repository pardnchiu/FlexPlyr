# FlexPlyr - Architecture

> Back to [README](../README.md)

## Overview

```mermaid
graph TB
    A[PlayerConfig] --> B[FPlyr Core]
    B --> C[playerPanel Controls]
    B --> D{Source Type}
    D -->|video/audio| E[Native HTML5 Element]
    D -->|youtube| F[YouTube IFrame API]
    D -->|vimeo| G[Vimeo Player API]
    E --> H[when Lifecycle Events]
    F --> H
    G --> H
    I[createElement / UUID / getTime] --> B
    I --> C
```

## Module: FPlyr Core (`src/js/model/player.js`)

Parses `PlayerConfig`, initializes the matching playback logic for the given source type, and exposes a unified `play` / `pause` / `isPaused` / `isMuted` / `destroy` API. On mobile devices it also maintains a separate fullscreen player instance.

```mermaid
graph TB
    subgraph FPlyr
        Config[Constructor parses config] --> Init{Source type}
        Init -->|video| InitVideo[#initVideo]
        Init -->|audio| InitAudio[#initAudio]
        Init -->|youtube| InitYoutube[#initYoutube]
        Init -->|vimeo| InitVimeo[#initVimeo]
        InitVideo --> Mobile{isMobile?}
        Mobile -->|yes| FullPlayer[Create #fullPlayer instance]
        Mobile -->|no| MediaPlayer[#mediaPlayer only]
        InitVideo --> Panel[Create playerPanel]
        InitAudio --> Panel
        InitYoutube --> Panel
        InitVimeo --> Panel
    end
    Panel --> PanelModule[playerPanel]
```

## Module: playerPanel (`src/js/model/playerPanel.js`)

Assembles the control panel DOM (play button, progress bar, volume, rate, fullscreen) based on `option.panelType` and `option.panelItem`, and exposes `setPlayIcon` / `setVolume` / `setMuteIcon` / `setCurrent` / `duration` for FPlyr Core to keep the UI in sync.

```mermaid
graph TB
    subgraph playerPanel
        Ctor[Constructor receives FPlyr instance] --> Build[Builds buttons per panelItem]
        Build --> Play[buttonPlay]
        Build --> Progress[inputProgress]
        Build --> Volume[buttonVolume / inputVolume]
        Build --> Rate[buttonRate]
        Build --> Full[buttonFull]
    end
    FPlyrCore[FPlyr Core] -->|state sync| playerPanel
```

## Module: Shared Utilities (`src/js/function/*.js`)

| Function | Responsibility |
|------|------|
| `createElement` | Builds a DOM element from CSS-selector syntax (`tag.class#id`) and applies attributes/children |
| `UUID` | Generates a unique random string, used for cases like the YouTube iframe container needing a unique DOM id |
| `getTime` | Formats a second count into a `mm:ss` / `hh:mm:ss` display string |

## Data Flow

```mermaid
sequenceDiagram
    participant Caller
    participant FPlyr
    participant Source as Native/YouTube/Vimeo
    participant Panel as playerPanel

    Caller->>FPlyr: new FPlyr(config)
    FPlyr->>Source: Initialize player for the given source type
    Source-->>FPlyr: onloadedmetadata / onReady
    FPlyr->>Panel: Sync initial volume/mute state
    FPlyr-->>Caller: when.ready()

    Caller->>FPlyr: play() / pause()
    FPlyr->>Source: Call the matching native source method
    Source-->>FPlyr: onplaying / onpause / onended
    FPlyr->>Panel: Update play icon and progress
    FPlyr-->>Caller: when.playing() / when.pause() / when.end()

    Caller->>FPlyr: destroy()
    FPlyr->>Source: Remove event listeners and DOM
    FPlyr-->>Caller: when.destroyed()
```

## State Machine

```mermaid
stateDiagram-v2
    [*] --> Loading: new FPlyr()
    Loading --> Ready: onloadedmetadata / onReady
    Ready --> Playing: play()
    Playing --> Paused: pause()
    Paused --> Playing: play()
    Playing --> Ended: onended
    Ended --> Playing: play() (restart)
    Ready --> Destroyed: destroy()
    Playing --> Destroyed: destroy()
    Paused --> Destroyed: destroy()
    Destroyed --> [*]
```

***

©️ 2024 [邱敬幃 Pardn Chiu](https://www.linkedin.com/in/pardnchiu)
