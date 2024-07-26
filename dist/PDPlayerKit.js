const e="link",t="script",i="preconnect",s="preload",a="anonymous",o="stylesheet",n="https://www.youtube.com/iframe_api",l="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css";let r;document.head._child([e._({rel:i,href:"https://cdn.jsdelivr.net",crossOrigin:a}),e._({rel:i,href:"https://www.youtube.com",crossOrigin:a}),e._({rel:s,href:n,as:t,crossOrigin:a}),t._({src:n}),e._({rel:s,href:l,as:"style",crossOrigin:a}),e._({rel:o,href:l})]);const h='\n.full-player{position:absolute;z-index:0;top:-1000vh;left:0;width:0;height:0;overflow:hidden;opacity:0}#PDPlayer{position:absolute;display:block;width:100%;height:100%;border-radius:inherit;font-family:monospace;overflow:hidden}#PDPlayer:hover>div.panel{bottom:.5rem}#PDPlayer>video{z-index:0;position:relative;display:block;width:100%;height:100%;border-radius:inherit;background-color:#000}#PDPlayer>iframe{z-index:0;position:relative;display:block;width:100%;height:100%;border-radius:inherit;background-color:#000}#PDPlayer>div.mask{z-index:1;position:absolute;display:block;top:0;left:0;bottom:0;right:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);backdrop-filter:blur(1rem);-webkit-backdrop-filter:blur(1rem)}#PDPlayer>div.mask.hide{opacity:0;transition:.3s}#PDPlayer>div.mask>img{z-index:1;object-fit:contain;position:absolute;display:block;top:0;left:0;bottom:0;right:0;width:100%;height:100%;background-color:rgba(0,0,0,0)}#PDPlayer>div.panel{z-index:2;position:absolute;display:flex;justify-content:center;align-items:center;left:.5rem;bottom:.5rem;right:.5rem;gap:1rem;padding:0 1rem;width:calc(100% - 1rem);height:2.5rem;background-color:rgba(80,80,80,.8);backdrop-filter:blur(1rem);-webkit-backdrop-filter:blur(1rem);border-radius:1.25rem;box-sizing:border-box;transition:.3s}#PDPlayer>div.panel.hide{bottom:-2.5rem}#PDPlayer>div.panel>p{font-size:.75rem;color:#fff;letter-spacing:2px}#PDPlayer>div.panel>i{width:1.5rem;text-align:center;font-size:1.125rem;color:#fff;transition:.2s}#PDPlayer>div.panel>i:hover{font-size:1.25rem}#PDPlayer>div.panel>a,#PDPlayer>div.panel>button{position:relative;display:flex;justify-content:center;align-items:center;padding:0;width:1.5rem;font-family:monospace;font-size:.75rem;background-color:rgba(0,0,0,0);color:#fff;border:none;cursor:pointer}#PDPlayer>div.panel>a.show>input,#PDPlayer>div.panel>button.show>input{display:flex}#PDPlayer>div.panel>a>i,#PDPlayer>div.panel>button>i{width:1.5rem;text-align:center;font-size:1.125rem;color:#fff;transition:.2s}#PDPlayer>div.panel>a>i:hover,#PDPlayer>div.panel>button>i:hover{font-size:1.25rem}#PDPlayer>div.panel>a>input,#PDPlayer>div.panel>button>input{position:absolute;display:none;right:-3.375rem;bottom:5.5rem;-webkit-appearance:none;appearance:none;outline:none;transform:rotate(-90deg);background-color:rgba(0,0,0,0);box-sizing:border-box}#PDPlayer>div.panel>a>input::before,#PDPlayer>div.panel>button>input::before{content:"";position:absolute;top:50%;transform:translateY(-50%);width:100%;height:8px;background-color:rgba(255,255,255,.5);border-radius:4px}#PDPlayer>div.panel>a>input::-webkit-slider-thumb,#PDPlayer>div.panel>button>input::-webkit-slider-thumb{position:relative;-webkit-appearance:none;appearance:none;width:16px;height:16px;background-color:#fff;border-radius:8px;cursor:pointer}#PDPlayer>div.panel>a>input::-moz-range-thumb,#PDPlayer>div.panel>button>input::-moz-range-thumb{position:relative;-webkit-appearance:none;appearance:none;width:16px;height:16px;background-color:#fff;border-radius:8px;cursor:pointer}#PDPlayer>div.panel>input{flex-grow:1;flex-shrink:1;position:relative;height:1rem;background-color:rgba(0,0,0,0);outline:none;-webkit-appearance:none;appearance:none}#PDPlayer>div.panel>input::before{content:"";position:absolute;top:50%;transform:translateY(-50%);width:100%;height:6px;background-color:rgba(255,255,255,.5);border-radius:4px}#PDPlayer>div.panel>input::-webkit-slider-thumb{position:relative;-webkit-appearance:none;appearance:none;width:25px;height:16px;background-image:linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0);background-size:6px 16px,3px 16px,2px 16px,3px 16px,2px 16px,3px 16px,6px 16px;background-position:0px center,6px center,9px center,11px center,14px center,16px center,19px center;background-repeat:no-repeat;animation:test 2s infinite;cursor:pointer;border-radius:4px}#PDPlayer>div.panel>input::-moz-range-thumb{position:relative;-webkit-appearance:none;appearance:none;width:25px;height:16px;background-image:linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0),linear-gradient(to bottom, #FFF 30%, rgba(0, 0, 0, 0.0509803922) 30% 70%, #FFF 70%),linear-gradient(#FFF 50px, transparent 0);background-size:6px 16px,3px 16px,2px 16px,3px 16px,2px 16px,3px 16px,6px 16px;background-position:0px center,6px center,9px center,11px center,14px center,16px center,19px center;background-repeat:no-repeat;animation:test 2s infinite;cursor:pointer;border-radius:4px}\n'.trim();var d;document.head._child([e._({rel:o,href:"data:text/css;base64,"+(d=h,window.btoa(encodeURIComponent(d).replace(/%([0-9A-F]{2})/g,((e,t)=>String.fromCharCode("0x"+t)))))})],document.head.firstElementChild);export class player{#e;#t;#i;#s;#a;#o;#n;#l;#r=!1;constructor(e={}){this.#e=e.panel||[],this.#t=e.event||{},this.#i=e.src,this.#s=e.videoId,this.#a=e.volume,this.#o=e.mute,this.body="div#PDPlayer"._(),this.#i?this.#h():this.#s&&this.#d()}#p(e){return e?this.fullPlayer:this.#n?this.player:this.#l?this.ytplayer:void 0}#u(e){const t=this.#p(e);this.#n?t.play():this.#l&&t.playVideo()}#c(e){const t=this.#p(e);this.#n?t.pause():this.#l&&t.pauseVideo()}#_(e,t){const i=this.#p(t);this.#n?(i.currentTime=e,this.#c()):this.#l&&(i.seekTo(e),this.#c())}#m(e){const t=this.#p(e);return this.#n?100*t.volume:this.#l?t.getVolume():0}#v(e,t){const i=this.#p(t);this.#n?i.volume=e/100:this.#l&&i.setVolume(e)}#b(e,t){const i=this.#p(t);this.#n?i.muted=e:this.#l&&(e?i.mute():i.unMute())}#y(e){const t=this.#p(e);return this.#n?t.playbackRate:this.#l?t.getPlaybackRate():0}#E(e,t){const i=this.#p(t);this.#n?i.playbackRate=e:this.#l&&i.setPlaybackRate(e)}#f(e){const t=this.#p(e);return this.#n?Math.ceil(t.duration):this.#l?Math.ceil(t.getDuration()):void 0}#g(e){const t=this.#p(e);return this.#n?Math.ceil(t.currentTime):this.#l?Math.ceil(t.getCurrentTime()):void 0}#T(e){const t=this.body.$sel("p[name='timeshow']");if(null==e||null==t)return;const i=e,s=Math.floor(i>3599?i/3600:0),a=Math.floor(i>3599?i%3600/60:i>59?i/60:0),o=i>3599?i%3600%60:i>59?i%60:i;t.innerText=`${s<10?`0${s}`:s}:${a<10?`0${a}`:a}:${o<10?`0${o}`:o}`}#P(e){const t=this.#p(e);return this.#n?t.muted:!!this.#l&&t.isMuted()}#x(e){return"fa-solid."+(e?"fa-volume-xmark":"fa-volume-high")}#k(e){return"fa-solid."+(0===e?"fa-volume-xmark":e>50?"fa-volume-high":e<25?"fa-volume-off":"fa-volume-low")}#I(){return this.#n?this.player.paused:!!this.#l&&1!==this.ytState}#F(e){this.hoverTimer=setTimeout((()=>{this.#I()||this.panel._class("hide")}),1e3*e)}#w(){this.panel="div.panel"._()._mousemove((e=>{clearTimeout(this.hoverTimer),this.panel.class_("hide"),this.#F(5)}))._mouseleave((()=>{this.#F(5)})),this.#e.forEach((e=>{"play"===e?this.panel._child("i.fa-solid.fa-play"._({name:"playbtn"})):"timebar"===e?this.panel._child(["input@range"._({name:"timebar",min:0,value:0})]):"time"===e?this.panel._child(["p"._({name:"timeshow"},"00:00:00")]):"mute"===e?this.panel._child(["i.fa-solid.fa-volume-high"._({name:"mutebtn"})]):"volume"===e?this.panel._child(["button"._(["input"._({name:"volume",type:"range",min:0,max:100,value:0})._input((e=>{const t=parseInt(e.target.value);this.#v(t),e.target.$next(0).__class(this.#k(t))})),"i.fa-solid.fa-volume-high"._({name:"volumebtn"})._click((function(e){this.$parent(0).$$class("show")?this.$parent(0).class_("show"):this.$parent(0)._class("show")}))])]):"rate"===e?this.panel._child(["button"._({name:"ratebtn"},"1")]):"full"===e&&this.panel._child(["button"._(["i.fa-solid.fa-expand"._({name:"full"})])])})),this.#s&&this.panel._child(["a"._(["i.fa-brands.fa-youtube"._()])._open(`https://www.youtube.com/watch?v=${this.#s}`)])}#D(){null!=this.#t.ready&&this.#t.ready(),this.#n=this.#i&&this.player,this.#l=this.#s&&this.ytplayer;const e=this.body.$sel("i[name='playbtn']"),t=this.body.$sel("input[name='timebar']"),i=this.body.$sel("i[name='mutebtn']"),s=this.body.$sel("input[name='volume']"),a=this.body.$sel("i[name='volumebtn']"),o=this.body.$sel("button[name='ratebtn']"),n=this.body.$sel("i[name='full']"),l=null!=this.#o?this.#o:this.#P(),r=null!=this.#a?this.#a:this.#m(),h=this.#y();this.sec=0,null!=this.#o&&this.#b(this.#o),null!=this.#a&&this.#v(this.#a),null!=e&&e._click((()=>{this.#I()?this.#u():this.#c()})),null!=t&&t._attr({max:this.#f()})._input((e=>{this.#u();const t=parseInt(e.target.value);this.#T(t),this.#_(t),setTimeout((()=>{this.#u()}),500)})),null!=i&&i.__class(this.#x(l))._click((e=>{const t=this.#P();this.#b(!t),e.target.__class(this.#x(!t))})),null!=s&&(s.value=r),null!=a&&a.__class(this.#k(r)),null!=o&&o.__(h)._click((e=>{const t=[1,1.25,1.5,2,.5],i=this.#y();let s=t.indexOf(i);.5===i?s=0:s+=1,this.#E(t[s]),e.target.innerText=t[s]})),null!=n&&n._click((()=>{const e=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,t=this.body.requestFullscreen||this.body.msRequestFullscreen||this.body.mozRequestFullScreen||this.body.webkitRequestFullscreen,i=document.exitFullscreen||document.msExitFullscree||document.mozCancelFullScreen||document.webkitExitFullscreen;this.#r=!e,e?$$mobile?this.mobilePause():i&&i.call(document):$$mobile?this.#S():t&&t.call(this.body)}))}#A(){null!=this.#t.playing&&this.#t.playing();const e=this.body.$sel("i[name='playbtn']"),t=this.body.$sel("input[name='timebar']");null!=e&&e.__class("fa-solid fa-pause"),this.#n||this.#l&&(this.start&&(this.start=!1),setTimeout((()=>{this.mask._class("hide")}),500));const i=this.#f();this.videoTimer=setInterval((()=>{if(null==t)return clearInterval(this.videoTimer);const e=this.#g();t.value=e,this.panel._attr({sec:this.live?"live":e}),this.#T(e),e===i&&clearInterval(this.videoTimer)}),100),this.#F(5)}#O(){null!=this.#t.pause&&this.#t.pause();const e=this.body.$sel("i[name='playbtn']");null!=e&&e.__class("fa-solid fa-play"),clearInterval(this.videoTimer),this.#n||this.#l&&this.mask.class_("hide"),this.panel.class_("hide")}#$(){null!=this.#t.end&&this.#t.end(),clearInterval(this.videoTimer);const e=this.body.$sel("input[name='timebar']"),t=this.body.$sel("i[name='playbtn']");null!=t&&(e.value=0),null!=t&&t.__class("fa-solid fa-play"),this.panel.class_("hide"),this.#T(0),this.#n?this.player.currentTime=0:this.#l&&(this.ytplayer.pauseVideo(),this.ytplayer.seekTo(0),setTimeout((()=>{this.mask.class_("hide"),this.start=!0}),50))}#L(){const e=this.#g(),t=this.#m(),i=this.#y();this.#c(),this.#_(e,!0),this.#v(t,!0),this.#E(i,!0),this.#u(!0)}#V(){const e=this.body.$sel("input[name='timebar']"),t=this.#g(!0),i=this.#m(!0),s=this.#y(!0);this.#T(t),this.#_(t),this.#v(i),this.#E(s),e.value=t}#h(){this.#i&&(this.player="video"._(["source"._(this.#i)])._video({preload:"auto",playsinline:!0}),this.#w(),this.body._child([this.player,this.panel])._mousemove((()=>{clearTimeout(this.hoverTimer),this.panel.class_("hide"),this.#F(5)}))._mouseleave((()=>{this.#F(5)})),this.player.onloadedmetadata=()=>this.#D(),this.player.onplaying=()=>this.#A(),this.player.onpause=()=>this.#O(),this.player.onended=()=>this.#$(),$$mobile&&(this.fullPlayer="video.full-player"._(["source"._(this.#i)])._video({preload:"auto",playsinline:!1}),this.fullPlayer.onplaying=()=>this.#L(),this.fullPlayer.onpause=()=>this.#V(),this.body._child([this.fullPlayer])))}async#M(e){const t=e=>{if(this.#s)return this.#s,e(e);if(this.#s=prompt("Youtube 影片ID / 網址"),/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(this.#s)){let t=videoId.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/);this.#s=t&&11==t[7].length?t[7]:null,this.#s?(history.pushState(null,null,location.href.split("?")[0]+`?videoId=${this.#s}`),e()):fitVideoId(e)}else e(e)};if(!e)return new Promise(((e,i)=>t(e)));t(e)}#R(e){null!=e&&`https://i.ytimg.com/vi/${this.#s}/${e}.jpg`.$$200().then((e=>{this.mask._child(["img"._(e.target.currentSrc)])})).catch((()=>{this.#R(this.ary.shift())}))}#S(){this.#I()||(this.#c(),this.#u(!0))}#d(){if(!this.#s)return;const e=$key(24),t=$key(24);this.start=!0,this.ary=["maxresdefault","sddefault","hqdefault","mqdefault"],this.player=`div#${e}`._(),this.mask="div.mask"._({sec:this.live?"live":0}),this.#w(),this.body._child([this.player,$$mobile?`div#${t}.full-player`._():null,this.mask,this.panel])._mousemove((()=>{clearTimeout(this.hoverTimer),this.panel.class_("hide"),this.#F(5)}))._mouseleave((()=>{this.#F(5)})),r=async()=>{await this.#M(),this.ytplayer=new YT.Player(e,{videoId:this.#s,width:"100%",height:"100%",playerVars:{autoplay:0,controls:0,showinfo:0,modestbranding:1,start:0,loop:0,fs:0,rel:0,cc_load_policty:1,iv_load_policy:3,autohide:1,playsinline:1},events:{onReady:e=>{this.#D()},onStateChange:e=>{switch(this.ytState=e.data,e.data){case 0:this.#$();break;case 1:this.#A();break;case 2:this.#O()}}}}),$$mobile&&(this.fullPlayer=new YT.Player(t,{videoId:this.#s,width:"0",height:"0",playerVars:{autoplay:0,controls:0,showinfo:0,modestbranding:1,start:0,loop:0,fs:0,rel:0,cc_load_policty:1,iv_load_policy:3,autohide:1,playsinline:0},events:{onReady:function(){console.log("fullready")},onStateChange:e=>{switch(console.log(e.data),e.data){case 1:break;case 2:this.#V();break;case 3:this.#L()}}}}))},r()}}