const $document = document;
const $String = String;
const $Array = Array;
const $Map = Map;
const $JSON = JSON;
const $Math = Math;

const regex_css_class = /\.([\w_-]+)?/gi;
const regex_css_id = /\#([\w_-]+)?/i;
const regex_css_tag = /^\w+(?=[\#\.]*)/i;

const _id = "id";
const _panelType = "panelType";
const _panelItem = "panelItem";
const _mute = "mute";
const _option = "option";
const _volume = "volume";
const _init = "init";
const _match = "match";
const _trim = "trim";
const _body = "body";
const _test = "test";
const _map = "map";
const _ceil = "ceil";
const _youtube = "youtube";
const _vimeo = "vimeo";
const _audio = "audio";
const _video = "video";
const _replace = "replace";
const _length = "length";
const _temp = "temp";
const _createElement = "createElement";
const _getElementById = "getElementById";
const _createDocumentFragment = "createDocumentFragment";
const _createTextNode = "createTextNode";
const _classList = "classList";
const _dataset = "dataset";
const _add = "add";
const _set = "set";
const _from = "from";
const _charAt = "charAt";
const _string = "string";
const _number = "number";
const _floor = "floor";
const _random = "random";
const _join = "join";
const _has = "has";
const _isArray = "isArray";
const _object = "object";
const _hasOwnProperty = "hasOwnProperty";
const _value = "value";
const _innerText = "innerText";
const _innerHTML = "innerHTML";
const _textContent = "textContent";
const _contentEditable = "contentEditable";
const _indexOf = "indexOf";
const _console = "console";
const _log = "log";
const _apply = "apply";
const _void = "void";
const _stringify = "stringify";
const _appendChild = "appendChild"
const _color = "color";
const _backgroundColor = "backgroundColor";
const _width = "width";
const _height = "height";
const _display = "display";
const _float = "float";
const _setAttribute = "setAttribute";
const _img = "img";
const _source = "source"
const _head = "head";
const _div = "div";
const _FPlyr = "FPlyr";
const _link = "link";
const _script = "script";
const _style = "style";
const _preconnect = "preconnect";
const _preload = "preload";
const _anonymous = "anonymous";
const _stylesheet = "stylesheet";
const _rel = "rel";
const _href = "href";
const _async = "async";
const _as = "as";
const _src = "src";
const _crossOrigin = "crossOrigin";
const _onmousemove = "onmousemove";
const _onmouseleave = "onmouseleave";

const href_jsdelivr = "https://cdn.jsdelivr.net";
// const href_css = "./dist/FlexPlyr.css";
const href_css = href_jsdelivr + "/npm/@pardnchiu/flexplyr@latest/dist/FlexPlyr.css";
const href_gstatic = "https://fonts.gstatic.com";
const href_googleapis = "https://fonts.googleapis.com";
const href_meterial = href_googleapis + "/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,1,0";
const href_youtube = "https://www.youtube.com";
const href_iframe_api = href_youtube + "/iframe_api";
const href_vimeo = "https://player.vimeo.com";
const href_vimeo_api = href_vimeo + "/api/player.js";

const keyString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const isMobile = /iphone|ipad|ipod|android/i[_test](navigator["userAgent"]);
const isIOS = /iphone|ipad|ipod/i[_test](navigator["userAgent"]);

const ytConfig = {
    autoplay: 0,
    controls: 0,
    showinfo: 0,
    modestbranding: 1,
    start: 0,
    loop: 0,
    fs: 0,
    [_rel]: 0,
    cc_load_policty: 1,
    iv_load_policy: 3,
    autohide: 1,
};

let onYouTubeIframeAPIReady;

// * CSS
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preconnect,
        [_href]: href_jsdelivr,
        [_crossOrigin]: ""
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preload,
        [_href]: href_css,
        [_as]: _style,
        [_crossOrigin]: _anonymous
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_href]: href_css,
        [_rel]: _stylesheet
    })
);

// * Google 圖示
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preconnect,
        [_href]: href_gstatic,
        [_crossOrigin]: ""
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preconnect,
        [_href]: href_googleapis,
        [_crossOrigin]: ""
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preload,
        [_href]: href_meterial,
        [_as]: _style,
        [_crossOrigin]: _anonymous
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_href]: href_meterial,
        [_rel]: _stylesheet
    })
);

// * Youtube API
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preconnect,
        [_href]: href_youtube,
        [_crossOrigin]: ""
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preload,
        [_href]: href_iframe_api,
        [_as]: _script,
        [_crossOrigin]: _anonymous
    })
);
$document[_head][_appendChild](
    createElement(_script, {
        [_src]: href_iframe_api,
        [_async]: ""
    })
);

// * Vimeo API
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preconnect,
        [_href]: href_vimeo,
        [_crossOrigin]: ""
    })
);
$document[_head][_appendChild](
    createElement(_link, {
        [_rel]: _preload,
        [_href]: href_vimeo_api,
        [_as]: _script,
        [_crossOrigin]: _anonymous
    })
);
$document[_head][_appendChild](
    createElement(_script, {
        [_src]: href_vimeo_api,
        [_async]: ""
    })
);