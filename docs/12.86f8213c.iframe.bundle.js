(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1050:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ion_modal",(function(){return Modal}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(51),_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(52),_framework_delegate_4392cd63_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1082),_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(134),_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1079),_index_c3ff7f2e_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(95),_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(22),_cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(374),_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(373),_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(42),SwipeToCloseDefaults_MIN_PRESENTING_SCALE=(__webpack_require__(188),__webpack_require__(189),.93),computeDuration=function(e,a){return Object(_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_10__.j)(400,e/Math.abs(1.1*a),500)},iosEnterAnimation=function(e,a){var o=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1}).fromTo("transform","translateY(100vh)","translateY(0vh)"),r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(t);if(a){var i=window.innerWidth<768,n="ION-MODAL"===a.tagName&&void 0!==a.presentingElement,s=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),d=document.body;if(i){var l=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",p="translateY("+(n?"-10px":l)+") scale("+SwipeToCloseDefaults_MIN_PRESENTING_SCALE+")";s.afterStyles({transform:p}).beforeAddWrite((function(){return d.style.setProperty("background-color","black")})).addElement(a).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:p,borderRadius:"10px 10px 0 0"}]),r.addAnimation(s)}else if(r.addAnimation(o),n){p="translateY(-10px) scale("+(n?SwipeToCloseDefaults_MIN_PRESENTING_SCALE:1)+")";s.afterStyles({transform:p}).addElement(a.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:p}]);var h=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().afterStyles({transform:p}).addElement(a.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:p}]);r.addAnimation([s,h])}else t.fromTo("opacity","0","1")}else r.addAnimation(o);return r},iosLeaveAnimation=function(e,a,o){void 0===o&&(o=500);var t=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),r=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1}).fromTo("transform","translateY(0vh)","translateY(100vh)"),i=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(o).addAnimation(r);if(a){var n=window.innerWidth<768,s="ION-MODAL"===a.tagName&&void 0!==a.presentingElement,d=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish((function(e){1===e&&(a.style.setProperty("overflow",""),Array.from(l.querySelectorAll("ion-modal")).filter((function(e){return void 0!==e.presentingElement})).length<=1&&l.style.setProperty("background-color",""))})),l=document.body;if(n){var m=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",h="translateY("+(s?"-10px":m)+") scale("+SwipeToCloseDefaults_MIN_PRESENTING_SCALE+")";d.addElement(a).keyframes([{offset:0,filter:"contrast(0.85)",transform:h,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),i.addAnimation(d)}else if(i.addAnimation(t),s){h="translateY(-10px) scale("+(s?SwipeToCloseDefaults_MIN_PRESENTING_SCALE:1)+")";d.addElement(a.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:h},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);var f=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)().addElement(a.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:h},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);i.addAnimation([d,f])}else r.fromTo("opacity","1","0")}else i.addAnimation(t);return i},mdEnterAnimation=function(e){var a=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)(),o=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)(),t=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)();return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t.addElement(e.querySelector(".modal-wrapper")).keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}]),a.addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([o,t])},mdLeaveAnimation=function(e){var a=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)(),o=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)(),t=Object(_animation_096c6391_js__WEBPACK_IMPORTED_MODULE_7__.a)(),r=e.querySelector(".modal-wrapper");return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity","var(--backdrop-opacity)",0),t.addElement(r).keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}]),a.addElement(e).easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([o,t])},Modal=function(){function e(e){var a=this;Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.o)(this,e),this.didPresent=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionModalDidPresent",7),this.willPresent=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionModalWillPresent",7),this.willDismiss=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionModalWillDismiss",7),this.didDismiss=Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionModalDidDismiss",7),this.gestureAnimationDismissing=!1,this.presented=!1,this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.swipeToClose=!1,this.onBackdropTap=function(){a.dismiss(void 0,_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.a)},this.onDismiss=function(e){e.stopPropagation(),e.preventDefault(),a.dismiss()},this.onLifecycle=function(e){var o=a.usersElement,t=LIFECYCLE_MAP[e.type];if(o&&t){var r=new CustomEvent(t,{bubbles:!1,cancelable:!1,detail:e.detail});o.dispatchEvent(r)}}}return e.prototype.swipeToCloseChanged=function(e){this.gesture?this.gesture.enable(e):e&&this.initSwipeToClose()},e.prototype.connectedCallback=function(){Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.f)(this.el)},e.prototype.present=function(){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var e,a,o,t=this;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(r){switch(r.label){case 0:if(this.presented)return[2];if(!(e=this.el.querySelector(".modal-wrapper")))throw new Error("container is undefined");return a=Object.assign(Object.assign({},this.componentProps),{modal:this.el}),o=this,[4,Object(_framework_delegate_4392cd63_js__WEBPACK_IMPORTED_MODULE_3__.a)(this.delegate,e,this.component,["ion-page"],a)];case 1:return o.usersElement=r.sent(),[4,Object(_index_c3ff7f2e_js__WEBPACK_IMPORTED_MODULE_6__.d)(this.usersElement)];case 2:return r.sent(),Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.f)((function(){return t.el.classList.add("show-modal")})),[4,Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.e)(this,"modalEnter",iosEnterAnimation,mdEnterAnimation,this.presentingElement)];case 3:return r.sent(),this.swipeToClose&&this.initSwipeToClose(),[2]}}))}))},e.prototype.initSwipeToClose=function(){var e=this;if("ios"===Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__.b)(this)){var a=this.leaveAnimation||_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__.c.get("modalLeave",iosLeaveAnimation),o=this.animation=a(this.el,this.presentingElement);this.gesture=function(e,a,o){var t=e.offsetHeight,r=!1,l=Object(_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_9__.createGesture)({el:e,gestureName:"modalSwipeToClose",gesturePriority:40,direction:"y",threshold:10,canStart:function(e){var a=e.event.target;return null===a||!a.closest||null===a.closest("ion-content")},onStart:function(){a.progressStart(!0,r?1:0)},onMove:function(e){var o=Object(_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_10__.j)(1e-4,e.deltaY/t,.9999);a.progressStep(o)},onEnd:function(e){var i=e.velocityY,n=Object(_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_10__.j)(1e-4,e.deltaY/t,.9999),d=(e.deltaY+1e3*i)/t>=.5,m=d?-.001:.001;d?(a.easing("cubic-bezier(0.32, 0.72, 0, 1)"),m+=Object(_cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_8__.a)([0,0],[.32,.72],[0,1],[1,1],n)[0]):(a.easing("cubic-bezier(1, 0, 0.68, 0.28)"),m+=Object(_cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_8__.a)([0,0],[1,0],[.68,.28],[1,1],n)[0]);var c=computeDuration(d?n*t:(1-n)*t,i);r=d,l.enable(!1),a.onFinish((function(){d||l.enable(!0)})).progressEnd(d?1:0,m,c),d&&o()}});return l}(this.el,o,(function(){e.gestureAnimationDismissing=!0,e.animation.onFinish((function(){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(e,void 0,void 0,(function(){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(e){switch(e.label){case 0:return[4,this.dismiss(void 0,"gesture")];case 1:return e.sent(),this.gestureAnimationDismissing=!1,[2]}}))}))}))})),this.gesture.enable(!0)}},e.prototype.dismiss=function(e,a){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var o,t;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(r){switch(r.label){case 0:return this.gestureAnimationDismissing&&"gesture"!==a?[2,!1]:(o=_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.i.get(this)||[],[4,Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.g)(this,e,a,"modalLeave",iosLeaveAnimation,mdLeaveAnimation,this.presentingElement)]);case 1:return(t=r.sent())?[4,Object(_framework_delegate_4392cd63_js__WEBPACK_IMPORTED_MODULE_3__.b)(this.delegate,this.usersElement)]:[3,3];case 2:r.sent(),this.animation&&this.animation.destroy(),o.forEach((function(e){return e.destroy()})),r.label=3;case 3:return this.animation=void 0,[2,t]}}))}))},e.prototype.onDidDismiss=function(){return Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.h)(this.el,"ionModalDidDismiss")},e.prototype.onWillDismiss=function(){return Object(_overlays_28c23c35_js__WEBPACK_IMPORTED_MODULE_4__.h)(this.el,"ionModalWillDismiss")},e.prototype.render=function(){var e,a=Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_2__.b)(this);return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.c,{"no-router":!0,"aria-modal":"true",tabindex:"-1",class:Object.assign((e={},e[a]=!0,e["modal-card"]=void 0!==this.presentingElement&&"ios"===a,e),Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_5__.b)(this.cssClass)),style:{zIndex:""+(2e4+this.overlayIndex)},onIonBackdropTap:this.onBackdropTap,onIonDismiss:this.onDismiss,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle},Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("ion-backdrop",{visible:this.showBackdrop,tappable:this.backdropDismiss}),"ios"===a&&Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{class:"modal-shadow"}),Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{tabindex:"0"}),Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{role:"dialog",class:"modal-wrapper ion-overlay-wrapper"}),Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.j)("div",{tabindex:"0"}))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_1__.k)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{swipeToClose:["swipeToCloseChanged"]}},enumerable:!1,configurable:!0}),e}(),LIFECYCLE_MAP={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};Modal.style={ios:".sc-ion-modal-ios-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict}.overlay-hidden.sc-ion-modal-ios-h{display:none}.modal-wrapper.sc-ion-modal-ios,.modal-shadow.sc-ion-modal-ios{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow.sc-ion-modal-ios{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){.sc-ion-modal-ios-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){.sc-ion-modal-ios-h{--width:600px;--height:600px}}.sc-ion-modal-ios-h:first-of-type{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}@media only screen and (min-width: 768px) and (min-height: 600px){.sc-ion-modal-ios-h{--border-radius:10px}}.modal-wrapper.sc-ion-modal-ios{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){.modal-card.sc-ion-modal-ios-h{--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){.modal-card.sc-ion-modal-ios-h{--height:calc(100% - 40px)}}.modal-card.sc-ion-modal-ios-h .modal-wrapper.sc-ion-modal-ios{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}[dir=rtl].sc-ion-modal-ios-h -no-combinator.modal-card.sc-ion-modal-ios-h .modal-wrapper.sc-ion-modal-ios,[dir=rtl] .sc-ion-modal-ios-h -no-combinator.modal-card.sc-ion-modal-ios-h .modal-wrapper.sc-ion-modal-ios,[dir=rtl].modal-card.sc-ion-modal-ios-h .modal-wrapper.sc-ion-modal-ios,[dir=rtl] .modal-card.sc-ion-modal-ios-h .modal-wrapper.sc-ion-modal-ios{border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-right-radius:0;border-bottom-left-radius:0}.modal-card.sc-ion-modal-ios-h{--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}.modal-card.sc-ion-modal-ios-h .modal-shadow.sc-ion-modal-ios{display:none}.modal-card.sc-ion-modal-ios-h ion-backdrop.sc-ion-modal-ios{pointer-events:none}}@media screen and (min-width: 768px){.modal-card.sc-ion-modal-ios-h{--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px}.modal-card.sc-ion-modal-ios-h{--backdrop-opacity:0;-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}.modal-card.sc-ion-modal-ios-h:first-of-type{--backdrop-opacity:0.18}.modal-card.sc-ion-modal-ios-h .modal-shadow.sc-ion-modal-ios{-webkit-box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1)}}",md:".sc-ion-modal-md-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;contain:strict}.overlay-hidden.sc-ion-modal-md-h{display:none}.modal-wrapper.sc-ion-modal-md,.modal-shadow.sc-ion-modal-md{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow.sc-ion-modal-md{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){.sc-ion-modal-md-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){.sc-ion-modal-md-h{--width:600px;--height:600px}}.sc-ion-modal-md-h:first-of-type{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){.sc-ion-modal-md-h{--border-radius:2px}.sc-ion-modal-md-h:first-of-type{--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper.sc-ion-modal-md{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}"}},1079:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return createColorClasses})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getClassMap})),__webpack_require__.d(__webpack_exports__,"c",(function(){return hostContext})),__webpack_require__.d(__webpack_exports__,"d",(function(){return openURL}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),hostContext=function(r,t){return null!==t.closest(r)},createColorClasses=function(r,t){var e;return"string"==typeof r&&r.length>0?Object.assign(((e={"ion-color":!0})["ion-color-"+r]=!0,e),t):t},getClassMap=function(r){var t={};return function(r){return void 0!==r?(Array.isArray(r)?r:r.split(" ")).filter((function(r){return null!=r})).map((function(r){return r.trim()})).filter((function(r){return""!==r})):[]}(r).forEach((function(r){return t[r]=!0})),t},SCHEME=/^[a-z][a-z0-9+\-.]*:/,openURL=function(r,t,e,n){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(void 0,void 0,void 0,(function(){var o;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(a){return null!=r&&"#"!==r[0]&&!SCHEME.test(r)&&(o=document.querySelector("ion-router"))?(null!=t&&t.preventDefault(),[2,o.push(r,e,n)]):[2,!1]}))}))}},1082:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return attachComponent})),__webpack_require__.d(__webpack_exports__,"b",(function(){return detachComponent}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(8),_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(42),attachComponent=function(e,t,n,r,o){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(void 0,void 0,void 0,(function(){var a;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(i){switch(i.label){case 0:if(e)return[2,e.attachViewToDom(t,n,o,r)];if("string"!=typeof n&&!(n instanceof HTMLElement))throw new Error("framework delegate is missing");return a="string"==typeof n?t.ownerDocument&&t.ownerDocument.createElement(n):n,r&&r.forEach((function(e){return a.classList.add(e)})),o&&Object.assign(a,o),t.appendChild(a),[4,new Promise((function(e){return Object(_helpers_dd7e4b7b_js__WEBPACK_IMPORTED_MODULE_1__.c)(a,e)}))];case 1:return i.sent(),[2,a]}}))}))},detachComponent=function(e,t){if(t){if(e){var n=t.parentElement;return e.removeViewFromDom(n,t)}t.remove()}return Promise.resolve()}}}]);