(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{294:function(t,e,s){},295:function(t,e,s){t.exports={descBlock:"ProfileInfo_descBlock__3Sq7v"}},296:function(t,e,s){t.exports={postsBlock:"MyPosts_postsBlock__7WCXS",posts:"MyPosts_posts__37ZFd"}},297:function(t,e,s){t.exports={item:"Post_item__36fwr"}},299:function(t,e,s){"use strict";s.r(e);var c=s(5),n=s(36),a=s(37),o=s(39),r=s(38),i=s(0),u=s.n(i),j=(s(294),s(295)),p=s.n(j),d=s(68),l=s(130),b=s(1),h=function(t){var e=Object(i.useState)(!1),s=Object(l.a)(e,2),c=s[0],n=s[1],a=Object(i.useState)(t.status),o=Object(l.a)(a,2),r=o[0],u=o[1];Object(i.useEffect)((function(){u(t.status)}),[t.status]);return Object(b.jsxs)("div",{children:[!c&&Object(b.jsx)("div",{children:Object(b.jsx)("span",{onDoubleClick:function(){n(!0)},children:t.status||"No status"})}),c&&Object(b.jsx)("div",{children:Object(b.jsx)("input",{onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){n(!1),t.updateUserStatus(r)},value:r})})]})},O=function(t){var e=t.profile,s=t.status,c=t.updateUserStatus;if(!e)return Object(b.jsx)(d.a,{});var n=[];return e.contacts.facebook&&n.push(Object(b.jsx)("p",{children:e.contacts.facebook})),e.contacts.website&&n.push(Object(b.jsx)("p",{children:e.contacts.website})),e.contacts.vk&&n.push(Object(b.jsx)("p",{children:e.contacts.vk})),Object(b.jsx)("div",{children:Object(b.jsxs)("div",{className:p.a.descBlock,children:[Object(b.jsx)("div",{children:Object(b.jsx)("img",{src:e.photos.large})}),Object(b.jsx)("div",{children:Object(b.jsx)(h,{status:s,updateUserStatus:c})}),Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{children:"My contacts:"}),Object(b.jsx)("div",{children:n})]})]})})},f=s(98),x=s(33),m=s(296),v=s.n(m),g=s(297),k=s.n(g),P=function(t){return Object(b.jsxs)("div",{className:k.a.item,children:[Object(b.jsx)("img",{src:"https://www.meme-arsenal.com/memes/100773de10bd652a2366e129c5053a0a.jpg",alt:"",id:"src"}),t.message,Object(b.jsxs)("div",{children:[Object(b.jsx)("span",{children:"like"})," ",t.likeCount]})]})},S=s(92),w=s(129),U=s(88),_=s(34),y=Object(U.a)(10),B=Object(w.a)({form:"ProfileAddNewFormPost"})((function(t){return Object(b.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(b.jsx)("div",{children:Object(b.jsx)(S.a,{component:_.b,name:"newPostText",placeholder:"Post message",validate:[U.b,y]})}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{children:"Add post"})})]})})),C=u.a.memo((function(t){var e=Object(x.a)(t.posts).reverse().map((function(t){return Object(b.jsx)(P,{id:t.id,message:t.message,likeCount:t.likesCount})}));return Object(b.jsxs)("div",{className:v.a.postsBlock,children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:"My posts"}),Object(b.jsx)(B,{onSubmit:function(e){t.addPost(e.newPostText)}})]}),Object(b.jsx)("div",{className:v.a.posts,children:e})]})})),N=s(14),A=Object(N.b)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),{addPost:f.a})(C),I=function(t){return Object(b.jsxs)("div",{children:[Object(b.jsx)(O,{profile:t.profile,status:t.status,updateUserStatus:t.updateUserStatus}),Object(b.jsx)(A,{})]})},M=s(11),T=s(9),D=function(t){Object(o.a)(s,t);var e=Object(r.a)(s);function s(){var t;Object(n.a)(this,s);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(t=e.call.apply(e,[this].concat(o))).render=function(){return Object(b.jsx)(I,Object(c.a)(Object(c.a)({},t.props),{},{profile:t.props.profile,status:t.props.status,updateUserStatus:t.props.updateUserStatus}))},t}return Object(a.a)(s,[{key:"componentDidMount",value:function(){var t=this.props.match.params.userId;t||(t=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getProfile(t),this.props.getUserStatus(t)}},{key:"componentDidUpdate",value:function(t,e){t.status!=this.props.status&&this.setState({status:this.props.status})}}]),s}(u.a.Component);e.default=Object(T.d)(Object(N.b)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{getProfile:f.c,getUserStatus:f.d,updateUserStatus:f.e}),M.f)(D)}}]);
//# sourceMappingURL=3.561b32a8.chunk.js.map