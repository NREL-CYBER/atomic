(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{1291:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ion_reorder",(function(){return Reorder})),__webpack_require__.d(__webpack_exports__,"ion_reorder_group",(function(){return ReorderGroup}));var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4),_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(54),_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(56),_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1318),Reorder=function(){function e(e){Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.o)(this,e)}return e.prototype.onClick=function(e){var t=this.el.closest("ion-reorder-group");e.preventDefault(),t&&t.disabled||e.stopImmediatePropagation()},e.prototype.render=function(){var e=Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_2__.b)(this),t="ios"===e?"reorder-three-outline":"reorder-two-sharp";return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.j)(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.c,{class:e},Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.j)("slot",null,Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.j)("ion-icon",{name:t,lazy:!1,class:"reorder-icon",part:"icon"})))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.k)(this)},enumerable:!1,configurable:!0}),e}();Reorder.style={ios:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:34px;opacity:0.4}",md:":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px}.reorder-icon{font-size:31px;opacity:0.3}"};var ReorderGroup=function(){function e(e){Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.o)(this,e),this.ionItemReorder=Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.g)(this,"ionItemReorder",7),this.lastToIndex=-1,this.cachedHeights=[],this.scrollElTop=0,this.scrollElBottom=0,this.scrollElInitial=0,this.containerTop=0,this.containerBottom=0,this.state=0,this.disabled=!0}return e.prototype.disabledChanged=function(){this.gesture&&this.gesture.enable(!this.disabled)},e.prototype.connectedCallback=function(){return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.a)(this,void 0,void 0,(function(){var e,t,r,o=this;return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(this,(function(i){switch(i.label){case 0:return(e=this.el.closest("ion-content"))?(t=this,[4,e.getScrollElement()]):[3,2];case 1:t.scrollEl=i.sent(),i.label=2;case 2:return r=this,[4,Promise.resolve().then(__webpack_require__.bind(null,374))];case 3:return r.gesture=i.sent().createGesture({el:this.el,gestureName:"reorder",gesturePriority:110,threshold:0,direction:"y",passive:!1,canStart:function(e){return o.canStart(e)},onStart:function(e){return o.onStart(e)},onMove:function(e){return o.onMove(e)},onEnd:function(){return o.onEnd()}}),this.disabledChanged(),[2]}}))}))},e.prototype.disconnectedCallback=function(){this.onEnd(),this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},e.prototype.complete=function(e){return Promise.resolve(this.completeSync(e))},e.prototype.canStart=function(e){if(this.selectedItemEl||0!==this.state)return!1;var r=e.event.target.closest("ion-reorder");if(!r)return!1;var o=findReorderItem(r,this.el);return!!o&&(e.data=o,!0)},e.prototype.onStart=function(e){e.event.preventDefault();var t=this.selectedItemEl=e.data,r=this.cachedHeights;r.length=0;var o=this.el,i=o.children;if(i&&0!==i.length){for(var n=0,s=0;s<i.length;s++){var a=i[s];n+=a.offsetHeight,r.push(n),a.$ionIndex=s}var l=o.getBoundingClientRect();if(this.containerTop=l.top,this.containerBottom=l.bottom,this.scrollEl){var c=this.scrollEl.getBoundingClientRect();this.scrollElInitial=this.scrollEl.scrollTop,this.scrollElTop=c.top+AUTO_SCROLL_MARGIN,this.scrollElBottom=c.bottom-AUTO_SCROLL_MARGIN}else this.scrollElInitial=0,this.scrollElTop=0,this.scrollElBottom=0;this.lastToIndex=indexForItem(t),this.selectedItemHeight=t.offsetHeight,this.state=1,t.classList.add(ITEM_REORDER_SELECTED),Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__.a)()}},e.prototype.onMove=function(e){var t=this.selectedItemEl;if(t){var r=this.autoscroll(e.currentY),o=this.containerTop-r,i=this.containerBottom-r,n=Math.max(o,Math.min(e.currentY,i)),s=r+n-e.startY,a=n-o,l=this.itemIndexForTop(a);if(l!==this.lastToIndex){var c=indexForItem(t);this.lastToIndex=l,Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__.b)(),this.reorderMove(c,l)}t.style.transform="translateY("+s+"px)"}},e.prototype.onEnd=function(){var e=this.selectedItemEl;if(this.state=2,e){var t=this.lastToIndex,r=indexForItem(e);t===r?this.completeSync():this.ionItemReorder.emit({from:r,to:t,complete:this.completeSync.bind(this)}),Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_3__.e)()}else this.state=0},e.prototype.completeSync=function(e){var t=this.selectedItemEl;if(t&&2===this.state){var r=this.el.children,o=r.length,i=this.lastToIndex,n=indexForItem(t);if(i!==n&&(void 0===e||!0===e)){var s=n<i?r[i+1]:r[i];this.el.insertBefore(t,s)}Array.isArray(e)&&(e=reorderArray(e,n,i));for(var a=0;a<o;a++)r[a].style.transform="";t.style.transition="",t.classList.remove(ITEM_REORDER_SELECTED),this.selectedItemEl=void 0,this.state=0}return e},e.prototype.itemIndexForTop=function(e){var t=this.cachedHeights,r=0;for(r=0;r<t.length&&!(t[r]>e);r++);return r},e.prototype.reorderMove=function(e,t){for(var r=this.selectedItemHeight,o=this.el.children,i=0;i<o.length;i++){var s="";i>e&&i<=t?s="translateY("+-r+"px)":i<e&&i>=t&&(s="translateY("+r+"px)"),o[i].style.transform=s}},e.prototype.autoscroll=function(e){if(!this.scrollEl)return 0;var t=0;return e<this.scrollElTop?t=-SCROLL_JUMP:e>this.scrollElBottom&&(t=SCROLL_JUMP),0!==t&&this.scrollEl.scrollBy(0,t),this.scrollEl.scrollTop-this.scrollElInitial},e.prototype.render=function(){var e,t=Object(_ionic_global_9d5c8ee3_js__WEBPACK_IMPORTED_MODULE_2__.b)(this);return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.j)(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.c,{class:(e={},e[t]=!0,e["reorder-enabled"]=!this.disabled,e["reorder-list-active"]=0!==this.state,e)})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_1__.k)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:!1,configurable:!0}),e}(),indexForItem=function(e){return e.$ionIndex},findReorderItem=function(e,t){for(var r;e;){if((r=e.parentElement)===t)return e;e=r}},AUTO_SCROLL_MARGIN=60,SCROLL_JUMP=10,ITEM_REORDER_SELECTED="reorder-selected",reorderArray=function(e,t,r){var o=e[t];return e.splice(t,1),e.splice(r,0,o),e.slice()};ReorderGroup.style=".reorder-list-active>*{-webkit-transition:-webkit-transform 300ms;transition:-webkit-transform 300ms;transition:transform 300ms;transition:transform 300ms, -webkit-transform 300ms;will-change:transform}.reorder-enabled{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.reorder-enabled ion-reorder{display:block;cursor:-webkit-grab;cursor:grab;pointer-events:all;-ms-touch-action:none;touch-action:none}.reorder-selected,.reorder-selected ion-reorder{cursor:-webkit-grabbing;cursor:grabbing}.reorder-selected{position:relative;-webkit-transition:none !important;transition:none !important;-webkit-box-shadow:0 0 10px rgba(0, 0, 0, 0.4);box-shadow:0 0 10px rgba(0, 0, 0, 0.4);opacity:0.8;z-index:100}.reorder-visible ion-reorder .reorder-icon{-webkit-transform:translate3d(0,  0,  0);transform:translate3d(0,  0,  0)}"},1318:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return hapticSelectionStart})),__webpack_require__.d(__webpack_exports__,"b",(function(){return hapticSelectionChanged})),__webpack_require__.d(__webpack_exports__,"c",(function(){return hapticSelection})),__webpack_require__.d(__webpack_exports__,"d",(function(){return hapticImpact})),__webpack_require__.d(__webpack_exports__,"e",(function(){return hapticSelectionEnd}));var HapticEngine={getEngine:function(){var t=window;return t.TapticEngine||t.Capacitor&&t.Capacitor.isPluginAvailable("Haptics")&&t.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){return!!window.Capacitor},impact:function(t){var i=this.getEngine();if(i){var n=this.isCapacitor()?t.style.toUpperCase():t.style;i.impact({style:n})}},notification:function(t){var i=this.getEngine();if(i){var n=this.isCapacitor()?t.style.toUpperCase():t.style;i.notification({style:n})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionStart():t.gestureSelectionStart())},selectionChanged:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionChanged():t.gestureSelectionChanged())},selectionEnd:function(){var t=this.getEngine();t&&(this.isCapacitor()?t.selectionEnd():t.gestureSelectionEnd())}},hapticSelection=function(){HapticEngine.selection()},hapticSelectionStart=function(){HapticEngine.selectionStart()},hapticSelectionChanged=function(){HapticEngine.selectionChanged()},hapticSelectionEnd=function(){HapticEngine.selectionEnd()},hapticImpact=function(t){HapticEngine.impact(t)}}}]);
//# sourceMappingURL=17.2326a373f9e39f1fe7da.bundle.js.map