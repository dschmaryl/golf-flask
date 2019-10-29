(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{122:function(e,t,n){e.exports=n(297)},296:function(e,t,n){},297:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(18),u=n.n(o),s=n(22),l=n(112),c=n(70),i=n(114),d=n.n(i),p=n(15),m=n(115),f=n(47),h=n(16),g=Object(s.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isAuthenticated:!1,authenticationFailed:!1,statusText:"Please log in",username:"",token:""},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_SUCCESS":return{isAuthenticated:!0,authenticationFailed:!1,statusText:"You are logged in",username:t.username,token:t.token};case"LOGIN_FAILURE":return{isAuthenticated:!1,authenticationFailed:!0,statusText:"Error logging in: ".concat(t.error),token:""};case"LOGOUT":return{isAuthenticated:!1,authenticationFailed:!1,statusText:"Please log in",token:""};default:return e}},rounds:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{roundsLoaded:!1,sortKey:"date",reverseSort:!0,selectedRoundIndex:0,selectedRoundIsLoaded:!1,showRoundDialog:!1,data:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ROUNDS":return Object(h.a)({},e,{roundsLoaded:!0,data:Object(h.a)({},t.data)});case"ADD_ROUND_DATA":return Object(h.a)({},e,{selectedRoundIsLoaded:!0,data:Object(h.a)({},e.data,Object(f.a)({},t.roundIndex,Object(h.a)({},e.data[t.roundIndex],{roundData:Object(h.a)({},t.data)})))});case"SET_SELECTED_ROUND_IS_LOADED":return Object(h.a)({},e,{selectedRoundIsLoaded:!0});case"SHOW_ROUND_DIALOG":return Object(h.a)({},e,{showRoundDialog:!0,selectedRoundIndex:t.roundIndex,selectedRoundIsLoaded:!1});case"HIDE_ROUND_DIALOG":return Object(h.a)({},e,{showRoundDialog:!1});case"SET_SORT_KEY":return t.sortKey===e.sortKey?Object(h.a)({},e,{reverseSort:!e.reverseSort}):"date"===t.sortKey||"total_gir"===t.sortKey?Object(h.a)({},e,{reverseSort:!0,sortKey:t.sortKey}):Object(h.a)({},e,{reverseSort:!1,sortKey:t.sortKey});case"TOGGLE_SORT_ORDER":return Object(h.a)({},e,{reverseSort:!e.reverseSort});default:return e}},stats:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{statsLoaded:!1,selectedSeason:2046,data:{}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_STATS":return Object(h.a)({},e,{statsLoaded:!0,data:Object(h.a)({},t.data)});case"SELECT_SEASON":return Object(h.a)({},e,{selectedSeason:t.season});default:return e}}}),E=Object(s.d)(Object(c.a)({key:"golf-stats",storage:d.a,whitelist:["auth"]},g),Object(s.a)(l.a)),x=Object(c.b)(E),y=n(116),v=n.n(y),O=n(52),_=n.n(O),b=function(e,t){return _.a.get(e,function(e){return{headers:{Authorization:e}}}(t))},S=function(){return function(e,t){return(n=t().auth.token,_.a.post("/api/is_token_valid",{token:n})).then(function(e){return e.data}).then(function(n){if(n){var a=v()(t().auth.token).username;return e({type:"LOGIN_SUCCESS",username:a})}return e({type:"LOGIN_FAILURE",error:"Invalid token"})}).catch(function(){return e({type:"LOGIN_FAILURE",error:"Invalid token"})});var n}},k=function(e,t){return function(n){return function(e,t){return _.a.post("/api/get_token",{username:e,password:t})}(e,t).then(function(e){return e.data}).then(function(t){return n({type:"LOGIN_SUCCESS",username:e,token:t.token})}).catch(function(){return n({type:"LOGIN_FAILURE",error:"Invalid username or password"})})}},C=n(48),D=n(50),R=n(49),I=n(51),L=n(31),w=n.n(L),j=n(68),T=n.n(j),A={loginContainer:{width:"200px",margin:"auto",paddingTop:"10%",paddingRight:"10%"},rowContainer:{marginBottom:"20px"}},K=function(e){function t(){var e,n;Object(C.a)(this,t);for(var a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];return(n=Object(D.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(o)))).state={username:"",password:""},n.handleKeyPress=function(e){13===e.keyCode&&n.login()},n.login=function(){n.props.login(n.state.username,n.state.password)},n.render=function(){return r.a.createElement("div",{style:A.loginContainer,onKeyDown:n.handleKeyPress},r.a.createElement("h2",null,"welcome"),r.a.createElement("h5",null,n.props.statusText),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(T.a,{label:"username",value:n.state.username,placeholder:"name",onChange:function(e){return n.setState({username:e.target.value})}})),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(T.a,{label:"password",type:"password",autoComplete:"current-password",value:n.state.password,placeholder:"password",onChange:function(e){return n.setState({password:e.target.value})}})),r.a.createElement("div",{style:A.rowContainer},r.a.createElement(w.a,{variant:"outlined",style:{marginTop:"10px"},onClick:n.login},"login"),r.a.createElement(w.a,{variant:"outlined",style:{marginLeft:"10px",marginTop:"10px"},onClick:function(){}},"register")))},n}return Object(I.a)(t,e),t}(r.a.Component),N=Object(p.b)(function(e){return{statusText:e.auth.statusText}},function(e){return{login:function(t,n){return e(k(t,n))}}})(K),U=n(34),W=n.n(U),G=n(17),F=n.n(G),P=n(32),H=n.n(P),B=n(20),Y=n.n(B),J=n(117),z=n.n(J),M={roundsContainer:{marginTop:"40px",marginBottom:"50px"},loadingDiv:{padding:"10px"},roundsTable:{marginTop:"-10px"},dateCell:{minWidth:"80px",maxWidth:"80px",padding:"8px"},courseCell:{padding:"8px",paddingLeft:"30px"},narrowCell:{padding:"8px"}},q=Object(p.b)(function(e){return{sortKey:e.rounds.sortKey,reverseSort:e.rounds.reverseSort}},function(e){return{setSortKey:function(t){return e({type:"SET_SORT_KEY",sortKey:t})}}})(function(e){var t=e.sortKey,n=e.reverseSort,a=e.setSortKey,o=function(e,o){return r.a.createElement(F.a,{align:"date"===e||"course"===e?"left":"right",style:"date"===e?M.dateCell:"course"===e?M.courseCell:M.narrowCell},r.a.createElement(z.a,{active:t===o,direction:n?"desc":"asc",onClick:function(){return a(o)}},e))};return r.a.createElement(H.a,null,r.a.createElement(Y.a,null,o("date","date"),o("course","course"),o("score","total_strokes"),o("front","front_9_strokes"),o("back","back_9_strokes"),o("putts","total_putts"),o("girs","total_gir"),o("hdcp","handicap_index")))}),Q=n(69),V=n.n(Q),X=n(33),Z=n.n(X),$=function(e){var t=e.text;return r.a.createElement(F.a,{style:M.narrowCell,align:"right"},t)},ee=Object(p.b)(function(e){return{rounds:e.rounds.data,sortKey:e.rounds.sortKey,reverseSort:e.rounds.reverseSort,selectedSeason:e.stats.selectedSeason}},function(e){return{showRoundDialog:function(t){return e(function(e){return function(t,n){t({type:"SHOW_ROUND_DIALOG",roundIndex:e});var a=n().rounds.data;return a[e].roundData?t({type:"SET_SELECTED_ROUND_IS_LOADED"}):b("/api/round/"+a[e].id,n().auth.token).then(function(e){return e.data}).then(function(n){return t({type:"ADD_ROUND_DATA",roundIndex:e,data:n})}).catch(function(){return console.log("failed to get round data")})}}(t))}}})(function(e){var t=e.rounds,n=e.sortKey,a=e.reverseSort,o=e.selectedSeason,u=e.showRoundDialog;return r.a.createElement(Z.a,null,Object.keys(t).map(function(e){return parseInt(e)}).filter(function(e){return 2046===o||t[e].date.split("-")[0]===""+o}).sort(function(e,r){return"date"===n?V()(t[a?r:e].date).diff(V()(t[a?e:r].date)):t[a?r:e][n]>t[a?e:r][n]?1:-1}).map(function(e){var n=t[e];return r.a.createElement(Y.a,{key:e,onClick:function(){return u(e)},style:{cursor:"pointer"},hover:!0},r.a.createElement(F.a,{style:M.dateCell},n.date.split(" ")[0]),r.a.createElement(F.a,{style:M.courseCell},n.course),r.a.createElement($,{text:n.total_strokes}),r.a.createElement($,{text:n.front_9_strokes}),r.a.createElement($,{text:n.back_9_strokes}),r.a.createElement($,{text:n.total_putts}),r.a.createElement($,{text:n.total_gir}),r.a.createElement($,{text:n.handicap_index}))}))}),te=Object(p.b)(function(e){return{roundsLoaded:e.rounds.roundsLoaded}})(function(e){var t=e.roundsLoaded;return r.a.createElement("div",{style:M.roundsContainer},r.a.createElement("h2",null,"rounds"),t?r.a.createElement(W.a,{padding:"dense",style:M.roundsTable},r.a.createElement(q,null),r.a.createElement(ee,null)):r.a.createElement("div",{style:M.loadingDiv},r.a.createElement("h5",null,"loading rounds...")))}),ne={statsContainer:{marginTop:"20px"},loadingDiv:{padding:"10px"},statsTable:{marginTop:"-10px"},seasonHeaderCell:{minWidth:"60px",maxWidth:"60px",padding:"8px"},headerCell:{padding:"8px"},seasonCell:{minWidth:"60px",maxWidth:"60px",padding:"8px",cursor:"pointer"},selectedSeasonCell:{minWidth:"60px",maxWidth:"60px",padding:"8px",backgroundColor:"#f4faf4",cursor:"pointer"},selectedCell:{minWidth:"40px",maxWidth:"40px",padding:"8px",cursor:"pointer",backgroundColor:"#f4faf4"},regularCell:{minWidth:"40px",maxWidth:"40px",padding:"8px",cursor:"pointer"}},ae=["score","putts","greens","handicap","par 3","par 4","par 5"],re=function(e){e.seasons,e.selectedSeason,e.onClick;return r.a.createElement(H.a,null,r.a.createElement(Y.a,null,r.a.createElement(F.a,{style:ne.seasonHeaderCell},"season"),ae.map(function(e){return r.a.createElement(F.a,{align:"right",key:e,style:ne.headerCell},e)})))},oe=["strokes","putts","gir","handicap","par3","par4","par5"],ue=function(e){var t=e.seasons,n=e.stats,a=e.selectedSeason,o=e.onClick;return r.a.createElement(Z.a,null,t.map(function(e){return r.a.createElement(Y.a,{key:e,onClick:function(){return o(e)},hover:!0},r.a.createElement(F.a,{style:a===e?ne.selectedSeasonCell:ne.seasonCell},2046===e?"overall":e),oe.map(function(t){return r.a.createElement(F.a,{align:"right",key:e+"-"+t,style:a===e?ne.selectedCell:ne.regularCell},n[e][t])}))}))},se=Object(p.b)(function(e){return{statsLoaded:e.stats.statsLoaded,stats:e.stats.data,selectedSeason:e.stats.selectedSeason}},function(e){return{selectSeason:function(t){return e(function(e){return{type:"SELECT_SEASON",season:e}}(t))}}})(function(e){var t=e.statsLoaded,n=e.stats,a=e.selectedSeason,o=e.selectSeason,u=Object.keys(n).map(function(e){return parseInt(e)}).sort().reverse();return r.a.createElement("div",{style:ne.statsContainer},r.a.createElement("h2",null,"statistics"),t?r.a.createElement(W.a,{style:ne.statsTable},r.a.createElement(re,{seasons:u,selectedSeason:a,onClick:o}),r.a.createElement(ue,{seasons:u,stats:n,selectedSeason:a,onClick:o})):r.a.createElement("div",{style:ne.loadingDiv},r.a.createElement("h5",null,"loading stats...")))}),le=n(118),ce=n.n(le),ie=n(121),de=n.n(ie),pe=n(120),me=n.n(pe),fe=n(119),he=n.n(fe),ge={bigPadding:{padding:"8px"},smallPadding:{padding:"5px"},button:{marginTop:"10px"}},Ee=[1,2,3,4,5,6,7,8,9],xe=[10,11,12,13,14,15,16,17,18],ye=function(e){var t=e.text;return r.a.createElement(F.a,{align:"right",style:(""+t).length>1?ge.smallPadding:ge.bigPadding},t)},ve=function(e){var t=e.text;return r.a.createElement(F.a,{style:ge.smallPadding},t)},Oe=Object(p.b)(function(e){return{selectedRoundIsLoaded:e.rounds.selectedRoundIsLoaded,round:e.rounds.data[e.rounds.selectedRoundIndex]}},function(e){return{hideRoundDialog:function(){return e({type:"HIDE_ROUND_DIALOG"})}}})(function(e){var t=e.selectedRoundIsLoaded,n=e.round;if(t){var a=n.roundData;a.front_9_par=Ee.reduce(function(e,t){return e+a.holes[t].par},0),a.back_9_par=xe.reduce(function(e,t){return e+a.holes[t].par},0),a.total_par=a.front_9_par+a.back_9_par;var o=function(e,t){return"gir"===t?a.holes[e].gir?"*":"":a.holes[e][t]},u=function(e){return r.a.createElement(ye,{text:e,key:"hole_"+e})},s=function(e,t){return r.a.createElement(Y.a,null,r.a.createElement(ve,{text:e+":"}),Ee.map(function(e){return u(o(e,t))}),r.a.createElement(ye,{text:a["front_9_"+t]}),xe.map(function(e){return u(o(e,t))}),r.a.createElement(ye,{text:a["back_9_"+t]}),r.a.createElement(ye,{text:a["total_"+t]}))};return r.a.createElement(W.a,{padding:"dense"},r.a.createElement(H.a,null,r.a.createElement(Y.a,null,r.a.createElement(ve,{text:"hole:"}),Ee.map(u),r.a.createElement(ye,{text:"front"}),xe.map(u),r.a.createElement(ye,{text:"back"}),r.a.createElement(ye,{text:"total"}))),r.a.createElement(Z.a,null,s("par","par"),s("score","strokes"),s("putts","putts"),s("gir","gir")))}return r.a.createElement("div",{style:{padding:"20px"}},r.a.createElement("h5",null,"loading round data..."))}),_e=Object(p.b)(function(e){return{showRoundDialog:e.rounds.showRoundDialog,round:e.rounds.data[e.rounds.selectedRoundIndex]}},function(e){return{hideRoundDialog:function(){return e({type:"HIDE_ROUND_DIALOG"})}}})(function(e){var t=e.showRoundDialog,n=e.round,a=e.hideRoundDialog;return r.a.createElement(ce.a,{open:t,onClose:function(){return a()},maxWidth:"md",fullWidth:!0},r.a.createElement(he.a,null,n?n.date.split(" ")[0]+(n.roundData?" - "+n.roundData.course_name:""):""),r.a.createElement(me.a,null,r.a.createElement(Oe,null)),r.a.createElement(de.a,null,r.a.createElement(w.a,{variant:"outlined",style:ge.button,onClick:function(){return a()}},"close")))}),be={mainContainer:{maxWidth:"720px",minWidth:"480px",margin:"auto"},headerRow:{marginTop:"20px"}},Se=function(e){function t(){var e,n;Object(C.a)(this,t);for(var a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];return(n=Object(D.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(o)))).componentDidMount=function(){n.props.stats[2046]||(console.log("getting stats"),n.props.addStats()),n.props.rounds[0]||(console.log("getting rounds"),n.props.addRounds())},n.render=function(){return r.a.createElement("div",{style:be.mainContainer},r.a.createElement("div",{style:be.headerRow},r.a.createElement("h1",null,"hello ",n.props.username)),r.a.createElement(se,null),r.a.createElement(te,null),r.a.createElement(_e,null))},n}return Object(I.a)(t,e),t}(r.a.Component),ke=Object(p.b)(function(e){return{username:e.auth.username,rounds:e.rounds.data,stats:e.stats.data}},function(e){return{addRounds:function(){return e(function(e,t){return b("/api/user/rounds",t().auth.token).then(function(e){return e.data}).then(function(t){return e({type:"ADD_ROUNDS",data:t})}).catch(function(){return console.log("failed to get rounds")})})},addStats:function(){return e(function(e,t){return b("/api/user/stats",t().auth.token).then(function(e){return e.data}).then(function(t){return e({type:"ADD_STATS",data:t})}).catch(function(){return console.log("failed to get stats")})})}}})(Se),Ce=Object(p.b)(function(e){return{token:e.auth.token,isAuthenticated:e.auth.isAuthenticated,authenticationFailed:e.auth.authenticationFailed}},function(e){return{checkToken:function(){return e(S())}}})(function(e){var t=e.token,n=e.isAuthenticated,a=e.authenticationFailed,o=e.checkToken;return t&&n?r.a.createElement(ke,null):!t||a?r.a.createElement(N,null):(o(),r.a.createElement("div",null,r.a.createElement("p",null,"authenticating...")))});n(296);u.a.render(r.a.createElement(function(e){var t=e.children;return r.a.createElement(p.a,{store:E},r.a.createElement(m.a,{loading:null,persistor:x},t))},null,r.a.createElement(Ce,null)),document.getElementById("root"))}},[[122,1,2]]]);
//# sourceMappingURL=main.28b3c4c3.chunk.js.map