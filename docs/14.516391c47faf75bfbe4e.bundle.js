(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1355:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ion_spinner",(function(){return Spinner}));var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(62),_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(64),_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(1372),_spinner_configs_cd7845af_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1376),Spinner=function(){function e(e){Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.o)(this,e),this.paused=!1}return e.prototype.getName=function(){var e=this.name||_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__.c.get("spinner"),r=Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__.b)(this);return e||("ios"===r?"lines":"circular")},e.prototype.render=function(){var e,r=this,n=Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__.b)(r),t=r.getName(),s=_spinner_configs_cd7845af_js__WEBPACK_IMPORTED_MODULE_3__.a[t]||_spinner_configs_cd7845af_js__WEBPACK_IMPORTED_MODULE_3__.a.lines,i="number"==typeof r.duration&&r.duration>10?r.duration:s.dur,a=[];if(void 0!==s.circles)for(var o=0;o<s.circles;o++)a.push(buildCircle(s,i,o,s.circles));else if(void 0!==s.lines)for(o=0;o<s.lines;o++)a.push(buildLine(s,i,o,s.lines));return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.j)(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.c,{class:Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__.a)(r.color,(e={},e[n]=!0,e["spinner-"+t]=!0,e["spinner-paused"]=!!r.paused||_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_1__.c.getBoolean("_testing"),e)),role:"progressbar",style:s.elmDuration?{animationDuration:i+"ms"}:{}},a)},e}(),buildCircle=function(e,r,n,t){var s=e.fn(r,n,t);return s.style["animation-duration"]=r+"ms",Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.j)("svg",{viewBox:s.viewBox||"0 0 64 64",style:s.style},Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.j)("circle",{transform:s.transform||"translate(32,32)",cx:s.cx,cy:s.cy,r:s.r,style:e.elmDuration?{animationDuration:r+"ms"}:{}}))},buildLine=function(e,r,n,t){var s=e.fn(r,n,t);return s.style["animation-duration"]=r+"ms",Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.j)("svg",{viewBox:s.viewBox||"0 0 64 64",style:s.style},Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__.j)("line",{transform:"translate(32,32)",y1:s.y1,y2:s.y2}))};Spinner.style=":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}[dir=rtl] svg,:host-context([dir=rtl]) svg{left:unset;right:unset;right:0}[dir=rtl] svg,:host-context([dir=rtl]) svg{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:4px;stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-circular){-webkit-animation:spinner-circular linear infinite;animation:spinner-circular linear infinite}:host(.spinner-circular) circle{-webkit-animation:spinner-circular-inner ease-in-out infinite;animation:spinner-circular-inner ease-in-out infinite;stroke:currentColor;stroke-dasharray:80px, 200px;stroke-dashoffset:0px;stroke-width:5.6;fill:none}:host(.spinner-paused),:host(.spinner-paused) svg,:host(.spinner-paused) circle{-webkit-animation-play-state:paused;animation-play-state:paused}@-webkit-keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@-webkit-keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}@keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}"},1372:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return createColorClasses})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getClassMap})),__webpack_require__.d(__webpack_exports__,"c",(function(){return hostContext})),__webpack_require__.d(__webpack_exports__,"d",(function(){return openURL}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),hostContext=function(r,t){return null!==t.closest(r)},createColorClasses=function(r,t){var e;return"string"==typeof r&&r.length>0?Object.assign(((e={"ion-color":!0})["ion-color-"+r]=!0,e),t):t},getClassMap=function(r){var t={};return function(r){return void 0!==r?(Array.isArray(r)?r:r.split(" ")).filter((function(r){return null!=r})).map((function(r){return r.trim()})).filter((function(r){return""!==r})):[]}(r).forEach((function(r){return t[r]=!0})),t},SCHEME=/^[a-z][a-z0-9+\-.]*:/,openURL=function(r,t,e,n){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.b)(void 0,void 0,void 0,(function(){var o;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.d)(this,(function(a){return null!=r&&"#"!==r[0]&&!SCHEME.test(r)&&(o=document.querySelector("ion-router"))?(null!=t&&t.preventDefault(),[2,o.push(r,e,n)]):[2,!1]}))}))}},1376:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SPINNERS}));var SPINNERS={bubbles:{dur:1e3,circles:9,fn:function(r,n,e){var t=r*n/e-r+"ms",a=2*Math.PI*n/e;return{r:5,style:{top:9*Math.sin(a)+"px",left:9*Math.cos(a)+"px","animation-delay":t}}}},circles:{dur:1e3,circles:8,fn:function(r,n,e){var t=n/e,a=r*t-r+"ms",s=2*Math.PI*t;return{r:5,style:{top:9*Math.sin(s)+"px",left:9*Math.cos(s)+"px","animation-delay":a}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:function(){return{r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}}}},crescent:{dur:750,circles:1,fn:function(){return{r:26,style:{}}}},dots:{dur:750,circles:3,fn:function(r,n){return{r:6,style:{left:9-9*n+"px","animation-delay":-110*n+"ms"}}}},lines:{dur:1e3,lines:12,fn:function(r,n,e){return{y1:17,y2:29,style:{transform:"rotate("+(30*n+(n<6?180:-180))+"deg)","animation-delay":r*n/e-r+"ms"}}}},"lines-small":{dur:1e3,lines:12,fn:function(r,n,e){return{y1:12,y2:20,style:{transform:"rotate("+(30*n+(n<6?180:-180))+"deg)","animation-delay":r*n/e-r+"ms"}}}}}}}]);
//# sourceMappingURL=14.516391c47faf75bfbe4e.bundle.js.map