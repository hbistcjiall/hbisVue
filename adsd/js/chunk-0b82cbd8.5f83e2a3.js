(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0b82cbd8"],{cb2f:function(e,t,n){"use strict";n.r(t),n("6b54"),n("c5f6");var r={name:"pzgjs_cx",data:function(){return{loading:!0,dw:"",switchTime:!0,year:new Date,startTime:new Date,endTime:new Date,cx:"",columns:[{title:"单位",key:"COMPANYNAME",align:"center",fixed:"left",width:"100",isMergeRow:!0},{title:"产线",key:"NAME",align:"center",width:"100"},{title:"内贸总量",key:"nmzl",align:"center",children:[{title:"总量",key:"FKIMG",width:"100",align:"center",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"品种钢",key:"PZGL",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"比重",key:"BZ",align:"center",width:"90",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",(100*Number(t.row[t.column.key])).toFixed(2)+"%")}}]},{title:"环比",key:"HB",align:"center",width:"90",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2)+"%")}},{title:"专业公司",key:"zygs",align:"center",children:[{title:"总量",key:"ZYFKIMG",width:"100",align:"center",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"品种钢",key:"ZYPZGL",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"比重",key:"ZYBZ",align:"center",width:"90",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",(100*Number(t.row[t.column.key])).toFixed(2)+"%")}}]},{title:"分公司",key:"fgs",align:"center",children:[{title:"总量",key:"FGSFKIMG",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"品种钢",key:"FGSPZGL",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"比重",key:"FGSBZ",align:"center",width:"90",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",(100*Number(t.row[t.column.key])).toFixed(2)+"%")}}]},{title:"子公司",key:"zgs",align:"center",children:[{title:"总量",key:"ZGSFKIMG",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"品种钢",key:"ZGSPZGL",align:"center",width:"100",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",Number(t.row[t.column.key]).toFixed(2))}},{title:"比重",key:"ZGSBZ",align:"center",width:"90",render:function(e,t){return t.row[t.column.key]=null==t.row[t.column.key]?"0.00":t.row[t.column.key],e("span",(100*Number(t.row[t.column.key])).toFixed(2)+"%")}}]}],data:[],cxData:[],cxCx:{pz:""}}},mounted:function(){this.getList(),this.getCxData()},methods:{getCxData:function(){var e=this;fetch(this.$store.state.fetchPath+"/scm-steel-settle/getzyjhcxtjcx",{method:"POST",headers:this.$store.state.fetchHeader,body:this.utils.formatParams(this.cxCx),credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.cxData=e.utils.getCx(t),e.cxData.unshift({label:"全部",value:""})})},changeSwitch:function(){var e=new Date;this.switchTime?(this.startTime=e,this.endTime=this.utils.formatMonthEnd()):this.year=e},getList:function(){var e=this;this.loading=!0;var t="&dw="+this.dw,n="&cx="+this.cx.toString();this.cx&&this.cx;var r="startTime=",o="&endTime=";this.switchTime?(r+=this.utils.formatMonthStart(this.startTime),o+=this.utils.formatMonthStart(this.endTime)):(r+=this.utils.formatYearStart(this.year),o+=this.utils.formatYearEnd(this.year)),fetch(this.$store.state.fetchPath+"/scm-steel-settle/getcx",{method:"POST",headers:this.$store.state.fetchHeader,body:r+o+t+n,credentials:"include"}).then(function(t){if(200==t.status)return t.text();e.$Message.error("请求失败！")}).then(function(t){t=t&&0<t.length?JSON.parse(t):[],e.data=e.utils.mergeRow(t,"COMPANYNAME"),e.loading=!1})},downLoad:function(){this.$refs.table.exportCsv({filename:"结算完成（产线）明细"})}}},o=(n("d1c2"),n("2877")),l=Object(o.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Form",{attrs:{"label-width":50}},[n("Row",[e.switchTime?e._e():n("Col",{attrs:{span:"6"}},[n("FormItem",{attrs:{label:"年份："}},[n("DatePicker",{staticStyle:{width:"150px"},attrs:{type:"year",placeholder:"请选择年份",editable:!1,clearable:!1},model:{value:e.year,callback:function(t){e.year=t},expression:"year"}})],1)],1),e.switchTime?n("Col",{attrs:{span:"4"}},[n("FormItem",{attrs:{label:"月份："}},[n("DatePicker",{staticStyle:{width:"150px"},attrs:{type:"month",placeholder:"起始月份",editable:!1,clearable:!1},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}})],1)],1):e._e(),e.switchTime?n("Col",{attrs:{span:"4"}},[n("FormItem",[n("DatePicker",{staticStyle:{width:"150px"},attrs:{type:"month",placeholder:"终止月份",editable:!1,clearable:!1},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1)],1):e._e(),n("Col",{attrs:{span:"3"}},[n("FormItem",[n("i-switch",{on:{"on-change":e.changeSwitch},model:{value:e.switchTime,callback:function(t){e.switchTime=t},expression:"switchTime"}},[n("span",{attrs:{slot:"open"},slot:"open"},[e._v("年")]),n("span",{attrs:{slot:"close"},slot:"close"},[e._v("月")])])],1)],1),n("Col",{attrs:{span:"4"}},[n("FormItem",{attrs:{label:"单位："}},[n("Select",{attrs:{placeholder:"请选择单位"},model:{value:e.dw,callback:function(t){e.dw=t},expression:"dw"}},[n("Option",{attrs:{value:""}},[e._v("全部")]),n("Option",{attrs:{value:"唐钢"}},[e._v("唐钢")]),n("Option",{attrs:{value:"邯钢"}},[e._v("邯钢")]),n("Option",{attrs:{value:"宣钢"}},[e._v("宣钢")]),n("Option",{attrs:{value:"承钢"}},[e._v("承钢")]),n("Option",{attrs:{value:"舞钢"}},[e._v("舞钢")]),n("Option",{attrs:{value:"石钢"}},[e._v("石钢")]),n("Option",{attrs:{value:"衡板"}},[e._v("衡板")]),n("Option",{attrs:{value:"邯宝"}},[e._v("邯宝")])],1)],1)],1),n("Col",{staticStyle:{"margin-left":"20px"},attrs:{span:"6"}},[n("FormItem",{attrs:{label:"产线："}},[n("Select",{staticStyle:{width:"235px"},attrs:{placeholder:"请选择产线",filterable:"",multiple:""},model:{value:e.cx,callback:function(t){e.cx=t},expression:"cx"}},e._l(e.cxData,function(t){return n("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])}),1)],1)],1)],1),n("Row",{staticStyle:{"margin-bottom":"20px"}},[n("Col",{attrs:{span:"4"}},[n("Button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"ios-search"},on:{click:function(t){return e.getList()}}},[e._v("查询")]),n("Button",{attrs:{icon:"ios-cloud-download-outline"},on:{click:function(t){return e.downLoad()}}},[e._v("导出")])],1)],1)],1),n("Table",{ref:"table",attrs:{loading:e.loading,columns:e.columns,data:e.data,border:"",height:"550"}})],1)},[],!1,null,"65f7e9d9",null);t.default=l.exports},d1c2:function(e,t,n){"use strict";var r=n("dd20");n.n(r).a},dd20:function(e,t,n){}}]);