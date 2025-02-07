function getTime(sec, duration) {
    const t = sec;
    const h = $Math[_floor](t > 3599 ? t / 3600 : 0);
    const m = $Math[_floor](t > 3599 ? (t % 3600) / 60 : t > 59 ? t / 60 : 0);
    const s = t > 3599 ? (t % 3600) % 60 : t > 59 ? t % 60 : t;

    if (duration >= 3600) {
        return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
    }
    else if (duration >= 60) {
        return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
    }
    else {
        return `0:${s < 10 ? `0${s}` : s}`;
    };
};