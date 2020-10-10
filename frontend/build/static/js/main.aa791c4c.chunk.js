(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,n){e.exports=n(295)},294:function(e,t,n){},295:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(18),s=n.n(o),l=n(22),u=n(110),c=n(67),i=n(112),d=n.n(i),p=n(17),g=n(113),m=n(44),h=n(8),f=Object(l.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isAuthenticated:!1,authenticationFailed:!1,statusText:"Please log in",username:"",token:""},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_SUCCESS":return{isAuthenticated:!0,authenticationFailed:!1,statusText:"You are logged in",username:t.username,token:t.token};case"LOGIN_FAILURE":return{isAuthenticated:!1,authenticationFailed:!0,statusText:"Error logging in: ".concat(t.error),token:""};case"LOGOUT":return{isAuthenticated:!1,authenticationFailed:!1,statusText:"Please log in",token:""};default:return e}},rounds:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{roundsLoaded:!1,sortKey:"date",reverseSort:!0,selectedRoundIndex:0,selectedRoundIsLoaded:!1,showRoundDialog:!1,data:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ROUNDS":return Object(h.a)(Object(h.a)({},e),{},{roundsLoaded:!0,data:Object(h.a)({},t.data)});case"ADD_ROUND_DATA":return Object(h.a)(Object(h.a)({},e),{},{selectedRoundIsLoaded:!0,data:Object(h.a)(Object(h.a)({},e.data),{},Object(m.a)({},t.roundIndex,Object(h.a)(Object(h.a)({},e.data[t.roundIndex]),{},{roundData:Object(h.a)({},t.data)})))});case"SET_SELECTED_ROUND_IS_LOADED":return Object(h.a)(Object(h.a)({},e),{},{selectedRoundIsLoaded:!0});case"SHOW_ROUND_DIALOG":return Object(h.a)(Object(h.a)({},e),{},{showRoundDialog:!0,selectedRoundIndex:t.roundIndex,selectedRoundIsLoaded:!1});case"HIDE_ROUND_DIALOG":return Object(h.a)(Object(h.a)({},e),{},{showRoundDialog:!1});case"SET_SORT_KEY":return t.sortKey===e.sortKey?Object(h.a)(Object(h.a)({},e),{},{reverseSort:!e.reverseSort}):"date"===t.sortKey||"total_gir"===t.sortKey?Object(h.a)(Object(h.a)({},e),{},{reverseSort:!0,sortKey:t.sortKey}):Object(h.a)(Object(h.a)({},e),{},{reverseSort:!1,sortKey:t.sortKey});case"TOGGLE_SORT_ORDER":return Object(h.a)(Object(h.a)({},e),{},{reverseSort:!e.reverseSort});default:return e}},stats:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{statsLoaded:!1,selectedSeason:2046,data:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_STATS":return Object(h.a)(Object(h.a)({},e),{},{statsLoaded:!0,data:Object(h.a)({},t.data)});case"SELECT_SEASON":return Object(h.a)(Object(h.a)({},e),{},{selectedSeason:t.season});default:return e}}}),E=Object(l.d)(Object(c.a)({key:"golf-stats",storage:d.a,whitelist:["auth"]},f),Object(l.a)(u.a)),y=Object(c.b)(E),O=function(e){var t=e.children;return r.a.createElement(p.a,{store:E},r.a.createElement(g.a,{loading:null,persistor:y},t))},_=n(114),x=n.n(_),b=n(48),v=n.n(b),S=function(e,t){return v.a.get(e,function(e){return{headers:{Authorization:e}}}(t))},k=function(){return function(e,t){return(n=t().auth.token,v.a.post("/api/is_token_valid",{token:n})).then(function(e){return e.data}).then(function(n){if(n){var a=x()(t().auth.token).username;return e({type:"LOGIN_SUCCESS",username:a})}return e({type:"LOGIN_FAILURE",error:"Invalid token"})}).catch(function(){return e({type:"LOGIN_FAILURE",error:"Invalid token"})});var n}},C=function(e,t){return function(n){return function(e,t){return v.a.post("/api/get_token",{username:e,password:t})}(e,t).then(function(e){return e.data}).then(function(t){return n({type:"LOGIN_SUCCESS",username:e,token:t.token})}).catch(function(){return n({type:"LOGIN_FAILURE",error:"Invalid username or password"})})}},D=n(45),j=n(47),w=n(46),R=n(31),I=n.n(R),L=n(65),T=n.n(L),A={loginContainer:{width:"200px",margin:"auto",paddingTop:"10%",paddingRight:"10%"},rowContainer:{marginBottom:"20px"}},K=function(e){Object(j.a)(n,e);var t=Object(w.a)(n);function n(){var e;Object(D.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={username:"",password:""},e.handleKeyPress=function(t){13===t.keyCode&&e.login()},e.login=function(){e.props.login(e.state.username,e.state.password)},e.render=function(){return r.a.createElement("div",{style:A.loginContainer,onKeyDown:e.handleKeyPress},r.a.createElement("h2",null,"welcome"),r.a.createElement("h5",null,e.props.statusText),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(T.a,{label:"username",value:e.state.username,placeholder:"name",onChange:function(t){return e.setState({username:t.target.value})}})),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(T.a,{label:"password",type:"password",autoComplete:"current-password",value:e.state.password,placeholder:"password",onChange:function(t){return e.setState({password:t.target.value})}})),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(I.a,{variant:"outlined",style:{marginTop:"10px"},onClick:e.login},"login"),r.a.createElement(I.a,{variant:"outlined",style:{marginLeft:"10px",marginTop:"10px"},onClick:function(){}},"register")))},e}return n}(r.a.Component),N=Object(p.b)(function(e){return{statusText:e.auth.statusText}},function(e){return{login:function(t,n){return e(C(t,n))}}})(K),U=n(34),W=n.n(U),G=n(10),F=n.n(G),H=n(32),P=n.n(H),B=n(20),Y=n.n(B),J=n(115),z=n.n(J),M={dateCell:{minWidth:"80px",maxWidth:"80px",padding:"8px"},courseCell:{padding:"8px",paddingLeft:"30px"},narrowCell:{padding:"8px"}},q=Object(p.b)(function(e){return{sortKey:e.rounds.sortKey,reverseSort:e.rounds.reverseSort}},function(e){return{setSortKey:function(t){return e({type:"SET_SORT_KEY",sortKey:t})}}})(function(e){var t=e.sortKey,n=e.reverseSort,a=e.setSortKey,o=function(e,o){return r.a.createElement(F.a,{align:"date"===e||"course"===e?"left":"right",style:"date"===e?M.dateCell:"course"===e?M.courseCell:M.narrowCell},r.a.createElement(z.a,{active:t===o,direction:n?"desc":"asc",onClick:function(){return a(o)}},e))};return r.a.createElement(P.a,null,r.a.createElement(Y.a,null,o("date","date"),o("course","course"),o("score","total_strokes"),o("front","front_9_strokes"),o("back","back_9_strokes"),o("putts","total_putts"),o("girs","total_gir"),o("hdcp","handicap_index")))}),Q=n(66),V=n.n(Q),X=n(33),Z=n.n(X),$=Object(p.b)(function(e){return{rounds:e.rounds.data,sortKey:e.rounds.sortKey,reverseSort:e.rounds.reverseSort,selectedSeason:e.stats.selectedSeason}},function(e){return{showRoundDialog:function(t){return e(function(e){return function(t,n){t({type:"SHOW_ROUND_DIALOG",roundIndex:e});var a=n().rounds.data;return a[e].roundData?t({type:"SET_SELECTED_ROUND_IS_LOADED"}):S("/api/round/"+a[e].id,n().auth.token).then(function(e){return e.data}).then(function(n){return t({type:"ADD_ROUND_DATA",roundIndex:e,data:n})}).catch(function(){return console.log("failed to get round data")})}}(t))}}})(function(e){return r.a.createElement(Z.a,null,Object.keys(e.rounds).map(function(e){return parseInt(e)}).filter(function(t){return 2046===e.selectedSeason||e.rounds[t].date.split("-")[0]===""+e.selectedSeason}).sort(function(t,n){return"date"===e.sortKey?V()(e.rounds[e.reverseSort?n:t].date).diff(V()(e.rounds[e.reverseSort?t:n].date)):e.rounds[e.reverseSort?n:t][e.sortKey]>e.rounds[e.reverseSort?t:n][e.sortKey]?1:-1}).map(function(t){var n=e.rounds[t];return r.a.createElement(Y.a,{key:t,onClick:function(){return e.showRoundDialog(t)},style:{cursor:"pointer"},hover:!0},r.a.createElement(F.a,{style:M.dateCell},n.date.split(" ")[0]),r.a.createElement(F.a,{style:M.courseCell},n.course),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.total_strokes),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.front_9_strokes),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.back_9_strokes),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.total_putts),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.total_gir),r.a.createElement(F.a,{style:M.narrowCell,align:"right"},n.handicap_index))}))}),ee=n(116),te=n.n(ee),ne=n(119),ae=n.n(ne),re=n(118),oe=n.n(re),se=n(117),le=n.n(se),ue=function(e){return Array.from({length:9},function(t,n){return e(t,n)})},ce=Object(p.b)(function(e){return{selectedRoundIsLoaded:e.rounds.selectedRoundIsLoaded,round:e.rounds.data[e.rounds.selectedRoundIndex]}},function(e){return{hideRoundDialog:function(){return e({type:"HIDE_ROUND_DIALOG"})}}})(function(e){var t=e.selectedRoundIsLoaded,n=e.round;if(t){var a=n.roundData,o=function(e,t){return ue(function(n,r){return a.holes[r+e][t]}).reduce(function(e,t){return e+t})};a.front_9_par=o(1,"par"),a.back_9_par=o(10,"par"),a.total_par=a.front_9_par+a.back_9_par;var s=function(e,t){return ue(function(n,o){return r.a.createElement(F.a,{align:"right",style:{padding:"6px"},key:t+"_"+(o+e)},function(e,t){return"gir"===t?a.holes[e].gir?"*":"":a.holes[e][t]}(o+e,t))})},l=function(e,t){return r.a.createElement(Y.a,null,r.a.createElement(F.a,{style:{padding:"8px"}},e,":"),s(1,t),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},a["front_9_"+t]),s(10,t),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},a["back_9_"+t]),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},a["total_"+t]))};return r.a.createElement(W.a,{padding:"dense"},r.a.createElement(P.a,null,r.a.createElement(Y.a,null,r.a.createElement(F.a,{style:{padding:"8px"}},"hole:"),ue(function(e,t){return r.a.createElement(F.a,{align:"right",style:{padding:"6px"},key:"hole_"+(t+1)},t+1)}),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},"front"),ue(function(e,t){return r.a.createElement(F.a,{align:"right",style:{padding:"6px"},key:"hole_"+(t+10)},t+10)}),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},"back"),r.a.createElement(F.a,{align:"right",style:{padding:"8px"}},"total"))),r.a.createElement(Z.a,null,l("par","par"),l("score","strokes"),l("putts","putts"),l("gir","gir")))}return r.a.createElement("div",{style:{padding:"20px"}},r.a.createElement("h5",null,"loading round data..."))}),ie=Object(p.b)(function(e){return{showRoundDialog:e.rounds.showRoundDialog,round:e.rounds.data[e.rounds.selectedRoundIndex]}},function(e){return{hideRoundDialog:function(){return e({type:"HIDE_ROUND_DIALOG"})}}})(function(e){var t=e.showRoundDialog,n=e.round,a=e.hideRoundDialog;return r.a.createElement(te.a,{open:t,onClose:function(e){return a()},maxWidth:"md",fullWidth:!0},r.a.createElement(le.a,null,n?n.date.split(" ")[0]+(n.roundData?" - "+n.roundData.course_name:""):""),r.a.createElement(oe.a,null,r.a.createElement(ce,null)),r.a.createElement(ae.a,null,r.a.createElement(I.a,{variant:"outlined",style:{marginTop:"10px"},onClick:function(e){return a()}},"close")))}),de=Object(p.b)(function(e){return{roundsLoaded:e.rounds.roundsLoaded}})(function(e){var t=e.roundsLoaded;return r.a.createElement("div",{style:{marginTop:"40px",marginBottom:"50px"}},r.a.createElement("h2",null,"rounds"),t?r.a.createElement(W.a,{padding:"dense",style:{marginTop:"-10px"}},r.a.createElement(q,null),r.a.createElement($,null)):r.a.createElement("div",{style:{padding:"10px"}},r.a.createElement("h5",null,"loading rounds...")),r.a.createElement(ie,null))}),pe={seasonHeaderCell:{minWidth:"60px",maxWidth:"60px",padding:"8px"},headerCell:{padding:"8px"},seasonCell:{minWidth:"60px",maxWidth:"60px",padding:"8px",cursor:"pointer"},selectedSeasonCell:{minWidth:"60px",maxWidth:"60px",padding:"8px",backgroundColor:"#f4faf4",cursor:"pointer"},selectedCell:{minWidth:"40px",maxWidth:"40px",padding:"8px",cursor:"pointer",backgroundColor:"#f4faf4"},regularCell:{minWidth:"40px",maxWidth:"40px",padding:"8px",cursor:"pointer"}},ge=["score","putts","greens","handicap","par 3","par 4","par 5"],me=function(e){e.seasons,e.selectedSeason,e.onClick;return r.a.createElement(P.a,null,r.a.createElement(Y.a,null,r.a.createElement(F.a,{style:pe.seasonHeaderCell},"season"),ge.map(function(e){return r.a.createElement(F.a,{align:"right",key:e,style:pe.headerCell},e)})))},he=["strokes","putts","gir","handicap","par3","par4","par5"],fe=function(e){var t=e.seasons,n=e.stats,a=e.selectedSeason,o=e.onClick;return r.a.createElement(Z.a,null,t.map(function(e){return r.a.createElement(Y.a,{key:e,onClick:function(){return o(e)},hover:!0},r.a.createElement(F.a,{style:a===e?pe.selectedSeasonCell:pe.seasonCell},2046===e?"overall":e),he.map(function(t){return r.a.createElement(F.a,{align:"right",key:e+"-"+t,style:a===e?pe.selectedCell:pe.regularCell},n[e][t])}))}))},Ee=Object(p.b)(function(e){return{statsLoaded:e.stats.statsLoaded,stats:e.stats.data,selectedSeason:e.stats.selectedSeason}},function(e){return{selectSeason:function(t){return e(function(e){return{type:"SELECT_SEASON",season:e}}(t))}}})(function(e){var t=e.statsLoaded,n=e.stats,a=e.selectedSeason,o=e.selectSeason,s=Object.keys(n).map(function(e){return parseInt(e)}).sort().reverse();return r.a.createElement("div",{style:{marginTop:"20px"}},r.a.createElement("h2",null,"statistics"),t?r.a.createElement(W.a,{style:{marginTop:"-10px"}},r.a.createElement(me,{seasons:s,selectedSeason:a,onClick:o}),r.a.createElement(fe,{seasons:s,stats:n,selectedSeason:a,onClick:o})):r.a.createElement("div",{style:{padding:"10px"}},r.a.createElement("h5",null,"loading stats...")))}),ye={mainContainer:{maxWidth:"720px",minWidth:"480px",margin:"auto"},headerRow:{marginTop:"20px"}},Oe=function(e){Object(j.a)(n,e);var t=Object(w.a)(n);function n(){var e;Object(D.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).componentDidMount=function(){e.props.stats[2046]||(console.log("getting stats"),e.props.addStats()),e.props.rounds[0]||(console.log("getting rounds"),e.props.addRounds())},e.render=function(){return r.a.createElement("div",{style:ye.mainContainer},r.a.createElement("div",{style:ye.headerRow},r.a.createElement("h1",null,"hello ",e.props.username)),r.a.createElement(Ee,null),r.a.createElement(de,null))},e}return n}(r.a.Component),_e=Object(p.b)(function(e){return{username:e.auth.username,rounds:e.rounds.data,stats:e.stats.data}},function(e){return{addRounds:function(){return e(function(e,t){return S("/api/user/rounds",t().auth.token).then(function(e){return e.data}).then(function(t){return e({type:"ADD_ROUNDS",data:t})}).catch(function(){return console.log("failed to get rounds")})})},addStats:function(){return e(function(e,t){return S("/api/user/stats",t().auth.token).then(function(e){return e.data}).then(function(t){return e({type:"ADD_STATS",data:t})}).catch(function(){return console.log("failed to get stats")})})}}})(Oe),xe=Object(p.b)(function(e){return{token:e.auth.token,isAuthenticated:e.auth.isAuthenticated,authenticationFailed:e.auth.authenticationFailed}},function(e){return{checkToken:function(){return e(k())}}})(function(e){var t=e.token,n=e.isAuthenticated,a=e.authenticationFailed,o=e.checkToken;return t&&n?r.a.createElement(_e,null):!t||a?r.a.createElement(N,null):(o(),r.a.createElement("div",null,r.a.createElement("p",null,"authenticating...")))});n(294);s.a.render(r.a.createElement(O,null,r.a.createElement(xe,null)),document.getElementById("root"))}},[[120,1,2]]]);
//# sourceMappingURL=main.aa791c4c.chunk.js.map