<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col style="width: 200px;float: left;margin-left: 20px" v-if="!switchTime">
                    <FormItem label="年份：">
                        <DatePicker type="year" placeholder="请选择年份" :editable="false" :clearable="false"  v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col style="width: 320px;float: left;"  v-if="switchTime">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:120px;margin-left: -20px"></DatePicker>

                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:120px;margin-left: 20px"></DatePicker>
                    </FormItem>
                </Col>
                <Col style="width: 100px;float: left;margin-left: -20px">
                    <FormItem>
                        <i-switch v-model="switchTime" @on-change="changeSwitch">
                            <span slot="open">年</span>
                            <span slot="close">月</span>
                        </i-switch>
                    </FormItem>
                </Col>

                <Col style="width: 200px;float: left;margin-left: 20px">
                    <FormItem label="单位：" >
                        <Select style="" v-model="dw" placeholder="请选择单位" @on-change="getCx">
                            <Option value="全部">全部</Option>
                            <Option value="9580">河钢唐钢</Option>
                            <Option value="9727">河钢邯钢</Option>
                            <Option value="9193">河钢宣钢</Option>
                            <Option value="9196">河钢承钢</Option>
                            <Option value="1932">河钢舞钢</Option>
                            <Option value="8110">河钢石钢</Option>
                            <Option value="8493">河钢衡板</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="margin-left: 20px;width: 300px;float: left">
                    <FormItem label="产线：">
                        <Select  v-model="cx" placeholder="请选择产线" filterable multiple>
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col style="width: 240px;float: left;">
                    <FormItem label="产品等级:" :label-width="100">
                        <Select v-model="zt" placeholder="请选择品种" @on-change="changeTitle()">
                            <Option value="0">品种钢</Option>
                            <Option value="1">高端产品</Option>
                        </Select>
                    </FormItem>
                </Col>

            </Row>
            <Row>
                <Col style="float: right;width: 300px;margin-bottom: 20px">
                    <Button @click="getList()" icon="ios-search">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline" style="margin-left:10px" :loading="dwstats">导出</Button>
                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" @click="downMx()">明细导出</Button></a>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_cx",
        data() {
            return {
                dwstats:true,
                mxstats:true,
                downloadUrl:'',
                loading:true,
                dw:'全部',
                zt:'0',
                switchTime:true,
                year:new Date(),
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                cx:[],
                columns: [{
                    title: '单位',
                    key: 'COMPANYNAME',
                    align: 'center',
                    fixed: 'left',
                    width:'100',
                    isMergeRow: true
                },
                    {
                        title: '产线',
                        key: 'NAME',
                        align: 'center',
                        width:'200',
                    },
                    {
                        title: '内贸总量',
                        key: 'nmzl',
                        align: 'center',
                        children: [
                            {
                                title: '总量（吨）',
                                key: 'FKIMG',
                                width:'150',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '品种钢（吨）',
                                key: 'PZGL',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '比重',
                                key: 'BZ',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }

                            }
                        ]
                    },
                    // {
                    //     title: '环比',
                    //     key: 'HB',
                    //     align: 'center',
                    //     width:'90',
                    //     render: (h, params) => {
                    //         params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                    //         return h('span',
                    //             Number(params.row[params.column.key]).toFixed(2)+'%'
                    //         )
                    //     }
                    // },
                    {
                        title: '专业公司',
                        key: 'zygs',
                        align: 'center',
                        children: [{
                            title: '总量（吨）',
                            key: 'ZYFKIMG',
                            width:'150',
                            align: 'center',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢（吨）',
                                key: 'ZYPZGL',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'ZYBZ',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '分公司',
                        key: 'fgs',
                        align: 'center',
                        children: [{
                            title: '总量（吨）',
                            key: 'FGSFKIMG',
                            align: 'center',
                            width:'150',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢（吨）',
                                key: 'FGSPZGL',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'FGSBZ',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    },
                    {
                        title: '子公司',
                        key: 'zgs',
                        align: 'center',
                        children: [{
                            title: '总量（吨）',
                            key: 'ZGSFKIMG',
                            align: 'center',
                            width:'150',
                            render: (h, params) => {
                                params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                return h('span',
                                    Number(params.row[params.column.key]).toFixed(2)
                                )
                            }
                        },
                            {
                                title: '品种钢（吨）',
                                key: 'ZGSPZGL',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '比重',
                                key: 'ZGSBZ',
                                align: 'center',
                                width:'150',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])*100).toFixed(2)+'%'
                                    )
                                }
                            }
                        ]
                    }
                ],
                data: [],
                cxData:[],
                cxCx:{
                    companyId:''
                },
            }
        },
        mounted() {
            this.mxstats = true
            this.getList();
            this.getCxData();
        },
        methods: {
            getCxData(){
                this.cxCx.companyId = this.dw
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxNamePzg", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.cxCx),
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.cxData = this.utils.getCx(res)
                });
            },
            getCx(){
                this.getCxData()
            },
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
            },
            getList() {
                this.dwstats = true;
                this.mxstats = true;
                this.loading = true;
                let params={};
                // this.dw?params.dw=this.dw:'';
                let zt="&zt="+this.zt;
                let dwStr = '&dw='+this.dw;
                let cxArr = '&cx=' +this.cx.toString()
                this.cx?params.cx=this.cx:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getcx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+dwStr+cxArr+zt,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }

                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    let zjarr = res;
                    let tg = []
                    let hg = []
                    let xg = []
                    let cg = []
                    let wg = []
                    let sg = []
                    let hb = []
                    let zg = []
                    if(zjarr.length>0){
                        let result1 = 0;
                        let result2 = 0;
                        let result3 = 0;
                        let result4 = 0;
                        let result5 = 0;
                        let result6 = 0;
                        let result7 = 0;
                        let result8 = 0;

                        let result9 = 0;
                        let result10 = 0;
                        let result11 = 0;
                        let result12 = 0;
                        for(var i = 0;i<zjarr.length;i++){
                            result1 += zjarr[i].FKIMG
                            result2 += zjarr[i].PZGL
                            result3 += zjarr[i].ZYFKIMG
                            result4 += zjarr[i].ZYPZGL
                            result5 += zjarr[i].FGSFKIMG
                            result6 += zjarr[i].FGSPZGL
                            result7 += zjarr[i].ZGSFKIMG
                            result8 += zjarr[i].ZGSPZGL
                        }
                        if(result1 == 0 || result1=="" || result1 == null){
                            result9 = 0;
                        }else{
                            result9 = result2/result1
                        }
                        if(result3 == 0 || result3=="" || result3 == null){
                            result10 = 0;
                        }else{
                            result10 = result4/result3
                        }
                        if(result5 == 0 || result5=="" || result5 == null){
                            result11 = 0;
                        }else{
                            result11 = result6/result5
                        }
                        if(result7 == 0 || result7=="" || result7 == null){
                            result12 = 0;
                        }else{
                            result12 = result8/result7
                        }
                        let obj ={
                            COMPANYNAME:'集团',
                            NAME : "合计",
                            FKIMG : result1,
                            PZGL : result2,
                            ZYFKIMG : result3,
                            ZYPZGL : result4,
                            FGSFKIMG : result5,
                            FGSPZGL : result6,
                            ZGSFKIMG : result7,
                            ZGSPZGL : result8,
                            ZGSBZ:result12,
                            FGSBZ:result11,
                            ZYBZ:result10,
                            BZ:result9

                        }
                        zg.push(obj)
                    }
                    for(var i=0;i<res.length;i++){

                        switch (res[i].COMPANYNAME) {
                            case "唐钢":
                                tg.push(res[i]);
                                break;
                            case "邯钢":
                                hg.push(res[i]);
                                break;
                            case "宣钢":
                                xg.push(res[i]);
                                break;
                            case "承钢":
                                cg.push(res[i]);
                                break;
                            case "舞钢":
                                wg.push(res[i]);
                                break;
                            case "石钢":
                                sg.push(res[i]);
                                break;
                            case "衡板":
                                hb.push(res[i]);
                                break;
                        }
                    }
                    if(tg.length>0){
                        let tgFKIMG = 0.00
                        let tgPZGL = 0.00
                        let tgBZ = 0.00
                        let tgZYFKIMG = 0.00
                        let tgZYPZGL = 0.00
                        let tgZYBZ = 0.00
                        let tgFGSFKIMG = 0.00
                        let tgFGSPZGL = 0.00
                        let tgFGSBZ = 0.00
                        let tgZGSFKIMG = 0.00
                        let tgZGSPZGL = 0.00
                        let tgZGSBZ = 0.00
                        for(var i =0 ;i<tg.length;i++){
                            tgFKIMG+=tg[i].FKIMG
                            tgPZGL+=tg[i].PZGL
                            tgZYFKIMG+=tg[i].ZYFKIMG
                            tgZYPZGL+=tg[i].ZYPZGL
                            tgFGSFKIMG+=tg[i].FGSFKIMG
                            tgFGSPZGL+=tg[i].FGSPZGL
                            tgZGSFKIMG+=tg[i].ZGSFKIMG
                            tgZGSPZGL+=tg[i].ZGSPZGL
                        }
                        if(tgFKIMG>0){tgBZ = (tgPZGL/tgFKIMG).toFixed(2)}else{tgBZ = 0.00}
                        if(tgZYFKIMG>0){tgZYBZ = (tgZYPZGL/tgZYFKIMG).toFixed(2)}else{tgZYBZ = 0.00}
                        if(tgFGSFKIMG>0){tgFGSBZ = (tgFGSPZGL/tgFGSFKIMG).toFixed(2)}else{tgFGSBZ = 0.00}
                        if(tgZGSFKIMG>0){tgZGSBZ = (tgZGSPZGL/tgZGSFKIMG).toFixed(2)}else{tgZGSBZ = 0.00}
                        let tgxj = {
                            COMPANYNAME:'唐钢',
                            NAME : "唐钢小计",
                            FKIMG : tgFKIMG.toFixed(2),
                            PZGL : tgPZGL.toFixed(2),
                            BZ:tgBZ,
                            ZYFKIMG : tgZYFKIMG.toFixed(2),
                            ZYPZGL : tgZYPZGL.toFixed(2),
                            ZYBZ:tgZYBZ,
                            FGSFKIMG : tgFGSFKIMG.toFixed(2),
                            FGSPZGL : tgFGSPZGL.toFixed(2),
                            FGSBZ:tgFGSBZ,
                            ZGSFKIMG : tgZGSFKIMG.toFixed(2),
                            ZGSPZGL : tgZGSPZGL.toFixed(2),
                            ZGSBZ:tgZGSBZ,

                        }
                        tg.unshift(tgxj)
                    }
                    if(hg.length>0){
                        let hgFKIMG = 0.00
                        let hgPZGL = 0.00
                        let hgBZ = 0.00
                        let hgZYFKIMG = 0.00
                        let hgZYPZGL = 0.00
                        let hgZYBZ = 0.00
                        let hgFGSFKIMG = 0.00
                        let hgFGSPZGL = 0.00
                        let hgFGSBZ = 0.00
                        let hgZGSFKIMG = 0.00
                        let hgZGSPZGL = 0.00
                        let hgZGSBZ = 0.00
                        for(var i =0 ;i<hg.length;i++){
                            hgFKIMG+=hg[i].FKIMG
                            hgPZGL+=hg[i].PZGL
                            hgZYFKIMG+=hg[i].ZYFKIMG
                            hgZYPZGL+=hg[i].ZYPZGL
                            hgFGSFKIMG+=hg[i].FGSFKIMG
                            hgFGSPZGL+=hg[i].FGSPZGL
                            hgZGSFKIMG+=hg[i].ZGSFKIMG
                            hgZGSPZGL+=hg[i].ZGSPZGL
                        }
                        if(hgFKIMG>0){hgBZ = (hgPZGL/hgFKIMG).toFixed(2)}else{hgBZ = 0.00}
                        if(hgZYFKIMG>0){hgZYBZ = (hgZYPZGL/hgZYFKIMG).toFixed(2)}else{hgZYBZ = 0.00}
                        if(hgFGSFKIMG>0){hgFGSBZ = (hgFGSPZGL/hgFGSFKIMG).toFixed(2)}else{hgFGSBZ = 0.00}
                        if(hgZGSFKIMG>0){hgZGSBZ = (hgZGSPZGL/hgZGSFKIMG).toFixed(2)}else{hgZGSBZ = 0.00}
                        let hgxj = {
                            COMPANYNAME:'邯钢',
                            NAME : "邯钢小计",
                            FKIMG : hgFKIMG.toFixed(2),
                            PZGL : hgPZGL.toFixed(2),
                            BZ:hgBZ,
                            ZYFKIMG : hgZYFKIMG.toFixed(2),
                            ZYPZGL : hgZYPZGL.toFixed(2),
                            ZYBZ:hgZYBZ,
                            FGSFKIMG : hgFGSFKIMG.toFixed(2),
                            FGSPZGL : hgFGSPZGL.toFixed(2),
                            FGSBZ:hgFGSBZ,
                            ZGSFKIMG : hgZGSFKIMG.toFixed(2),
                            ZGSPZGL : hgZGSPZGL.toFixed(2),
                            ZGSBZ:hgZGSBZ,

                        }
                        hg.unshift(hgxj)
                    }
                    if(xg.length>0){
                        let xgFKIMG = 0.00
                        let xgPZGL = 0.00
                        let xgBZ = 0.00
                        let xgZYFKIMG = 0.00
                        let xgZYPZGL = 0.00
                        let xgZYBZ = 0.00
                        let xgFGSFKIMG = 0.00
                        let xgFGSPZGL = 0.00
                        let xgFGSBZ = 0.00
                        let xgZGSFKIMG = 0.00
                        let xgZGSPZGL = 0.00
                        let xgZGSBZ = 0.00
                        for(var i =0 ;i<xg.length;i++){
                            xgFKIMG+=xg[i].FKIMG
                            xgPZGL+=xg[i].PZGL
                            xgZYFKIMG+=xg[i].ZYFKIMG
                            xgZYPZGL+=xg[i].ZYPZGL
                            xgFGSFKIMG+=xg[i].FGSFKIMG
                            xgFGSPZGL+=xg[i].FGSPZGL
                            xgZGSFKIMG+=xg[i].ZGSFKIMG
                            xgZGSPZGL+=xg[i].ZGSPZGL
                        }
                        if(xgFKIMG>0){xgBZ = (xgPZGL/xgFKIMG).toFixed(2)}else{xgBZ = 0.00}
                        if(xgZYFKIMG>0){xgZYBZ = (xgZYPZGL/xgZYFKIMG).toFixed(2)}else{xgZYBZ = 0.00}
                        if(xgFGSFKIMG>0){xgFGSBZ = (xgFGSPZGL/xgFGSFKIMG).toFixed(2)}else{xgFGSBZ = 0.00}
                        if(xgZGSFKIMG>0){xgZGSBZ = (xgZGSPZGL/xgZGSFKIMG).toFixed(2)}else{xgZGSBZ = 0.00}
                        let xgxj = {
                            COMPANYNAME:'宣钢',
                            NAME : "宣钢小计",
                            FKIMG : xgFKIMG.toFixed(2),
                            PZGL : xgPZGL.toFixed(2),
                            BZ:xgBZ,
                            ZYFKIMG : xgZYFKIMG.toFixed(2),
                            ZYPZGL : xgZYPZGL.toFixed(2),
                            ZYBZ:xgZYBZ,
                            FGSFKIMG : xgFGSFKIMG.toFixed(2),
                            FGSPZGL : xgFGSPZGL.toFixed(2),
                            FGSBZ:xgFGSBZ,
                            ZGSFKIMG : xgZGSFKIMG.toFixed(2),
                            ZGSPZGL : xgZGSPZGL.toFixed(2),
                            ZGSBZ:xgZGSBZ,

                        }
                        xg.unshift(xgxj)
                    }
                    if(cg.length>0){
                        let cgFKIMG = 0.00
                        let cgPZGL = 0.00
                        let cgBZ = 0.00
                        let cgZYFKIMG = 0.00
                        let cgZYPZGL = 0.00
                        let cgZYBZ = 0.00
                        let cgFGSFKIMG = 0.00
                        let cgFGSPZGL = 0.00
                        let cgFGSBZ = 0.00
                        let cgZGSFKIMG = 0.00
                        let cgZGSPZGL = 0.00
                        let cgZGSBZ = 0.00
                        for(var i =0 ;i<cg.length;i++){
                            cgFKIMG+=cg[i].FKIMG
                            cgPZGL+=cg[i].PZGL
                            cgZYFKIMG+=cg[i].ZYFKIMG
                            cgZYPZGL+=cg[i].ZYPZGL
                            cgFGSFKIMG+=cg[i].FGSFKIMG
                            cgFGSPZGL+=cg[i].FGSPZGL
                            cgZGSFKIMG+=cg[i].ZGSFKIMG
                            cgZGSPZGL+=cg[i].ZGSPZGL
                        }
                        if(cgFKIMG>0){cgBZ = (cgPZGL/cgFKIMG).toFixed(2)}else{cgBZ = 0.00}
                        if(cgZYFKIMG>0){cgZYBZ = (cgZYPZGL/cgZYFKIMG).toFixed(2)}else{cgZYBZ = 0.00}
                        if(cgFGSFKIMG>0){cgFGSBZ = (cgFGSPZGL/cgFGSFKIMG).toFixed(2)}else{cgFGSBZ = 0.00}
                        if(cgZGSFKIMG>0){cgZGSBZ = (cgZGSPZGL/cgZGSFKIMG).toFixed(2)}else{cgZGSBZ = 0.00}
                        let cgxj = {
                            COMPANYNAME:'承钢',
                            NAME : "承钢小计",
                            FKIMG : cgFKIMG.toFixed(2),
                            PZGL : cgPZGL.toFixed(2),
                            BZ:cgBZ,
                            ZYFKIMG : cgZYFKIMG.toFixed(2),
                            ZYPZGL : cgZYPZGL.toFixed(2),
                            ZYBZ:cgZYBZ,
                            FGSFKIMG : cgFGSFKIMG.toFixed(2),
                            FGSPZGL : cgFGSPZGL.toFixed(2),
                            FGSBZ:cgFGSBZ,
                            ZGSFKIMG : cgZGSFKIMG.toFixed(2),
                            ZGSPZGL : cgZGSPZGL.toFixed(2),
                            ZGSBZ:cgZGSBZ,

                        }
                        cg.unshift(cgxj)
                    }
                    let listArr=zg.concat(tg).concat(hg).concat(xg).concat(cg).concat(wg).concat(sg).concat(hb)
                    this.data = this.utils.mergeRow(listArr, 'COMPANYNAME');
                    this.loading = false;
                    this.mxstats = false;
                    this.dwstats = false
                });
            },
            changeTitle(){
                if(this.zt=="0"){
                    this.columns[2].children[1].title="品种钢";
                    this.columns[4].children[1].title="品种钢";
                    this.columns[5].children[1].title="品种钢";
                    this.columns[6].children[1].title="品种钢";

                }else{
                    this.columns[2].children[1].title="高端产品";
                    this.columns[4].children[1].title="高端产品";
                    this.columns[5].children[1].title="高端产品";
                    this.columns[6].children[1].title="高端产品";
                }
                this.getList();
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（产线）明细'
                });
            },
            downMx(){
                // let zt="&zt="+this.zt;
                let dwStr = '&dw='+this.dw;
                let cxArr = '&cx=' +this.cx.toString()
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                this.downloadUrl=this.$store.state.fetchPath + "/export/exportPzgCx?"+startTime+endTime+dwStr+cxArr;
            },
        }
    }
</script>

<style scoped>
    button{
        background: #3497db;
        color:#fff;
    }
    .ivu-table-cell{
        text-overflow: ellipsis !important;
        word-break: break-all !important;
        padding-left:0px;
        padding-right:0px;
    }
    label {
        width: 66px !important;
    }
</style>