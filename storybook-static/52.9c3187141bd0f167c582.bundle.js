(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{1379:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"KEYBOARD_DID_CLOSE",(function(){return KEYBOARD_DID_CLOSE})),__webpack_require__.d(__webpack_exports__,"KEYBOARD_DID_OPEN",(function(){return KEYBOARD_DID_OPEN})),__webpack_require__.d(__webpack_exports__,"copyVisualViewport",(function(){return copyVisualViewport})),__webpack_require__.d(__webpack_exports__,"keyboardDidClose",(function(){return keyboardDidClose})),__webpack_require__.d(__webpack_exports__,"keyboardDidOpen",(function(){return keyboardDidOpen})),__webpack_require__.d(__webpack_exports__,"keyboardDidResize",(function(){return keyboardDidResize})),__webpack_require__.d(__webpack_exports__,"resetKeyboardAssist",(function(){return resetKeyboardAssist})),__webpack_require__.d(__webpack_exports__,"setKeyboardClose",(function(){return setKeyboardClose})),__webpack_require__.d(__webpack_exports__,"setKeyboardOpen",(function(){return setKeyboardOpen})),__webpack_require__.d(__webpack_exports__,"startKeyboardAssist",(function(){return startKeyboardAssist})),__webpack_require__.d(__webpack_exports__,"trackViewportChanges",(function(){return trackViewportChanges}));var KEYBOARD_DID_OPEN="ionKeyboardDidShow",KEYBOARD_DID_CLOSE="ionKeyboardDidHide",previousVisualViewport={},currentVisualViewport={},keyboardOpen=!1,resetKeyboardAssist=function(){previousVisualViewport={},currentVisualViewport={},keyboardOpen=!1},startKeyboardAssist=function(e){startNativeListeners(e),e.visualViewport&&(currentVisualViewport=copyVisualViewport(e.visualViewport),e.visualViewport.onresize=function(){trackViewportChanges(e),keyboardDidOpen()||keyboardDidResize(e)?setKeyboardOpen(e):keyboardDidClose(e)&&setKeyboardClose(e)})},startNativeListeners=function(e){e.addEventListener("keyboardDidShow",(function(r){return setKeyboardOpen(e,r)})),e.addEventListener("keyboardDidHide",(function(){return setKeyboardClose(e)}))},setKeyboardOpen=function(e,r){fireKeyboardOpenEvent(e,r),keyboardOpen=!0},setKeyboardClose=function(e){fireKeyboardCloseEvent(e),keyboardOpen=!1},keyboardDidOpen=function(){var e=(previousVisualViewport.height-currentVisualViewport.height)*currentVisualViewport.scale;return!keyboardOpen&&previousVisualViewport.width===currentVisualViewport.width&&e>150},keyboardDidResize=function(e){return keyboardOpen&&!keyboardDidClose(e)},keyboardDidClose=function(e){return keyboardOpen&&currentVisualViewport.height===e.innerHeight},fireKeyboardOpenEvent=function(e,r){var t=r?r.keyboardHeight:e.innerHeight-currentVisualViewport.height,i=new CustomEvent(KEYBOARD_DID_OPEN,{detail:{keyboardHeight:t}});e.dispatchEvent(i)},fireKeyboardCloseEvent=function(e){var r=new CustomEvent(KEYBOARD_DID_CLOSE);e.dispatchEvent(r)},trackViewportChanges=function(e){previousVisualViewport=Object.assign({},currentVisualViewport),currentVisualViewport=copyVisualViewport(e.visualViewport)},copyVisualViewport=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=52.9c3187141bd0f167c582.bundle.js.map