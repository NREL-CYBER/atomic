(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{1375:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"startTapClick",(function(){return startTapClick}));var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(75),startTapClick=function(e){var r,a,i,o,t=10*-MOUSE_WAIT,n=0,u=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),s=new WeakMap,v=function(e){t=Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.n)(e),A(e)},E=function(){clearTimeout(o),o=void 0,a&&(m(!1),a=void 0)},T=function(e){a||void 0!==r&&null!==r.parentElement||(r=void 0,p(getActivatableTarget(e),e))},A=function(e){p(void 0,e)},p=function(e,t){if(!e||e!==a){clearTimeout(o),o=void 0;var n=Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.o)(t),r=n.x,i=n.y;if(a){if(s.has(a))throw new Error("internal error");a.classList.contains(ACTIVATED)||D(a,r,i),m(!0)}if(e){var u=s.get(e);u&&(clearTimeout(u),s.delete(e));var f=isInstant(e)?0:ADD_ACTIVATED_DEFERS;e.classList.remove(ACTIVATED),o=setTimeout((function(){D(e,r,i),o=void 0}),f)}a=e}},D=function(e,t,r){n=Date.now(),e.classList.add(ACTIVATED);var a=u&&getRippleEffect(e);a&&a.addRipple&&(L(),i=a.addRipple(t,r))},L=function(){void 0!==i&&(i.then((function(e){return e()})),i=void 0)},m=function(e){L();var t=a;if(t){var r=CLEAR_STATE_DEFERS-Date.now()+n;if(e&&r>0&&!isInstant(t)){var i=setTimeout((function(){t.classList.remove(ACTIVATED),s.delete(t)}),CLEAR_STATE_DEFERS);s.set(t,i)}else t.classList.remove(ACTIVATED)}},S=document;S.addEventListener("ionScrollStart",(function(e){r=e.target,E()})),S.addEventListener("ionScrollEnd",(function(){r=void 0})),S.addEventListener("ionGestureCaptured",E),S.addEventListener("touchstart",(function(e){t=Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.n)(e),T(e)}),!0),S.addEventListener("touchcancel",v,!0),S.addEventListener("touchend",v,!0),S.addEventListener("mousedown",(function(e){var n=Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.n)(e)-MOUSE_WAIT;t<n&&T(e)}),!0),S.addEventListener("mouseup",(function(e){var n=Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.n)(e)-MOUSE_WAIT;t<n&&A(e)}),!0)},getActivatableTarget=function(e){if(!e.composedPath)return e.target.closest(".ion-activatable");for(var t=e.composedPath(),n=0;n<t.length-2;n++){var r=t[n];if(r.classList&&r.classList.contains("ion-activatable"))return r}},isInstant=function(e){return e.classList.contains("ion-activatable-instant")},getRippleEffect=function(e){if(e.shadowRoot){var t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},ACTIVATED="ion-activated",ADD_ACTIVATED_DEFERS=200,CLEAR_STATE_DEFERS=200,MOUSE_WAIT=2500}}]);
//# sourceMappingURL=56.c1a0830d15ac78d229b1.bundle.js.map