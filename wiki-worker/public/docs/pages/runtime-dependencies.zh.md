# 執行期相依資源

本頁列出 FlexPlyr 載入時自動注入 `<head>` 的外部資源，以及它們對版本、CSP 與 SSR 的影響。

## 注入的資源

腳本一執行就在 `<head>` 插入下列 `preconnect`、`preload` 與實際載入標籤（`src/js/*.js`），與頁面上建立幾個播放器、使用哪種來源無關：

| 資源 | URL | 用途 |
|------|-----|------|
| 面板樣式 | `https://cdn.jsdelivr.net/npm/@pardnchiu/flexplyr@latest/dist/FlexPlyr.css` | 容器、面板與風格樣式 |
| 圖示字型 | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined...` | 面板按鈕圖示（`play_arrow`、`volume_up` 等字型連字） |
| YouTube SDK | `https://www.youtube.com/iframe_api`（`async`） | `YT.Player` |
| Vimeo SDK | `https://player.vimeo.com/api/player.js`（`async`） | `Vimeo.Player` |

```demo
<script>
  const urls = [...document.head.querySelectorAll('link[rel="stylesheet"], script[src]')]
    .map((e) => e.href || e.src)
    .filter((u) => !u.includes("/dist/FlexPlyr.js"));
  urls.forEach((u) => console.log(u));
</script>
```

## 影響

| 面向 | 說明 |
|------|------|
| 樣式版本 | 樣式固定取自 `@latest`，即使腳本鎖定 `@2.2.9`，樣式仍會隨新版發佈改變 |
| 只用 HTML5 時 | YouTube 與 Vimeo SDK 仍會下載 |
| CSP | `script-src` 需允許 `cdn.jsdelivr.net`（若從 CDN 載入）、`www.youtube.com`、`player.vimeo.com`；`style-src` 需允許 `cdn.jsdelivr.net`、`fonts.googleapis.com`；`font-src` 需允許 `fonts.gstatic.com`；`frame-src` 需允許 `www.youtube.com`、`player.vimeo.com` |
| SSR | 模組載入即存取 `document.head` 與 `navigator.userAgent`，在 Node.js 匯入會失敗，需只在瀏覽器端動態載入 |
| SDK 時序 | SDK 以 `async` 載入，建立 YouTube／Vimeo 播放器前需等待，見[媒體來源](/zh/media-sources) |

## 相關頁面

- [快速開始](/zh/getting-started)
- [架構](/zh/architecture)
