(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2d0df246"],{"893b":function(t,e,a){"use strict";a.r(e),a("c5f6");var i={name:"khdxlfx",data:function(){return{startTime:new Date,endTime:new Date,NewStartTime:this.utils.formatMonthStart(this.startTime).substring(6,7),NewEndTime:this.utils.formatMonthEnd(this.endTime).substring(6,7),riqi:[],newdata:[],loading:!0,columns:[],z:0,zgslist:[{lable:"全部",value:"-1"},{lable:"河钢唐钢",value:"9580"},{lable:"河钢邯钢",value:"9727"},{lable:"河钢宣钢",value:"9193"},{lable:"河钢承钢",value:"9196"},{lable:"河钢舞钢",value:"1932"},{lable:"河钢石钢",value:"8110"},{lable:"河钢衡板",value:"8493"}],switchTime:!0,zgs:"",hz:"",jiluTime:new Date,data:[]}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.columns=[],this.columns.push({title:"单位",align:"center",key:"companyName"});var e=this.startTime.getMonth()+1,a=this.endTime.getMonth()+1,i=Number(a)-Number(e)!=0?Number(a)-Number(e)+1:0,r=["contractWeightJan","contractWeightFeb","contractWeightMar","contractWeightApr","contractWeightMay","contractWeightJun","contractWeightJul","contractWeightAug","contractWeightSept","contractWeightOct","contractWeightNov","contractWeightDec"],n=["deliveryWeightJan","deliveryWeightFeb","deliveryWeightMar","deliveryWeightApr","deliveryWeightMay","deliveryWeightJun","deliveryWeightJul","deliveryWeightAug","deliveryWeightSept","deliveryWeightOct","deliveryWeightNov","deliveryWeightDec"],l=["cashRateJan","cashRateFeb","cashRateMar","cashRateApr","cashRateMay","cashRateJun","cashRateJul","cashRateAug","cashRateSept","cashRateOct","cashRateNov","cashRateDec"];this.columns.push({title:"".concat(e,"月～").concat(a,"月合计"),align:"center",key:"",children:[{title:"合同量",align:"center",key:"contractWeight",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",Number(e.row[e.column.key]).toFixed(2))}},{title:"发货量",align:"center",key:"deliveryWeight",render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",Number(e.row[e.column.key]).toFixed(2))}},{title:"兑现率",align:"center",key:"cashRate"}]});for(var s=0;s<i;s++)this.columns.push({title:Number(e)+s+"月",align:"center",key:"",children:[{title:"合同量",align:"center",key:r[Number(e)+s-1],render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",Number(e.row[e.column.key]).toFixed(2))}},{title:"发货量",align:"center",key:n[Number(e)+s-1],render:function(t,e){return e.row[e.column.key]=null==e.row[e.column.key]?"0.00":e.row[e.column.key],t("span",Number(e.row[e.column.key]).toFixed(2))}},{title:"兑现率(%)",align:"center",key:l[Number(e)+s-1],render:function(t,e){return""==e.row[e.column.key]?t("span",e.row[e.column.key]+"0%"):t("span",e.row[e.column.key]+"%")}}]});this.loading=!0;var o={};this.zgs&&(o.companyId=this.zgs),this.hz&&(o.summaryType=this.hz);var c="orderStopDateS=",u="orderStopDateE=",h="recordDate=";this.switchTime?(c+=this.utils.formatMonthStart(this.startTime).substring(0,7),u+=this.utils.formatMonthStart(this.endTime).substring(0,7)):(c+=this.utils.formatYearStart(this.year).substring(0,7),u+=this.utils.formatYearEnd(this.year).substring(0,7)),h=(h+this.utils.formatdate(this.jiluTime)).substring(0,21),fetch(this.$store.state.fetchPath+"/reportCashRate/cashRateSummary",{method:"POST",headers:this.$store.state.fetchHeader,body:c+"&"+u+"&"+h+"&"+this.utils.formatParams(o),credentials:"include"}).then(function(e){if(200==e.status)return e.text();t.$Message.error("请求失败！")}).then(function(e){e=e&&0<e.length?JSON.parse(e):[],t.newdata=e.list;for(var a=0;a<t.newdata.length;a++)t.newdata[a].cashRate=Number(t.newdata[a].cashRate).toFixed(2),t.newdata[a].cashRate=t.newdata[a].cashRate+"%";t.data=t.newdata,t.loading=!1})},downLoad:function(){this.$refs.table.exportCsv({filename:"客户兑现率分析明细"})}}},r=a("2877"),n=Object(r.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Form",{attrs:{"label-width":120}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{width:"120px","margin-left":"-60px"},attrs:{label:"子公司："}},[a("Select",{staticStyle:{width:"120px"},model:{value:t.zgs,callback:function(e){t.zgs=e},expression:"zgs"}},t._l(t.zgslist,function(e){return a("Option",{attrs:{value:e.value}},[t._v(t._s(e.lable))])}),1)],1)],1),t.switchTime?a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{width:"120px"},attrs:{label:"交货截至日期："}},[a("DatePicker",{staticStyle:{width:"120px"},attrs:{type:"month",placeholder:"起始月份",editable:!1,clearable:!1},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}})],1)],1):t._e(),t.switchTime?a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{width:"120px"}},[a("DatePicker",{staticStyle:{width:"120px","margin-left":"-30px"},attrs:{type:"month",placeholder:"终止月份",editable:!1,clearable:!1},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}})],1)],1):t._e(),t.switchTime?a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{width:"120px"},attrs:{label:"记录日期："}},[a("DatePicker",{staticStyle:{width:"120px"},attrs:{type:"date",placeholder:"记录时间",editable:!1,clearable:!1},model:{value:t.jiluTime,callback:function(e){t.jiluTime=e},expression:"jiluTime"}})],1)],1):t._e(),a("Col",{attrs:{span:"4"}},[a("FormItem",{staticStyle:{width:"120px","margin-left":"60px"},attrs:{label:"发货量汇总方式："}},[a("Select",{staticStyle:{width:"120px"},model:{value:t.hz,callback:function(e){t.hz=e},expression:"hz"}},[a("Option",{attrs:{value:"1"}},[t._v("去0统计")]),a("Option",{attrs:{value:"0"}},[t._v("不去0统计")])],1)],1)],1),a("Col",{staticStyle:{"margin-left":"90px","margin-bottom":"20px"},attrs:{span:"4"}},[a("Button",{staticStyle:{"margin-right":"10px"},attrs:{icon:"ios-search",type:"primary"},on:{click:function(e){return t.getList()}}},[t._v("查询")]),a("Button",{attrs:{icon:"ios-cloud-download-outline",type:"primary"},on:{click:function(e){return t.downLoad()}}},[t._v("导出")])],1)],1)],1),a("Table",{ref:"table",attrs:{loading:t.loading,columns:t.columns,data:t.data,border:"",height:"550"}})],1)},[],!1,null,"c0befaae",null);e.default=n.exports}}]);