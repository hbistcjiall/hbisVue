(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8e93fe0a"],{1289:function(t,e,a){},"3b36":function(t,e,a){"use strict";var n=a("1289");a.n(n).a},"3ce3":function(t,e,a){"use strict";a.r(e),a("55dd"),a("7f7f");var n=a("7618"),s=(a("6b54"),{name:"pzgjs_cx",data:function(){return{loading:!0,zyjhcx:{pz:"",nf:"2019",yf:"4",xszt:""},cx:[],pzData:[],cxData:[],xsztData:[],cxCx:{pz:""},columns:[{title:"日期",align:"center",key:"RQ"},{title:"品种",align:"center",key:"PZ"},{title:"产线",align:"center",key:"CX"},{title:"销售主体",align:"center",key:"FL_NAME"},{title:"计划量",align:"center",key:"JHL"}],data:[]}},mounted:function(){this.getList(),this.getCxData()},methods:{getList:function(){var t=this;this.loading=!0;var e="cx="+this.cx.toString();""!=this.zyjhcx.nf?this.zyjhcx.nf=new Date(this.zyjhcx.nf).getFullYear().toString():this.zyjhcx.nf="",fetch(this.$store.state.fetchPath+"/scm-steel-settle/getzyjh",{method:"POST",headers:this.$store.state.fetchHeader,body:this.utils.formatParams(this.zyjhcx)+"&"+e,credentials:"include"}).then(function(e){if(200==e.status)return e.text();t.$Message.error("请求失败！")}).then(function(e){e=e&&0<e.length?JSON.parse(e):[],t.data=e;var a=function(t,e){return function(a,s){var l,i;if(a&&s&&"object"===Object(n.a)(a)&&"object"===Object(n.a)(s))return(l=a[t])===(i=s[t])?"function"==typeof e?e(a,s):0:Object(n.a)(l)===Object(n.a)(i)?l<i?-1:1:Object(n.a)(l)<Object(n.a)(i)?-1:1;this.$Message.error("error")}};t.data.sort(a("RQ",a("CX",a("XSZT",a("PZ"))))),t.loading=!1})},getCxData:function(){var t=this;fetch(this.$store.state.fetchPath+"/scm-steel-settle/getzyjhcxtjcx",{method:"POST",headers:this.$store.state.fetchHeader,body:this.utils.formatParams(this.cxCx),credentials:"include"}).then(function(e){if(200==e.status)return e.text();t.$Message.error("请求失败！")}).then(function(e){e=e&&0<e.length?JSON.parse(e):[],t.cxData=t.utils.getCx(e),t.cxData.unshift({label:"全部",value:""})})},getCx:function(){this.cxCx.pz=this.zyjhcx.pz,this.getCxData()},downLoad:function(){this.$refs.table.exportCsv({filename:"资源计划明细"})}}}),l=(a("3b36"),a("2877")),i=Object(l.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Form",{attrs:{"label-width":100}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{"margin-left":"-30px"},attrs:{label:"年份："}},[a("DatePicker",{staticStyle:{width:"150px"},attrs:{type:"year",placeholder:"年份",editable:!1,clearable:!1},model:{value:t.zyjhcx.nf,callback:function(e){t.$set(t.zyjhcx,"nf",e)},expression:"zyjhcx.nf"}})],1)],1),a("Col",{attrs:{span:"4"}},[a("FormItem",{attrs:{label:"月份："}},[a("Select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择月份"},model:{value:t.zyjhcx.yf,callback:function(e){t.$set(t.zyjhcx,"yf",e)},expression:"zyjhcx.yf"}},[a("Option",{attrs:{value:"1"}},[t._v("1月")]),a("Option",{attrs:{value:"2"}},[t._v("2月")]),a("Option",{attrs:{value:"3"}},[t._v("3月")]),a("Option",{attrs:{value:"4"}},[t._v("4月")]),a("Option",{attrs:{value:"5"}},[t._v("5月")]),a("Option",{attrs:{value:"6"}},[t._v("6月")]),a("Option",{attrs:{value:"7"}},[t._v("7月")]),a("Option",{attrs:{value:"8"}},[t._v("8月")]),a("Option",{attrs:{value:"9"}},[t._v("9月")]),a("Option",{attrs:{value:"10"}},[t._v("10月")]),a("Option",{attrs:{value:"11"}},[t._v("11月")]),a("Option",{attrs:{value:"12"}},[t._v("12月")])],1)],1)],1),a("Col",{attrs:{span:"4"}},[a("FormItem",{attrs:{label:"品种："}},[a("Select",{attrs:{placeholder:"请选择品种"},on:{"on-change":t.getCx},model:{value:t.zyjhcx.pz,callback:function(e){t.$set(t.zyjhcx,"pz",e)},expression:"zyjhcx.pz"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),a("Option",{attrs:{value:"热板"}},[t._v("热板")]),a("Option",{attrs:{value:"冷板"}},[t._v("冷板")]),a("Option",{attrs:{value:"宽厚板"}},[t._v("宽厚板")]),a("Option",{attrs:{value:"棒线"}},[t._v("棒线")]),a("Option",{attrs:{value:"型带"}},[t._v("型带")])],1)],1)],1),a("Col",{attrs:{span:"5"}},[a("FormItem",{attrs:{label:"销售主体："}},[a("Select",{attrs:{placeholder:"请选择销售主体"},model:{value:t.zyjhcx.xszt,callback:function(e){t.$set(t.zyjhcx,"xszt",e)},expression:"zyjhcx.xszt"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),a("Option",{attrs:{value:"销售总公司"}},[t._v("销售总公司")]),a("Option",{attrs:{value:"技术中心、事业部"}},[t._v("技术中心、事业部")]),a("Option",{attrs:{value:"出口"}},[t._v("出口")]),a("Option",{attrs:{value:"现货"}},[t._v("现货")])],1)],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"产线："}},[a("Select",{staticStyle:{width:"235px"},attrs:{placeholder:"请选择产线",filterable:"",multiple:""},model:{value:t.cx,callback:function(e){t.cx=e},expression:"cx"}},t._l(t.cxData,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1)],1)],1)],1),a("Row",{staticStyle:{"margin-bottom":"10px"}},[a("Col",{attrs:{span:"4"}},[a("Button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"ios-search"},on:{click:function(e){return t.getList()}}},[t._v("查询")]),a("Button",{attrs:{icon:"ios-cloud-download-outline"},on:{click:function(e){return t.downLoad()}}},[t._v("导出")])],1),a("Col",{staticStyle:{"line-height":"30px","margin-top":"10px",float:"right"},attrs:{span:"2"}},[a("p",[t._v("单位：吨")])])],1)],1),a("Table",{ref:"table",attrs:{loading:t.loading,columns:t.columns,data:t.data,border:"",height:"600"}})],1)},[],!1,null,"d93e0d6e",null);e.default=i.exports}}]);