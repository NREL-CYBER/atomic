(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1070:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ion_toast",(function(){return Toast}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(51),_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(52),_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(134),_index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(375),_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1079),_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(22),iosEnterAnimation=(__webpack_require__(188),__webpack_require__(42),function(t,e){var r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),a=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),o=t.host||t,i=t.querySelector(".toast-wrapper");switch(a.addElement(i),e){case"top":a.fromTo("transform","translateY(-100%)","translateY(calc(10px + var(--ion-safe-area-top, 0px)))");break;case"middle":var d=Math.floor(o.clientHeight/2-i.clientHeight/2);i.style.top=d+"px",a.fromTo("opacity",.01,1);break;default:a.fromTo("transform","translateY(100%)","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))")}return r.addElement(o).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).addAnimation(a)}),iosLeaveAnimation=function(t,e){var r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),a=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),o=t.host||t,i=t.querySelector(".toast-wrapper");switch(a.addElement(i),e){case"top":a.fromTo("transform","translateY(calc(10px + var(--ion-safe-area-top, 0px)))","translateY(-100%)");break;case"middle":a.fromTo("opacity",.99,0);break;default:a.fromTo("transform","translateY(calc(-10px - var(--ion-safe-area-bottom, 0px)))","translateY(100%)")}return r.addElement(o).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(a)},mdEnterAnimation=function(t,e){var r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),a=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),o=t.host||t,i=t.querySelector(".toast-wrapper");switch(a.addElement(i),e){case"top":i.style.top="calc(8px + var(--ion-safe-area-top, 0px))",a.fromTo("opacity",.01,1);break;case"middle":var d=Math.floor(o.clientHeight/2-i.clientHeight/2);i.style.top=d+"px",a.fromTo("opacity",.01,1);break;default:i.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",a.fromTo("opacity",.01,1)}return r.addElement(o).easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation(a)},mdLeaveAnimation=function(t){var e=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_6__.a)(),a=t.host||t,o=t.querySelector(".toast-wrapper");return r.addElement(o).fromTo("opacity",.99,0),e.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(r)},Toast=function(){function t(t){var e=this;Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.o)(this,t),this.didPresent=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionToastDidPresent",7),this.willPresent=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionToastWillPresent",7),this.willDismiss=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionToastWillDismiss",7),this.didDismiss=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionToastDidDismiss",7),this.presented=!1,this.duration=0,this.keyboardClose=!1,this.position="bottom",this.translucent=!1,this.animated=!0,this.dispatchCancelHandler=function(t){var r=t.detail.role;if(Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.j)(r)){var a=e.getButtons().find((function(t){return"cancel"===t.role}));e.callButtonHandler(a)}}}return t.prototype.connectedCallback=function(){Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.f)(this.el)},t.prototype.present=function(){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var t=this;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(e){switch(e.label){case 0:return[4,Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.e)(this,"toastEnter",iosEnterAnimation,mdEnterAnimation,this.position)];case 1:return e.sent(),this.duration>0&&(this.durationTimeout=setTimeout((function(){return t.dismiss(void 0,"timeout")}),this.duration)),[2]}}))}))},t.prototype.dismiss=function(t,e){return this.durationTimeout&&clearTimeout(this.durationTimeout),Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.g)(this,t,e,"toastLeave",iosLeaveAnimation,mdLeaveAnimation,this.position)},t.prototype.onDidDismiss=function(){return Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.h)(this.el,"ionToastDidDismiss")},t.prototype.onWillDismiss=function(){return Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.h)(this.el,"ionToastWillDismiss")},t.prototype.getButtons=function(){return this.buttons?this.buttons.map((function(t){return"string"==typeof t?{text:t}:t})):[]},t.prototype.buttonClick=function(t){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var e;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(a){switch(a.label){case 0:return e=t.role,Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.j)(e)?[2,this.dismiss(void 0,e)]:[4,this.callButtonHandler(t)];case 1:return a.sent()?[2,this.dismiss(void 0,e)]:[2,Promise.resolve()]}}))}))},t.prototype.callButtonHandler=function(t){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var r;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(a){switch(a.label){case 0:if(!t||!t.handler)return[3,4];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_3__.n)(t.handler)];case 2:return!1===a.sent()?[2,!1]:[3,4];case 3:return r=a.sent(),console.error(r),[3,4];case 4:return[2,!0]}}))}))},t.prototype.renderButtons=function(t,e){var r,a=this;if(0!==t.length){var o=Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__.b)(this),i=((r={"toast-button-group":!0})["toast-button-group-"+e]=!0,r);return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:i},t.map((function(t){return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("button",{type:"button",class:buttonClass(t),tabIndex:0,onClick:function(){return a.buttonClick(t)},part:"button"},Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"toast-button-inner"},t.icon&&Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("ion-icon",{icon:t.icon,slot:void 0===t.text?"icon-only":void 0,class:"toast-icon"}),t.text),"md"===o&&Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("ion-ripple-effect",{type:void 0!==t.icon&&void 0===t.text?"unbounded":"bounded"}))})))}},t.prototype.render=function(){var t,e,r=this.getButtons(),a=r.filter((function(t){return"start"===t.side})),o=r.filter((function(t){return"start"!==t.side})),i=Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__.b)(this),n=((t={"toast-wrapper":!0})["toast-"+this.position]=!0,t);return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.c,{style:{zIndex:""+(6e4+this.overlayIndex)},class:Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__.a)(this.color,Object.assign(Object.assign((e={},e[i]=!0,e),Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__.b)(this.cssClass)),{"toast-translucent":this.translucent})),tabindex:"-1",onIonToastWillDismiss:this.dispatchCancelHandler},Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:n},Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"toast-container",part:"container"},this.renderButtons(a,"start"),Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"toast-content"},void 0!==this.header&&Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"toast-header",part:"header"},this.header),void 0!==this.message&&Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"toast-message",part:"message",innerHTML:Object(_index_9e3fe806_js__WEBPACK_IMPORTED_MODULE_4__.a)(this.message)})),this.renderButtons(o,"end"))))},Object.defineProperty(t.prototype,"el",{get:function(){return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.k)(this)},enumerable:!1,configurable:!0}),t}(),buttonClass=function(t){var e;return Object.assign(((e={"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text})["toast-button-"+t.role]=void 0!==t.role,e["ion-focusable"]=!0,e["ion-activatable"]=!0,e),Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__.b)(t.cssClass))};Toast.style={ios:":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:pre-wrap;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}[dir=rtl] .toast-wrapper,:host-context([dir=rtl]) .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50, #f2f2f2);--border-radius:14px;--button-color:var(--ion-color-primary, #3880ff);--color:var(--ion-color-step-850, #262626);--max-width:700px;--start:10px;--end:10px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-middle{opacity:0.01}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-content{padding-left:15px;padding-right:15px;padding-top:15px;padding-bottom:15px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;height:44px;-webkit-transition:background-color, opacity 100ms linear;transition:background-color, opacity 100ms linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:17px;font-weight:500;overflow:hidden}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button.ion-activated{opacity:0.4}@media (any-hover: hover){.toast-button:hover{opacity:0.6}}",md:":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:pre-wrap;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);left:var(--start);right:var(--end);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}[dir=rtl] .toast-wrapper,:host-context([dir=rtl]) .toast-wrapper{left:unset;right:unset;left:var(--end);right:var(--start)}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-800, #333333);--border-radius:4px;--box-shadow:0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);--button-color:var(--ion-color-primary, #3880ff);--color:var(--ion-color-step-50, #f2f2f2);--max-width:700px;--start:8px;--end:8px;font-size:14px}.toast-wrapper{margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;opacity:0.01;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-wrapper{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.toast-content{padding-left:16px;padding-right:16px;padding-top:14px;padding-bottom:14px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-content{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.toast-header{margin-bottom:2px;font-weight:500;line-height:20px}.toast-message{line-height:20px}.toast-button-group-start{margin-left:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-group-start{margin-left:unset;-webkit-margin-start:8px;margin-inline-start:8px}}.toast-button-group-end{margin-right:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-group-end{margin-right:unset;-webkit-margin-end:8px;margin-inline-end:8px}}.toast-button{padding-left:15px;padding-right:15px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;font-family:var(--ion-font-family);font-size:14px;font-weight:500;letter-spacing:0.84px;text-transform:uppercase;overflow:hidden}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button{padding-left:unset;padding-right:unset;-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px}}.toast-button-cancel{color:var(--ion-color-step-100, #e6e6e6)}.toast-button-icon-only{border-radius:50%;padding-left:9px;padding-right:9px;padding-top:9px;padding-bottom:9px;width:36px;height:36px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toast-button-icon-only{padding-left:unset;padding-right:unset;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px}}@media (any-hover: hover){.toast-button:hover{background-color:rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.08)}.toast-button-cancel:hover{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.08)}}"}},1079:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return createColorClasses})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getClassMap})),__webpack_require__.d(__webpack_exports__,"c",(function(){return hostContext})),__webpack_require__.d(__webpack_exports__,"d",(function(){return openURL}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),hostContext=function(r,t){return null!==t.closest(r)},createColorClasses=function(r,t){var e;return"string"==typeof r&&r.length>0?Object.assign(((e={"ion-color":!0})["ion-color-"+r]=!0,e),t):t},getClassMap=function(r){var t={};return function(r){return void 0!==r?(Array.isArray(r)?r:r.split(" ")).filter((function(r){return null!=r})).map((function(r){return r.trim()})).filter((function(r){return""!==r})):[]}(r).forEach((function(r){return t[r]=!0})),t},SCHEME=/^[a-z][a-z0-9+\-.]*:/,openURL=function(r,t,e,n){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(void 0,void 0,void 0,(function(){var o;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(a){return null!=r&&"#"!==r[0]&&!SCHEME.test(r)&&(o=document.querySelector("ion-router"))?(null!=t&&t.preventDefault(),[2,o.push(r,e,n)]):[2,!1]}))}))}}}]);