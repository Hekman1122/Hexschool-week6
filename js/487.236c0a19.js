"use strict";(self["webpackChunkhex_week6"]=self["webpackChunkhex_week6"]||[]).push([[487],{487:function(e,s,n){n.r(s),n.d(s,{default:function(){return k}});var t=n(252),a=n(963);const o=e=>((0,t.dD)("data-v-eaad579a"),e=e(),(0,t.Cn)(),e),u={class:"insideBox"},r=o((()=>(0,t._)("h1",null,"Henry's Handmade",-1))),l={class:"input"},i=o((()=>(0,t._)("h2",null,"帳號",-1))),d={class:"input"},p=o((()=>(0,t._)("h2",null,"密碼",-1))),c=(0,t.Uk)(),h=o((()=>(0,t._)("br",null,null,-1)));function m(e,s,n,o,m,w){return(0,t.wg)(),(0,t.iD)("form",null,[(0,t._)("div",u,[r,(0,t._)("div",l,[i,(0,t.wy)((0,t._)("input",{class:"inputBox",type:"email","onUpdate:modelValue":s[0]||(s[0]=e=>m.username=e),autofocus:""},null,512),[[a.nr,m.username]])]),(0,t._)("div",d,[p,(0,t.wy)((0,t._)("input",{class:"inputBox",type:"password","onUpdate:modelValue":s[1]||(s[1]=e=>m.password=e)},null,512),[[a.nr,m.password]]),c,h]),(0,t._)("div",null,[(0,t._)("button",{type:"button",class:"button",onClick:s[2]||(s[2]=(...e)=>w.login&&w.login(...e))},"登入")])])])}var w={data(){return{username:"",password:""}},methods:{login(){const e="https://vue3-course-api.hexschool.io/v2",s=this.username,n=this.password,t={username:s,password:n};this.username||this.password?this.$http.post(`${e}/admin/signin`,t).then((e=>{const{token:s,expired:n}=e.data;document.cookie=`hexSchool=${s}; expires=${new Date(n)}`,this.$router.push("/admin/products")})).catch((e=>{console.dir(e),this.username="",this.password="",alert("帳號或密碼錯誤，請重新輸入!!")})):alert("請輸入帳號和密碼")}}},_=n(744);const v=(0,_.Z)(w,[["render",m],["__scopeId","data-v-eaad579a"]]);var k=v}}]);
//# sourceMappingURL=487.236c0a19.js.map