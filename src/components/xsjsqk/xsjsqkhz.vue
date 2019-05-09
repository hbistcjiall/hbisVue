<template>
    <div>
        <Form :label-width="50">
            <Row>
                <Col span="4">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份"  :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
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

            </Row>
            <Row>
                <Col span="4">
                    <Button @click="getList()" icon="ios-search" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "xsjsqkhz",
        data() {
            return {
                jd:'0',
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
                        width:'100',
                        align: 'center',
                    },
                    {
                        title: '集团',
                        key: 'jt',
                        align: 'center',
                        children: [
                            {
                                title: '销售量（吨）',
                                key: 'FKIMG',
                                width:'100',
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
                                width:'100',
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
                                width:'100',
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
                                width:'100',
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
                                width:'100',
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
                                width:'100',
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
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '专业公司（吨）',
                                key: 'ZYFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'ZYSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '分公司（吨）',
                                key: 'FGSFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'FGSSJ',
                                align: 'center',
                                width:'100',
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
                                width:'100',
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
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '事业部（吨）',
                                key: 'SYBFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'SYBSJ',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '现货（吨）',
                                key: 'XHFKIMG',
                                align: 'center',
                                width:'100',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }

                            },
                            {
                                title: '平均售价（元/吨）',
                                key: 'XHSJ',
                                align: 'center',
                                width:'100',
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
                        title: '自办公司',
                        key: 'zbgs',
                        align: 'center',
                        children: [
                            {
                                title: '销售量(吨)',
                                key: 'ZBGSFKIMG',
                                width:'100',
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
                                key: 'ZBGSSJ',
                                align: 'center',
                                width:'100',
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
                                width:'100',
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
                                width:'100',
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
        },
        methods: {
            getCxData(){
                // this.cxCx.companyId = this.dw
                let type="type="
                type+="1"
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxNamePzg", {
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
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '销售结算情况（产线）明细',
                });
            },
            getList() {
                let cxArr = '&cx=' +this.cx.toString()
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                let pz = "pz="+this.pz
                let jd = "jd="+this.jd
                fetch(this.$store.state.fetchPath + "/yxyb/getxsjswccx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+cxArr+"&"+pz+"&"+jd,
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
                        let zyfkimg = 0
                        let zysj = 0
                        let fgsfimg = 0
                        let fgssj = 0
                        let zgsfkimg = 0
                        let zgssj = 0
                        let sybfkimg = 0
                        let sybsj = 0
                        let xhfimg = 0
                        let xhsj = 0
                        let zbgsfkimg = 0
                        let zbgssj = 0
                        let ckfkimg= 0
                        let cksj = 0
                        let nmzsjss = 0
                        let xszgssjss = 0
                        let zysjss = 0
                        let fgssjss = 0
                        let zgssjss = 0
                        let sybsjss=0
                        let xhsjss = 0
                        let cksjss = 0
                        let zbgssjss = 0
                        for(var a=0;a<zj.length;a++){

                            fkimg+= zj[a].FKIMG
                            kzwi6 += zj[a].KZWI6

                            nmfkimg += zj[a].NMFKIMG
                            nmzsjss += zj[a].NMFKIMG*zj[a].NMSJ

                            xszgssjss+=zj[a].XSZGSFKIMG*zj[a].XSZGSSJ
                            xszgsfkimg += zj[a].XSZGSFKIMG

                            zysjss += zj[a].ZYFKIMG*zj[a].ZYSJ
                            zyfkimg += zj[a].ZYFKIMG

                            fgssjss+= zj[a].FGSFKIMG*zj[a].FGSSJ
                            fgsfimg += zj[a].FGSFKIMG

                            zgsfkimg += zj[a].ZGSFKIMG
                            zgssjss+= zj[a].ZGSFKIMG*zj[a].ZGSSJ

                            sybfkimg += zj[a].SYBFKIMG
                            sybsjss+=zj[a].SYBFKIMG*zj[a].SYBSJ

                            xhfimg += zj[a].XHFKIMG
                            xhsjss+=zj[a].XHSJ*zj[a].XHFKIMG

                            zbgsfkimg += zj[a].ZBGSFKIMG
                            zbgssjss+=zj[a].ZBGSFKIMG*zj[a].ZBGSSJ

                            ckfkimg += zj[a].CKFKIMG
                            cksjss+=zj[a].CKFKIMG*zj[a].CKSJ
                        }
                        if(fkimg==0){zsj=0}else{zsj =(kzwi6/fkimg)*10000}
                        if(nmfkimg==0){nmsj=0}else{nmsj = nmzsjss/nmfkimg}
                        if(xszgsfkimg==0){xszgssj=0}else{xszgssj = xszgssjss/xszgsfkimg}
                        if(zyfkimg==0){zysj=0}else{zysj = zysjss/zyfkimg}
                        if(fgsfimg==0){fgssj=0}else{fgssj = fgssjss/fgsfimg}
                        if(zgsfkimg==0){zgssj=0}else{zgssj = zgssjss/zgsfkimg}
                        if(sybfkimg==0){sybsj=0}else{sybsj = sybsjss/sybfkimg}
                        if(xhfimg==0){xhsj=0}else{xhsj = xhsjss/xhfimg}
                        if(zbgsfkimg==0){zbgssj=0}else{zbgssj = zbgssjss/zbgsfkimg}
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
                            ZYFKIMG:zyfkimg.toFixed(2),
                            ZYSJ:zysj.toFixed(2),
                            FGSFKIMG:fgsfimg.toFixed(2),
                            FGSSJ:fgssj.toFixed(2),
                            ZGSFKIMG:zgsfkimg.toFixed(2),
                            ZGSSJ:zgssj.toFixed(2),
                            SYBFKIMG:sybfkimg.toFixed(2),
                            SYBSJ:sybsj.toFixed(2),
                            XHFKIMG:xhfimg.toFixed(2),
                            XHSJ:xhsj.toFixed(2),
                            ZBGSFKIMG:zbgsfkimg.toFixed(2),
                            ZBGSSJ:zbgssj.toFixed(2),
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
                        let rebanzyfkimg = 0
                        let rebanzysj = 0
                        let rebanfgsfimg = 0
                        let rebanfgssj = 0
                        let rebanzgsfkimg = 0
                        let rebanzgssj = 0
                        let rebansybfkimg = 0
                        let rebansybsj = 0
                        let rebanxhfimg = 0
                        let rebanxhsj = 0
                        let rebanzbgsfkimg = 0
                        let rebanzbgssj = 0
                        let rebanckfkimg= 0
                        let rebancksj = 0
                        let rebannmzsjss = 0
                        let rebanxszgssjss = 0
                        let rebanzysjss = 0
                        let rebanfgssjss = 0
                        let rebanzgssjss = 0
                        let rebansybsjss=0
                        let rebanxhsjss = 0
                        let rebancksjss = 0
                        let rebanzbgssjss = 0
                        for(var b=0;b<reban.length;b++){
                            rebanfkimg+= reban[b].FKIMG
                            rebankzwi6 += reban[b].KZWI6

                            rebannmfkimg += reban[b].NMFKIMG
                            rebannmzsjss += reban[b].NMFKIMG*reban[b].NMSJ

                            rebanxszgssjss+=reban[b].XSZGSFKIMG*reban[b].XSZGSSJ
                            rebanxszgsfkimg += reban[b].XSZGSFKIMG

                            rebanzysjss += reban[b].ZYFKIMG*reban[b].ZYSJ
                            rebanzyfkimg += reban[b].ZYFKIMG

                            rebanfgssjss+= reban[b].FGSFKIMG*reban[b].FGSSJ
                            rebanfgsfimg += reban[b].FGSFKIMG

                            rebanzgsfkimg += reban[b].ZGSFKIMG
                            rebanzgssjss+= reban[b].ZGSFKIMG*reban[b].ZGSSJ

                            rebansybfkimg += reban[b].SYBFKIMG
                            rebansybsjss+=reban[b].SYBFKIMG*reban[b].SYBSJ

                            rebanxhfimg += reban[b].XHFKIMG
                            rebanxhsjss+=reban[b].XHSJ*reban[b].XHFKIMG

                            rebanzbgsfkimg += reban[b].ZBGSFKIMG
                            rebanzbgssjss+=reban[b].ZBGSFKIMG*reban[b].ZBGSSJ

                            rebanckfkimg +=reban[b].CKFKIMG
                            rebancksjss+=reban[b].CKFKIMG*reban[b].CKSJ
                        }
                        if(rebanfkimg==0){rebanzsj=0}else{rebanzsj =(rebankzwi6/rebanfkimg)*10000}
                        if(rebannmfkimg==0){rebannmsj=0}else{rebannmsj = rebannmzsjss/rebannmfkimg}
                        if(rebanxszgsfkimg==0){rebanxszgssj=0}else{rebanxszgssj = rebanxszgssjss/rebanxszgsfkimg}
                        if(rebanzyfkimg==0){rebanzysj=0}else{rebanzysj = rebanzysjss/rebanzyfkimg}
                        if(rebanfgsfimg==0){rebanfgssj=0}else{rebanfgssj = rebanfgssjss/rebanfgsfimg}
                        if(rebanzgsfkimg==0){rebanzgssj=0}else{rebanzgssj = rebanzgssjss/rebanzgsfkimg}
                        if(rebansybfkimg==0){rebansybsj=0}else{rebansybsj = rebansybsjss/rebansybfkimg}
                        if(rebanxhfimg==0){rebanxhsj=0}else{rebanxhsj = rebanxhsjss/rebanxhfimg}
                        if(rebanzbgsfkimg==0){rebanzbgssj=0}else{rebanzbgssj = rebanzbgssjss/rebanzbgsfkimg}
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
                            ZYFKIMG:rebanzyfkimg.toFixed(2),
                            ZYSJ:rebanzysj.toFixed(2),
                            FGSFKIMG:rebanfgsfimg.toFixed(2),
                            FGSSJ:rebanfgssj.toFixed(2),
                            ZGSFKIMG:rebanzgsfkimg.toFixed(2),
                            ZGSSJ:rebanzgssj.toFixed(2),
                            SYBFKIMG:rebansybfkimg.toFixed(2),
                            SYBSJ:rebansybsj.toFixed(2),
                            XHFKIMG:rebanxhfimg.toFixed(2),
                            XHSJ:rebanxhsj.toFixed(2),
                            ZBGSFKIMG:rebanzbgsfkimg.toFixed(2),
                            ZBGSSJ:rebanzbgssj.toFixed(2),
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
                        let suanxizyfkimg = 0
                        let suanxizysj = 0
                        let suanxifgsfimg = 0
                        let suanxifgssj = 0
                        let suanxizgsfkimg = 0
                        let suanxizgssj = 0
                        let suanxisybfkimg = 0
                        let suanxisybsj = 0
                        let suanxixhfimg = 0
                        let suanxixhsj = 0
                        let suanxizbgsfkimg = 0
                        let suanxizbgssj = 0
                        let suanxickfkimg= 0
                        let suanxicksj = 0
                        let suanxinmzsjss = 0
                        let suanxixszgssjss = 0
                        let suanxizysjss = 0
                        let suanxifgssjss = 0
                        let suanxizgssjss = 0
                        let suanxisybsjss=0
                        let suanxixhsjss = 0
                        let suanxicksjss = 0
                        let suanxizbgssjss = 0
                        for(var c=0;c<suanxi.length;c++){

                            suanxifkimg+= suanxi[c].FKIMG
                            suanxikzwi6 += suanxi[c].KZWI6

                            suanxinmfkimg += suanxi[c].NMFKIMG
                            suanxinmzsjss += suanxi[c].NMFKIMG*suanxi[c].NMSJ

                            suanxixszgssjss+=suanxi[c].XSZGSFKIMG*suanxi[c].XSZGSSJ
                            suanxixszgsfkimg += suanxi[c].XSZGSFKIMG

                            suanxizysjss += suanxi[c].ZYFKIMG*suanxi[c].ZYSJ
                            suanxizyfkimg += suanxi[c].ZYFKIMG

                            suanxifgssjss+= suanxi[c].FGSFKIMG*suanxi[c].FGSSJ
                            suanxifgsfimg += suanxi[c].FGSFKIMG

                            suanxizgsfkimg += suanxi[c].ZGSFKIMG
                            suanxizgssjss+= suanxi[c].ZGSFKIMG*suanxi[c].ZGSSJ

                            suanxisybfkimg += suanxi[c].SYBFKIMG
                            suanxisybsjss+=suanxi[c].SYBFKIMG*suanxi[c].SYBSJ

                            suanxixhfimg += suanxi[c].XHFKIMG
                            suanxixhsjss+=suanxi[c].XHSJ*suanxi[c].XHFKIMG

                            suanxizbgsfkimg += suanxi[c].ZBGSFKIMG
                            suanxizbgssjss+=suanxi[c].ZBGSFKIMG*suanxi[c].ZBGSSJ

                            suanxickfkimg += suanxi[c].CKFKIMG
                            suanxicksjss+=suanxi[c].CKFKIMG*suanxi[c].CKSJ
                        }
                        if(suanxifkimg==0){suanxizsj=0}else{suanxizsj =(suanxikzwi6/suanxifkimg)*10000}
                        if(suanxinmfkimg==0){suanxinmsj=0}else{suanxinmsj = suanxinmzsjss/suanxinmfkimg}
                        if(suanxixszgsfkimg==0){suanxixszgssj=0}else{suanxixszgssj = suanxixszgssjss/suanxixszgsfkimg}
                        if(suanxizyfkimg==0){suanxizysj=0}else{suanxizysj = suanxizysjss/suanxizyfkimg}
                        if(suanxifgsfimg==0){suanxifgssj=0}else{suanxifgssj = suanxifgssjss/suanxifgsfimg}
                        if(suanxizgsfkimg==0){suanxizgssj=0}else{suanxizgssj = suanxizgssjss/suanxizgsfkimg}
                        if(suanxisybfkimg==0){suanxisybsj=0}else{suanxisybsj = suanxisybsjss/suanxisybfkimg}
                        if(suanxixhfimg==0){suanxixhsj=0}else{suanxixhsj = suanxixhsjss/suanxixhfimg}
                        if(suanxizbgsfkimg==0){suanxizbgssj=0}else{suanxizbgssj = suanxizbgssjss/suanxizbgsfkimg}
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
                            ZYFKIMG:suanxizyfkimg.toFixed(2),
                            ZYSJ:suanxizysj.toFixed(2),
                            FGSFKIMG:suanxifgsfimg.toFixed(2),
                            FGSSJ:suanxifgssj.toFixed(2),
                            ZGSFKIMG:suanxizgsfkimg.toFixed(2),
                            ZGSSJ:suanxizgssj.toFixed(2),
                            SYBFKIMG:suanxisybfkimg.toFixed(2),
                            SYBSJ:suanxisybsj.toFixed(2),
                            XHFKIMG:suanxixhfimg.toFixed(2),
                            XHSJ:suanxixhsj.toFixed(2),
                            ZBGSFKIMG:suanxizbgsfkimg.toFixed(2),
                            ZBGSSJ:suanxizbgssj.toFixed(2),
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
                        let lengbanzyfkimg = 0
                        let lengbanzysj = 0
                        let lengbanfgsfimg = 0
                        let lengbanfgssj = 0
                        let lengbanzgsfkimg = 0
                        let lengbanzgssj = 0
                        let lengbansybfkimg = 0
                        let lengbansybsj = 0
                        let lengbanxhfimg = 0
                        let lengbanxhsj = 0
                        let lengbanzbgsfkimg = 0
                        let lengbanzbgssj = 0
                        let lengbanckfkimg= 0
                        let lengbancksj = 0
                        let lengbannmzsjss = 0
                        let lengbanxszgssjss = 0
                        let lengbanzysjss = 0
                        let lengbanfgssjss = 0
                        let lengbanzgssjss = 0
                        let lengbansybsjss=0
                        let lengbanxhsjss = 0
                        let lengbancksjss = 0
                        let lengbanzbgssjss = 0
                        for(var d=0;d<lengban.length;d++){

                            lengbanfkimg+= lengban[d].FKIMG
                            lengbankzwi6 += lengban[d].KZWI6

                            lengbannmfkimg += lengban[d].NMFKIMG
                            lengbannmzsjss += lengban[d].NMFKIMG*lengban[d].NMSJ

                            lengbanxszgssjss+=lengban[d].XSZGSFKIMG*lengban[d].XSZGSSJ
                            lengbanxszgsfkimg += lengban[d].XSZGSFKIMG

                            lengbanzysjss += lengban[d].ZYFKIMG*lengban[d].ZYSJ
                            lengbanzyfkimg += lengban[d].ZYFKIMG

                            lengbanfgssjss+= lengban[d].FGSFKIMG*lengban[d].FGSSJ
                            lengbanfgsfimg += lengban[d].FGSFKIMG

                            lengbanzgsfkimg += lengban[d].ZGSFKIMG
                            lengbanzgssjss+= lengban[d].ZGSFKIMG*lengban[d].ZGSSJ

                            lengbansybfkimg += lengban[d].SYBFKIMG
                            lengbansybsjss+=lengban[d].SYBFKIMG*lengban[d].SYBSJ

                            lengbanxhfimg += lengban[d].XHFKIMG
                            lengbanxhsjss+=lengban[d].XHSJ*lengban[d].XHFKIMG

                            lengbanzbgsfkimg += lengban[d].ZBGSFKIMG
                            lengbanzbgssjss+=lengban[d].ZBGSFKIMG*lengban[d].ZBGSSJ

                            lengbanckfkimg += lengban[d].CKFKIMG
                            lengbancksjss+=lengban[d].CKFKIMG*lengban[d].CKSJ
                        }
                        if(lengbanfkimg==0){lengbanzsj=0}else{lengbanzsj =(lengbankzwi6/lengbanfkimg)*10000}
                        if(lengbannmfkimg==0){lengbannmsj=0}else{lengbannmsj = lengbannmzsjss/lengbannmfkimg}
                        if(lengbanxszgsfkimg==0){lengbanxszgssj=0}else{lengbanxszgssj = lengbanxszgssjss/lengbanxszgsfkimg}
                        if(lengbanzyfkimg==0){lengbanzysj=0}else{lengbanzysj = lengbanzysjss/lengbanzyfkimg}
                        if(lengbanfgsfimg==0){lengbanfgssj=0}else{lengbanfgssj = lengbanfgssjss/lengbanfgsfimg}
                        if(lengbanzgsfkimg==0){lengbanzgssj=0}else{lengbanzgssj = lengbanzgssjss/lengbanzgsfkimg}
                        if(lengbansybfkimg==0){lengbansybsj=0}else{lengbansybsj = lengbansybsjss/lengbansybfkimg}
                        if(lengbanxhfimg==0){lengbanxhsj=0}else{lengbanxhsj = lengbanxhsjss/lengbanxhfimg}
                        if(lengbanzbgsfkimg==0){lengbanzbgssj=0}else{lengbanzbgssj = lengbanzbgssjss/lengbanzbgsfkimg}
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
                            ZYFKIMG:lengbanzyfkimg.toFixed(2),
                            ZYSJ:lengbanzysj.toFixed(2),
                            FGSFKIMG:lengbanfgsfimg.toFixed(2),
                            FGSSJ:lengbanfgssj.toFixed(2),
                            ZGSFKIMG:lengbanzgsfkimg.toFixed(2),
                            ZGSSJ:lengbanzgssj.toFixed(2),
                            SYBFKIMG:lengbansybfkimg.toFixed(2),
                            SYBSJ:lengbansybsj.toFixed(2),
                            XHFKIMG:lengbanxhfimg.toFixed(2),
                            XHSJ:lengbanxhsj.toFixed(2),
                            ZBGSFKIMG:lengbanzbgsfkimg.toFixed(2),
                            ZBGSSJ:lengbanzbgssj.toFixed(2),
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
                        let duxinzyfkimg = 0
                        let duxinzysj = 0
                        let duxinfgsfimg = 0
                        let duxinfgssj = 0
                        let duxinzgsfkimg = 0
                        let duxinzgssj = 0
                        let duxinsybfkimg = 0
                        let duxinsybsj = 0
                        let duxinxhfimg = 0
                        let duxinxhsj = 0
                        let duxinzbgsfkimg = 0
                        let duxinzbgssj = 0
                        let duxinckfkimg= 0
                        let duxincksj = 0
                        let duxinnmzsjss = 0
                        let duxinxszgssjss = 0
                        let duxinzysjss = 0
                        let duxinfgssjss = 0
                        let duxinzgssjss = 0
                        let duxinsybsjss=0
                        let duxinxhsjss = 0
                        let duxincksjss = 0
                        let duxinzbgssjss = 0
                        for(var e=0;e<duxin.length;e++){

                            duxinfkimg+= duxin[e].FKIMG
                            duxinkzwi6 += duxin[e].KZWI6

                            duxinnmfkimg += duxin[e].NMFKIMG
                            duxinnmzsjss += duxin[e].NMFKIMG*duxin[e].NMSJ

                            duxinxszgssjss+=duxin[e].XSZGSFKIMG*duxin[e].XSZGSSJ
                            duxinxszgsfkimg +=duxin[e].XSZGSFKIMG

                            duxinzysjss += duxin[e].ZYFKIMG*duxin[e].ZYSJ
                            duxinzyfkimg += duxin[e].ZYFKIMG

                            duxinfgssjss+= duxin[e].FGSFKIMG*duxin[e].FGSSJ
                            duxinfgsfimg += duxin[e].FGSFKIMG

                            duxinzgsfkimg += duxin[e].ZGSFKIMG
                            duxinzgssjss+= duxin[e].ZGSFKIMG*duxin[e].ZGSSJ

                            duxinsybfkimg += duxin[e].SYBFKIMG
                            duxinsybsjss+=duxin[e].SYBFKIMG*duxin[e].SYBSJ

                            duxinxhfimg += duxin[e].XHFKIMG
                            duxinxhsjss+=duxin[e].XHSJ*duxin[e].XHFKIMG

                            duxinzbgsfkimg += duxin[e].ZBGSFKIMG
                            duxinzbgssjss+=duxin[e].ZBGSFKIMG*duxin[e].ZBGSSJ

                            duxinckfkimg += duxin[e].CKFKIMG
                            duxincksjss+=duxin[e].CKFKIMG*duxin[e].CKSJ
                        }
                        if(duxinfkimg==0){duxinzsj=0}else{duxinzsj =(duxinkzwi6/duxinfkimg)*10000}
                        if(duxinnmfkimg==0){duxinnmsj=0}else{duxinnmsj = duxinnmzsjss/duxinnmfkimg}
                        if(duxinxszgsfkimg==0){duxinxszgssj=0}else{duxinxszgssj = duxinxszgssjss/duxinxszgsfkimg}
                        if(duxinzyfkimg==0){duxinzysj=0}else{duxinzysj = duxinzysjss/duxinzyfkimg}
                        if(duxinfgsfimg==0){duxinfgssj=0}else{duxinfgssj = duxinfgssjss/duxinfgsfimg}
                        if(duxinzgsfkimg==0){duxinzgssj=0}else{duxinzgssj = duxinzgssjss/duxinzgsfkimg}
                        if(duxinsybfkimg==0){duxinsybsj=0}else{duxinsybsj = duxinsybsjss/duxinsybfkimg}
                        if(duxinxhfimg==0){duxinxhsj=0}else{duxinxhsj = duxinxhsjss/duxinxhfimg}
                        if(duxinzbgsfkimg==0){duxinzbgssj=0}else{duxinzbgssj = duxinzbgssjss/duxinzbgsfkimg}
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
                            ZYFKIMG:duxinzyfkimg.toFixed(2),
                            ZYSJ:duxinzysj.toFixed(2),
                            FGSFKIMG:duxinfgsfimg.toFixed(2),
                            FGSSJ:duxinfgssj.toFixed(2),
                            ZGSFKIMG:duxinzgsfkimg.toFixed(2),
                            ZGSSJ:duxinzgssj.toFixed(2),
                            SYBFKIMG:duxinsybfkimg.toFixed(2),
                            SYBSJ:duxinsybsj.toFixed(2),
                            XHFKIMG:duxinxhfimg.toFixed(2),
                            XHSJ:duxinxhsj.toFixed(2),
                            ZBGSFKIMG:duxinzbgsfkimg.toFixed(2),
                            ZBGSSJ:duxinzbgssj.toFixed(2),
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
                        let zhonghoubanzyfkimg = 0
                        let zhonghoubanzysj = 0
                        let zhonghoubanfgsfimg = 0
                        let zhonghoubanfgssj = 0
                        let zhonghoubanzgsfkimg = 0
                        let zhonghoubanzgssj = 0
                        let zhonghoubansybfkimg = 0
                        let zhonghoubansybsj = 0
                        let zhonghoubanxhfimg = 0
                        let zhonghoubanxhsj = 0
                        let zhonghoubanzbgsfkimg = 0
                        let zhonghoubanzbgssj = 0
                        let zhonghoubanckfkimg= 0
                        let zhonghoubancksj = 0
                        let zhonghoubannmzsjss = 0
                        let zhonghoubanxszgssjss = 0
                        let zhonghoubanzysjss = 0
                        let zhonghoubanfgssjss = 0
                        let zhonghoubanzgssjss = 0
                        let zhonghoubansybsjss=0
                        let zhonghoubanxhsjss = 0
                        let zhonghoubancksjss = 0
                        let zhonghoubanzbgssjss = 0
                        for(var f=0;f<zhonghouban.length;f++){

                            zhonghoubanfkimg+= zhonghouban[f].FKIMG
                            zhonghoubankzwi6 += zhonghouban[f].KZWI6

                            zhonghoubannmfkimg += zhonghouban[f].NMFKIMG
                            zhonghoubannmzsjss += zhonghouban[f].NMFKIMG*zhonghouban[f].NMSJ

                            zhonghoubanxszgssjss+=zhonghouban[f].XSZGSFKIMG*zhonghouban[f].XSZGSSJ
                            zhonghoubanxszgsfkimg += zhonghouban[f].XSZGSFKIMG

                            zhonghoubanzysjss += zhonghouban[f].ZYFKIMG*zhonghouban[f].ZYSJ
                            zhonghoubanzyfkimg += zhonghouban[f].ZYFKIMG

                            zhonghoubanfgssjss+= zhonghouban[f].FGSFKIMG*zhonghouban[f].FGSSJ
                            zhonghoubanfgsfimg += zhonghouban[f].FGSFKIMG

                            zhonghoubanzgsfkimg += zhonghouban[f].ZGSFKIMG
                            zhonghoubanzgssjss+= zhonghouban[f].ZGSFKIMG*zhonghouban[f].ZGSSJ

                            zhonghoubansybfkimg += zhonghouban[f].SYBFKIMG
                            zhonghoubansybsjss+=zhonghouban[f].SYBFKIMG*zhonghouban[f].SYBSJ

                            zhonghoubanxhfimg += zhonghouban[f].XHFKIMG
                            zhonghoubanxhsjss+=zhonghouban[f].XHSJ*zhonghouban[f].XHFKIMG

                            zhonghoubanzbgsfkimg += zhonghouban[f].ZBGSFKIMG
                            zhonghoubanzbgssjss+=zhonghouban[f].ZBGSFKIMG*zhonghouban[f].ZBGSSJ

                            zhonghoubanckfkimg += zhonghouban[f].CKFKIMG
                            zhonghoubancksjss+=zhonghouban[f].CKFKIMG*zhonghouban[f].CKSJ
                        }
                        if(zhonghoubanfkimg==0){zhonghoubanzsj=0}else{zhonghoubanzsj =(zhonghoubankzwi6/zhonghoubanfkimg)*10000}
                        if(zhonghoubannmfkimg==0){zhonghoubannmsj=0}else{zhonghoubannmsj = zhonghoubannmzsjss/zhonghoubannmfkimg}
                        if(zhonghoubanxszgsfkimg==0){zhonghoubanxszgssj=0}else{zhonghoubanxszgssj = zhonghoubanxszgssjss/zhonghoubanxszgsfkimg}
                        if(zhonghoubanzyfkimg==0){zhonghoubanzysj=0}else{zhonghoubanzysj = zhonghoubanzysjss/zhonghoubanzyfkimg}
                        if(zhonghoubanfgsfimg==0){zhonghoubanfgssj=0}else{zhonghoubanfgssj = zhonghoubanfgssjss/zhonghoubanfgsfimg}
                        if(zhonghoubanzgsfkimg==0){zhonghoubanzgssj=0}else{zhonghoubanzgssj = zhonghoubanzgssjss/zhonghoubanzgsfkimg}
                        if(zhonghoubansybfkimg==0){zhonghoubansybsj=0}else{zhonghoubansybsj =zhonghoubansybsjss/zhonghoubansybfkimg}
                        if(zhonghoubanxhfimg==0){zhonghoubanxhsj=0}else{zhonghoubanxhsj = zhonghoubanxhsjss/zhonghoubanxhfimg}
                        if(zhonghoubanzbgsfkimg==0){zhonghoubanzbgssj=0}else{zhonghoubanzbgssj = zhonghoubanzbgssjss/zhonghoubanzbgsfkimg}
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
                            ZYFKIMG:zhonghoubanzyfkimg.toFixed(2),
                            ZYSJ:zhonghoubanzysj.toFixed(2),
                            FGSFKIMG:zhonghoubanfgsfimg.toFixed(2),
                            FGSSJ:zhonghoubanfgssj.toFixed(2),
                            ZGSFKIMG:zhonghoubanzgsfkimg.toFixed(2),
                            ZGSSJ:zhonghoubanzgssj.toFixed(2),
                            SYBFKIMG:zhonghoubansybfkimg.toFixed(2),
                            SYBSJ:zhonghoubansybsj.toFixed(2),
                            XHFKIMG:zhonghoubanxhfimg.toFixed(2),
                            XHSJ:zhonghoubanxhsj.toFixed(2),
                            ZBGSFKIMG:zhonghoubanzbgsfkimg.toFixed(2),
                            ZBGSSJ:zhonghoubanzbgssj.toFixed(2),
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
                        let luowengangzyfkimg = 0
                        let luowengangzysj = 0
                        let luowengangfgsfimg = 0
                        let luowengangfgssj = 0
                        let luowengangzgsfkimg = 0
                        let luowengangzgssj = 0
                        let luowengangsybfkimg = 0
                        let luowengangsybsj = 0
                        let luowengangxhfimg = 0
                        let luowengangxhsj = 0
                        let luowengangzbgsfkimg = 0
                        let luowengangzbgssj = 0
                        let luowengangckfkimg= 0
                        let luowengangcksj = 0
                        let luowengangnmzsjss = 0
                        let luowengangxszgssjss = 0
                        let luowengangzysjss = 0
                        let luowengangfgssjss = 0
                        let luowengangzgssjss = 0
                        let luowengangsybsjss=0
                        let luowengangxhsjss = 0
                        let luowengangcksjss = 0
                        let luowengangzbgssjss = 0
                        for(var g=0;g<luowengang.length;g++){

                            luowengangfkimg+= luowengang[g].FKIMG
                            luowengangkzwi6 += luowengang[g].KZWI6

                            luowengangnmfkimg += luowengang[g].NMFKIMG
                            luowengangnmzsjss += luowengang[g].NMFKIMG*luowengang[g].NMSJ

                            luowengangxszgssjss+=luowengang[g].XSZGSFKIMG*luowengang[g].XSZGSSJ
                            luowengangxszgsfkimg += luowengang[g].XSZGSFKIMG

                            luowengangzysjss += luowengang[g].ZYFKIMG*luowengang[g].ZYSJ
                            luowengangzyfkimg += luowengang[g].ZYFKIMG

                            luowengangfgssjss+= luowengang[g].FGSFKIMG*luowengang[g].FGSSJ
                            luowengangfgsfimg += luowengang[g].FGSFKIMG

                            luowengangzgsfkimg += luowengang[g].ZGSFKIMG
                            luowengangzgssjss+= luowengang[g].ZGSFKIMG*zj[g].ZGSSJ

                            luowengangsybfkimg += luowengang[g].SYBFKIMG
                            luowengangsybsjss+=luowengang[g].SYBFKIMG*luowengang[g].SYBSJ

                            luowengangxhfimg += luowengang[g].XHFKIMG
                            luowengangxhsjss+=luowengang[g].XHSJ*luowengang[g].XHFKIMG

                            luowengangzbgsfkimg += luowengang[g].ZBGSFKIMG
                            luowengangzbgssjss+=luowengang[g].ZBGSFKIMG*luowengang[g].ZBGSSJ

                            luowengangckfkimg += luowengang[g].CKFKIMG
                            luowengangcksjss+=luowengang[g].CKFKIMG*luowengang[g].CKSJ
                        }
                        if(luowengangfkimg==0){luowengangzsj=0}else{luowengangzsj =(luowengangkzwi6/luowengangfkimg)*10000}
                        if(luowengangnmfkimg==0){luowengangnmsj=0}else{luowengangnmsj = luowengangnmzsjss/luowengangnmfkimg}
                        if(luowengangxszgsfkimg==0){luowengangxszgssj=0}else{luowengangxszgssj = luowengangxszgssjss/luowengangxszgsfkimg}
                        if(luowengangzyfkimg==0){luowengangzysj=0}else{luowengangzysj = luowengangzysjss/luowengangzyfkimg}
                        if(luowengangfgsfimg==0){luowengangfgssj=0}else{luowengangfgssj = luowengangfgssjss/luowengangfgsfimg}
                        if(luowengangzgsfkimg==0){luowengangzgssj=0}else{luowengangzgssj = luowengangzgssjss/luowengangzgsfkimg}
                        if(luowengangsybfkimg==0){luowengangsybsj=0}else{luowengangsybsj = luowengangsybsjss/luowengangsybfkimg}
                        if(luowengangxhfimg==0){luowengangxhsj=0}else{luowengangxhsj = luowengangxhsjss/luowengangxhfimg}
                        if(luowengangzbgsfkimg==0){luowengangzbgssj=0}else{luowengangzbgssj = luowengangzbgssjss/luowengangzbgsfkimg}
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
                            ZYFKIMG:luowengangzyfkimg.toFixed(2),
                            ZYSJ:luowengangzysj.toFixed(2),
                            FGSFKIMG:luowengangfgsfimg.toFixed(2),
                            FGSSJ:luowengangfgssj.toFixed(2),
                            ZGSFKIMG:luowengangzgsfkimg.toFixed(2),
                            ZGSSJ:luowengangzgssj.toFixed(2),
                            SYBFKIMG:luowengangsybfkimg.toFixed(2),
                            SYBSJ:luowengangsybsj.toFixed(2),
                            XHFKIMG:luowengangxhfimg.toFixed(2),
                            XHSJ:luowengangxhsj.toFixed(2),
                            ZBGSFKIMG:luowengangzbgsfkimg.toFixed(2),
                            ZBGSSJ:luowengangzbgssj.toFixed(2),
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
                        let yuangangzyfkimg = 0
                        let yuangangzysj = 0
                        let yuangangfgsfimg = 0
                        let yuangangfgssj = 0
                        let yuangangzgsfkimg = 0
                        let yuangangzgssj = 0
                        let yuangangsybfkimg = 0
                        let yuangangsybsj = 0
                        let yuangangxhfimg = 0
                        let yuangangxhsj = 0
                        let yuangangzbgsfkimg = 0
                        let yuangangzbgssj = 0
                        let yuangangckfkimg= 0
                        let yuangangcksj = 0
                        let yuangangnmzsjss = 0
                        let yuangangxszgssjss = 0
                        let yuangangzysjss = 0
                        let yuangangfgssjss = 0
                        let yuangangzgssjss = 0
                        let yuangangsybsjss=0
                        let yuangangxhsjss = 0
                        let yuangangcksjss = 0
                        let yuangangzbgssjss = 0
                        for(var h=0;h<yuangang.length;h++){

                            yuangangfkimg+= yuangang[h].FKIMG
                            yuangangkzwi6 += yuangang[h].KZWI6

                            yuangangnmfkimg += yuangang[h].NMFKIMG
                            yuangangnmzsjss += yuangang[h].NMFKIMG*yuangang[h].NMSJ

                            yuangangxszgssjss+=yuangang[h].XSZGSFKIMG*yuangang[h].XSZGSSJ
                            yuangangxszgsfkimg += yuangang[h].XSZGSFKIMG

                            yuangangzysjss += yuangang[h].ZYFKIMG*yuangang[h].ZYSJ
                            yuangangzyfkimg += yuangang[h].ZYFKIMG

                            yuangangfgssjss+= yuangang[h].FGSFKIMG*yuangang[h].FGSSJ
                            yuangangfgsfimg += yuangang[h].FGSFKIMG

                            yuangangzgsfkimg += yuangang[h].ZGSFKIMG
                            yuangangzgssjss+= yuangang[h].ZGSFKIMG*yuangang[h].ZGSSJ

                            yuangangsybfkimg += yuangang[h].SYBFKIMG
                            yuangangsybsjss+=yuangang[h].SYBFKIMG*yuangang[h].SYBSJ

                            yuangangxhfimg += yuangang[h].XHFKIMG
                            yuangangxhsjss+=yuangang[h].XHSJ*yuangang[h].XHFKIMG

                            yuangangzbgsfkimg += yuangang[h].ZBGSFKIMG
                            yuangangzbgssjss+=yuangang[h].ZBGSFKIMG*yuangang[h].ZBGSSJ

                            yuangangckfkimg += yuangang[h].CKFKIMG
                            yuangangcksjss+=yuangang[h].CKFKIMG*zj[h].CKSJ
                        }
                        if(yuangangfkimg==0){yuangangzsj=0}else{yuangangzsj =(yuangangkzwi6/yuangangfkimg)*10000}
                        if(yuangangnmfkimg==0){yuangangnmsj=0}else{yuangangnmsj = yuangangnmzsjss/yuangangnmfkimg}
                        if(yuangangxszgsfkimg==0){yuangangxszgssj=0}else{yuangangxszgssj = yuangangxszgssjss/yuangangxszgsfkimg}
                        if(yuangangzyfkimg==0){yuangangzysj=0}else{yuangangzysj = yuangangzysjss/yuangangzyfkimg}
                        if(yuangangfgsfimg==0){yuangangfgssj=0}else{yuangangfgssj = yuangangfgssjss/yuangangfgsfimg}
                        if(yuangangzgsfkimg==0){yuangangzgssj=0}else{yuangangzgssj = yuangangzgssjss/yuangangzgsfkimg}
                        if(yuangangsybfkimg==0){yuangangsybsj=0}else{yuangangsybsj = yuangangsybsjss/yuangangsybfkimg}
                        if(yuangangxhfimg==0){yuangangxhsj=0}else{yuangangxhsj = yuangangxhsjss/yuangangxhfimg}
                        if(yuangangzbgsfkimg==0){yuangangzbgssj=0}else{yuangangzbgssj = yuangangzbgssjss/yuangangzbgsfkimg}
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
                            ZYFKIMG:yuangangzyfkimg.toFixed(2),
                            ZYSJ:yuangangzysj.toFixed(2),
                            FGSFKIMG:yuangangfgsfimg.toFixed(2),
                            FGSSJ:yuangangfgssj.toFixed(2),
                            ZGSFKIMG:yuangangzgsfkimg.toFixed(2),
                            ZGSSJ:yuangangzgssj.toFixed(2),
                            SYBFKIMG:yuangangsybfkimg.toFixed(2),
                            SYBSJ:yuangangsybsj.toFixed(2),
                            XHFKIMG:yuangangxhfimg.toFixed(2),
                            XHSJ:yuangangxhsj.toFixed(2),
                            ZBGSFKIMG:yuangangzbgsfkimg.toFixed(2),
                            ZBGSSJ:yuangangzbgssj.toFixed(2),
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
                        let xiancaizyfkimg = 0
                        let xiancaizysj = 0
                        let xiancaifgsfimg = 0
                        let xiancaifgssj = 0
                        let xiancaizgsfkimg = 0
                        let xiancaizgssj = 0
                        let xiancaisybfkimg = 0
                        let xiancaisybsj = 0
                        let xiancaixhfimg = 0
                        let xiancaixhsj = 0
                        let xiancaizbgsfkimg = 0
                        let xiancaizbgssj = 0
                        let xiancaickfkimg= 0
                        let xiancaicksj = 0
                        let xiancainmzsjss = 0
                        let xiancaixszgssjss = 0
                        let xiancaizysjss = 0
                        let xiancaifgssjss = 0
                        let xiancaizgssjss = 0
                        let xiancaisybsjss=0
                        let xiancaixhsjss = 0
                        let xiancaicksjss = 0
                        let xiancaizbgssjss = 0
                        for(var j=0;j<xiancai.length;j++){
                            xiancaifkimg+= xiancai[j].FKIMG
                            xiancaikzwi6 += xiancai[j].KZWI6

                            xiancainmfkimg += xiancai[j].NMFKIMG
                            xiancainmzsjss += xiancai[j].NMFKIMG*xiancai[j].NMSJ

                            xiancaixszgssjss+=xiancai[j].XSZGSFKIMG*xiancai[j].XSZGSSJ
                            xiancaixszgsfkimg += xiancai[j].XSZGSFKIMG

                            xiancaizysjss += xiancai[j].ZYFKIMG*xiancai[j].ZYSJ
                            xiancaizyfkimg += xiancai[j].ZYFKIMG

                            xiancaifgssjss+= xiancai[j].FGSFKIMG*xiancai[j].FGSSJ
                            xiancaifgsfimg += xiancai[j].FGSFKIMG

                            xiancaizgsfkimg += xiancai[j].ZGSFKIMG
                            xiancaizgssjss+= xiancai[j].ZGSFKIMG*xiancai[j].ZGSSJ

                            xiancaisybfkimg += xiancai[j].SYBFKIMG
                            xiancaisybsjss+=xiancai[j].SYBFKIMG*xiancai[j].SYBSJ

                            xiancaixhfimg += xiancai[j].XHFKIMG
                            xiancaixhsjss+=xiancai[j].XHSJ*xiancai[j].XHFKIMG

                            xiancaizbgsfkimg += xiancai[j].ZBGSFKIMG
                            xiancaizbgssjss+=xiancai[j].ZBGSFKIMG*xiancai[j].ZBGSSJ

                            xiancaickfkimg += xiancai[j].CKFKIMG
                            xiancaicksjss+=xiancai[j].CKFKIMG*xiancai[j].CKSJ
                        }
                        if(xiancaifkimg==0){xiancaizsj=0}else{xiancaizsj =(xiancaikzwi6/xiancaifkimg)*10000}
                        if(xiancainmfkimg==0){xiancainmsj=0}else{xiancainmsj = xiancainmzsjss/xiancainmfkimg}
                        if(xiancaixszgsfkimg==0){xiancaixszgssj=0}else{xiancaixszgssj = xiancaixszgssjss/xiancaixszgsfkimg}
                        if(xiancaizyfkimg==0){xiancaizysj=0}else{xiancaizysj = xiancaizysjss/xiancaizyfkimg}
                        if(xiancaifgsfimg==0){xiancaifgssj=0}else{xiancaifgssj = xiancaifgssjss/xiancaifgsfimg}
                        if(xiancaizgsfkimg==0){xiancaizgssj=0}else{xiancaizgssj = xiancaizgssjss/xiancaizgsfkimg}
                        if(xiancaisybfkimg==0){xiancaisybsj=0}else{xiancaisybsj = xiancaisybsjss/xiancaisybfkimg}
                        if(xiancaixhfimg==0){xiancaixhsj=0}else{xiancaixhsj = xiancaixhsjss/xiancaixhfimg}
                        if(xiancaizbgsfkimg==0){xiancaizbgssj=0}else{xiancaizbgssj = xiancaizbgssjss/xiancaizbgsfkimg}
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
                            ZYFKIMG:xiancaizyfkimg.toFixed(2),
                            ZYSJ:xiancaizysj.toFixed(2),
                            FGSFKIMG:xiancaifgsfimg.toFixed(2),
                            FGSSJ:xiancaifgssj.toFixed(2),
                            ZGSFKIMG:xiancaizgsfkimg.toFixed(2),
                            ZGSSJ:xiancaizgssj.toFixed(2),
                            SYBFKIMG:xiancaisybfkimg.toFixed(2),
                            SYBSJ:xiancaisybsj.toFixed(2),
                            XHFKIMG:xiancaixhfimg.toFixed(2),
                            XHSJ:xiancaixhsj.toFixed(2),
                            ZBGSFKIMG:xiancaizbgsfkimg.toFixed(2),
                            ZBGSSJ:xiancaizbgssj.toFixed(2),
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
                        let xingcaizyfkimg = 0
                        let xingcaizysj = 0
                        let xingcaifgsfimg = 0
                        let xingcaifgssj = 0
                        let xingcaizgsfkimg = 0
                        let xingcaizgssj = 0
                        let xingcaisybfkimg = 0
                        let xingcaisybsj = 0
                        let xingcaixhfimg = 0
                        let xingcaixhsj = 0
                        let xingcaizbgsfkimg = 0
                        let xingcaizbgssj = 0
                        let xingcaickfkimg= 0
                        let xingcaicksj = 0
                        let xingcainmzsjss = 0
                        let xingcaixszgssjss = 0
                        let xingcaizysjss = 0
                        let xingcaifgssjss = 0
                        let xingcaizgssjss = 0
                        let xingcaisybsjss=0
                        let xingcaixhsjss = 0
                        let xingcaicksjss = 0
                        let xingcaizbgssjss = 0
                        for(var k=0;k<xingcai.length;k++){

                            xingcaifkimg+= xingcai[k].FKIMG
                            xingcaikzwi6 += xingcai[k].KZWI6

                            xingcainmfkimg += xingcai[k].NMFKIMG
                            xingcainmzsjss += xingcai[k].NMFKIMG*xingcai[k].NMSJ

                            xingcaixszgssjss+=xingcai[k].XSZGSFKIMG*xingcai[k].XSZGSSJ
                            xingcaixszgsfkimg += xingcai[k].XSZGSFKIMG

                            xingcaizysjss += xingcai[k].ZYFKIMG*xingcai[k].ZYSJ
                            xingcaizyfkimg += xingcai[k].ZYFKIMG

                            xingcaifgssjss+= xingcai[k].FGSFKIMG*xingcai[k].FGSSJ
                            xingcaifgsfimg += xingcai[k].FGSFKIMG

                            xingcaizgsfkimg += xingcai[k].ZGSFKIMG
                            xingcaizgssjss+= xingcai[k].ZGSFKIMG*xingcai[k].ZGSSJ

                            xingcaisybfkimg += xingcai[k].SYBFKIMG
                            xingcaisybsjss+=xingcai[k].SYBFKIMG*xingcai[k].SYBSJ

                            xingcaixhfimg += xingcai[k].XHFKIMG
                            xingcaixhsjss+=xingcai[k].XHSJ*xingcai[k].XHFKIMG

                            xingcaizbgsfkimg += xingcai[k].ZBGSFKIMG
                            xingcaizbgssjss+=xingcai[k].ZBGSFKIMG*xingcai[k].ZBGSSJ

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
                        if(xingcaizyfkimg==0){
                            xingcaizysj=0
                        }else{
                            xingcaizysj = xingcaizysjss/xingcaizyfkimg
                        }
                        if(xingcaifgsfimg==0){
                            xingcaifgssj=0
                        }else{
                            xingcaifgssj = xingcaifgssjss/xingcaifgsfimg
                        }
                        if(xingcaizgsfkimg==0){
                            xingcaizgssj=0
                        }else{
                            xingcaizgssj = xingcaizgssjss/xingcaizgsfkimg
                        }
                        if(xingcaisybfkimg==0){
                            xingcaisybsj=0
                        }else{
                            xingcaisybsj = xingcaisybsjss/xingcaisybfkimg
                        }
                        if(xingcaixhfimg==0){
                            xingcaixhsj=0
                        }else{
                            xingcaixhsj = xingcaixhsjss/xingcaixhfimg
                        }
                        if(xingcaizbgsfkimg==0){
                            xingcaizbgssj=0
                        }else{
                            xingcaizbgssj = xingcaizbgssjss/xingcaizbgsfkimg
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
                            ZYFKIMG:xingcaizyfkimg.toFixed(2),
                            ZYSJ:xingcaizysj.toFixed(2),
                            FGSFKIMG:xingcaifgsfimg.toFixed(2),
                            FGSSJ:xingcaifgssj.toFixed(2),
                            ZGSFKIMG:xingcaizgsfkimg.toFixed(2),
                            ZGSSJ:xingcaizgssj.toFixed(2),
                            SYBFKIMG:xingcaisybfkimg.toFixed(2),
                            SYBSJ:xingcaisybsj.toFixed(2),
                            XHFKIMG:xingcaixhfimg.toFixed(2),
                            XHSJ:xingcaixhsj.toFixed(2),
                            ZBGSFKIMG:xingcaizbgsfkimg.toFixed(2),
                            ZBGSSJ:xingcaizbgssj.toFixed(2),
                            CKFKIMG:xingcaickfkimg.toFixed(2),
                            CKSJ:xingcaicksj.toFixed(2),
                        };
                        xingcai.unshift(xingcaixj);
                    }
                    let arr=jgj.concat(reban).concat(suanxi).concat(lengban).concat(duxin).concat(zhonghouban).concat(luowengang).concat(yuangang).concat(xiancai).concat(xingcai).concat(pinzhong).concat(baoban)
                    this.data = this.utils.mergeRow(arr,'ZL')
                    this.loading = false;
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