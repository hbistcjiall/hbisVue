(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-795ea85a"],{"07e3":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"1bc3":function(t,e,n){var r=n("f772");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(t,e,n){var r=n("f772"),o=n("e53d").document,a=r(o)&&r(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},"25eb":function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},"294c":function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},"35e8":function(t,e,n){var r=n("d9f6"),o=n("aebd");t.exports=n("8e60")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},"5d6b":function(t,e,n){var r=n("e53d").parseInt,o=n("a1ce").trim,a=n("e692"),i=/^[-+]?0[xX]/;t.exports=8!==r(a+"08")||22!==r(a+"0x16")?function(t,e){var n=o(String(t),3);return r(n,e>>>0||(i.test(n)?16:10))}:r},"63b6":function(t,e,n){var r=n("e53d"),o=n("584a"),a=n("d864"),i=n("35e8"),c=n("07e3"),l="prototype",u=function(t,e,n){var s,f,d,p=t&u.F,m=t&u.G,h=t&u.S,y=t&u.P,w=t&u.B,g=t&u.W,k=m?o:o[e]||(o[e]={}),v=k[l],O=m?r:h?r[e]:(r[e]||{})[l];for(s in m&&(n=e),n)(f=!p&&O&&void 0!==O[s])&&c(k,s)||(d=f?O[s]:n[s],k[s]=m&&"function"!=typeof O[s]?n[s]:w&&f?a(d,r):g&&O[s]==d?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[l]=t[l],e}(d):y&&"function"==typeof d?a(Function.call,d):d,y&&((k.virtual||(k.virtual={}))[s]=d,t&u.R&&v&&!v[s]&&i(v,s,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},7445:function(t,e,n){var r=n("63b6"),o=n("5d6b");r(r.G+r.F*(parseInt!=o),{parseInt:o})},"794b":function(t,e,n){t.exports=!n("8e60")&&!n("294c")(function(){return 7!=Object.defineProperty(n("1ec9")("div"),"a",{get:function(){return 7}}).a})},"79aa":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},"7b00":function(t,e,n){"use strict";n.r(e);var r=n("e814"),o=n.n(r),a=(n("386d"),{name:"cpzxljxsgsxyhxltjgn",data:function(){return{downloadUrl:"",downloadData:{},switchTime:!0,resDatas:[],dataCount:0,pageSize:10,cplb:"",loading:!0,startTime:new Date,endTime:new Date,fecthdata6:[],data:{page:"0",limit:"10"},columns12:[{title:"子公司",align:"center",key:"COMPANYNAME",fixed:"left",isMergeRow:!0},{title:"产品类别",align:"center",key:"VARIETIES"},{title:"总销量",align:"center",key:"TOTALSALES",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"协议户数",align:"center",key:"PROTOCOLACCOUNTNUM",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"年协议量",align:"center",key:"PROTOCOLSALESYEAR",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"总公司协议户销量",align:"center",children:[{title:"销售量",align:"center",key:"TOTALPROTOCOLSALES",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"占年协议量比",align:"center",key:"TOTALPROTOCOLSALESOFYEAR",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2)+"%")}},{title:"占产品总销量",align:"center",key:"TOTALPROTOCOLSALESOFPRODUCT",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2)+"%")}}]},{title:"协议户中自办公司销量",align:"center",children:[{title:"销售量",align:"center",key:"ZIBANPROTOCOLSALES",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"占协议总销量比",align:"center",key:"ZIBANPROTOCOLSALESOFTOTAL",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2)+"%")}}]},{title:"协议户中执行协议政策销量",align:"center",children:[{title:"销售量",align:"center",key:"XIEYIPROTOCOLSALES",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2))}},{title:"占协议总销量比",align:"center",key:"XIEYIPROTOCOLSALESOFTOTAL",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",e.row[e.column.key].toFixed(2)+"%")}}]}]}},created:function(){this.search()},methods:{changepage:function(t){this.data.page=t,this.search()},handlePageSize:function(t){this.data.limit=t,this.search()},search:function(){var t=this;this.loading=!0;var e={};e.varieties=this.cplb;var n="beginTime=",r="&endTime=";this.switchTime?(n+=this.utils.formatMonthStart(this.startTime),r+=this.utils.formatMonthStart(this.endTime)):(n+=this.utils.formatYearStart(this.year),r+=this.utils.formatYearEnd(this.year)),fetch(this.$store.state.fetchPath+"/productSalesProtocolAccountSales/list",{method:"POST",headers:this.$store.state.fetchHeader,body:n+r+"&"+this.utils.formatParams(e)+"&"+this.utils.formatParams(this.data),credentials:"include"}).then(function(e){if(200==e.status)return e.text();t.$Message.error("请求失败！")}).then(function(e){e=e&&0<e.length?JSON.parse(e):[],t.resDatas=e.data,t.dataCount=o()(e.count),t.pageSize=o()(e.pageSize),t.dataCount<t.pageSize?t.fecthdata6=t.utils.mergeRow(t.resDatas,"COMPANYNAME"):t.fecthdata6=t.utils.mergeRow(t.resDatas,"COMPANYNAME").slice(0,t.pageSize),t.downLoad(),t.loading=!1})},downLoad:function(){var t={};t.cplb=this.cplb;var e="beginTime=",n="&endTime=";this.switchTime?(e+=this.utils.formatMonthStart(this.startTime),n+=this.utils.formatMonthStart(this.endTime)):(e+=this.utils.formatYearStart(this.year),n+=this.utils.formatYearEnd(this.year)),this.downloadUrl=this.$store.state.fetchPath+"/productSalesProtocolAccountSales/export?"+e+n+"&"+this.utils.formatParams(t)}}}),i=(n("8f07"),n("2877")),c=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"divStyle"},[n("Form",{attrs:{"label-width":80}},[n("FormItem",{staticStyle:{float:"left"},attrs:{label:"产品类别:"}},[n("Select",{staticStyle:{width:"100px"},model:{value:t.cplb,callback:function(e){t.cplb=e},expression:"cplb"}},[n("Option",{attrs:{value:""}},[t._v("全部")]),n("Option",{attrs:{value:"热板"}},[t._v("热板")]),n("Option",{attrs:{value:"冷板"}},[t._v("冷板")]),n("Option",{attrs:{value:"宽厚板"}},[t._v("宽厚板")]),n("Option",{attrs:{value:"棒线"}},[t._v("棒线")]),n("Option",{attrs:{value:"型带"}},[t._v("型带")])],1)],1),n("FormItem",{staticStyle:{float:"left"},attrs:{label:"月份:"}},[n("DatePicker",{staticStyle:{width:"120px","margin-left":"10px"},attrs:{type:"month",editable:!1,clearable:!1},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}}),n("DatePicker",{staticStyle:{width:"120px"},attrs:{type:"month",editable:!1,clearable:!1},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1),n("Button",{staticStyle:{"margin-left":"20px"},attrs:{icon:"ios-search"},on:{click:t.search}},[t._v("查询")]),n("a",{attrs:{href:t.downloadUrl}},[n("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"}},[t._v("导出")])],1)],1)],1),n("Table",{ref:"table",staticStyle:{"margin-top":"20px",float:"left",width:"100%"},attrs:{loading:t.loading,border:"",stripe:"",columns:t.columns12,data:t.fecthdata6}},[t._v('"\n        ref="table">\n    ')]),n("Page",{staticClass:"paging",staticStyle:{"margin-top":"20px"},attrs:{total:t.dataCount,"page-size":t.pageSize,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.changepage,"on-page-size-change":t.handlePageSize}})],1)},[],!1,null,"073d525c",null);e.default=c.exports},"8e60":function(t,e,n){t.exports=!n("294c")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"8f07":function(t,e,n){"use strict";var r=n("dbc0");n.n(r).a},a1ce:function(t,e,n){var r=n("63b6"),o=n("25eb"),a=n("294c"),i=n("e692"),c="["+i+"]",l=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),s=function(t,e,n){var o={},c=a(function(){return!!i[t]()||"​"!="​"[t]()}),l=o[t]=c?e(f):i[t];n&&(o[n]=l),r(r.P+r.F*c,"String",o)},f=s.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=s},aebd:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},b9e9:function(t,e,n){n("7445"),t.exports=n("584a").parseInt},d864:function(t,e,n){var r=n("79aa");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},d9f6:function(t,e,n){var r=n("e4ae"),o=n("794b"),a=n("1bc3"),i=Object.defineProperty;e.f=n("8e60")?Object.defineProperty:function(t,e,n){if(r(t),e=a(e,!0),r(n),o)try{return i(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},dbc0:function(t,e,n){},e4ae:function(t,e,n){var r=n("f772");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},e53d:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},e692:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},e814:function(t,e,n){t.exports=n("b9e9")},f772:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}}}]);