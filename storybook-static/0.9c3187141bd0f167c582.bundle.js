(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1375:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"createSwipeBackGesture",(function(){return createSwipeBackGesture}));var _helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(75),_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(187),__webpack_require__(408)),createSwipeBackGesture=function(r,e,t,a,n){var o=r.ownerDocument.defaultView;return Object(_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_2__.createGesture)({el:r,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(r){return r.startX<=50&&e()},onStart:t,onMove:function(r){var t=r.deltaX/o.innerWidth;a(t)},onEnd:function(r){var e=r.deltaX,t=o.innerWidth,a=e/t,i=r.velocityX,v=t/2,c=i>=0&&(i>.2||r.deltaX>v),u=(c?1-a:a)*t,l=0;if(u>5){var d=u/Math.abs(i);l=Math.min(d,540)}n(c,a<=0?.01:Object(_helpers_90f46169_js__WEBPACK_IMPORTED_MODULE_0__.h)(0,a,.9999),l)}})}}}]);
//# sourceMappingURL=0.9c3187141bd0f167c582.bundle.js.map