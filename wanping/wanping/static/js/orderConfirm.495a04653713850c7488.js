webpackJsonp([9],{"+BTi":function(t,e){},"1kbS":function(t,e){},"2cIp":function(t,e,n){"use strict";e.b=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new s.a(function(n,a){f.post(t,e).then(function(t){n(t.data)}).catch(function(t){console.log("请求出错"),a(t)})})};var a=n("//Fk"),s=n.n(a),i=n("cwe7"),r=(n.n(i),n("+BTi")),o=(n.n(r),n("2X9z")),c=n.n(o),u=n("mtWM"),d=n.n(u),l=void 0;l="/MallService";var f=d.a.create({baseURL:l,timeout:1e4});f.interceptors.request.use(function(t){return t},function(t){return c()({showClose:!0,message:t.data,type:"error"}),s.a.reject(t)}),f.interceptors.response.use(function(t){return t.Data&&!t.Success?(c()({showClose:!0,message:"请求失败",type:"error"}),s.a.reject(t.ErrMsg)):t},function(t){return c()({showClose:!0,message:"出错啦",type:"error"}),s.a.reject(t)}),e.a={install:function(t,e){Object.defineProperty(t.prototype,"$http",{value:f})}}},BipO:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),s=n("hxP8"),i=n("2cIp"),r={data:function(){return{headName:"确认订单"}},components:{Header:s.a},computed:{},methods:{handleOrder:function(){Object(i.b)("/ConfirmOrder",{FromBasket:!1,items:[{BasketDtlId:"1",PsId:"12",Count:"10",Date:"2018-08-18",Amount:"1000",Price:"100"}]}).then(function(t){console.log(t)})}},mounted:function(){},beforeDestroy:function(){}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"order"},[n("Header",{attrs:{headName:t.headName}}),t._v(" "),t._m(0),t._v(" "),n("section",{staticClass:"confrim-order"},[n("p",[t._v("待支付 ¥1000.0")]),t._v(" "),n("p",{on:{click:t.handleOrder}},[t._v("确认下单")])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"order-data"},[n("header",[t._v("\n      订单信息\n    ")]),t._v(" "),n("ul",[n("li",{staticClass:"data-container"},[n("p",{staticClass:"product-name ellipsis"},[t._v("屏幕名称xxxxxxxxxxxxxxxxxxxxx")])]),t._v(" "),n("li",{staticClass:"data-container"},[n("span",[t._v("单价")]),t._v(" "),n("span",[t._v("¥ 100")])]),t._v(" "),n("li",{staticClass:"data-container"},[n("span",[t._v("数量")]),t._v(" "),n("span",[t._v("× 10")])])]),t._v(" "),n("section",{staticClass:"total-price"},[n("span",[t._v("订单总价")]),t._v(" "),n("span",[t._v("待支付 ¥1000")])])])}]};var c={name:"App",components:{OrderConfirm:n("VU/8")(r,o,!1,function(t){n("phZ0")},"data-v-148097b0",null).exports}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("OrderConfirm")],1)},staticRenderFns:[]};var d=n("VU/8")(c,u,!1,function(t){n("yBZK")},null,null).exports;n("e0XP"),n("cwe7"),n("UAgs");a.default.config.productionTip=!1,a.default.use(i.a),new a.default({el:"#app",components:{App:d},template:"<App/>"})},UAgs:function(t,e){var n,a,s,i,r;n=document,a=window,s=n.documentElement,i="orientationchange"in window?"orientationchange":"resize",r=function(){var t=s.clientWidth;t&&(s.style.fontSize=t/750*40+"px")},n.addEventListener&&(a.addEventListener(i,r,!1),n.addEventListener("DOMContentLoaded",r,!1))},cwe7:function(t,e){},e0XP:function(t,e){},hxP8:function(t,e,n){"use strict";var a={props:{headName:String},data:function(){return{title:this.headName}},components:{},computed:{},methods:{goBack:function(){window.history.go(-1)}},mounted:function(){},beforeDestroy:function(){}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("section",{staticClass:"head"},[e("header",[e("div",{staticClass:"back",on:{click:this.goBack}},[e("i",{staticClass:"fa fa-angle-left left"})]),this._v(" "),e("div",{staticClass:"head-font"},[e("span",[this._v(this._s(this.title))])])])])])},staticRenderFns:[]};var i=n("VU/8")(a,s,!1,function(t){n("1kbS")},"data-v-77bb81d0",null);e.a=i.exports},phZ0:function(t,e){},yBZK:function(t,e){}},["BipO"]);