(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-9e46b426"],{"07e3":function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},"1bc3":function(e,t,r){var n=r("f772");e.exports=function(e,t){if(!n(e))return e;var r,a;if(t&&"function"==typeof(r=e.toString)&&!n(a=r.call(e)))return a;if("function"==typeof(r=e.valueOf)&&!n(a=r.call(e)))return a;if(!t&&"function"==typeof(r=e.toString)&&!n(a=r.call(e)))return a;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(e,t,r){var n=r("f772"),a=r("e53d").document,o=n(a)&&n(a.createElement);e.exports=function(e){return o?a.createElement(e):{}}},"25eb":function(e,t){e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e);return e}},"294c":function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},"35e8":function(e,t,r){var n=r("d9f6"),a=r("aebd");e.exports=r("8e60")?function(e,t,r){return n.f(e,t,a(1,r))}:function(e,t,r){return e[t]=r,e}},"5d6b":function(e,t,r){var n=r("e53d").parseInt,a=r("a1ce").trim,o=r("e692"),i=/^[-+]?0[xX]/;e.exports=8!==n(o+"08")||22!==n(o+"0x16")?function(e,t){var r=a(String(e),3);return n(r,t>>>0||(i.test(r)?16:10))}:n},"63b6":function(e,t,r){var n=r("e53d"),a=r("584a"),o=r("d864"),i=r("35e8"),s=r("07e3"),l="prototype",c=function(e,t,r){var u,d,f,p=e&c.F,h=e&c.G,m=e&c.S,g=e&c.P,b=e&c.B,v=e&c.W,y=h?a:a[t]||(a[t]={}),x=y[l],w=h?n:m?n[t]:(n[t]||{})[l];for(u in h&&(r=t),r)(d=!p&&w&&void 0!==w[u])&&s(y,u)||(f=d?w[u]:r[u],y[u]=h&&"function"!=typeof w[u]?r[u]:b&&d?o(f,n):v&&w[u]==f?function(e){var t=function(t,r,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,n)}return e.apply(this,arguments)};return t[l]=e[l],t}(f):g&&"function"==typeof f?o(Function.call,f):f,g&&((y.virtual||(y.virtual={}))[u]=f,e&c.R&&x&&!x[u]&&i(x,u,f)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},7445:function(e,t,r){var n=r("63b6"),a=r("5d6b");n(n.G+n.F*(parseInt!=a),{parseInt:a})},"794b":function(e,t,r){e.exports=!r("8e60")&&!r("294c")(function(){return 7!=Object.defineProperty(r("1ec9")("div"),"a",{get:function(){return 7}}).a})},"79aa":function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},"8e60":function(e,t,r){e.exports=!r("294c")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},a1ce:function(e,t,r){var n=r("63b6"),a=r("25eb"),o=r("294c"),i=r("e692"),s="["+i+"]",l=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),u=function(e,t,r){var a={},s=o(function(){return!!i[e]()||"​"!="​"[e]()}),l=a[e]=s?t(d):i[e];r&&(a[r]=l),n(n.P+n.F*s,"String",a)},d=u.trim=function(e,t){return e=String(a(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(c,"")),e};e.exports=u},aebd:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},b9e9:function(e,t,r){r("7445"),e.exports=r("584a").parseInt},d864:function(e,t,r){var n=r("79aa");e.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,a){return e.call(t,r,n,a)}}return function(){return e.apply(t,arguments)}}},d9f6:function(e,t,r){var n=r("e4ae"),a=r("794b"),o=r("1bc3"),i=Object.defineProperty;t.f=r("8e60")?Object.defineProperty:function(e,t,r){if(n(e),t=o(t,!0),n(r),a)try{return i(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},e19e:function(e,t,r){"use strict";var n=r("eac5");r.n(n).a},e4ae:function(e,t,r){var n=r("f772");e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},e53d:function(e,t){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},e692:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},e814:function(e,t,r){e.exports=r("b9e9")},eac5:function(e,t,r){},f31b:function(e,t,r){"use strict";r.r(t);var n=r("e814"),a=r.n(n),o=(r("55dd"),r("7f7f"),{name:"addRole",props:{url:String},data:function(){return{roledata:[],formValidate:{name:"",pid:"",description:"",sort:""},ruleValidate:{name:[{required:!0,message:"角色不为空",trigger:"blur"}],pid:[{required:!0,message:"上级不为空",trigger:"blur"}],description:[{required:!0,message:"别名不为空",trigger:"blur"}],sort:[{required:!0,message:"序号不为空",trigger:"blur"}]}}},created:function(){var e=this;fetch(this.url+"/role/roleTreeList",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.roledata=e.utils.roleTree(e.utils.buildRoleTree(t))})},methods:{nameChange:function(){this.$emit("name",this.formValidate.name)},pidChange:function(e){for(var t=[],r=e,n=0;n<r.length;n++)t.push(r[n].id);this.formValidate.pid=t.toString(),this.$emit("pid",this.formValidate.pid)},descriptionChange:function(){this.$emit("description",this.formValidate.description)},sortChange:function(){this.$emit("sort",this.formValidate.sort)}}}),i=r("2877"),s=Object(i.a)(o,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[r("FormItem",{attrs:{label:"角色",prop:"name"}},[r("Input",{attrs:{placeholder:"请输入角色"},on:{"on-change":e.nameChange},model:{value:e.formValidate.name,callback:function(t){e.$set(e.formValidate,"name",t)},expression:"formValidate.name"}})],1),r("FormItem",{attrs:{label:"别名",prop:"description"}},[r("Input",{attrs:{placeholder:"请输入别名"},on:{"on-change":e.descriptionChange},model:{value:e.formValidate.description,callback:function(t){e.$set(e.formValidate,"description",t)},expression:"formValidate.description"}})],1),r("FormItem",{attrs:{label:"排序",prop:"sort"}},[r("Input",{attrs:{placeholder:"请输入排序"},on:{"on-change":e.sortChange},model:{value:e.formValidate.sort,callback:function(t){e.$set(e.formValidate,"sort",t)},expression:"formValidate.sort"}})],1),r("FormItem",{attrs:{label:"上级",prop:"pid"}},[r("Tree",{ref:"tree",attrs:{data:e.roledata},on:{"on-select-change":e.pidChange}})],1)],1)},[],!1,null,null,null).exports,l={name:"roleMsg",data:function(){return{loading:!0,updModal:!1,setModal:!1,roleData:{roleName:"",page:"0",limit:"10"},delData:{roleId:""},formValidate:{name:"",pid:"",description:"",sort:0,roleId:""},dataCount:0,pageSize:10,xia:0,columns12:[{title:"名称",align:"center",key:"NAME"},{title:"上级角色",align:"center",key:"PNAME"},{title:"别名",align:"center",key:"DESCRIPTION"},{title:"操作",slot:"action",align:"center",width:"260px"}],fecthdata6:[],resDatas:[],updformValidate:{name:"",pid:"",description:"",sort:0,roleId:""},updruleValidate:{name:[{required:!0,message:"角色不为空",trigger:"blur"}],pid:[{required:!0,message:"上级不为空",trigger:"blur"}],description:[{required:!0,message:"别名不为空",trigger:"blur"}],sort:[{required:!0,message:"序号不为空",trigger:"blur"}]},uproledata:[],roleDatatree:[],roleForm:{roleId:""}}},created:function(){var e=this;this.handleListApproveHistory(),fetch(this.$store.state.fetchPath+"/role/roleTreeList",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.uproledata=e.utils.roleTree(e.utils.buildRoleTree(t))}),fetch(this.$store.state.fetchPath+"/menu/menuTreeListByRoleId",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},body:this.utils.formatParams(this.roleForm),credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.roleDatatree=e.utils.roleTree(e.utils.buildRoleTree(t))})},methods:{handleListApproveHistory:function(){var e=this;this.loading=!0,fetch(this.$store.state.fetchPath+"/role/list",{method:"POST",headers:this.$store.state.fetchHeader,body:this.utils.formatParams(this.roleData),credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.resDatas=t.data,e.dataCount=a()(t.count),e.pageSize=a()(t.pageSize),e.dataCount<e.pageSize?e.fecthdata6=e.resDatas:e.fecthdata6=e.resDatas.slice(0,e.pageSize),e.loading=!1})},changepage:function(e){this.roleData.page=e,this.handleListApproveHistory()},search:function(){this.handleListApproveHistory()},addNew:function(){var e=this;this.$Modal.confirm({scrollable:!0,okText:"保存",render:function(t){return t(s,{props:{url:e.$store.state.fetchPath},on:{name:function(t){e.formValidate.name=t},pid:function(t){e.formValidate.pid=t},sort:function(t){e.formValidate.sort=t},description:function(t){e.formValidate.description=t}}})},onOk:function(){fetch(e.$store.state.fetchPath+"/role/add",{method:"POST",headers:e.$store.state.fetchHeader,body:e.utils.formatParams(e.formValidate),credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(){e.handleListApproveHistory()})}})},remove:function(e){var t=this;this.$Modal.confirm({title:"提示",content:"确认删除吗？",onOk:function(){t.delData.roleId=e.ROLEID,fetch(t.$store.state.fetchPath+"/role/removeRole",{method:"POST",headers:t.$store.state.fetchHeader,body:t.utils.formatParams(t.delData),credentials:"include"}).then(function(e){if(200==e.status)return e.text();t.$Message.error("请求失败！")}).then(function(){t.handleListApproveHistory()})}})},updD:function(e){this.updModal=!0,this.updformValidate.name=e.NAME,this.updformValidate.sort=e.SORT,this.updformValidate.pid=e.PID,this.updformValidate.description=e.DESCRIPTION,this.updformValidate.roleId=e.ROLEID},pidChange:function(e){for(var t=[],r=e,n=0;n<r.length;n++)t.push(r[n].id);this.updformValidate.pid=t.toString()},updok:function(){var e=this;fetch(this.$store.state.fetchPath+"/role/edit",{method:"POST",headers:this.$store.state.fetchHeader,body:this.utils.formatParams(this.updformValidate),credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(){e.handleListApproveHistory()})},setRole:function(e){this.setModal=!0,this.roleForm.roleId=e.ROLEID},roleok:function(){for(var e=this,t=[],r=this.$refs.tree.getCheckedNodes(),n=0;n<r.length;n++)t.push(r[n].id);fetch(this.$store.state.fetchPath+"/role/setAuthority",{method:"POST",headers:this.$store.state.fetchHeader,body:"ids="+t.toString()+"&roleId="+this.roleForm.roleId,credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.$Message.success(t.message),e.handleListApproveHistory()})}}},c=(r("e19e"),Object(i.a)(l,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"角色名称"},model:{value:e.roleData.roleName,callback:function(t){e.$set(e.roleData,"roleName",t)},expression:"roleData.roleName"}}),r("Button",{staticStyle:{"margin-left":"20px"},attrs:{icon:"ios-search"},on:{click:e.search}},[e._v("搜索")]),r("Button",{staticStyle:{"margin-left":"10px"},attrs:{icon:"ios-add"},on:{click:e.addNew}},[e._v("添加")]),r("Table",{staticStyle:{"margin-top":"20px"},attrs:{loading:e.loading,border:"",stripe:"",columns:e.columns12,data:e.fecthdata6},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.row;return[r("strong",[e._v(e._s(n.name))])]}},{key:"action",fn:function(t){var n=t.row;return[r("Button",{staticStyle:{"margin-right":"5px"},attrs:{size:"small"},on:{click:function(t){return e.updD(n)}}},[e._v("编辑")]),r("Button",{staticStyle:{"margin-right":"5px"},attrs:{size:"small"},on:{click:function(t){return e.setRole(n)}}},[e._v("权限配置")]),r("Button",{staticStyle:{background:"#ff6969",color:"#fff"},attrs:{size:"small"},on:{click:function(t){return e.remove(n)}}},[e._v("删除")])]}}])}),r("Page",{staticClass:"paging",staticStyle:{"margin-top":"20px"},attrs:{total:e.dataCount,"page-size":e.pageSize,"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changepage}}),r("Modal",{attrs:{title:"角色编辑",closable:!1},on:{"on-ok":e.updok},model:{value:e.updModal,callback:function(t){e.updModal=t},expression:"updModal"}},[r("Form",{attrs:{model:e.updformValidate,rules:e.updruleValidate,"label-width":60}},[r("FormItem",{attrs:{label:"角色",prop:"name"}},[r("Input",{attrs:{placeholder:"请输入角色"},model:{value:e.updformValidate.name,callback:function(t){e.$set(e.updformValidate,"name",t)},expression:"updformValidate.name"}})],1),r("FormItem",{attrs:{label:"别名",prop:"description"}},[r("Input",{attrs:{placeholder:"请输入别名"},model:{value:e.updformValidate.description,callback:function(t){e.$set(e.updformValidate,"description",t)},expression:"updformValidate.description"}})],1),r("FormItem",{attrs:{label:"排序",prop:"sort"}},[r("Input",{attrs:{placeholder:"请输入排序"},model:{value:e.updformValidate.sort,callback:function(t){e.$set(e.updformValidate,"sort",t)},expression:"updformValidate.sort"}})],1),r("FormItem",{attrs:{label:"上级",prop:"pid"}},[r("Tree",{ref:"tree",attrs:{data:e.uproledata},on:{"on-select-change":e.pidChange}})],1)],1)],1),r("Modal",{attrs:{title:"权限配置",closable:!1},on:{"on-ok":e.roleok},model:{value:e.setModal,callback:function(t){e.setModal=t},expression:"setModal"}},[r("Tree",{ref:"tree",attrs:{data:e.roleDatatree,"show-checkbox":""}})],1)],1)},[],!1,null,"6a3a07ae",null));t.default=c.exports},f772:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}}}]);