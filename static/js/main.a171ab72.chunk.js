(this["webpackJsonpow-team-balancer"]=this["webpackJsonpow-team-balancer"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,n){e.exports=n(33)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(14),c=n.n(l),i=(n(20),n(21),n(22),n(4)),o=n.n(i),u=n(3),s=n(9),m=n.n(s),f=(n(24),n(28),n(6)),h=n.n(f),p=(n(29),function(e){var t=e.children,n=e.direction,a=void 0===n?"row":n,l=e.indent,c=e.width,i=e.height,o=e.justifyContent,u=e.className,s=e.wrap,m=h()("ui-flex","ui-flex--direction_row",u,{"ui-flex--indent_small":"small"===l,"ui-flex--indent_medium":"medium"===l,"ui-flex--indent_large":"large"===l,"ui-flex--wrap_wrap":"wrap"===s});return r.a.createElement("div",{className:m,style:{width:c,height:i,flexDirection:a,justifyContent:o}},t)}),d=(n(30),function(e){var t=e.kind,n=e.width;return r.a.createElement("img",{src:"img/".concat(t,".png"),width:n,alt:t})}),g=function(e){return Math.floor(Math.random()*Math.floor(e))},b=function(e){return Math.round(e.reduce((function(e,t){return e+t.points}),0)/e.length)},v={padding:0},E=function(e){return e<1500?"bronze":e>=4e3?"gm":["silver","gold","platinum","diamond","master"][Math.floor(e/500)-3]},w=r.a.memo((function(e){var t=e.players,n=e.height,l=e.width,c=e.hasPointsColumn,i=e.isRevesed,o=e.isSmall,u=h()("ui-table",{"ui-table--kind_small":o,"ui-table--kind_large":!o,"ui-table--display_reversed":i}),s=Object(a.useMemo)((function(){return{height:n,width:l,overflowY:"auto"}}),[n,l]),m=Object(a.useMemo)((function(){var e=b(t),n=[r.a.createElement("th",null),r.a.createElement(r.a.Fragment,null,r.a.createElement("th",{style:{width:"8em"}},o?e:"battletag"),c&&r.a.createElement("th",null,"Points")),r.a.createElement("th",{style:v},o&&r.a.createElement(d,{kind:E(e),width:30}))];return i?n.reverse():n}),[c,i,o,t]),f=Object(a.useCallback)((function(e){var t=[r.a.createElement("td",{style:v},r.a.createElement(d,{kind:"offense",width:20})),r.a.createElement(r.a.Fragment,null,r.a.createElement("td",null,e.battletag),c&&r.a.createElement("td",null,e.points)),r.a.createElement("td",{style:o?v:{padding:"3px 5px 0 5px"}},r.a.createElement(d,{kind:E(e.points),width:30}))];return i?t.reverse():t}),[c,i,o]);return r.a.createElement("div",{className:u,style:s},r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,m)),r.a.createElement("tbody",{className:"table-body"},t.map((function(e){return r.a.createElement("tr",null,f(e))})))))}));m.a.initializeApp({apiKey:"AIzaSyAZqUUv1gkGq0ZaxZlpT4dB634pZqnhMgg",authDomain:"ow-balancer-api.firebaseapp.com",projectId:"ow-balancer-api"});var y=m.a.firestore().collection("players"),j=function(e){var t=e.playersList,n=Object(a.useState)(t),l=Object(u.a)(n,2),c=l[0],i=l[1],s=Object(a.useState)(""),m=Object(u.a)(s,2);m[0],m[1];Object(a.useEffect)((function(){c.length||function(){var e,t;o.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,o.a.awrap(y.get());case 3:e=n.sent,t=[],e.forEach((function(e){return t.push(e.data())})),i(t),n.next=11;break;case 9:n.prev=9,n.t0=n.catch(0);case 11:case"end":return n.stop()}}),null,null,[[0,9]])}()}),[c]);return r.a.createElement("div",null,!1,r.a.createElement(w,{players:c,width:430,height:"75vh",hasPointsColumn:!0}))},k=(n(31),function(e){var t=e.number,n=e.match;return r.a.createElement(p,{className:"match-card",direction:"column"},r.a.createElement("span",{className:"match-card--header"},"MATCH #",t),r.a.createElement(p,null,r.a.createElement(w,{players:n[0],isSmall:!0}),r.a.createElement(w,{players:n[1],isSmall:!0,isRevesed:!0})))}),x=n(2),O=n(1),M=n.n(O),A=function(e){var t=function(e){var t=M.a.groupBy(e,"role"),n=t.offense,a=t.tank,r=t.support;return n&&a&&r?Array.from({length:Math.min(n.length,a.length,r.length)/2}).map((function(e,t){var l=2*t,c=2*t+1;return[n[l],n[c],a[l],a[c],r[l],r[c]]})):[]}(function(e){return M.a.sortBy(e,"points")}(e));return Array.from({length:t.length/2}).map((function(e,n){return[t[2*n],t[2*n+1]]}))},N=function(e){return A(e).map((function(e,t){var n=b([].concat(Object(x.a)(e[0]),Object(x.a)(e[1]))),a=e.map((function(e){return M.a.groupBy(e,"role")})),r=Object(u.a)(a,2),l=r[0],c=r[1],i=M.a.mapValues(l,(function(e,t){return[].concat(Object(x.a)(e),Object(x.a)(c[t]))})),o=[[],[]];return M.a.forEach(i,(function(e){e.forEach((function(t,a){var r=function(e,t){var n=e.map((function(e){return{player:e,difference:Math.abs(t-e.points)}})),a=Math.min.apply(Math,Object(x.a)(M.a.map(n,"difference")));return n.find((function(e){return e.difference===a})).player}(e,n);o[a%2].push(r),e=e.filter((function(e){return e!==r}))}))})),o}))},_=function(){var e=Array.from({length:500}).map((function(e,t){return{id:t.toString(),role:["offense","tank","support"][g(3)],points:g(5e3),battletag:"Tester#".concat(g(9999))}})),t=N(e);return r.a.createElement(p,{className:"App"},r.a.createElement(j,{playersList:e}),r.a.createElement(p,{className:"abc",height:"75vh",wrap:"wrap"},t.map((function(e,t){return r.a.createElement(k,{match:e,number:t+1})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[15,1,2]]]);
//# sourceMappingURL=main.a171ab72.chunk.js.map