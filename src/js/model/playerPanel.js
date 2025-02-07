class playerPanel {

    body;

    // 用於控制面板顯示/隱藏的定時器
    #timer;
    // player對象，對應傳入的實際播放器實例
    #player;

    #duration;

    // 播放按鈕
    buttonPlay;
    // 音量按鈕
    buttonVolume;
    // 靜音按鈕
    buttonMute;
    // 播放速度按鈕
    buttonRate;
    // 全屏按鈕
    buttonFull;
    // 進度條
    inputProgress;
    // 音量調節條
    inputVolume;
    // 音量調節條
    inputVolumeMini;
    // 播放時間顯示的文本元素
    #textTime;
    #textTimeFull;

    // 面板寬度
    #width = 8;

    constructor(player) {
        this.#player = player;

        this.body = createElement("div.panel");
        this.body.onmouseover = _ => this.show();

        for (let key of player.option.panelItem) {
            this.#setButtonPlay(key);
            this.#setInputProgress(player, key);
            this.#setButtonTime(player, key);
            this.#setButtonTimeFull(player, key);
            this.#setInputVolume(key, player.option.volume);
            this.#setInputVolumeMini(key, player.option.volume);
            this.#setButtonRate(player, key, 1);
            this.#setButtonFull(player, key);
        };

        if (player.option.panelType === "minimal") {
            this.body.style.width = this.#width + "px"
        };
    };

    #setButtonPlay(key) {
        if (key !== "play") {
            return;
        };

        this.#width += 16 + 8;
        this.buttonPlay = createElement("span.material-symbols-outlined", "play_arrow");
        this.body[_appendChild](this.buttonPlay);
    };

    #setInputProgress(player, key) {
        if (key !== "progress") {
            return
        };

        this.inputProgress = createElement("input.progress", { type: "range", name: "progress", min: 0, value: 0 })

        this.body[_appendChild](
            createElement("section.progress", [
                createElement("progress", { min: 0, max: 100 }),
                this.inputProgress
            ])
        );
    };

    #setButtonTime(player, key) {
        if (key !== "timeMini" || player.option.panelType === "minimal") {
            return;
        };

        this.#textTime = createElement("p.time", "--:--");
        this.body[_appendChild](this.#textTime);
    };

    #setButtonTimeFull(player, key) {
        if (key !== "time" || player.option.panelType === "minimal") {
            return;
        };

        this.#textTimeFull = createElement("p.time", "--:--/--:--");
        this.body[_appendChild](this.#textTimeFull);
    };

    #setInputVolume(key, volumeValue) {
        if (key !== "volume") {
            return;
        };

        this.#width += 24 + 8 + 64 + 8;
        this.buttonMute = createElement("span.material-symbols-outlined", this.#muteIcon);
        this.inputVolume = createElement("input.volume", { type: "range", name: "volume", min: 0, max: 100, value: volumeValue })

        this.body[_appendChild](
            createElement("section.volume", [
                this.buttonMute,
                createElement("section", [
                    createElement("progress", { min: 0, max: 100, value: volumeValue }),
                    this.inputVolume
                ])
            ])
        );
    };

    #setInputVolumeMini(key, volumeValue) {
        if (key !== "volumeMini") {
            return;
        };

        this.#width += 24 + 8;
        this.buttonVolume = createElement("span.material-symbols-outlined", this.#muteIcon);
        this.inputVolumeMini = createElement("input", { type: "range", name: "volume", min: 0, max: 100, value: volumeValue })
        this.body[_appendChild](
            createElement("details.volume", [
                createElement("summary", [
                    this.buttonVolume
                ]),
                createElement("section", [
                    createElement("progress", { min: 0, max: 100, value: volumeValue }),
                    this.inputVolumeMini
                ])
            ])
        );
    };

    #setButtonRate(player, key, rateValue) {
        if (key !== "rate") {
            return;
        };

        this.#width += 24 + 8;
        this.buttonRate = createElement("span.material-symbols-outlined", "1x_mobiledata");
        this.body[_appendChild](this.buttonRate);
    };

    #setButtonFull(player, key) {
        if (key !== "full" || this.#player.audio != null) {
            return;
        };

        this.#width += 24 + 8;

        this.buttonFull = createElement("span.material-symbols-outlined", "fullscreen");
        this.buttonFull.onclick = _ => {
            const isFull = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || false;
            const reqFull = player.body.requestFullscreen || player.body.msRequestFullscreen || player.body.mozRequestFullScreen || player.body.webkitRequestFullscreen;
            const exitFull = document.exitFullscreen || document.msExitFullscree || document.mozCancelFullScreen || document.webkitExitFullscreen;

            player.stateFull = !isFull;
            if (isFull) {
                if (isMobile) {
                    player.mobilePause()
                }
                else {
                    exitFull && exitFull.call(document);
                }
            }
            else if (isMobile) {
                player.pause();
                player.play(true);
            }
            else {
                reqFull && reqFull.call(player.body)
            }
        };
        this.body[_appendChild](this.buttonFull);
    };

    get #muteIcon() {
        const isMute = this.#player.isMuted();

        return isMute ? "no_sound" : "volume_up";
    };

    setPlayIcon(bool) {
        if (this.buttonPlay == null) {
            return;
        };
        this.buttonPlay.innerText = bool ? "play_arrow" : "pause";
    };

    setMuteIcon(bool) {
        if (this.buttonMute != null) {
            this.buttonMute[_innerText] = bool ? "no_sound" : "volume_up";
        };
        if (this.inputVolume != null) {
            this.inputVolume.value = bool ? 0 : this.#player.option.volume;
            this.inputVolume.previousElementSibling.value = bool ? 0 : this.#player.option.volume;
        };
    };

    reset() {
        if (this.buttonPlay != null) {
            this.buttonPlay.innerText = "play_arrow";
        };
        this.show();
        this.setCurrent(0);
    };

    setVolume(num) {
        if (this.inputVolume != null) {
            this.inputVolume.value = num;
            this.inputVolume.previousElementSibling.value = num;
        };
        if (this.inputVolumeMini != null) {
            this.inputVolumeMini.value = num;
            this.inputVolumeMini.previousElementSibling.value = num;
        };
    };

    duration(sec) {
        const duration = Math.ceil(sec);

        this.#duration = duration;

        if (this.inputProgress != null) {
            this.inputProgress.max = duration;
            this.inputProgress.previousElementSibling.max = duration;
        };

        if (this.#textTimeFull != null) {
            this.#textTimeFull.innerText = getTime(0, duration, true) + "/" + getTime(this.#duration, this.#duration);
        };
    };

    setCurrent(sec) {
        if (this.inputProgress != null) {
            this.inputProgress.value = sec;
            this.inputProgress.previousElementSibling.value = sec;
        };

        if (sec == null || (this.#textTime == null && this.#textTimeFull == null)) {
            return;
        };

        if (this.#textTime != null) {
            this.#textTime.innerText = getTime(sec, this.#duration);
        };

        if (this.#textTimeFull != null) {
            this.#textTimeFull.innerText = getTime(sec, this.#duration) + "/" + getTime(this.#duration, this.#duration);
        };
    };

    show() {
        clearTimeout(this.#timer);

        this.body.classList.remove("hide");
    };

    hide(sec) {
        clearTimeout(this.#timer);

        this.#timer = setTimeout(_ => {
            if (this.#player.isPaused()) {
                return;
            };
            this.body.classList.add("hide");
        }, sec * 1000);
    };
};