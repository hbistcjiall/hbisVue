<style>
    .ivu-table .demo-table-info-row td{
        font-weight: bold;
    }

</style>
<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col span="6">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:120px;margin-left:-20px"></DatePicker>
                    <!--</FormItem>-->
                <!--</Col>-->
                <!--<Col span="4">-->
                    <!--<FormItem>-->
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:120px;margin-left:20px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 20px">
                    <FormItem label="产线：">
                        <Select  v-model="cx" placeholder="请选择产线" filterable multiple>
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 20px">
                    <FormItem label="品种：">
                        <Select  v-model="pz" placeholder="请选择品种">
                            <Option value="全部">全部</Option>
                            <Option value="热板">热板</Option>
                            <Option value="酸洗">酸洗</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="镀锌">镀锌</Option>
                            <Option value="中厚板">中厚板</Option>
                            <Option value="圆钢">圆钢</Option>
                            <Option value="线材">线材</Option>
                            <Option value="螺纹钢">螺纹钢</Option>
                            <Option value="薄板">薄板</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 20px">
                    <FormItem label="借贷：">
                        <Select v-model="jd">
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 20px">
                <FormItem>
                    <RadioGroup v-model="pzg" type="button">
                        <Radio label="全口径"></Radio>
                        <Radio label="品种钢"></Radio>
                    </RadioGroup>
                </FormItem>
                </Col>

                <Col span="6" style="float: right;margin-bottom: 20px">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <!--                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>-->
                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" icon="ios-cloud-download-outline" @click="download()">导出</Button></a>
                    <a :href="downloadUrlMx"><Button type="primary" :loading="mxstatsMx" style="margin-left:10px" icon="ios-cloud-download-outline" @click="downloadMx()">明细导出</Button></a>
                </Col>
            </Row>
        </Form>
        <Table :row-class-name="rowClassName" :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "xsjsqkcx",
        data() {
            return {
                downloadUrlMx:'',
                downloadUrl:'',
                mxstatsMx:true,
                mxstats:false,
                jd:'0',
                pzg:'全口径',
                pz:'全部',
                cx:[],
                cxData:[],
                loading:true,
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                columns: [
                    {
                        title: '产品大类',
                        key: 'ZL',
                        align: 'center',
                        fixed: 'left',
                        width:'100',
                        isMergeRow: true
                    },
                    {
                        title: '产线',
                        key: 'CXNAME',
                        width:'150',
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: '集团',
                        key: 'jt',
                        align: 'center',
                        children: [
                            {
                                title: '销售量（吨）',
                                key: 'FKIMG',
                                width:150,
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'ZSJ',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '销售额（万元）',
                                key: 'KZWI6',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '内贸',
                        key: 'nm',
                        align: 'center',
                        children: [
                            {
                                title: '销售量(吨)',
                                key: 'NMFKIMG',
                                width:150,
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'NMSJ',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            }
                        ]
                    },
                    {
                        title: '销售总公司',
                        key: 'xszgs',
                        align: 'center',
                        children: [
                            {
                                title: '销售量(吨)',
                                key: 'XSZGSFKIMG',
                                width:150,
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'XSZGSSJ',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            }

                        ]
                    },
                    {
                        title: '子公司',
                        key: 'zgs',
                        align: 'center',
                        children: [
                            {
                                title: '销售量(吨)',
                                key: 'ZGSFKIMG',
                                width:150,
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'ZGSSJ',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            }

                        ]
                    },
                    {
                        title: '出口',
                        key: 'ck',
                        align: 'center',
                        children: [
                            {
                                title: '销售量(吨)',
                                key: 'CKFKIMG',
                                width:150,
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'CKSJ',
                                align: 'center',
                                width:150,
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            }
                        ]
                    },
                ],
                data: []

            }
        },
        mounted() {
            this.getList();
            this.getCxData();
            this.mxstats = true
        },
        methods: {
            rowClassName (row, index) {
                if (index===0) {
                    return 'demo-table-info-row';
                }
                return '';
            },
            getCxData(){
                // this.cxCx.companyId = this.dw
                let type="type="
                type+="1"
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxNameN", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: type,
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
            download(){
                this.downMx();
            },
            downloadMx(){
                this.MxdownMx();
            },
            MxdownMx(){
                let cxArr = '&cx=' +this.cx.toString()
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz = "pz="+this.pz
                let pzg = "pzg="+this.pzg
                let jd = "jd="+this.jd
                this.downloadUrlMx=this.$store.state.fetchPath + "/export/exportJTXSJSCx?"+startTime+endTime+cxArr+"&"+jd+"&"+pz+"&"+pzg;
                const msg = this.$Message.loading({
                    content: '正在导出数据，请稍后',
                    duration: 0
                });
                setTimeout(msg, 60000);
            },
            downMx(){
                let cxArr = '&cx=' +this.cx.toString()
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz = "pz="+this.pz
                let jd = "jd="+this.jd
                let pzg = "pzg="+this.pzg
                this.downloadUrl=this.$store.state.fetchPath + "/export/exportJTXSJS?"+startTime+endTime+cxArr+"&"+jd+"&"+pz+"&"+pzg;
                const msg = this.$Message.loading({
                    content: '正在导出数据，请稍后',
                    duration: 0
                });
                setTimeout(msg, 20000);
            },
            getList() {
                let cxArr = '&cx=' +this.cx.toString()
                this.mxstatsMx=true
                this.mxstats = true
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz = "pz="+this.pz
                let jd = "jd="+this.jd
                let pzg = "pzg="+this.pzg
                fetch(this.$store.state.fetchPath + "/yxyb/getjtxsjscx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+cxArr+"&"+pz+"&"+jd+"&"+pzg,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    // this.data = res
                    let zj = res
                    let reban = []
                    let suanxi = []
                    let lengban = []
                    let duxin = []
                    let zhonghouban  = []
                    let luowengang = []
                    let yuangang = []
                    let xiancai = []
                    let xingcai = []
                    let jgj = []
                    let pinzhong = []
                    let xianchai=[]
                    let baoban = []
                    for(var i=0;i<res.length;i++){
                        switch (res[i].ZL) {
                            case "热板":
                                reban.push(res[i])
                                break;
                            case "酸洗":
                                suanxi.push(res[i])
                                break;
                            case "冷板":
                                lengban.push(res[i])
                                break;
                            case "镀锌":
                                duxin.push(res[i])
                                break;
                            case "中厚板":
                                zhonghouban.push(res[i])
                                break;
                            case "螺纹钢":
                                luowengang.push(res[i])
                                break;
                            case "圆钢":
                                yuangang.push(res[i])
                                break;
                            case "线材":
                                xiancai.push(res[i])
                                break;
                            case "型材":
                                xingcai.push(res[i])
                                break;
                            case "品种":
                                pinzhong.push(res[i])
                                break;
                            case "薄板":
                                baoban.push(res[i])
                                break;
                        }
                    }
                    if(zj.length>0){
                        let fkimg=0
                        let zsj = 0
                        let kzwi6 = 0
                        let nmfkimg = 0
                        let nmsj = 0
                        let xszgsfkimg=0
                        let xszgssj = 0
                        let zgsfkimg = 0
                        let zgssj = 0
                        let ckfkimg= 0
                        let cksj = 0
                        let nmzsjss = 0
                        let xszgssjss = 0
                        let zgssjss = 0
                        let cksjss = 0
                        for(var a=0;a<zj.length;a++){
                            fkimg+= zj[a].FKIMG
                            kzwi6 += zj[a].KZWI6
                            nmfkimg += zj[a].NMFKIMG
                            nmzsjss += zj[a].NMFKIMG*zj[a].NMSJ
                            xszgssjss+=zj[a].XSZGSFKIMG*zj[a].XSZGSSJ
                            xszgsfkimg += zj[a].XSZGSFKIMG
                            zgsfkimg += zj[a].ZGSFKIMG
                            zgssjss+= zj[a].ZGSFKIMG*zj[a].ZGSSJ
                            ckfkimg += zj[a].CKFKIMG
                            cksjss+=zj[a].CKFKIMG*zj[a].CKSJ
                        }
                        if(fkimg==0){zsj=0}else{zsj =(kzwi6/fkimg)*10000}
                        if(nmfkimg==0){nmsj=0}else{nmsj = nmzsjss/nmfkimg}
                        if(xszgsfkimg==0){xszgssj=0}else{xszgssj = xszgssjss/xszgsfkimg}
                        if(zgsfkimg==0){zgssj=0}else{zgssj = zgssjss/zgsfkimg}
                        if(ckfkimg==0){cksj=0}else{cksj += cksjss/ckfkimg}

                        let jt = {
                            ZL:"河钢集团",
                            CXNAME:"合计",
                            FKIMG:fkimg.toFixed(2),
                            ZSJ:zsj.toFixed(2),
                            KZWI6:kzwi6.toFixed(2),
                            NMFKIMG:nmfkimg.toFixed(2),
                            NMSJ:nmsj.toFixed(2),
                            XSZGSFKIMG:xszgsfkimg.toFixed(2),
                            XSZGSSJ:xszgssj.toFixed(2),
                            ZGSFKIMG:zgsfkimg.toFixed(2),
                            ZGSSJ:zgssj.toFixed(2),
                            CKFKIMG:ckfkimg.toFixed(2),
                            CKSJ:cksj.toFixed(2),
                        };
                        jgj.unshift(jt);
                    }
                    if(reban.length>0){
                        let rebanfkimg=0
                        let rebanzsj = 0
                        let rebankzwi6 = 0
                        let rebannmfkimg = 0
                        let rebannmsj = 0
                        let rebanxszgsfkimg=0
                        let rebanxszgssj = 0
                        let rebanzgsfkimg = 0
                        let rebanzgssj = 0
                        let rebanckfkimg= 0
                        let rebancksj = 0
                        let rebannmzsjss = 0
                        let rebanxszgssjss = 0
                        let rebanzgssjss = 0
                        let rebancksjss = 0
                        for(var b=0;b<reban.length;b++){
                            rebanfkimg+= reban[b].FKIMG
                            rebankzwi6 += reban[b].KZWI6

                            rebannmfkimg += reban[b].NMFKIMG
                            rebannmzsjss += reban[b].NMFKIMG*reban[b].NMSJ

                            rebanxszgssjss+=reban[b].XSZGSFKIMG*reban[b].XSZGSSJ
                            rebanxszgsfkimg += reban[b].XSZGSFKIMG


                            rebanzgsfkimg += reban[b].ZGSFKIMG
                            rebanzgssjss+= reban[b].ZGSFKIMG*reban[b].ZGSSJ

                            rebanckfkimg +=reban[b].CKFKIMG
                            rebancksjss+=reban[b].CKFKIMG*reban[b].CKSJ
                        }
                        if(rebanfkimg==0){rebanzsj=0}else{rebanzsj =(rebankzwi6/rebanfkimg)*10000}
                        if(rebannmfkimg==0){rebannmsj=0}else{rebannmsj = rebannmzsjss/rebannmfkimg}
                        if(rebanxszgsfkimg==0){rebanxszgssj=0}else{rebanxszgssj = rebanxszgssjss/rebanxszgsfkimg}
                        if(rebanzgsfkimg==0){rebanzgssj=0}else{rebanzgssj = rebanzgssjss/rebanzgsfkimg}
                        if(rebanckfkimg==0){rebancksj=0}else{rebancksj += rebancksjss/rebanckfkimg}
                        let rebanxj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            FKIMG:rebanfkimg.toFixed(2),
                            ZSJ:rebanzsj.toFixed(2),
                            KZWI6:rebankzwi6.toFixed(2),
                            NMFKIMG:rebannmfkimg.toFixed(2),
                            NMSJ:rebannmsj.toFixed(2),
                            XSZGSFKIMG:rebanxszgsfkimg.toFixed(2),
                            XSZGSSJ:rebanxszgssj.toFixed(2),
                            ZGSFKIMG:rebanzgsfkimg.toFixed(2),
                            ZGSSJ:rebanzgssj.toFixed(2),
                            CKFKIMG:rebanckfkimg.toFixed(2),
                            CKSJ:rebancksj.toFixed(2),
                        }
                        reban.unshift(rebanxj);
                    }
                    if(suanxi.length>0){
                        let suanxifkimg=0
                        let suanxizsj = 0
                        let suanxikzwi6 = 0
                        let suanxinmfkimg = 0
                        let suanxinmsj = 0
                        let suanxixszgsfkimg=0
                        let suanxixszgssj = 0
                        let suanxizgsfkimg = 0
                        let suanxizgssj = 0
                        let suanxickfkimg= 0
                        let suanxicksj = 0
                        let suanxinmzsjss = 0
                        let suanxixszgssjss = 0
                        let suanxizgssjss = 0
                        let suanxicksjss = 0
                        for(var c=0;c<suanxi.length;c++){

                            suanxifkimg+= suanxi[c].FKIMG
                            suanxikzwi6 += suanxi[c].KZWI6

                            suanxinmfkimg += suanxi[c].NMFKIMG
                            suanxinmzsjss += suanxi[c].NMFKIMG*suanxi[c].NMSJ

                            suanxixszgssjss+=suanxi[c].XSZGSFKIMG*suanxi[c].XSZGSSJ
                            suanxixszgsfkimg += suanxi[c].XSZGSFKIMG


                            suanxizgsfkimg += suanxi[c].ZGSFKIMG
                            suanxizgssjss+= suanxi[c].ZGSFKIMG*suanxi[c].ZGSSJ

                            suanxickfkimg += suanxi[c].CKFKIMG
                            suanxicksjss+=suanxi[c].CKFKIMG*suanxi[c].CKSJ
                        }
                        if(suanxifkimg==0){suanxizsj=0}else{suanxizsj =(suanxikzwi6/suanxifkimg)*10000}
                        if(suanxinmfkimg==0){suanxinmsj=0}else{suanxinmsj = suanxinmzsjss/suanxinmfkimg}
                        if(suanxixszgsfkimg==0){suanxixszgssj=0}else{suanxixszgssj = suanxixszgssjss/suanxixszgsfkimg}
                        if(suanxizgsfkimg==0){suanxizgssj=0}else{suanxizgssj = suanxizgssjss/suanxizgsfkimg}
                        if(suanxickfkimg==0){suanxicksj=0}else{suanxicksj += suanxicksjss/suanxickfkimg}
                        let suanxixj = {
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            FKIMG:suanxifkimg.toFixed(2),
                            ZSJ:suanxizsj.toFixed(2),
                            KZWI6:suanxikzwi6.toFixed(2),
                            NMFKIMG:suanxinmfkimg.toFixed(2),
                            NMSJ:suanxinmsj.toFixed(2),
                            XSZGSFKIMG:suanxixszgsfkimg.toFixed(2),
                            XSZGSSJ:suanxixszgssj.toFixed(2),
                            ZGSFKIMG:suanxizgsfkimg.toFixed(2),
                            ZGSSJ:suanxizgssj.toFixed(2),
                            CKFKIMG:suanxickfkimg.toFixed(2),
                            CKSJ:suanxicksj.toFixed(2),
                        };
                        suanxi.unshift(suanxixj);
                    }
                    if(lengban.length>0){
                        let lengbanfkimg=0
                        let lengbanzsj = 0
                        let lengbankzwi6 = 0
                        let lengbannmfkimg = 0
                        let lengbannmsj = 0
                        let lengbanxszgsfkimg=0
                        let lengbanxszgssj = 0
                        let lengbanzgsfkimg = 0
                        let lengbanzgssj = 0
                        let lengbanckfkimg= 0
                        let lengbancksj = 0
                        let lengbannmzsjss = 0
                        let lengbanxszgssjss = 0
                        let lengbanzgssjss = 0
                        let lengbancksjss = 0
                        for(var d=0;d<lengban.length;d++){

                            lengbanfkimg+= lengban[d].FKIMG
                            lengbankzwi6 += lengban[d].KZWI6

                            lengbannmfkimg += lengban[d].NMFKIMG
                            lengbannmzsjss += lengban[d].NMFKIMG*lengban[d].NMSJ

                            lengbanxszgssjss+=lengban[d].XSZGSFKIMG*lengban[d].XSZGSSJ
                            lengbanxszgsfkimg += lengban[d].XSZGSFKIMG

                            lengbanzgsfkimg += lengban[d].ZGSFKIMG
                            lengbanzgssjss+= lengban[d].ZGSFKIMG*lengban[d].ZGSSJ
                            lengbanckfkimg += lengban[d].CKFKIMG
                            lengbancksjss+=lengban[d].CKFKIMG*lengban[d].CKSJ
                        }
                        if(lengbanfkimg==0){lengbanzsj=0}else{lengbanzsj =(lengbankzwi6/lengbanfkimg)*10000}
                        if(lengbannmfkimg==0){lengbannmsj=0}else{lengbannmsj = lengbannmzsjss/lengbannmfkimg}
                        if(lengbanxszgsfkimg==0){lengbanxszgssj=0}else{lengbanxszgssj = lengbanxszgssjss/lengbanxszgsfkimg}
                        if(lengbanzgsfkimg==0){lengbanzgssj=0}else{lengbanzgssj = lengbanzgssjss/lengbanzgsfkimg}
                        if(lengbanckfkimg==0){lengbancksj=0}else{lengbancksj += lengbancksjss/lengbanckfkimg}
                        let lengbanxj = {
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            FKIMG:lengbanfkimg.toFixed(2),
                            ZSJ:lengbanzsj.toFixed(2),
                            KZWI6:lengbankzwi6.toFixed(2),
                            NMFKIMG:lengbannmfkimg.toFixed(2),
                            NMSJ:lengbannmsj.toFixed(2),
                            XSZGSFKIMG:lengbanxszgsfkimg.toFixed(2),
                            XSZGSSJ:lengbanxszgssj.toFixed(2),

                            ZGSFKIMG:lengbanzgsfkimg.toFixed(2),
                            ZGSSJ:lengbanzgssj.toFixed(2),
                            CKFKIMG:lengbanckfkimg.toFixed(2),
                            CKSJ:lengbancksj.toFixed(2),
                        };
                        lengban.unshift(lengbanxj);
                    }
                    if(duxin.length>0){
                        let duxinfkimg=0
                        let duxinzsj = 0
                        let duxinkzwi6 = 0
                        let duxinnmfkimg = 0
                        let duxinnmsj = 0
                        let duxinxszgsfkimg=0
                        let duxinxszgssj = 0

                        let duxinzgsfkimg = 0
                        let duxinzgssj = 0

                        let duxinckfkimg= 0
                        let duxincksj = 0
                        let duxinnmzsjss = 0
                        let duxinxszgssjss = 0

                        let duxinzgssjss = 0

                        let duxincksjss = 0

                        for(var e=0;e<duxin.length;e++){

                            duxinfkimg+= duxin[e].FKIMG
                            duxinkzwi6 += duxin[e].KZWI6

                            duxinnmfkimg += duxin[e].NMFKIMG
                            duxinnmzsjss += duxin[e].NMFKIMG*duxin[e].NMSJ

                            duxinxszgssjss+=duxin[e].XSZGSFKIMG*duxin[e].XSZGSSJ
                            duxinxszgsfkimg +=duxin[e].XSZGSFKIMG


                            duxinzgsfkimg += duxin[e].ZGSFKIMG
                            duxinzgssjss+= duxin[e].ZGSFKIMG*duxin[e].ZGSSJ

                            duxinckfkimg += duxin[e].CKFKIMG
                            duxincksjss+=duxin[e].CKFKIMG*duxin[e].CKSJ
                        }
                        if(duxinfkimg==0){duxinzsj=0}else{duxinzsj =(duxinkzwi6/duxinfkimg)*10000}
                        if(duxinnmfkimg==0){duxinnmsj=0}else{duxinnmsj = duxinnmzsjss/duxinnmfkimg}
                        if(duxinxszgsfkimg==0){duxinxszgssj=0}else{duxinxszgssj = duxinxszgssjss/duxinxszgsfkimg}
                        if(duxinzgsfkimg==0){duxinzgssj=0}else{duxinzgssj = duxinzgssjss/duxinzgsfkimg}
                        if(duxinckfkimg==0){duxincksj=0}else{duxincksj += duxincksjss/duxinckfkimg}
                        let duxinxj = {
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            FKIMG:duxinfkimg.toFixed(2),
                            ZSJ:duxinzsj.toFixed(2),
                            KZWI6:duxinkzwi6.toFixed(2),
                            NMFKIMG:duxinnmfkimg.toFixed(2),
                            NMSJ:duxinnmsj.toFixed(2),
                            XSZGSFKIMG:duxinxszgsfkimg.toFixed(2),
                            XSZGSSJ:duxinxszgssj.toFixed(2),

                            ZGSFKIMG:duxinzgsfkimg.toFixed(2),
                            ZGSSJ:duxinzgssj.toFixed(2),

                            CKFKIMG:duxinckfkimg.toFixed(2),
                            CKSJ:duxincksj.toFixed(2),
                        };
                        duxin.unshift(duxinxj);
                    }
                    if(zhonghouban.length>0){
                        let zhonghoubanfkimg=0
                        let zhonghoubanzsj = 0
                        let zhonghoubankzwi6 = 0
                        let zhonghoubannmfkimg = 0
                        let zhonghoubannmsj = 0
                        let zhonghoubanxszgsfkimg=0
                        let zhonghoubanxszgssj = 0

                        let zhonghoubanzgsfkimg = 0
                        let zhonghoubanzgssj = 0

                        let zhonghoubanckfkimg= 0
                        let zhonghoubancksj = 0
                        let zhonghoubannmzsjss = 0
                        let zhonghoubanxszgssjss = 0

                        let zhonghoubanzgssjss = 0

                        let zhonghoubancksjss = 0

                        for(var f=0;f<zhonghouban.length;f++){

                            zhonghoubanfkimg+= zhonghouban[f].FKIMG
                            zhonghoubankzwi6 += zhonghouban[f].KZWI6

                            zhonghoubannmfkimg += zhonghouban[f].NMFKIMG
                            zhonghoubannmzsjss += zhonghouban[f].NMFKIMG*zhonghouban[f].NMSJ

                            zhonghoubanxszgssjss+=zhonghouban[f].XSZGSFKIMG*zhonghouban[f].XSZGSSJ
                            zhonghoubanxszgsfkimg += zhonghouban[f].XSZGSFKIMG



                            zhonghoubanzgsfkimg += zhonghouban[f].ZGSFKIMG
                            zhonghoubanzgssjss+= zhonghouban[f].ZGSFKIMG*zhonghouban[f].ZGSSJ


                            zhonghoubanckfkimg += zhonghouban[f].CKFKIMG
                            zhonghoubancksjss+=zhonghouban[f].CKFKIMG*zhonghouban[f].CKSJ
                        }
                        if(zhonghoubanfkimg==0){zhonghoubanzsj=0}else{zhonghoubanzsj =(zhonghoubankzwi6/zhonghoubanfkimg)*10000}
                        if(zhonghoubannmfkimg==0){zhonghoubannmsj=0}else{zhonghoubannmsj = zhonghoubannmzsjss/zhonghoubannmfkimg}
                        if(zhonghoubanxszgsfkimg==0){zhonghoubanxszgssj=0}else{zhonghoubanxszgssj = zhonghoubanxszgssjss/zhonghoubanxszgsfkimg}
                        if(zhonghoubanzgsfkimg==0){zhonghoubanzgssj=0}else{zhonghoubanzgssj = zhonghoubanzgssjss/zhonghoubanzgsfkimg}
                        if(zhonghoubanckfkimg==0){zhonghoubancksj=0}else{zhonghoubancksj += zhonghoubancksjss/zhonghoubanckfkimg}
                        let zhonghoubanxj = {
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            FKIMG:zhonghoubanfkimg.toFixed(2),
                            ZSJ:zhonghoubanzsj.toFixed(2),
                            KZWI6:zhonghoubankzwi6.toFixed(2),
                            NMFKIMG:zhonghoubannmfkimg.toFixed(2),
                            NMSJ:zhonghoubannmsj.toFixed(2),
                            XSZGSFKIMG:zhonghoubanxszgsfkimg.toFixed(2),
                            XSZGSSJ:zhonghoubanxszgssj.toFixed(2),

                            ZGSFKIMG:zhonghoubanzgsfkimg.toFixed(2),
                            ZGSSJ:zhonghoubanzgssj.toFixed(2),

                            CKFKIMG:zhonghoubanckfkimg.toFixed(2),
                            CKSJ:zhonghoubancksj.toFixed(2),
                        };
                        zhonghouban.unshift(zhonghoubanxj);
                    }
                    if(luowengang.length>0){
                        let luowengangfkimg=0
                        let luowengangzsj = 0
                        let luowengangkzwi6 = 0
                        let luowengangnmfkimg = 0
                        let luowengangnmsj = 0
                        let luowengangxszgsfkimg=0
                        let luowengangxszgssj = 0

                        let luowengangzgsfkimg = 0
                        let luowengangzgssj = 0

                        let luowengangckfkimg= 0
                        let luowengangcksj = 0
                        let luowengangnmzsjss = 0
                        let luowengangxszgssjss = 0

                        let luowengangzgssjss = 0

                        let luowengangcksjss = 0

                        for(var g=0;g<luowengang.length;g++){

                            luowengangfkimg+= luowengang[g].FKIMG
                            luowengangkzwi6 += luowengang[g].KZWI6

                            luowengangnmfkimg += luowengang[g].NMFKIMG
                            luowengangnmzsjss += luowengang[g].NMFKIMG*luowengang[g].NMSJ

                            luowengangxszgssjss+=luowengang[g].XSZGSFKIMG*luowengang[g].XSZGSSJ
                            luowengangxszgsfkimg += luowengang[g].XSZGSFKIMG



                            luowengangzgsfkimg += luowengang[g].ZGSFKIMG
                            luowengangzgssjss+= luowengang[g].ZGSFKIMG*zj[g].ZGSSJ


                            luowengangckfkimg += luowengang[g].CKFKIMG
                            luowengangcksjss+=luowengang[g].CKFKIMG*luowengang[g].CKSJ
                        }
                        if(luowengangfkimg==0){luowengangzsj=0}else{luowengangzsj =(luowengangkzwi6/luowengangfkimg)*10000}
                        if(luowengangnmfkimg==0){luowengangnmsj=0}else{luowengangnmsj = luowengangnmzsjss/luowengangnmfkimg}
                        if(luowengangxszgsfkimg==0){luowengangxszgssj=0}else{luowengangxszgssj = luowengangxszgssjss/luowengangxszgsfkimg}
                        if(luowengangzgsfkimg==0){luowengangzgssj=0}else{luowengangzgssj = luowengangzgssjss/luowengangzgsfkimg}
                        if(luowengangckfkimg==0){luowengangcksj=0}else{luowengangcksj += luowengangcksjss/luowengangckfkimg}
                        let luowengangxj = {
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            FKIMG:luowengangfkimg.toFixed(2),
                            ZSJ:luowengangzsj.toFixed(2),
                            KZWI6:luowengangkzwi6.toFixed(2),
                            NMFKIMG:luowengangnmfkimg.toFixed(2),
                            NMSJ:luowengangnmsj.toFixed(2),
                            XSZGSFKIMG:luowengangxszgsfkimg.toFixed(2),
                            XSZGSSJ:luowengangxszgssj.toFixed(2),
                            ZGSFKIMG:luowengangzgsfkimg.toFixed(2),
                            ZGSSJ:luowengangzgssj.toFixed(2),

                            CKFKIMG:luowengangckfkimg.toFixed(2),
                            CKSJ:luowengangcksj.toFixed(2),
                        };
                        luowengang.unshift(luowengangxj);
                    }
                    if(yuangang.length>0){
                        let yuangangfkimg=0
                        let yuangangzsj = 0
                        let yuangangkzwi6 = 0
                        let yuangangnmfkimg = 0
                        let yuangangnmsj = 0
                        let yuangangxszgsfkimg=0
                        let yuangangxszgssj = 0

                        let yuangangzgsfkimg = 0
                        let yuangangzgssj = 0

                        let yuangangckfkimg= 0
                        let yuangangcksj = 0
                        let yuangangnmzsjss = 0
                        let yuangangxszgssjss = 0

                        let yuangangzgssjss = 0

                        let yuangangcksjss = 0

                        for(var h=0;h<yuangang.length;h++){

                            yuangangfkimg+= yuangang[h].FKIMG
                            yuangangkzwi6 += yuangang[h].KZWI6

                            yuangangnmfkimg += yuangang[h].NMFKIMG
                            yuangangnmzsjss += yuangang[h].NMFKIMG*yuangang[h].NMSJ

                            yuangangxszgssjss+=yuangang[h].XSZGSFKIMG*yuangang[h].XSZGSSJ
                            yuangangxszgsfkimg += yuangang[h].XSZGSFKIMG



                            yuangangzgsfkimg += yuangang[h].ZGSFKIMG
                            yuangangzgssjss+= yuangang[h].ZGSFKIMG*yuangang[h].ZGSSJ

                            yuangangckfkimg += yuangang[h].CKFKIMG
                            yuangangcksjss+=yuangang[h].CKFKIMG*zj[h].CKSJ
                        }
                        if(yuangangfkimg==0){yuangangzsj=0}else{yuangangzsj =(yuangangkzwi6/yuangangfkimg)*10000}
                        if(yuangangnmfkimg==0){yuangangnmsj=0}else{yuangangnmsj = yuangangnmzsjss/yuangangnmfkimg}
                        if(yuangangxszgsfkimg==0){yuangangxszgssj=0}else{yuangangxszgssj = yuangangxszgssjss/yuangangxszgsfkimg}
                        if(yuangangzgsfkimg==0){yuangangzgssj=0}else{yuangangzgssj = yuangangzgssjss/yuangangzgsfkimg}
                        if(yuangangckfkimg==0){yuangangcksj=0}else{yuangangcksj += yuangangcksjss/yuangangckfkimg}
                        let yuangangxj = {
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            FKIMG:yuangangfkimg.toFixed(2),
                            ZSJ:yuangangzsj.toFixed(2),
                            KZWI6:yuangangkzwi6.toFixed(2),
                            NMFKIMG:yuangangnmfkimg.toFixed(2),
                            NMSJ:yuangangnmsj.toFixed(2),
                            XSZGSFKIMG:yuangangxszgsfkimg.toFixed(2),
                            XSZGSSJ:yuangangxszgssj.toFixed(2),
                            ZGSFKIMG:yuangangzgsfkimg.toFixed(2),
                            ZGSSJ:yuangangzgssj.toFixed(2),
                            CKFKIMG:yuangangckfkimg.toFixed(2),
                            CKSJ:yuangangcksj.toFixed(2),
                        };
                        yuangang.unshift(yuangangxj);
                    }
                    if(xiancai.length>0){
                        let xiancaifkimg=0
                        let xiancaizsj = 0
                        let xiancaikzwi6 = 0
                        let xiancainmfkimg = 0
                        let xiancainmsj = 0
                        let xiancaixszgsfkimg=0
                        let xiancaixszgssj = 0
                        let xiancaizgsfkimg = 0
                        let xiancaizgssj = 0
                        let xiancaickfkimg= 0
                        let xiancaicksj = 0
                        let xiancainmzsjss = 0
                        let xiancaixszgssjss = 0
                        let xiancaizgssjss = 0
                        let xiancaicksjss = 0
                        for(var j=0;j<xiancai.length;j++){
                            xiancaifkimg+= xiancai[j].FKIMG
                            xiancaikzwi6 += xiancai[j].KZWI6

                            xiancainmfkimg += xiancai[j].NMFKIMG
                            xiancainmzsjss += xiancai[j].NMFKIMG*xiancai[j].NMSJ

                            xiancaixszgssjss+=xiancai[j].XSZGSFKIMG*xiancai[j].XSZGSSJ
                            xiancaixszgsfkimg += xiancai[j].XSZGSFKIMG


                            xiancaizgsfkimg += xiancai[j].ZGSFKIMG
                            xiancaizgssjss+= xiancai[j].ZGSFKIMG*xiancai[j].ZGSSJ


                            xiancaickfkimg += xiancai[j].CKFKIMG
                            xiancaicksjss+=xiancai[j].CKFKIMG*xiancai[j].CKSJ
                        }
                        if(xiancaifkimg==0){xiancaizsj=0}else{xiancaizsj =(xiancaikzwi6/xiancaifkimg)*10000}
                        if(xiancainmfkimg==0){xiancainmsj=0}else{xiancainmsj = xiancainmzsjss/xiancainmfkimg}
                        if(xiancaixszgsfkimg==0){xiancaixszgssj=0}else{xiancaixszgssj = xiancaixszgssjss/xiancaixszgsfkimg}
                        if(xiancaizgsfkimg==0){xiancaizgssj=0}else{xiancaizgssj = xiancaizgssjss/xiancaizgsfkimg}
                        if(xiancaickfkimg==0){xiancaicksj=0}else{xiancaicksj += xiancaicksjss/xiancaickfkimg}
                        let xiancaixj = {
                            ZL:"线材",
                            CXNAME:"线材小计",
                            FKIMG:xiancaifkimg.toFixed(2),
                            ZSJ:xiancaizsj.toFixed(2),
                            KZWI6:xiancaikzwi6.toFixed(2),
                            NMFKIMG:xiancainmfkimg.toFixed(2),
                            NMSJ:xiancainmsj.toFixed(2),
                            XSZGSFKIMG:xiancaixszgsfkimg.toFixed(2),
                            XSZGSSJ:xiancaixszgssj.toFixed(2),

                            ZGSFKIMG:xiancaizgsfkimg.toFixed(2),
                            ZGSSJ:xiancaizgssj.toFixed(2),

                            CKFKIMG:xiancaickfkimg.toFixed(2),
                            CKSJ:xiancaicksj.toFixed(2),
                        };
                        xiancai.unshift(xiancaixj);
                    }
                    if(xingcai.length>0){
                        let xingcaifkimg=0
                        let xingcaizsj = 0
                        let xingcaikzwi6 = 0
                        let xingcainmfkimg = 0
                        let xingcainmsj = 0
                        let xingcaixszgsfkimg=0
                        let xingcaixszgssj = 0

                        let xingcaizgsfkimg = 0
                        let xingcaizgssj = 0

                        let xingcaickfkimg= 0
                        let xingcaicksj = 0
                        let xingcainmzsjss = 0
                        let xingcaixszgssjss = 0

                        let xingcaizgssjss = 0

                        let xingcaicksjss = 0

                        for(var k=0;k<xingcai.length;k++){

                            xingcaifkimg+= xingcai[k].FKIMG
                            xingcaikzwi6 += xingcai[k].KZWI6

                            xingcainmfkimg += xingcai[k].NMFKIMG
                            xingcainmzsjss += xingcai[k].NMFKIMG*xingcai[k].NMSJ

                            xingcaixszgssjss+=xingcai[k].XSZGSFKIMG*xingcai[k].XSZGSSJ
                            xingcaixszgsfkimg += xingcai[k].XSZGSFKIMG


                            xingcaizgsfkimg += xingcai[k].ZGSFKIMG
                            xingcaizgssjss+= xingcai[k].ZGSFKIMG*xingcai[k].ZGSSJ

                            xingcaickfkimg += xingcai[k].CKFKIMG
                            xingcaicksjss+=xingcai[k].CKFKIMG*xingcai[k].CKSJ
                        }
                        if(xingcaifkimg==0){
                            xingcaizsj = 0
                        }else{
                            xingcaizsj =(xingcaikzwi6/xingcaifkimg)*10000
                        }
                        if(xingcainmfkimg==0){
                            xingcainmsj = 0
                        }else{
                            xingcainmsj = xingcainmzsjss/xingcainmfkimg
                        }
                        if(xingcaixszgsfkimg==0){
                            xingcaixszgssj=0
                        }else{
                            xingcaixszgssj = xingcaixszgssjss/xingcaixszgsfkimg
                        }

                        if(xingcaizgsfkimg==0){
                            xingcaizgssj=0
                        }else{
                            xingcaizgssj = xingcaizgssjss/xingcaizgsfkimg
                        }

                        if(xingcaickfkimg==0){
                            xingcaicksj=0
                        }else{
                            xingcaicksj += xingcaicksjss/xingcaickfkimg
                        }
                        let xingcaixj = {
                            ZL:"型材",
                            CXNAME:"型材小计",
                            FKIMG:xingcaifkimg.toFixed(2),
                            ZSJ:xingcaizsj.toFixed(2),
                            KZWI6:xingcaikzwi6.toFixed(2),
                            NMFKIMG:xingcainmfkimg.toFixed(2),
                            NMSJ:xingcainmsj.toFixed(2),
                            XSZGSFKIMG:xingcaixszgsfkimg.toFixed(2),
                            XSZGSSJ:xingcaixszgssj.toFixed(2),

                            ZGSFKIMG:xingcaizgsfkimg.toFixed(2),
                            ZGSSJ:xingcaizgssj.toFixed(2),

                            CKFKIMG:xingcaickfkimg.toFixed(2),
                            CKSJ:xingcaicksj.toFixed(2),
                        };
                        xingcai.unshift(xingcaixj);
                    }
                    let arr=jgj.concat(reban).concat(suanxi).concat(lengban).concat(duxin).concat(zhonghouban).concat(luowengang).concat(yuangang).concat(xiancai).concat(xingcai).concat(pinzhong).concat(baoban)
                    this.data = this.utils.mergeRow(arr,'ZL');
                    // this.suanxiindex=reban.length+1;
                    // this.lengbanindex=suanxiindex+lengban.length+1;
                    // this.duxinindex=lengbanindex+duxin.length+1;
                    // this.zhonghoubanindex=duxinindex+zhonghouban.length+1;
                    // this.luowengangindex=zhonghoubanindex+luowengang.length+1;
                    // this.yuangangindex=luowengangindex+yuangang.length+1;
                    // this.xiancaiindex=yuangangindex+xiancai.length+1;
                    // this.baobanindex=xiancaiindex+1;
                    this.loading = false;
                    this.mxstats = false;
                    this.mxstatsMx= false;

                });
            }
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
</style>