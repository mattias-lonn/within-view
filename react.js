var e=require("react").useLayoutEffect,r=!1;exports.useScrollPosition=function(t,o,n){var s,i=function(){var e=function(){try{return{x:window.scrollX,y:window.scrollY}}catch(e){return console.error("getScrollPosition err:",e.message),{x:0,y:0}}}();t({position:e}),s=null};e(function(){var e=function(){n&&null==s?s=setTimeout(i,n):n||i()};try{window.addEventListener("scroll",e),r=!0}catch(e){console.error("useScrollPosition err:",e.message)}return function(){return r&&window.removeEventListener("scroll",e)}},o)},exports.isElementInSight=function(e){var r=e.y,t=void 0===r?0:r,o=e.key,n=e.id,s=e.ref,i=e.class,c=e.offset,l=void 0===c?0:c,a=e.repeatedly,u=void 0===a||a,d=e.addParentOffset,f=void 0!==d&&d,v=e.add,m=e.testDocument,w=e.cb;if(!e.skipEl&&(n||i||void 0!==s))try{var g=s&&s.current||(m||document).querySelector(n||i);return g?(f&&(l+=g.offsetParent.offsetTop),t>(m?g.dataset.offsettop-g.dataset.innerheight+l:g.offsetTop-window.innerHeight+l)?(g.classList.add(v),w&&w(o),!0):(u&&g.classList.remove(v),!1)):console.error("isElementInSight err: "+(void 0!==s?"Element using ref":"Element '"+(n||i)+"'")+" was not found.")}catch(e){return console.error("isElementInSight err:",e.message),!1}};
//# sourceMappingURL=react.js.map