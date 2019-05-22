<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="8">
                    <FormItem label="日期：">
                        <DatePicker type="month" placeholder="开始时间" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:110px;margin-left: -75px"></DatePicker>
                        <DatePicker type="month" placeholder="结束时间" :editable="false" :clearable="false"
                                    v-model="endTime"
                                    style="width:110px;margin-left: 10px;"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem label="产品大类：" style="margin-left: -50px">
                        <Select style="width:100px;margin-left: -50px"  v-model="zl" placeholder="请选择" filterable  >
                            <Option value="全部">全部</Option>
                            <Option value="热板">热板</Option>
                            <Option value="薄板">薄板</Option>
                            <Option value="冷板">冷板</Option>
                            <Option value="螺纹钢">螺纹钢</Option>
                            <Option value="酸洗">酸洗</Option>
                            <Option value="镀锌">镀锌</Option>
                            <Option value="线材">线材</Option>
                            <Option value="型材">型材</Option>
                            <Option value="圆钢">圆钢</Option>
                            <Option value="中厚板">中厚板</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="产线：" style="margin-left: -50px">
                        <Select style="width:235px"  v-model="cx" placeholder="请选择产线" filterable multiple>
                            <Option v-for="item in cxData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 50px;">
                    <Button @click="getListed()" icon="ios-search">查询</Button>
                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" icon="ios-cloud-download-outline" @click="download()">导出</Button></a>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cpdjjgfb",
        data() {
            return {
                downloadUrl:'',
                mxstats:false,
                cxCx:{
                    companyId:''
                },
                zl:'全部',
                cx:[],
                cxData:[],
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                loading: true,
                data: [],
                columns: [
                    {
                        title: '产品大类',
                        align: "center",
                        isMergeRow: true,
                        width: '100',
                        key: 'ZL'
                    },
                    {
                        title: '产线',
                        align: "center",
                        isMergeRow: true,
                        width: '150',
                        key: 'CXNAME'
                    },
                    {
                        title: '产品等级',
                        align: "center",
                        width: '110',
                        key: 'PRODUCT_GRADE'
                    },
                    {
                        title: '销售量（吨）',
                        align: "center",
                        width: '150',
                        key: 'FKIMG',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                (Number(params.row[params.column.key])).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '税前售价（元/吨）',
                        align: "center",
                        width: '150',
                        key: 'ZSJ',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                (Number(params.row[params.column.key])).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '专业公司',
                        align: "center",
                        width: '',
                        key: '',
                        children: [
                            {
                                title: '销量(吨)',
                                align: "center",
                                width: '150',
                                key: 'ZYFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价(元/吨)',
                                align: "center",
                                width: '150',
                                key: 'ZYSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '150',
                                key: 'ZYXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%',
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '分公司',
                        align: "center",
                        width: '',
                        key: '',
                        children: [
                            {
                                title: '销量(吨)',
                                align: "center",
                                width: '150',
                                key: 'FGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价(元/吨)',
                                align: "center",
                                width: '150',
                                key: 'FGSSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '150',
                                key: 'FGSXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '事业部',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量(吨)',
                                align: "center",
                                width: '150',
                                key: 'SYBFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价(元/吨)',
                                align: "center",
                                width: '150',
                                key: 'SYBSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '150',
                                key: 'SYBXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '现货',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量(吨)',
                                align: "center",
                                width: '150',
                                key: 'XHFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价(元/吨)',
                                align: "center",
                                width: '150',
                                key: 'XHSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '150',
                                key: 'XHXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                    {
                        title: '自办公司',
                        align: "center",
                        key: '',
                        children: [
                            {
                                title: '销量(吨)',
                                align: "center",
                                width: '150',
                                key: 'ZBGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价(元/吨)',
                                align: "center",
                                width: '150',
                                key: 'ZBGSSJ',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '销售占比',
                                align: "center",
                                width: '150',
                                key: 'ZBGSXSZB',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key]) * 100).toFixed(2) + '%'
                                    )
                                }
                            },
                        ]
                    },
                ],
            }
        },
        mounted() {
            this.getCxData();
            this.getListed();
            this.mxstats = true
        },
        methods: {
            getCxData(){
                this.cxCx.companyId = '全部'
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getCxName", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body:this.utils.formatParams(this.cxCx),
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
            getListed() {
                this.loading = true;
                this.mxstats = true
                let startTime = 'startTime=' + this.utils.formatMonthStart(this.startTime);
                let endTime = 'endTime=' + this.utils.formatMonthStart(this.endTime);
                let zl = 'zl='+this.zl;
                let cx = 'cx='+this.cx.toString();
                fetch(this.$store.state.fetchPath + "/report-product-class-level/getcxfb", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + '&' + endTime + '&' + zl + '&' + cx,
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : []



                    let reban = []
                    let reban_pucai=[]
                    let reban_pucai_k={}
                    let reban_pinzhonggang=[]
                    let reban_pinzhonggang_k={}
                    let reban_gaoduan=[]
                    let reban_gaoduan_k={}
                    let reban_tese=[]
                    let reban_tese_k={}
                    let reban_qita=[]
                    let reban_qita_k={}

                    let baoban=[]
                    let baoban_pucai=[]
                    let baoban_pucai_k={}
                    let baoban_pinzhonggang=[]
                    let baoban_pinzhonggang_k={}
                    let baoban_gaoduan=[]
                    let baoban_gaoduan_k={}
                    let baoban_tese=[]
                    let baoban_tese_k={}
                    let baoban_qita=[]
                    let baoban_qita_k={}


                    let lengban = []
                    let lengban_pucai=[]
                    let lengban_pucai_k={}
                    let lengban_pinzhonggang=[]
                    let lengban_pinzhonggang_k={}
                    let lengban_gaoduan=[]
                    let lengban_gaoduan_k={}
                    let lengban_tese=[]
                    let lengban_tese_k={}
                    let lengban_qita=[]
                    let lengban_qita_k={}

                    let luowengang=[]
                    let luowengang_pucai=[]
                    let luowengang_pucai_k={}
                    let luowengang_pinzhonggang=[]
                    let luowengang_pinzhonggang_k={}
                    let luowengang_gaoduan=[]
                    let luowengang_gaoduan_k={}
                    let luowengang_tese=[]
                    let luowengang_tese_k={}
                    let luowengang_qita=[]
                    let luowengang_qita_k={}

                    let suanxi=[]
                    let suanxi_pucai=[]
                    let suanxi_pucai_k={}
                    let suanxi_pinzhonggang=[]
                    let suanxi_pinzhonggang_k={}
                    let suanxi_gaoduan=[]
                    let suanxi_gaoduan_k={}
                    let suanxi_tese=[]
                    let suanxi_tese_k={}
                    let suanxi_qita=[]
                    let suanxi_qita_k={}

                    let duxin =[]
                    let duxin_pucai=[]
                    let duxin_pucai_k={}
                    let duxin_pinzhonggang=[]
                    let duxin_pinzhonggang_k={}
                    let duxin_gaoduan=[]
                    let duxin_gaoduan_k={}
                    let duxin_tese=[]
                    let duxin_tese_k={}
                    let duxin_qita=[]
                    let duxin_qita_k={}

                    let xiancai = []
                    let xiancai_pucai=[]
                    let xiancai_pucai_k={}
                    let xiancai_pinzhonggang=[]
                    let xiancai_pinzhonggang_k={}
                    let xiancai_gaoduan=[]
                    let xiancai_gaoduan_k={}
                    let xiancai_tese=[]
                    let xiancai_tese_k={}
                    let xiancai_qita=[]
                    let xiancai_qita_k={}

                    let xingcai = []
                    let xingcai_pucai=[]
                    let xingcai_pucai_k={}
                    let xingcai_pinzhonggang=[]
                    let xingcai_pinzhonggang_k={}
                    let xingcai_gaoduan=[]
                    let xingcai_gaoduan_k={}
                    let xingcai_tese=[]
                    let xingcai_tese_k={}
                    let xingcai_qita=[]
                    let xingcai_qita_k={}

                    let yuangang=[]
                    let yuangang_pucai=[]
                    let yuangang_pucai_k={}
                    let yuangang_pinzhonggang=[]
                    let yuangang_pinzhonggang_k={}
                    let yuangang_gaoduan=[]
                    let yuangang_gaoduan_k={}
                    let yuangang_tese=[]
                    let yuangang_tese_k={}
                    let yuangang_qita=[]
                    let yuangang_qita_k={}

                    let zhonghouban = []
                    let zhonghouban_pucai=[]
                    let zhonghouban_pucai_k={}
                    let zhonghouban_pinzhonggang=[]
                    let zhonghouban_pinzhonggang_k={}
                    let zhonghouban_gaoduan=[]
                    let zhonghouban_gaoduan_k={}
                    let zhonghouban_tese=[]
                    let zhonghouban_tese_k={}
                    let zhonghouban_qita=[]
                    let zhonghouban_qita_k={}

                    let jgj = []
                    let i=0
                    let j=0
                    // while(j < res[0].length) {
                    //     if(res[0][j].FKIMG==0)
                    //     {
                    //         res[0].splice(j,1);
                    //         j=j-1;
                    //     }
                    //     j++
                    // }
                    while(j < res[0].length) {
                        if (res[0][j].FKIMG == null || '') {
                            res[0][j].FKIMG = 0.00
                        } else if (res[0][j].ZSJ == null || '') {
                            res[0][j].ZSJ = 0.00
                        } else if (res[0][j].ZYFKIMG == null || '') {
                            res[0][j].ZYFKIMG = 0.00
                        } else if (res[0][j].ZYSJ == null || '') {
                            res[0][j].ZYSJ = 0.00
                        } else if (res[0][j].ZYXSZB == null || '') {
                            res[0][j].ZYXSZB = 0.00
                        } else if (res[0][j].FGSFKIMG == null || '') {
                            res[0][j].FGSFKIMG = 0.00
                        } else if (res[0][j].FGSSJ == null || '') {
                            res[0][j].FGSSJ = 0.00
                        } else if (res[0][j].FGSXSZB == null || '') {
                            res[0][j].FGSXSZB = 0.00
                        } else if (res[0][j].SYBFKIMG == null || '') {
                            res[0][j].SYBFKIMG = 0.00
                        } else if (res[0][j].SYBSJ == null || '') {
                            res[0][j].SYBSJ = 0.00
                        } else if (res[0][j].SYBXSZB == null || '') {
                            res[0][j].SYBXSZB = 0.00
                        } else if (res[0][j].XHFKIMG == null || '') {
                            res[0][j].XHFKIMG = 0.00
                        } else if (res[0][j].XHSJ == null || '') {
                            res[0][j].XHSJ = 0.00
                        } else if (res[0][j].XHXSZB == null || '') {
                            res[0][j].XHXSZB = 0.00
                        } else if (res[0][j].ZBGSFKIMG == null || '') {
                            res[0][j].ZBGSFKIMG = 0.00
                        } else if (res[0][j].ZBGSSJ == null || '') {
                            res[0][j].ZBGSSJ = 0.00
                        } else if (res[0][j].ZBGSXSZB == null || '') {
                            res[0][j].ZBGSXSZB = 0.00
                        }
                        j++
                    }
                    while(i < res[1].length){
                        let resed=res[1]
                        if(resed[i].FKIMG==null||'')
                        {
                            resed[i].FKIMG=0.00
                        }
                        else if(resed[i].ZSJ==null||'')
                        {
                            resed[i].ZSJ=0.00
                        }
                        else if(resed[i].ZYFKIMG==null||'')
                        {
                            resed[i].ZYFKIMG=0.00
                        }
                        else if(resed[i].ZYSJ==null||'')
                        {
                            resed[i].ZYSJ=0.00
                        }
                        else if(resed[i].ZYXSZB==null||'')
                        {
                            resed[i].ZYXSZB=0.00
                        }
                        else if(resed[i].FGSFKIMG==null||'')
                        {
                            resed[i].FGSFKIMG=0.00
                        }
                        else if(resed[i].FGSSJ==null||'')
                        {
                            resed[i].FGSSJ=0.00
                        }
                        else if(resed[i].FGSXSZB==null||'')
                        {
                            resed[i].FGSXSZB=0.00
                        }
                        else if(resed[i].SYBFKIMG==null||'')
                        {
                            resed[i].SYBFKIMG=0.00
                        }
                        else if(resed[i].SYBSJ==null||'')
                        {
                            resed[i].SYBSJ=0.00
                        }
                        else if(resed[i].SYBXSZB==null||'')
                        {
                            resed[i].SYBXSZB=0.00
                        }
                        else if(resed[i].XHFKIMG==null||'')
                        {
                            resed[i].XHFKIMG=0.00
                        }
                        else if(resed[i].XHSJ==null||'')
                        {
                            resed[i].XHSJ=0.00
                        }
                        else if(resed[i].XHXSZB==null||'')
                        {
                            resed[i].XHXSZB=0.00
                        }
                        else if(resed[i].ZBGSFKIMG==null||'')
                        {
                            resed[i].ZBGSFKIMG=0.00
                        }
                        else if(resed[i].ZBGSSJ==null||'')
                        {
                            resed[i].ZBGSSJ=0.00
                        }
                        else if(resed[i].ZBGSXSZB==null||'')
                        {
                            resed[i].ZBGSXSZB=0.00
                        }




                        if(resed[i].ZL=='螺纹')
                        {
                            resed[i].ZL='螺纹钢'
                        }
                        switch (resed[i].ZL) {
                            case "热板":
                                reban.push(resed[i])
                                break;
                            case '薄板':
                                baoban.push(resed[i]);
                                break;
                            case "冷板":
                                lengban.push(resed[i])
                                break;
                            case '螺纹钢':
                                luowengang.push(resed[i])
                                break;
                            case '酸洗':
                                suanxi.push(resed[i])
                                break;
                            case '镀锌':
                                duxin.push(resed[i])
                                break;
                            case "线材":
                                xiancai.push(res[1][i])
                                break;
                            case "型材":
                                xingcai.push(res[1][i])
                                break;
                            case "圆钢":
                                yuangang.push(res[1][i])
                                break;
                            case "中厚板":
                                zhonghouban.push(res[1][i])
                                break;
                        }
                        i++
                    }

                    if(reban.length>0)
                    {
                        let j=0;
                        while(j<reban.length) {
                            switch (reban[j].PRODUCT_GRADE) {
                                case '普材':
                                    reban_pucai.push(reban[j]);
                                    break;
                                case '品种钢':
                                    reban_pinzhonggang.push(reban[j]);
                                    break;
                                case '高端产品':
                                    reban_gaoduan.push(reban[j]);
                                    break;
                                case '特色战略产品':
                                    reban_tese.push(reban[j]);
                                    break;
                                case '其他':
                                    reban_qita.push(reban[j]);
                                    break;
                            }
                            j++
                        }
                    }

                    if(baoban.length>0)
                    {
                        let j=0;
                        while(j<baoban.length) {
                            switch (baoban[j].PRODUCT_GRADE) {
                                case '普材':
                                    baoban_pucai.push(baoban[j]);
                                    break;
                                case '品种钢':
                                    baoban_pinzhonggang.push(baoban[j]);
                                    break;
                                case '高端产品':
                                    baoban_gaoduan.push(baoban[j]);
                                    break;
                                case '特色战略产品':
                                    baoban_tese.push(baoban[j]);
                                    break;
                                case '其他':
                                    baoban_qita.push(baoban[j]);
                                    break;
                            }
                            j++
                        }
                    }

                    if(lengban.length>0)
                    {
                        let j=0;
                        while(j<lengban.length) {
                            switch (lengban[j].PRODUCT_GRADE) {
                                case '普材':
                                    lengban_pucai.push(lengban[j]);
                                    break;
                                case '品种钢':
                                    lengban_pinzhonggang.push(lengban[j]);
                                    break;
                                case '高端产品':
                                    lengban_gaoduan.push(lengban[j]);
                                    break;
                                case '特色战略产品':
                                    lengban_tese.push(lengban[j]);
                                    break;
                                case '其他':
                                    lengban_qita.push(lengban[j]);
                                    break;
                            }
                            j++
                        }
                    }

                    if(luowengang.length>0)
                    {
                        let j=0;
                        while(j<luowengang.length) {
                            switch (luowengang[j].PRODUCT_GRADE) {
                                case '普材':
                                    luowengang_pucai.push(luowengang[j]);
                                    break;
                                case '品种钢':
                                    luowengang_pinzhonggang.push(luowengang[j]);
                                    break;
                                case '高端产品':
                                    luowengang_gaoduan.push(luowengang[j]);
                                    break;
                                case '特色战略产品':
                                    luowengang_tese.push(luowengang[j]);
                                    break;
                                case '其他':
                                    luowengang_qita.push(luowengang[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(suanxi.length>0)
                    {
                        let j=0;
                        while(j<suanxi.length) {
                            switch (suanxi[j].PRODUCT_GRADE) {
                                case '普材':
                                    suanxi_pucai.push(suanxi[j]);
                                    break;
                                case '品种钢':
                                    suanxi_pinzhonggang.push(suanxi[j]);
                                    break;
                                case '高端产品':
                                    suanxi_gaoduan.push(suanxi[j]);
                                    break;
                                case '特色战略产品':
                                    suanxi_tese.push(suanxi[j]);
                                    break;
                                case '其他':
                                    suanxi_qita.push(suanxi[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(duxin.length>0)
                    {
                        let j=0;
                        while(j<duxin.length) {
                            switch (duxin[j].PRODUCT_GRADE) {
                                case '普材':
                                    duxin_pucai.push(duxin[j]);
                                    break;
                                case '品种钢':
                                    duxin_pinzhonggang.push(duxin[j]);
                                    break;
                                case '高端产品':
                                    duxin_gaoduan.push(duxin[j]);
                                    break;
                                case '特色战略产品':
                                    duxin_tese.push(duxin[j]);
                                    break;
                                case '其他':
                                    duxin_qita.push(duxin[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(xiancai.length>0)
                    {
                        let j=0;
                        while(j<xiancai.length) {
                            switch (xiancai[j].PRODUCT_GRADE) {
                                case '普材':
                                    xiancai_pucai.push(xiancai[j]);
                                    break;
                                case '品种钢':
                                    xiancai_pinzhonggang.push(xiancai[j]);
                                    break;
                                case '高端产品':
                                    xiancai_gaoduan.push(xiancai[j]);
                                    break;
                                case '特色战略产品':
                                    xiancai_tese.push(xiancai[j]);
                                    break;
                                case '其他':
                                    xiancai_qita.push(xiancai[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(xingcai.length>0)
                    {
                        let j=0;
                        while(j<xingcai.length) {
                            switch (xingcai[j].PRODUCT_GRADE) {
                                case '普材':
                                    xingcai_pucai.push(xingcai[j]);
                                    break;
                                case '品种钢':
                                    xingcai_pinzhonggang.push(xingcai[j]);
                                    break;
                                case '高端产品':
                                    xingcai_gaoduan.push(xingcai[j]);
                                    break;
                                case '特色战略产品':
                                    xingcai_tese.push(xingcai[j]);
                                    break;
                                case '其他':
                                    xingcai_qita.push(xingcai[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(yuangang.length>0)
                    {
                        let j=0;
                        while(j<yuangang.length) {
                            switch (yuangang[j].PRODUCT_GRADE) {
                                case '普材':
                                    yuangang_pucai.push(yuangang[j]);
                                    break;
                                case '品种钢':
                                    yuangang_pinzhonggang.push(yuangang[j]);
                                    break;
                                case '高端产品':
                                    yuangang_gaoduan.push(yuangang[j]);
                                    break;
                                case '特色战略产品':
                                    yuangang_tese.push(yuangang[j]);
                                    break;
                                case '其他':
                                    yuangang_qita.push(yuangang[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    if(zhonghouban.length>0)
                    {
                        let j=0;
                        while(j<zhonghouban.length) {
                            switch (zhonghouban[j].PRODUCT_GRADE) {
                                case '普材':
                                    zhonghouban_pucai.push(zhonghouban[j]);
                                    break;
                                case '品种钢':
                                    zhonghouban_pinzhonggang.push(zhonghouban[j]);
                                    break;
                                case '高端产品':
                                    zhonghouban_gaoduan.push(zhonghouban[j]);
                                    break;
                                case '特色战略产品':
                                    zhonghouban_tese.push(zhonghouban[j]);
                                    break;
                                case '其他':
                                    zhonghouban_qita.push(zhonghouban[j]);
                                    break;
                            }
                            j++
                        }

                    }

                    //总计
                    if (res[1].length > 0) {
                        let zj_FKIMG = 0;
                        let zj_ZSJ = 0;
                        let zj_ZYFKIMG = 0;
                        let zj_ZYSJ = 0;
                        let zj_ZYXSZB = 0;
                        let zj_FGSFKIMG = 0;
                        let zj_FGSSJ = 0;
                        let zj_FGSXSZB = 0;
                        let zj_SYBFKIMG = 0;
                        let zj_SYBSJ = 0;
                        let zj_SYBXSZB = 0;
                        let zj_XHFKIMG = 0;
                        let zj_XHSJ = 0;
                        let zj_XHXSZB = 0;
                        let zj_ZBGSFKIMG = 0;
                        let zj_ZBGSSJ = 0;
                        let zj_ZBGSXSZB = 0;

                        let z = 0;
                        while (z < res[1].length) {
                            zj_FKIMG += res[1][z].FKIMG;
                            zj_ZYFKIMG += res[1][z].ZYFKIMG;
                            zj_FGSFKIMG += res[1][z].FGSFKIMG;
                            zj_SYBFKIMG += res[1][z].SYBFKIMG;
                            zj_SYBXSZB += res[1][z].SYBXSZB;
                            zj_XHFKIMG += res[1][z].XHFKIMG;
                            zj_XHXSZB += res[1][z].XHXSZB;
                            zj_ZBGSFKIMG += res[1][z].ZBGSFKIMG;
                            zj_ZBGSXSZB += res[1][z].ZBGSXSZB;
                            z++;
                        }
                        zj_FKIMG==0? zj_ZYXSZB=0+'%' :zj_ZYXSZB = zj_ZYFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_FGSXSZB=0+'%' :zj_FGSXSZB = zj_FGSFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_SYBXSZB=0+'%' :zj_SYBXSZB = zj_SYBFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_XHXSZB=0+'%' :zj_XHXSZB = zj_XHFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_ZBGSXSZB=0+'%' :zj_ZBGSXSZB = zj_ZBGSFKIMG/zj_FKIMG;
                        let zz=0;
                        while(zz<res[1].length)
                        {
                            zj_ZYSJ += res[1][zz].ZYFKIMG*res[1][zz].ZYSJ;
                            zj_FGSSJ += res[1][zz].FGSFKIMG*res[1][zz].FGSSJ;
                            zj_SYBSJ += res[1][zz].SYBFKIMG*res[1][zz].SYBSJ;
                            zj_XHSJ += res[1][zz].XHFKIMG*res[1][zz].XHSJ;
                            zj_ZBGSSJ += res[1][zz].ZBGSFKIMG*res[1][zz].ZBGSSJ;
                            zz++;
                        }
                        zj_ZSJ=zj_ZYSJ+zj_FGSSJ+zj_SYBSJ+zj_XHSJ+zj_ZBGSSJ;
                        zj_ZYFKIMG==0?zj_ZYSJ=0.00:zj_ZYSJ=zj_ZYSJ/zj_ZYFKIMG;
                        zj_FGSFKIMG==0?zj_FGSSJ=0.00:zj_FGSSJ=zj_FGSSJ/zj_FGSFKIMG;
                        zj_SYBFKIMG==0?zj_SYBSJ=0.00:zj_SYBSJ=zj_SYBSJ/zj_SYBFKIMG;
                        zj_XHFKIMG==0?zj_XHSJ=0.00:zj_XHSJ=zj_XHSJ/zj_XHFKIMG;
                        zj_ZBGSFKIMG==0?zj_ZBGSSJ=0.00:zj_ZBGSSJ=zj_ZBGSSJ/zj_ZBGSFKIMG;
                        zj_FKIMG==0?zj_ZSJ=0.00:zj_ZSJ=zj_ZSJ/zj_FKIMG;
                        let zj = {
                            ZL: "内贸",
                            CXNAME: "总计",
                            FKIMG: zj_FKIMG,
                            ZSJ: zj_ZSJ,
                            ZYFKIMG: zj_ZYFKIMG,
                            ZYSJ: zj_ZYSJ,
                            ZYXSZB: zj_ZYXSZB,
                            FGSFKIMG: zj_FGSFKIMG,
                            FGSSJ: zj_FGSSJ,
                            FGSXSZB: zj_FGSXSZB,
                            SYBFKIMG: zj_SYBFKIMG,
                            SYBSJ: zj_SYBSJ,
                            SYBXSZB: zj_SYBXSZB,
                            XHFKIMG: zj_XHFKIMG,
                            XHSJ: zj_XHSJ,
                            XHXSZB: zj_XHXSZB,
                            ZBGSFKIMG: zj_ZBGSFKIMG,
                            ZBGSSJ: zj_ZBGSSJ,
                            ZBGSXSZB: zj_ZBGSXSZB,
                        }
                        jgj.unshift(zj);
                    }


                    //热板 产线

                    //热板普材
                    if (reban_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban_pucai.length) {
                            rb_FKIMG += reban_pucai[a].FKIMG;
                            rb_ZYFKIMG += reban_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += reban_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += reban_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += reban_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += reban_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += reban_pucai[a].SYBXSZB;
                            rb_XHFKIMG += reban_pucai[a].XHFKIMG;
                            rb_XHXSZB += reban_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += reban_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban_pucai.length)
                        {
                            rb_ZYSJ += reban_pucai[aa].ZYFKIMG*reban_pucai[aa].ZYSJ;
                            rb_FGSSJ += reban_pucai[aa].FGSFKIMG*reban_pucai[aa].FGSSJ;
                            rb_SYBSJ += reban_pucai[aa].SYBFKIMG*reban_pucai[aa].SYBSJ;
                            rb_XHSJ += reban_pucai[aa].XHFKIMG*reban_pucai[aa].XHSJ;
                            rb_ZBGSSJ += reban_pucai[aa].ZBGSFKIMG*reban_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ+=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let reban_pucaixj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban_pucai_k=reban_pucaixj;
                    }

                    //热板品种钢
                    if (reban_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban_pinzhonggang.length) {
                            rb_FKIMG += reban_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += reban_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += reban_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += reban_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += reban_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += reban_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += reban_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += reban_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += reban_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += reban_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban_pinzhonggang.length)
                        {
                            rb_ZYSJ += reban_pinzhonggang[aa].ZYFKIMG*reban_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += reban_pinzhonggang[aa].FGSFKIMG*reban_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += reban_pinzhonggang[aa].SYBFKIMG*reban_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += reban_pinzhonggang[aa].XHFKIMG*reban_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += reban_pinzhonggang[aa].ZBGSFKIMG*reban_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ+=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let reban_pinzhonggangxj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban_pinzhonggang_k=reban_pinzhonggangxj;
                    }

                    //热板高端产品
                    if (reban_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban_gaoduan.length) {
                            rb_FKIMG += reban_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += reban_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += reban_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += reban_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += reban_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += reban_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += reban_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += reban_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += reban_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += reban_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban_gaoduan.length)
                        {
                            rb_ZYSJ += reban_gaoduan[aa].ZYFKIMG*reban_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += reban_gaoduan[aa].FGSFKIMG*reban_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += reban_gaoduan[aa].SYBFKIMG*reban_gaoduan[aa].SYBSJ;
                            rb_XHSJ += reban_gaoduan[aa].XHFKIMG*reban_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += reban_gaoduan[aa].ZBGSFKIMG*reban_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ+=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let reban_gaoduanxj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban_gaoduan_k=reban_gaoduanxj;
                    }

                    //热板特色战略产品
                    if (reban_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban_tese.length) {
                            rb_FKIMG += reban_tese[a].FKIMG;
                            rb_ZYFKIMG += reban_tese[a].ZYFKIMG;
                            rb_ZYXSZB += reban_tese[a].ZYXSZB;
                            rb_FGSFKIMG += reban_tese[a].FGSFKIMG;
                            rb_FGSXSZB += reban_tese[a].FGSXSZB;
                            rb_SYBFKIMG += reban_tese[a].SYBFKIMG;
                            rb_SYBXSZB += reban_tese[a].SYBXSZB;
                            rb_XHFKIMG += reban_tese[a].XHFKIMG;
                            rb_XHXSZB += reban_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += reban_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban_tese.length)
                        {
                            rb_ZYSJ += reban_tese[aa].ZYFKIMG*reban_tese[aa].ZYSJ;
                            rb_FGSSJ += reban_tese[aa].FGSFKIMG*reban_tese[aa].FGSSJ;
                            rb_SYBSJ += reban_tese[aa].SYBFKIMG*reban_tese[aa].SYBSJ;
                            rb_XHSJ += reban_tese[aa].XHFKIMG*reban_tese[aa].XHSJ;
                            rb_ZBGSSJ += reban_tese[aa].ZBGSFKIMG*reban_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let reban_tesexj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban_tese_k=reban_tesexj;
                    }

                    //热板其他
                    if (reban_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban_qita.length) {
                            rb_FKIMG += reban_qita[a].FKIMG;
                            rb_ZYFKIMG += reban_qita[a].ZYFKIMG;
                            rb_ZYXSZB += reban_qita[a].ZYXSZB;
                            rb_FGSFKIMG += reban_qita[a].FGSFKIMG;
                            rb_FGSXSZB += reban_qita[a].FGSXSZB;
                            rb_SYBFKIMG += reban_qita[a].SYBFKIMG;
                            rb_SYBXSZB += reban_qita[a].SYBXSZB;
                            rb_XHFKIMG += reban_qita[a].XHFKIMG;
                            rb_XHXSZB += reban_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += reban_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban_qita.length)
                        {
                            rb_ZYSJ += reban_qita[aa].ZYFKIMG*reban_qita[aa].ZYSJ;
                            rb_FGSSJ += reban_qita[aa].FGSFKIMG*reban_qita[aa].FGSSJ;
                            rb_SYBSJ += reban_qita[aa].SYBFKIMG*reban_qita[aa].SYBSJ;
                            rb_XHSJ += reban_qita[aa].XHFKIMG*reban_qita[aa].XHSJ;
                            rb_ZBGSSJ += reban_qita[aa].ZBGSFKIMG*reban_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let reban_qitaxj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban_qita_k=reban_qitaxj;
                    }


                    //热板
                    if (reban.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < reban.length) {
                            rb_FKIMG += reban[a].FKIMG;
                            rb_ZYFKIMG += reban[a].ZYFKIMG;
                            rb_ZYXSZB += reban[a].ZYXSZB;
                            rb_FGSFKIMG += reban[a].FGSFKIMG;
                            rb_FGSXSZB += reban[a].FGSXSZB;
                            rb_SYBFKIMG += reban[a].SYBFKIMG;
                            rb_SYBXSZB += reban[a].SYBXSZB;
                            rb_XHFKIMG += reban[a].XHFKIMG;
                            rb_XHXSZB += reban[a].XHXSZB;
                            rb_ZBGSFKIMG += reban[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += reban[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<reban.length)
                        {
                            rb_ZYSJ += reban[aa].ZYFKIMG*reban[aa].ZYSJ;
                            rb_FGSSJ += reban[aa].FGSFKIMG*reban[aa].FGSSJ;
                            rb_SYBSJ += reban[aa].SYBFKIMG*reban[aa].SYBSJ;
                            rb_XHSJ += reban[aa].XHFKIMG*reban[aa].XHSJ;
                            rb_ZBGSSJ += reban[aa].ZBGSFKIMG*reban[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let rebanxj={
                            ZL:"热板",
                            CXNAME:"热板小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        reban.unshift(rebanxj,reban_pucai_k,reban_pinzhonggang_k,
                            reban_gaoduan_k,reban_tese_k,reban_qita_k);
                        let abc=0
                        while(abc<reban.length)
                        {
                            if(JSON.stringify(reban[abc])=='{}')
                            {
                                reban.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }

                    }

                    //薄板 产线

                    //薄板普材
                    if (baoban_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban_pucai.length) {
                            rb_FKIMG += baoban_pucai[a].FKIMG;
                            rb_ZYFKIMG += baoban_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += baoban_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += baoban_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += baoban_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += baoban_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += baoban_pucai[a].SYBXSZB;
                            rb_XHFKIMG += baoban_pucai[a].XHFKIMG;
                            rb_XHXSZB += baoban_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban_pucai.length)
                        {
                            rb_ZYSJ += baoban_pucai[aa].ZYFKIMG*baoban_pucai[aa].ZYSJ;
                            rb_FGSSJ += baoban_pucai[aa].FGSFKIMG*baoban_pucai[aa].FGSSJ;
                            rb_SYBSJ += baoban_pucai[aa].SYBFKIMG*baoban_pucai[aa].SYBSJ;
                            rb_XHSJ += baoban_pucai[aa].XHFKIMG*baoban_pucai[aa].XHSJ;
                            rb_ZBGSSJ += baoban_pucai[aa].ZBGSFKIMG*baoban_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baoban_pucaixj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban_pucai_k=baoban_pucaixj;
                    }

                    //薄板品种钢
                    if (baoban_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban_pinzhonggang.length) {
                            rb_FKIMG += baoban_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += baoban_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += baoban_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += baoban_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += baoban_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += baoban_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += baoban_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += baoban_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += baoban_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban_pinzhonggang.length)
                        {
                            rb_ZYSJ += baoban_pinzhonggang[aa].ZYFKIMG*baoban_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += baoban_pinzhonggang[aa].FGSFKIMG*baoban_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += baoban_pinzhonggang[aa].SYBFKIMG*baoban_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += baoban_pinzhonggang[aa].XHFKIMG*baoban_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += baoban_pinzhonggang[aa].ZBGSFKIMG*baoban_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baoban_pinzhonggangxj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban_pinzhonggang_k=baoban_pinzhonggangxj;
                    }

                    //薄板高端产品
                    if (baoban_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban_gaoduan.length) {
                            rb_FKIMG += baoban_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += baoban_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += baoban_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += baoban_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += baoban_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += baoban_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += baoban_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += baoban_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += baoban_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban_gaoduan.length)
                        {
                            rb_ZYSJ += baoban_gaoduan[aa].ZYFKIMG*baoban_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += baoban_gaoduan[aa].FGSFKIMG*baoban_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += baoban_gaoduan[aa].SYBFKIMG*baoban_gaoduan[aa].SYBSJ;
                            rb_XHSJ += baoban_gaoduan[aa].XHFKIMG*baoban_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += baoban_gaoduan[aa].ZBGSFKIMG*baoban_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baoban_gaoduanxj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban_gaoduan_k=baoban_gaoduanxj;
                    }

                    //薄板特色战略产品
                    if (baoban_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban_tese.length) {
                            rb_FKIMG += baoban_tese[a].FKIMG;
                            rb_ZYFKIMG += baoban_tese[a].ZYFKIMG;
                            rb_ZYXSZB += baoban_tese[a].ZYXSZB;
                            rb_FGSFKIMG += baoban_tese[a].FGSFKIMG;
                            rb_FGSXSZB += baoban_tese[a].FGSXSZB;
                            rb_SYBFKIMG += baoban_tese[a].SYBFKIMG;
                            rb_SYBXSZB += baoban_tese[a].SYBXSZB;
                            rb_XHFKIMG += baoban_tese[a].XHFKIMG;
                            rb_XHXSZB += baoban_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban_tese.length)
                        {
                            rb_ZYSJ += baoban_tese[aa].ZYFKIMG*baoban_tese[aa].ZYSJ;
                            rb_FGSSJ += baoban_tese[aa].FGSFKIMG*baoban_tese[aa].FGSSJ;
                            rb_SYBSJ += baoban_tese[aa].SYBFKIMG*baoban_tese[aa].SYBSJ;
                            rb_XHSJ += baoban_tese[aa].XHFKIMG*baoban_tese[aa].XHSJ;
                            rb_ZBGSSJ += baoban_tese[aa].ZBGSFKIMG*baoban_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baoban_tesexj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban_tese_k=baoban_tesexj;
                    }

                    //薄板其他
                    if (baoban_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban_qita.length) {
                            rb_FKIMG += baoban_qita[a].FKIMG;
                            rb_ZYFKIMG += baoban_qita[a].ZYFKIMG;
                            rb_ZYXSZB += baoban_qita[a].ZYXSZB;
                            rb_FGSFKIMG += baoban_qita[a].FGSFKIMG;
                            rb_FGSXSZB += baoban_qita[a].FGSXSZB;
                            rb_SYBFKIMG += baoban_qita[a].SYBFKIMG;
                            rb_SYBXSZB += baoban_qita[a].SYBXSZB;
                            rb_XHFKIMG += baoban_qita[a].XHFKIMG;
                            rb_XHXSZB += baoban_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban_qita.length)
                        {
                            rb_ZYSJ += baoban_qita[aa].ZYFKIMG*baoban_qita[aa].ZYSJ;
                            rb_FGSSJ += baoban_qita[aa].FGSFKIMG*baoban_qita[aa].FGSSJ;
                            rb_SYBSJ += baoban_qita[aa].SYBFKIMG*baoban_qita[aa].SYBSJ;
                            rb_XHSJ += baoban_qita[aa].XHFKIMG*baoban_qita[aa].XHSJ;
                            rb_ZBGSSJ += baoban_qita[aa].ZBGSFKIMG*baoban_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baoban_qitaxj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban_qita_k=baoban_qitaxj;
                    }

                    //薄板
                    if (baoban.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < baoban.length) {
                            rb_FKIMG += baoban[a].FKIMG;
                            rb_ZYFKIMG += baoban[a].ZYFKIMG;
                            rb_ZYXSZB += baoban[a].ZYXSZB;
                            rb_FGSFKIMG += baoban[a].FGSFKIMG;
                            rb_FGSXSZB += baoban[a].FGSXSZB;
                            rb_SYBFKIMG += baoban[a].SYBFKIMG;
                            rb_SYBXSZB += baoban[a].SYBXSZB;
                            rb_XHFKIMG += baoban[a].XHFKIMG;
                            rb_XHXSZB += baoban[a].XHXSZB;
                            rb_ZBGSFKIMG += baoban[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += baoban[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<baoban.length)
                        {
                            rb_ZYSJ += baoban[aa].ZYFKIMG*baoban[aa].ZYSJ;
                            rb_FGSSJ += baoban[aa].FGSFKIMG*baoban[aa].FGSSJ;
                            rb_SYBSJ += baoban[aa].SYBFKIMG*baoban[aa].SYBSJ;
                            rb_XHSJ += baoban[aa].XHFKIMG*baoban[aa].XHSJ;
                            rb_ZBGSSJ += baoban[aa].ZBGSFKIMG*baoban[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let baobanxj={
                            ZL:"薄板",
                            CXNAME:"薄板小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        baoban.unshift(baobanxj,baoban_pucai_k,baoban_pinzhonggang_k,
                            baoban_gaoduan_k,baoban_tese_k,baoban_qita_k);
                        let abc=0
                        while(abc<baoban.length)
                        {
                            if(JSON.stringify(baoban[abc])=='{}')
                            {
                                baoban.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }


                    //冷板 产线

                    //冷板普材
                    if (lengban_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < lengban_pucai.length) {
                            rb_FKIMG += lengban_pucai[a].FKIMG;
                            rb_ZYFKIMG += lengban_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += lengban_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += lengban_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += lengban_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += lengban_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += lengban_pucai[a].SYBXSZB;
                            rb_XHFKIMG += lengban_pucai[a].XHFKIMG;
                            rb_XHXSZB += lengban_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += lengban_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += lengban_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<lengban_pucai.length)
                        {
                            rb_ZYSJ += lengban_pucai[aa].ZYFKIMG*lengban_pucai[aa].ZYSJ;
                            rb_FGSSJ += lengban_pucai[aa].FGSFKIMG*lengban_pucai[aa].FGSSJ;
                            rb_SYBSJ += lengban_pucai[aa].SYBFKIMG*lengban_pucai[aa].SYBSJ;
                            rb_XHSJ += lengban_pucai[aa].XHFKIMG*lengban_pucai[aa].XHSJ;
                            rb_ZBGSSJ += lengban_pucai[aa].ZBGSFKIMG*lengban_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let lengban_pucaixj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        lengban_pucai_k=lengban_pucaixj;
                    }

                    //冷板品种钢
                    if (lengban_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < lengban_pinzhonggang.length) {
                            rb_FKIMG += lengban_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += lengban_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += lengban_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += lengban_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += lengban_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += lengban_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += lengban_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += lengban_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += lengban_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += lengban_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += lengban_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<lengban_pinzhonggang.length)
                        {
                            rb_ZYSJ += lengban_pinzhonggang[aa].ZYFKIMG*lengban_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += lengban_pinzhonggang[aa].FGSFKIMG*lengban_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += lengban_pinzhonggang[aa].SYBFKIMG*lengban_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += lengban_pinzhonggang[aa].XHFKIMG*lengban_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += lengban_pinzhonggang[aa].ZBGSFKIMG*lengban_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let lengban_pinzhonggangxj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        lengban_pinzhonggang_k=lengban_pinzhonggangxj;
                    }

                    //冷板高端产品
                    if (lengban_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < lengban_gaoduan.length) {
                            rb_FKIMG += lengban_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += lengban_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += lengban_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += lengban_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += lengban_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += lengban_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += lengban_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += lengban_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += lengban_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += lengban_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += lengban_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<lengban_gaoduan.length)
                        {
                            rb_ZYSJ += lengban_gaoduan[aa].ZYFKIMG*lengban_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += lengban_gaoduan[aa].FGSFKIMG*lengban_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += lengban_gaoduan[aa].SYBFKIMG*lengban_gaoduan[aa].SYBSJ;
                            rb_XHSJ += lengban_gaoduan[aa].XHFKIMG*lengban_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += lengban_gaoduan[aa].ZBGSFKIMG*lengban_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let lengban_gaoduanxj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        lengban_gaoduan_k=lengban_gaoduanxj;
                    }

                    //冷板特色战略产品
                    if (lengban_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < lengban_tese.length) {
                            rb_FKIMG += lengban_tese[a].FKIMG;
                            rb_ZYFKIMG += lengban_tese[a].ZYFKIMG;
                            rb_ZYXSZB += lengban_tese[a].ZYXSZB;
                            rb_FGSFKIMG += lengban_tese[a].FGSFKIMG;
                            rb_FGSXSZB += lengban_tese[a].FGSXSZB;
                            rb_SYBFKIMG += lengban_tese[a].SYBFKIMG;
                            rb_SYBXSZB += lengban_tese[a].SYBXSZB;
                            rb_XHFKIMG += lengban_tese[a].XHFKIMG;
                            rb_XHXSZB += lengban_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += lengban_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += lengban_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<lengban_tese.length)
                        {
                            rb_ZYSJ += lengban_tese[aa].ZYFKIMG*lengban_tese[aa].ZYSJ;
                            rb_FGSSJ += lengban_tese[aa].FGSFKIMG*lengban_tese[aa].FGSSJ;
                            rb_SYBSJ += lengban_tese[aa].SYBFKIMG*lengban_tese[aa].SYBSJ;
                            rb_XHSJ += lengban_tese[aa].XHFKIMG*lengban_tese[aa].XHSJ;
                            rb_ZBGSSJ += lengban_tese[aa].ZBGSFKIMG*lengban_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let lengban_tesexj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        lengban_tese_k=lengban_tesexj;
                    }

                    //冷板其他
                    if (lengban_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < lengban_qita.length) {
                            rb_FKIMG += lengban_qita[a].FKIMG;
                            rb_ZYFKIMG += lengban_qita[a].ZYFKIMG;
                            rb_ZYXSZB += lengban_qita[a].ZYXSZB;
                            rb_FGSFKIMG += lengban_qita[a].FGSFKIMG;
                            rb_FGSXSZB += lengban_qita[a].FGSXSZB;
                            rb_SYBFKIMG += lengban_qita[a].SYBFKIMG;
                            rb_SYBXSZB += lengban_qita[a].SYBXSZB;
                            rb_XHFKIMG += lengban_qita[a].XHFKIMG;
                            rb_XHXSZB += lengban_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += lengban_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += lengban_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<lengban_qita.length)
                        {
                            rb_ZYSJ += lengban_qita[aa].ZYFKIMG*lengban_qita[aa].ZYSJ;
                            rb_FGSSJ += lengban_qita[aa].FGSFKIMG*lengban_qita[aa].FGSSJ;
                            rb_SYBSJ += lengban_qita[aa].SYBFKIMG*lengban_qita[aa].SYBSJ;
                            rb_XHSJ += lengban_qita[aa].XHFKIMG*lengban_qita[aa].XHSJ;
                            rb_ZBGSSJ += lengban_qita[aa].ZBGSFKIMG*lengban_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let lengban_qitaxj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        lengban_qita_k=lengban_qitaxj;
                    }

                    //冷板
                    if (lengban.length > 0) {
                        let lb_FKIMG = 0;
                        let lb_ZSJ = 0;
                        let lb_ZYFKIMG = 0;
                        let lb_ZYSJ = 0;
                        let lb_ZYXSZB = 0;
                        let lb_FGSFKIMG = 0;
                        let lb_FGSSJ = 0;
                        let lb_FGSXSZB = 0;
                        let lb_SYBFKIMG = 0;
                        let lb_SYBSJ = 0;
                        let lb_SYBXSZB = 0;
                        let lb_XHFKIMG = 0;
                        let lb_XHSJ = 0;
                        let lb_XHXSZB = 0;
                        let lb_ZBGSFKIMG = 0;
                        let lb_ZBGSSJ = 0;
                        let lb_ZBGSXSZB = 0;

                        let c = 0;
                        while (c < lengban.length) {
                            lb_FKIMG += lengban[c].FKIMG;
                            lb_ZYFKIMG += lengban[c].ZYFKIMG;
                            lb_ZYXSZB += lengban[c].ZYXSZB;
                            lb_FGSFKIMG += lengban[c].FGSFKIMG;
                            lb_FGSSJ += lengban[c].FGSSJ;
                            lb_FGSXSZB += lengban[c].FGSXSZB;
                            lb_SYBFKIMG += lengban[c].SYBFKIMG;
                            lb_SYBXSZB += lengban[c].SYBXSZB;
                            lb_XHFKIMG += lengban[c].XHFKIMG;
                            lb_XHXSZB += lengban[c].XHXSZB;
                            lb_ZBGSFKIMG += lengban[c].ZBGSFKIMG;
                            lb_ZBGSXSZB += lengban[c].ZBGSXSZB;
                            c++;
                        }
                        lb_FKIMG==0? lb_ZYXSZB=0+'%' :lb_ZYXSZB = lb_ZYFKIMG/lb_FKIMG;
                        lb_FKIMG==0? lb_FGSXSZB=0+'%' :lb_FGSXSZB = lb_FGSFKIMG/lb_FKIMG;
                        lb_FKIMG==0? lb_SYBXSZB=0+'%' :lb_SYBXSZB = lb_SYBFKIMG/lb_FKIMG;
                        lb_FKIMG==0? lb_XHXSZB=0+'%' :lb_XHXSZB = lb_XHFKIMG/lb_FKIMG;
                        lb_FKIMG==0? lb_ZBGSXSZB=0+'%' :lb_ZBGSXSZB = lb_ZBGSFKIMG/lb_FKIMG;
                        let cc=0;
                        while(cc<lengban.length)
                        {
                            lb_ZYSJ += lengban[cc].ZYFKIMG*lengban[cc].ZYSJ;
                            lb_FGSSJ += lengban[cc].FGSFKIMG*lengban[cc].FGSSJ;
                            lb_SYBSJ += lengban[cc].SYBFKIMG*lengban[cc].SYBSJ;
                            lb_XHSJ += lengban[cc].XHFKIMG*lengban[cc].XHSJ;
                            lb_ZBGSSJ += lengban[cc].ZBGSFKIMG*lengban[cc].ZBGSSJ;
                            cc++;
                        }
                        lb_ZSJ=lb_ZYSJ+lb_FGSSJ+lb_SYBSJ+lb_XHSJ+lb_ZBGSSJ;
                        lb_ZYFKIMG==0?lb_ZYSJ=0.00:lb_ZYSJ=lb_ZYSJ/lb_ZYFKIMG;
                        lb_FGSFKIMG==0?lb_FGSSJ=0.00:lb_FGSSJ=lb_FGSSJ/lb_FGSFKIMG;
                        lb_SYBFKIMG==0?lb_SYBSJ=0.00:lb_SYBSJ=lb_SYBSJ/lb_SYBFKIMG;
                        lb_XHFKIMG==0?lb_XHSJ=0.00:lb_XHSJ=lb_XHSJ/lb_XHFKIMG;
                        lb_ZBGSFKIMG==0?lb_ZBGSSJ=0.00:lb_ZBGSSJ=lb_ZBGSSJ/lb_ZBGSFKIMG;
                        lb_FKIMG==0?lb_ZSJ=0.00:lb_ZSJ=lb_ZSJ/lb_FKIMG;
                        let lengbanxj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:lb_FKIMG,
                            ZSJ:lb_ZSJ,
                            ZYFKIMG:lb_ZYFKIMG,
                            ZYSJ:lb_ZYSJ,
                            ZYXSZB:lb_ZYXSZB,
                            FGSFKIMG:lb_FGSFKIMG,
                            FGSSJ:lb_FGSSJ,
                            FGSXSZB:lb_FGSXSZB,
                            SYBFKIMG:lb_SYBFKIMG,
                            SYBSJ:lb_SYBSJ,
                            SYBXSZB:lb_SYBXSZB,
                            XHFKIMG:lb_XHFKIMG,
                            XHSJ:lb_XHSJ,
                            XHXSZB:lb_XHXSZB,
                            ZBGSFKIMG:lb_ZBGSFKIMG,
                            ZBGSSJ:lb_ZBGSSJ,
                            ZBGSXSZB:lb_ZBGSXSZB,
                        }
                        lengban.unshift(lengbanxj,lengban_pucai_k,lengban_pinzhonggang_k,
                            lengban_gaoduan_k,lengban_tese_k,lengban_qita_k);
                        let abc=0
                        while(abc<lengban.length)
                        {
                            if(JSON.stringify(lengban[abc])=='{}')
                            {
                                lengban.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //螺纹钢 产线

                    //螺纹钢普材
                    if (luowengang_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < luowengang_pucai.length) {
                            rb_FKIMG += luowengang_pucai[a].FKIMG;
                            rb_ZYFKIMG += luowengang_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += luowengang_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += luowengang_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += luowengang_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += luowengang_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += luowengang_pucai[a].SYBXSZB;
                            rb_XHFKIMG += luowengang_pucai[a].XHFKIMG;
                            rb_XHXSZB += luowengang_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += luowengang_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += luowengang_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<luowengang_pucai.length)
                        {
                            rb_ZYSJ += luowengang_pucai[aa].ZYFKIMG*luowengang_pucai[aa].ZYSJ;
                            rb_FGSSJ += luowengang_pucai[aa].FGSFKIMG*luowengang_pucai[aa].FGSSJ;
                            rb_SYBSJ += luowengang_pucai[aa].SYBFKIMG*luowengang_pucai[aa].SYBSJ;
                            rb_XHSJ += luowengang_pucai[aa].XHFKIMG*luowengang_pucai[aa].XHSJ;
                            rb_ZBGSSJ += luowengang_pucai[aa].ZBGSFKIMG*luowengang_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let luowengang_pucaixj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        luowengang_pucai_k=luowengang_pucaixj;
                    }

                    //螺纹钢品种钢
                    if (luowengang_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < luowengang_pinzhonggang.length) {
                            rb_FKIMG += luowengang_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += luowengang_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += luowengang_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += luowengang_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += luowengang_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += luowengang_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += luowengang_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += luowengang_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += luowengang_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += luowengang_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += luowengang_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<luowengang_pinzhonggang.length)
                        {
                            rb_ZYSJ += luowengang_pinzhonggang[aa].ZYFKIMG*luowengang_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += luowengang_pinzhonggang[aa].FGSFKIMG*luowengang_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += luowengang_pinzhonggang[aa].SYBFKIMG*luowengang_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += luowengang_pinzhonggang[aa].XHFKIMG*luowengang_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += luowengang_pinzhonggang[aa].ZBGSFKIMG*luowengang_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let luowengang_pinzhonggangxj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        luowengang_pinzhonggang_k=luowengang_pinzhonggangxj;
                    }

                    //螺纹钢高端产品
                    if (luowengang_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < luowengang_gaoduan.length) {
                            rb_FKIMG += luowengang_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += luowengang_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += luowengang_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += luowengang_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += luowengang_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += luowengang_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += luowengang_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += luowengang_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += luowengang_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += luowengang_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += luowengang_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<luowengang_gaoduan.length)
                        {
                            rb_ZYSJ += luowengang_gaoduan[aa].ZYFKIMG*luowengang_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += luowengang_gaoduan[aa].FGSFKIMG*luowengang_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += luowengang_gaoduan[aa].SYBFKIMG*luowengang_gaoduan[aa].SYBSJ;
                            rb_XHSJ += luowengang_gaoduan[aa].XHFKIMG*luowengang_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += luowengang_gaoduan[aa].ZBGSFKIMG*luowengang_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let luowengang_gaoduanxj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        luowengang_gaoduan_k=luowengang_gaoduanxj;
                    }

                    //螺纹钢特色战略产品
                    if (luowengang_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < luowengang_tese.length) {
                            rb_FKIMG += luowengang_tese[a].FKIMG;
                            rb_ZYFKIMG += luowengang_tese[a].ZYFKIMG;
                            rb_ZYXSZB += luowengang_tese[a].ZYXSZB;
                            rb_FGSFKIMG += luowengang_tese[a].FGSFKIMG;
                            rb_FGSXSZB += luowengang_tese[a].FGSXSZB;
                            rb_SYBFKIMG += luowengang_tese[a].SYBFKIMG;
                            rb_SYBXSZB += luowengang_tese[a].SYBXSZB;
                            rb_XHFKIMG += luowengang_tese[a].XHFKIMG;
                            rb_XHXSZB += luowengang_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += luowengang_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += luowengang_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<luowengang_tese.length)
                        {
                            rb_ZYSJ += luowengang_tese[aa].ZYFKIMG*luowengang_tese[aa].ZYSJ;
                            rb_FGSSJ += luowengang_tese[aa].FGSFKIMG*luowengang_tese[aa].FGSSJ;
                            rb_SYBSJ += luowengang_tese[aa].SYBFKIMG*luowengang_tese[aa].SYBSJ;
                            rb_XHSJ += luowengang_tese[aa].XHFKIMG*luowengang_tese[aa].XHSJ;
                            rb_ZBGSSJ += luowengang_tese[aa].ZBGSFKIMG*luowengang_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let luowengang_tesexj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        luowengang_tese_k=luowengang_tesexj;
                    }

                    //螺纹钢其他
                    if (luowengang_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < luowengang_qita.length) {
                            rb_FKIMG += luowengang_qita[a].FKIMG;
                            rb_ZYFKIMG += luowengang_qita[a].ZYFKIMG;
                            rb_ZYXSZB += luowengang_qita[a].ZYXSZB;
                            rb_FGSFKIMG += luowengang_qita[a].FGSFKIMG;
                            rb_FGSXSZB += luowengang_qita[a].FGSXSZB;
                            rb_SYBFKIMG += luowengang_qita[a].SYBFKIMG;
                            rb_SYBXSZB += luowengang_qita[a].SYBXSZB;
                            rb_XHFKIMG += luowengang_qita[a].XHFKIMG;
                            rb_XHXSZB += luowengang_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += luowengang_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += luowengang_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<luowengang_qita.length)
                        {
                            rb_ZYSJ += luowengang_qita[aa].ZYFKIMG*luowengang_qita[aa].ZYSJ;
                            rb_FGSSJ += luowengang_qita[aa].FGSFKIMG*luowengang_qita[aa].FGSSJ;
                            rb_SYBSJ += luowengang_qita[aa].SYBFKIMG*luowengang_qita[aa].SYBSJ;
                            rb_XHSJ += luowengang_qita[aa].XHFKIMG*luowengang_qita[aa].XHSJ;
                            rb_ZBGSSJ += luowengang_qita[aa].ZBGSFKIMG*luowengang_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let luowengang_qitaxj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        luowengang_qita_k=luowengang_qitaxj;
                    }

                    //螺纹钢
                    if (luowengang.length > 0) {
                        let khb_FKIMG = 0;
                        let khb_ZSJ = 0;
                        let khb_ZYFKIMG = 0;
                        let khb_ZYSJ = 0;
                        let khb_ZYXSZB = 0;
                        let khb_FGSFKIMG = 0;
                        let khb_FGSSJ = 0;
                        let khb_FGSXSZB = 0;
                        let khb_SYBFKIMG = 0;
                        let khb_SYBSJ = 0;
                        let khb_SYBXSZB = 0;
                        let khb_XHFKIMG = 0;
                        let khb_XHSJ = 0;
                        let khb_XHXSZB = 0;
                        let khb_ZBGSFKIMG = 0;
                        let khb_ZBGSSJ = 0;
                        let khb_ZBGSXSZB = 0;

                        let e = 0;
                        while (e < luowengang.length) {
                            khb_FKIMG += luowengang[e].FKIMG;
                            khb_ZYFKIMG += luowengang[e].ZYFKIMG;
                            khb_ZYXSZB += luowengang[e].ZYXSZB;
                            khb_FGSFKIMG += luowengang[e].FGSFKIMG;
                            khb_FGSXSZB += luowengang[e].FGSXSZB;
                            khb_SYBFKIMG += luowengang[e].SYBFKIMG;
                            khb_SYBXSZB += luowengang[e].SYBXSZB;
                            khb_XHFKIMG += luowengang[e].XHFKIMG;
                            khb_XHXSZB += luowengang[e].XHXSZB;
                            khb_ZBGSFKIMG += luowengang[e].ZBGSFKIMG;
                            khb_ZBGSXSZB += luowengang[e].ZBGSXSZB;
                            e++;
                        }
                        khb_FKIMG==0? khb_ZYXSZB=0+'%' :khb_ZYXSZB = khb_ZYFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_FGSXSZB=0+'%' :khb_FGSXSZB = khb_FGSFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_SYBXSZB=0+'%' :khb_SYBXSZB = khb_SYBFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_XHXSZB=0+'%' :khb_XHXSZB = khb_XHFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_ZBGSXSZB=0+'%' :khb_ZBGSXSZB = khb_ZBGSFKIMG/khb_FKIMG;
                        let ee=0;
                        while(ee<luowengang.length)
                        {
                            khb_ZYSJ += luowengang[ee].ZYFKIMG*luowengang[ee].ZYSJ;
                            khb_FGSSJ += luowengang[ee].FGSFKIMG*luowengang[ee].FGSSJ;
                            khb_SYBSJ += luowengang[ee].SYBFKIMG*luowengang[ee].SYBSJ;
                            khb_XHSJ += luowengang[ee].XHFKIMG*luowengang[ee].XHSJ;
                            khb_ZBGSSJ += luowengang[ee].ZBGSFKIMG*luowengang[ee].ZBGSSJ;
                            ee++;
                        }
                        khb_ZSJ=khb_ZYSJ+khb_FGSSJ+khb_SYBSJ+khb_XHSJ+khb_ZBGSSJ;
                        khb_ZYFKIMG==0?khb_ZYSJ=0.00:khb_ZYSJ=khb_ZYSJ/khb_ZYFKIMG;
                        khb_FGSFKIMG==0?khb_FGSSJ=0.00:khb_FGSSJ=khb_FGSSJ/khb_FGSFKIMG;
                        khb_SYBFKIMG==0?khb_SYBSJ=0.00:khb_SYBSJ=khb_SYBSJ/khb_SYBFKIMG;
                        khb_XHFKIMG==0?khb_XHSJ=0.00:khb_XHSJ=khb_XHSJ/khb_XHFKIMG;
                        khb_ZBGSFKIMG==0?khb_ZBGSSJ=0.00:khb_ZBGSSJ=khb_ZBGSSJ/khb_ZBGSFKIMG;
                        khb_FKIMG==0?khb_ZSJ=0.00:khb_ZSJ=khb_ZSJ/khb_FKIMG;
                        let luowengangxj={
                            ZL:"螺纹钢",
                            CXNAME:"螺纹钢小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:khb_FKIMG,
                            ZSJ:khb_ZSJ,
                            ZYFKIMG:khb_ZYFKIMG,
                            ZYSJ:khb_ZYSJ,
                            ZYXSZB:khb_ZYXSZB,
                            FGSFKIMG:khb_FGSFKIMG,
                            FGSSJ:khb_FGSSJ,
                            FGSXSZB:khb_FGSXSZB,
                            SYBFKIMG:khb_SYBFKIMG,
                            SYBSJ:khb_SYBSJ,
                            SYBXSZB:khb_SYBXSZB,
                            XHFKIMG:khb_XHFKIMG,
                            XHSJ:khb_XHSJ,
                            XHXSZB:khb_XHXSZB,
                            ZBGSFKIMG:khb_ZBGSFKIMG,
                            ZBGSSJ:khb_ZBGSSJ,
                            ZBGSXSZB:khb_ZBGSXSZB,
                        }
                        luowengang.unshift(luowengangxj,luowengang_pucai_k,luowengang_pinzhonggang_k,
                            luowengang_gaoduan_k,luowengang_tese_k,luowengang_qita_k);
                        let abc=0
                        while(abc<luowengang.length)
                        {
                            if(JSON.stringify(luowengang[abc])=='{}')
                            {
                                luowengang.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //酸洗 产线

                    //酸洗普材
                    if (suanxi_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < suanxi_pucai.length) {
                            rb_FKIMG += suanxi_pucai[a].FKIMG;
                            rb_ZYFKIMG += suanxi_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += suanxi_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += suanxi_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += suanxi_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += suanxi_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += suanxi_pucai[a].SYBXSZB;
                            rb_XHFKIMG += suanxi_pucai[a].XHFKIMG;
                            rb_XHXSZB += suanxi_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += suanxi_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += suanxi_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<suanxi_pucai.length)
                        {
                            rb_ZYSJ += suanxi_pucai[aa].ZYFKIMG*suanxi_pucai[aa].ZYSJ;
                            rb_FGSSJ += suanxi_pucai[aa].FGSFKIMG*suanxi_pucai[aa].FGSSJ;
                            rb_SYBSJ += suanxi_pucai[aa].SYBFKIMG*suanxi_pucai[aa].SYBSJ;
                            rb_XHSJ += suanxi_pucai[aa].XHFKIMG*suanxi_pucai[aa].XHSJ;
                            rb_ZBGSSJ += suanxi_pucai[aa].ZBGSFKIMG*suanxi_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let suanxi_pucaixj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        suanxi_pucai_k=suanxi_pucaixj;
                    }

                    //酸洗品种钢
                    if (suanxi_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < suanxi_pinzhonggang.length) {
                            rb_FKIMG += suanxi_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += suanxi_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += suanxi_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += suanxi_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += suanxi_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += suanxi_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += suanxi_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += suanxi_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += suanxi_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += suanxi_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += suanxi_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<suanxi_pinzhonggang.length)
                        {
                            rb_ZYSJ += suanxi_pinzhonggang[aa].ZYFKIMG*suanxi_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += suanxi_pinzhonggang[aa].FGSFKIMG*suanxi_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += suanxi_pinzhonggang[aa].SYBFKIMG*suanxi_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += suanxi_pinzhonggang[aa].XHFKIMG*suanxi_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += suanxi_pinzhonggang[aa].ZBGSFKIMG*suanxi_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let suanxi_pinzhonggangxj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        suanxi_pinzhonggang_k=suanxi_pinzhonggangxj;
                    }

                    //酸洗高端产品
                    if (suanxi_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < suanxi_gaoduan.length) {
                            rb_FKIMG += suanxi_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += suanxi_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += suanxi_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += suanxi_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += suanxi_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += suanxi_gaoduan[a].SYBFKIMG
                            rb_SYBXSZB += suanxi_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += suanxi_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += suanxi_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += suanxi_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += suanxi_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<suanxi_gaoduan.length)
                        {
                            rb_ZYSJ += suanxi_gaoduan[aa].ZYFKIMG*suanxi_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += suanxi_gaoduan[aa].FGSFKIMG*suanxi_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += suanxi_gaoduan[aa].SYBFKIMG*suanxi_gaoduan[aa].SYBSJ;
                            rb_XHSJ += suanxi_gaoduan[aa].XHFKIMG*suanxi_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += suanxi_gaoduan[aa].ZBGSFKIMG*suanxi_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let suanxi_gaoduanxj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        suanxi_gaoduan_k=suanxi_gaoduanxj;
                    }

                    //酸洗特色战略产品
                    if (suanxi_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < suanxi_tese.length) {
                            rb_FKIMG += suanxi_tese[a].FKIMG;
                            rb_ZYFKIMG += suanxi_tese[a].ZYFKIMG;
                            rb_ZYXSZB += suanxi_tese[a].ZYXSZB;
                            rb_FGSFKIMG += suanxi_tese[a].FGSFKIMG;
                            rb_FGSXSZB += suanxi_tese[a].FGSXSZB;
                            rb_SYBFKIMG += suanxi_tese[a].SYBFKIMG;
                            rb_SYBXSZB += suanxi_tese[a].SYBXSZB;
                            rb_XHFKIMG += suanxi_tese[a].XHFKIMG;
                            rb_XHXSZB += suanxi_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += suanxi_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += suanxi_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<suanxi_tese.length)
                        {
                            rb_ZYSJ += suanxi_tese[aa].ZYFKIMG*suanxi_tese[aa].ZYSJ;
                            rb_FGSSJ += suanxi_tese[aa].FGSFKIMG*suanxi_tese[aa].FGSSJ;
                            rb_SYBSJ += suanxi_tese[aa].SYBFKIMG*suanxi_tese[aa].SYBSJ;
                            rb_XHSJ += suanxi_tese[aa].XHFKIMG*suanxi_tese[aa].XHSJ;
                            rb_ZBGSSJ += suanxi_tese[aa].ZBGSFKIMG*suanxi_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let suanxi_tesexj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        suanxi_tese_k=suanxi_tesexj;
                    }

                    //酸洗其他
                    if (suanxi_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < suanxi_qita.length) {
                            rb_FKIMG += suanxi_qita[a].FKIMG;
                            rb_ZYFKIMG += suanxi_qita[a].ZYFKIMG;
                            rb_ZYXSZB += suanxi_qita[a].ZYXSZB;
                            rb_FGSFKIMG += suanxi_qita[a].FGSFKIMG;
                            rb_FGSXSZB += suanxi_qita[a].FGSXSZB;
                            rb_SYBFKIMG += suanxi_qita[a].SYBFKIMG;
                            rb_SYBXSZB += suanxi_qita[a].SYBXSZB;
                            rb_XHFKIMG += suanxi_qita[a].XHFKIMG;
                            rb_XHXSZB += suanxi_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += suanxi_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += suanxi_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<suanxi_qita.length)
                        {
                            rb_ZYSJ += suanxi_qita[aa].ZYFKIMG*suanxi_qita[aa].ZYSJ;
                            rb_FGSSJ += suanxi_qita[aa].FGSFKIMG*suanxi_qita[aa].FGSSJ;
                            rb_SYBSJ += suanxi_qita[aa].SYBFKIMG*suanxi_qita[aa].SYBSJ;
                            rb_XHSJ += suanxi_qita[aa].XHFKIMG*suanxi_qita[aa].XHSJ;
                            rb_ZBGSSJ += suanxi_qita[aa].ZBGSFKIMG*suanxi_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let suanxi_qitaxj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        suanxi_qita_k=suanxi_qitaxj;
                    }

                    //酸洗
                    if (suanxi.length > 0) {
                        let khb_FKIMG = 0;
                        let khb_ZSJ = 0;
                        let khb_ZYFKIMG = 0;
                        let khb_ZYSJ = 0;
                        let khb_ZYXSZB = 0;
                        let khb_FGSFKIMG = 0;
                        let khb_FGSSJ = 0;
                        let khb_FGSXSZB = 0;
                        let khb_SYBFKIMG = 0;
                        let khb_SYBSJ = 0;
                        let khb_SYBXSZB = 0;
                        let khb_XHFKIMG = 0;
                        let khb_XHSJ = 0;
                        let khb_XHXSZB = 0;
                        let khb_ZBGSFKIMG = 0;
                        let khb_ZBGSSJ = 0;
                        let khb_ZBGSXSZB = 0;

                        let e = 0;
                        while (e < suanxi.length) {
                            khb_FKIMG += suanxi[e].FKIMG;
                            khb_ZYFKIMG += suanxi[e].ZYFKIMG;
                            khb_ZYXSZB += suanxi[e].ZYXSZB;
                            khb_FGSFKIMG += suanxi[e].FGSFKIMG;
                            khb_FGSXSZB += suanxi[e].FGSXSZB;
                            khb_SYBFKIMG += suanxi[e].SYBFKIMG;
                            khb_SYBXSZB += suanxi[e].SYBXSZB;
                            khb_XHFKIMG += suanxi[e].XHFKIMG;
                            khb_XHXSZB += suanxi[e].XHXSZB;
                            khb_ZBGSFKIMG += suanxi[e].ZBGSFKIMG;
                            khb_ZBGSXSZB += suanxi[e].ZBGSXSZB;
                            e++;
                        }
                        khb_FKIMG==0? khb_ZYXSZB=0+'%' :khb_ZYXSZB = khb_ZYFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_FGSXSZB=0+'%' :khb_FGSXSZB = khb_FGSFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_SYBXSZB=0+'%' :khb_SYBXSZB = khb_SYBFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_XHXSZB=0+'%' :khb_XHXSZB = khb_XHFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_ZBGSXSZB=0+'%' :khb_ZBGSXSZB = khb_ZBGSFKIMG/khb_FKIMG;
                        let ee=0;
                        while(ee<suanxi.length)
                        {
                            khb_ZYSJ += suanxi[ee].ZYFKIMG*suanxi[ee].ZYSJ;
                            khb_FGSSJ += suanxi[ee].FGSFKIMG*suanxi[ee].FGSSJ;
                            khb_SYBSJ += suanxi[ee].SYBFKIMG*suanxi[ee].SYBSJ;
                            khb_XHSJ += suanxi[ee].XHFKIMG*suanxi[ee].XHSJ;
                            khb_ZBGSSJ += suanxi[ee].ZBGSFKIMG*suanxi[ee].ZBGSSJ;
                            ee++;
                        }
                        khb_ZSJ=khb_ZYSJ+khb_FGSSJ+khb_SYBSJ+khb_XHSJ+khb_ZBGSSJ;
                        khb_ZYFKIMG==0?khb_ZYSJ=0.00:khb_ZYSJ=khb_ZYSJ/khb_ZYFKIMG;
                        khb_FGSFKIMG==0?khb_FGSSJ=0.00:khb_FGSSJ=khb_FGSSJ/khb_FGSFKIMG;
                        khb_SYBFKIMG==0?khb_SYBSJ=0.00:khb_SYBSJ=khb_SYBSJ/khb_SYBFKIMG;
                        khb_XHFKIMG==0?khb_XHSJ=0.00:khb_XHSJ=khb_XHSJ/khb_XHFKIMG;
                        khb_ZBGSFKIMG==0?khb_ZBGSSJ=0.00:khb_ZBGSSJ=khb_ZBGSSJ/khb_ZBGSFKIMG;
                        khb_FKIMG==0?khb_ZSJ=0.00:khb_ZSJ=khb_ZSJ/khb_FKIMG;
                        let suanxixj={
                            ZL:"酸洗",
                            CXNAME:"酸洗小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:khb_FKIMG,
                            ZSJ:khb_ZSJ,
                            ZYFKIMG:khb_ZYFKIMG,
                            ZYSJ:khb_ZYSJ,
                            ZYXSZB:khb_ZYXSZB,
                            FGSFKIMG:khb_FGSFKIMG,
                            FGSSJ:khb_FGSSJ,
                            FGSXSZB:khb_FGSXSZB,
                            SYBFKIMG:khb_SYBFKIMG,
                            SYBSJ:khb_SYBSJ,
                            SYBXSZB:khb_SYBXSZB,
                            XHFKIMG:khb_XHFKIMG,
                            XHSJ:khb_XHSJ,
                            XHXSZB:khb_XHXSZB,
                            ZBGSFKIMG:khb_ZBGSFKIMG,
                            ZBGSSJ:khb_ZBGSSJ,
                            ZBGSXSZB:khb_ZBGSXSZB,
                        }
                        suanxi.unshift(suanxixj,suanxi_pucai_k,suanxi_pinzhonggang_k,
                            suanxi_gaoduan_k,suanxi_tese_k,suanxi_qita_k);
                        let abc=0
                        while(abc<suanxi.length)
                        {
                            if(JSON.stringify(suanxi[abc])=='{}')
                            {
                                suanxi.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //镀锌 产线

                    //镀锌普材
                    if (duxin_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < duxin_pucai.length) {
                            rb_FKIMG += duxin_pucai[a].FKIMG;
                            rb_ZYFKIMG += duxin_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += duxin_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += duxin_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += duxin_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += duxin_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += duxin_pucai[a].SYBXSZB;
                            rb_XHFKIMG += duxin_pucai[a].XHFKIMG;
                            rb_XHXSZB += duxin_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += duxin_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += duxin_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<duxin_pucai.length)
                        {
                            rb_ZYSJ += duxin_pucai[aa].ZYFKIMG*duxin_pucai[aa].ZYSJ;
                            rb_FGSSJ += duxin_pucai[aa].FGSFKIMG*duxin_pucai[aa].FGSSJ;
                            rb_SYBSJ += duxin_pucai[aa].SYBFKIMG*duxin_pucai[aa].SYBSJ;
                            rb_XHSJ += duxin_pucai[aa].XHFKIMG*duxin_pucai[aa].XHSJ;
                            rb_ZBGSSJ += duxin_pucai[aa].ZBGSFKIMG*duxin_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let duxin_pucaixj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        duxin_pucai_k=duxin_pucaixj;
                    }

                    //镀锌品种钢
                    if (duxin_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < duxin_pinzhonggang.length) {
                            rb_FKIMG += duxin_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += duxin_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += duxin_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += duxin_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += duxin_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += duxin_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += duxin_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += duxin_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += duxin_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += duxin_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += duxin_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<duxin_pinzhonggang.length)
                        {
                            rb_ZYSJ += duxin_pinzhonggang[aa].ZYFKIMG*duxin_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += duxin_pinzhonggang[aa].FGSFKIMG*duxin_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += duxin_pinzhonggang[aa].SYBFKIMG*duxin_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += duxin_pinzhonggang[aa].XHFKIMG*duxin_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += duxin_pinzhonggang[aa].ZBGSFKIMG*duxin_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let duxin_pinzhonggangxj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        duxin_pinzhonggang_k=duxin_pinzhonggangxj;
                    }

                    //镀锌高端产品
                    if (duxin_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < duxin_gaoduan.length) {
                            rb_FKIMG += duxin_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += duxin_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += duxin_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += duxin_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += duxin_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += duxin_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += duxin_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += duxin_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += duxin_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += duxin_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += duxin_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<duxin_gaoduan.length)
                        {
                            rb_ZYSJ += duxin_gaoduan[aa].ZYFKIMG*duxin_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += duxin_gaoduan[aa].FGSFKIMG*duxin_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += duxin_gaoduan[aa].SYBFKIMG*duxin_gaoduan[aa].SYBSJ;
                            rb_XHSJ += duxin_gaoduan[aa].XHFKIMG*duxin_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += duxin_gaoduan[aa].ZBGSFKIMG*duxin_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let duxin_gaoduanxj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        duxin_gaoduan_k=duxin_gaoduanxj;
                    }

                    //镀锌特色战略产品
                    if (duxin_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < duxin_tese.length) {
                            rb_FKIMG += duxin_tese[a].FKIMG;
                            rb_ZYFKIMG += duxin_tese[a].ZYFKIMG;
                            rb_ZYXSZB += duxin_tese[a].ZYXSZB;
                            rb_FGSFKIMG += duxin_tese[a].FGSFKIMG;
                            rb_FGSXSZB += duxin_tese[a].FGSXSZB;
                            rb_SYBFKIMG += duxin_tese[a].SYBFKIMG;
                            rb_SYBXSZB += duxin_tese[a].SYBXSZB;
                            rb_XHFKIMG += duxin_tese[a].XHFKIMG;
                            rb_XHXSZB += duxin_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += duxin_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += duxin_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<duxin_tese.length)
                        {
                            rb_ZYSJ += duxin_tese[aa].ZYFKIMG*duxin_tese[aa].ZYSJ;
                            rb_FGSSJ += duxin_tese[aa].FGSFKIMG*duxin_tese[aa].FGSSJ;
                            rb_SYBSJ += duxin_tese[aa].SYBFKIMG*duxin_tese[aa].SYBSJ;
                            rb_XHSJ += duxin_tese[aa].XHFKIMG*duxin_tese[aa].XHSJ;
                            rb_ZBGSSJ += duxin_tese[aa].ZBGSFKIMG*duxin_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let duxin_tesexj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        duxin_tese_k=duxin_tesexj;
                    }

                    //镀锌其他
                    if (duxin_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < duxin_qita.length) {
                            rb_FKIMG += duxin_qita[a].FKIMG;
                            rb_ZYFKIMG += duxin_qita[a].ZYFKIMG;
                            rb_ZYXSZB += duxin_qita[a].ZYXSZB;
                            rb_FGSFKIMG += duxin_qita[a].FGSFKIMG;
                            rb_FGSXSZB += duxin_qita[a].FGSXSZB;
                            rb_SYBFKIMG += duxin_qita[a].SYBFKIMG;
                            rb_SYBXSZB += duxin_qita[a].SYBXSZB;
                            rb_XHFKIMG += duxin_qita[a].XHFKIMG;
                            rb_XHXSZB += duxin_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += duxin_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += duxin_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<duxin_qita.length)
                        {
                            rb_ZYSJ += duxin_qita[aa].ZYFKIMG*duxin_qita[aa].ZYSJ;
                            rb_FGSSJ += duxin_qita[aa].FGSFKIMG*duxin_qita[aa].FGSSJ;
                            rb_SYBSJ += duxin_qita[aa].SYBFKIMG*duxin_qita[aa].SYBSJ;
                            rb_XHSJ += duxin_qita[aa].XHFKIMG*duxin_qita[aa].XHSJ;
                            rb_ZBGSSJ += duxin_qita[aa].ZBGSFKIMG*duxin_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let duxin_qitaxj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        duxin_qita_k=duxin_qitaxj;
                    }

                    //镀锌
                    if (duxin.length > 0) {
                        let khb_FKIMG = 0;
                        let khb_ZSJ = 0;
                        let khb_ZYFKIMG = 0;
                        let khb_ZYSJ = 0;
                        let khb_ZYXSZB = 0;
                        let khb_FGSFKIMG = 0;
                        let khb_FGSSJ = 0;
                        let khb_FGSXSZB = 0;
                        let khb_SYBFKIMG = 0;
                        let khb_SYBSJ = 0;
                        let khb_SYBXSZB = 0;
                        let khb_XHFKIMG = 0;
                        let khb_XHSJ = 0;
                        let khb_XHXSZB = 0;
                        let khb_ZBGSFKIMG = 0;
                        let khb_ZBGSSJ = 0;
                        let khb_ZBGSXSZB = 0;

                        let e = 0;
                        while (e < duxin.length) {
                            khb_FKIMG += duxin[e].FKIMG;
                            khb_ZYFKIMG += duxin[e].ZYFKIMG;
                            khb_ZYXSZB += duxin[e].ZYXSZB;
                            khb_FGSFKIMG += duxin[e].FGSFKIMG;
                            khb_FGSXSZB += duxin[e].FGSXSZB;
                            khb_SYBFKIMG += duxin[e].SYBFKIMG;
                            khb_SYBXSZB += duxin[e].SYBXSZB;
                            khb_XHFKIMG += duxin[e].XHFKIMG;
                            khb_XHXSZB += duxin[e].XHXSZB;
                            khb_ZBGSFKIMG += duxin[e].ZBGSFKIMG;
                            khb_ZBGSXSZB += duxin[e].ZBGSXSZB;
                            e++;
                        }
                        khb_FKIMG==0? khb_ZYXSZB=0+'%' :khb_ZYXSZB = khb_ZYFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_FGSXSZB=0+'%' :khb_FGSXSZB = khb_FGSFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_SYBXSZB=0+'%' :khb_SYBXSZB = khb_SYBFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_XHXSZB=0+'%' :khb_XHXSZB = khb_XHFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_ZBGSXSZB=0+'%' :khb_ZBGSXSZB = khb_ZBGSFKIMG/khb_FKIMG;
                        let ee=0;
                        while(ee<duxin.length)
                        {
                            khb_ZYSJ += duxin[ee].ZYFKIMG*duxin[ee].ZYSJ;
                            khb_FGSSJ += duxin[ee].FGSFKIMG*duxin[ee].FGSSJ;
                            khb_SYBSJ += duxin[ee].SYBFKIMG*duxin[ee].SYBSJ;
                            khb_XHSJ += duxin[ee].XHFKIMG*duxin[ee].XHSJ;
                            khb_ZBGSSJ += duxin[ee].ZBGSFKIMG*duxin[ee].ZBGSSJ;
                            ee++;
                        }
                        khb_ZSJ=khb_ZYSJ+khb_FGSSJ+khb_SYBSJ+khb_XHSJ+khb_ZBGSSJ;
                        khb_ZYFKIMG==0?khb_ZYSJ=0.00:khb_ZYSJ=khb_ZYSJ/khb_ZYFKIMG;
                        khb_FGSFKIMG==0?khb_FGSSJ=0.00:khb_FGSSJ=khb_FGSSJ/khb_FGSFKIMG;
                        khb_SYBFKIMG==0?khb_SYBSJ=0.00:khb_SYBSJ=khb_SYBSJ/khb_SYBFKIMG;
                        khb_XHFKIMG==0?khb_XHSJ=0.00:khb_XHSJ=khb_XHSJ/khb_XHFKIMG;
                        khb_ZBGSFKIMG==0?khb_ZBGSSJ=0.00:khb_ZBGSSJ=khb_ZBGSSJ/khb_ZBGSFKIMG;
                        khb_FKIMG==0?khb_ZSJ=0.00:khb_ZSJ=khb_ZSJ/khb_FKIMG;
                        let duxinxj={
                            ZL:"镀锌",
                            CXNAME:"镀锌小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:khb_FKIMG,
                            ZSJ:khb_ZSJ,
                            ZYFKIMG:khb_ZYFKIMG,
                            ZYSJ:khb_ZYSJ,
                            ZYXSZB:khb_ZYXSZB,
                            FGSFKIMG:khb_FGSFKIMG,
                            FGSSJ:khb_FGSSJ,
                            FGSXSZB:khb_FGSXSZB,
                            SYBFKIMG:khb_SYBFKIMG,
                            SYBSJ:khb_SYBSJ,
                            SYBXSZB:khb_SYBXSZB,
                            XHFKIMG:khb_XHFKIMG,
                            XHSJ:khb_XHSJ,
                            XHXSZB:khb_XHXSZB,
                            ZBGSFKIMG:khb_ZBGSFKIMG,
                            ZBGSSJ:khb_ZBGSSJ,
                            ZBGSXSZB:khb_ZBGSXSZB,
                        }
                        duxin.unshift(duxinxj,duxin_pucai_k,duxin_pinzhonggang_k,
                            duxin_gaoduan_k,duxin_tese_k,duxin_qita_k);
                        let abc=0
                        while(abc<duxin.length)
                        {
                            if(JSON.stringify(duxin[abc])=='{}')
                            {
                                duxin.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //线材 产线

                    //线材普材
                    if (xiancai_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xiancai_pucai.length) {
                            rb_FKIMG += xiancai_pucai[a].FKIMG;
                            rb_ZYFKIMG += xiancai_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += xiancai_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += xiancai_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += xiancai_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += xiancai_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += xiancai_pucai[a].SYBXSZB;
                            rb_XHFKIMG += xiancai_pucai[a].XHFKIMG;
                            rb_XHXSZB += xiancai_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += xiancai_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xiancai_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xiancai_pucai.length)
                        {
                            rb_ZYSJ += xiancai_pucai[aa].ZYFKIMG*xiancai_pucai[aa].ZYSJ;
                            rb_FGSSJ += xiancai_pucai[aa].FGSFKIMG*xiancai_pucai[aa].FGSSJ;
                            rb_SYBSJ += xiancai_pucai[aa].SYBFKIMG*xiancai_pucai[aa].SYBSJ;
                            rb_XHSJ += xiancai_pucai[aa].XHFKIMG*xiancai_pucai[aa].XHSJ;
                            rb_ZBGSSJ += xiancai_pucai[aa].ZBGSFKIMG*xiancai_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xiancai_pucaixj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xiancai_pucai_k=xiancai_pucaixj;
                    }

                    //线材品种钢
                    if (xiancai_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xiancai_pinzhonggang.length) {
                            rb_FKIMG += xiancai_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += xiancai_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += xiancai_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += xiancai_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += xiancai_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += xiancai_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += xiancai_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += xiancai_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += xiancai_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += xiancai_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xiancai_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xiancai_pinzhonggang.length)
                        {
                            rb_ZYSJ += xiancai_pinzhonggang[aa].ZYFKIMG*xiancai_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += xiancai_pinzhonggang[aa].FGSFKIMG*xiancai_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += xiancai_pinzhonggang[aa].SYBFKIMG*xiancai_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += xiancai_pinzhonggang[aa].XHFKIMG*xiancai_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += xiancai_pinzhonggang[aa].ZBGSFKIMG*xiancai_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xiancai_pinzhonggangxj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xiancai_pinzhonggang_k=xiancai_pinzhonggangxj;
                    }

                    //线材高端产品
                    if (xiancai_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xiancai_gaoduan.length) {
                            rb_FKIMG += xiancai_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += xiancai_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += xiancai_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += xiancai_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += xiancai_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += xiancai_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += xiancai_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += xiancai_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += xiancai_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += xiancai_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xiancai_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xiancai_gaoduan.length)
                        {
                            rb_ZYSJ += xiancai_gaoduan[aa].ZYFKIMG*xiancai_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += xiancai_gaoduan[aa].FGSFKIMG*xiancai_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += xiancai_gaoduan[aa].SYBFKIMG*xiancai_gaoduan[aa].SYBSJ;
                            rb_XHSJ += xiancai_gaoduan[aa].XHFKIMG*xiancai_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += xiancai_gaoduan[aa].ZBGSFKIMG*xiancai_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xiancai_gaoduanxj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xiancai_gaoduan_k=xiancai_gaoduanxj;
                    }

                    //线材特色战略产品
                    if (xiancai_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xiancai_tese.length) {
                            rb_FKIMG += xiancai_tese[a].FKIMG;
                            rb_ZYFKIMG += xiancai_tese[a].ZYFKIMG;
                            rb_ZYXSZB += xiancai_tese[a].ZYXSZB;
                            rb_FGSFKIMG += xiancai_tese[a].FGSFKIMG;
                            rb_FGSXSZB += xiancai_tese[a].FGSXSZB;
                            rb_SYBFKIMG += xiancai_tese[a].SYBFKIMG;
                            rb_SYBXSZB += xiancai_tese[a].SYBXSZB;
                            rb_XHFKIMG += xiancai_tese[a].XHFKIMG;
                            rb_XHXSZB += xiancai_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += xiancai_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xiancai_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xiancai_tese.length)
                        {
                            rb_ZYSJ += xiancai_tese[aa].ZYFKIMG*xiancai_tese[aa].ZYSJ;
                            rb_FGSSJ += xiancai_tese[aa].FGSFKIMG*xiancai_tese[aa].FGSSJ;
                            rb_SYBSJ += xiancai_tese[aa].SYBFKIMG*xiancai_tese[aa].SYBSJ;
                            rb_XHSJ += xiancai_tese[aa].XHFKIMG*xiancai_tese[aa].XHSJ;
                            rb_ZBGSSJ += xiancai_tese[aa].ZBGSFKIMG*xiancai_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xiancai_tesexj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xiancai_tese_k=xiancai_tesexj;
                    }

                    //线材其他
                    if (xiancai_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xiancai_qita.length) {
                            rb_FKIMG += xiancai_qita[a].FKIMG;
                            rb_ZYFKIMG += xiancai_qita[a].ZYFKIMG;
                            rb_ZYXSZB += xiancai_qita[a].ZYXSZB;
                            rb_FGSFKIMG += xiancai_qita[a].FGSFKIMG;
                            rb_FGSXSZB += xiancai_qita[a].FGSXSZB;
                            rb_SYBFKIMG += xiancai_qita[a].SYBFKIMG;
                            rb_SYBXSZB += xiancai_qita[a].SYBXSZB;
                            rb_XHFKIMG += xiancai_qita[a].XHFKIMG;
                            rb_XHXSZB += xiancai_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += xiancai_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xiancai_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xiancai_qita.length)
                        {
                            rb_ZYSJ += xiancai_qita[aa].ZYFKIMG*xiancai_qita[aa].ZYSJ;
                            rb_FGSSJ += xiancai_qita[aa].FGSFKIMG*xiancai_qita[aa].FGSSJ;
                            rb_SYBSJ += xiancai_qita[aa].SYBFKIMG*xiancai_qita[aa].SYBSJ;
                            rb_XHSJ += xiancai_qita[aa].XHFKIMG*xiancai_qita[aa].XHSJ;
                            rb_ZBGSSJ += xiancai_qita[aa].ZBGSFKIMG*xiancai_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xiancai_qitaxj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xiancai_qita_k=xiancai_qitaxj;
                    }

                    //线材
                    if (xiancai.length > 0) {
                        let bx_FKIMG = 0;
                        let bx_ZSJ = 0;
                        let bx_ZYFKIMG = 0;
                        let bx_ZYSJ = 0;
                        let bx_ZYXSZB = 0;
                        let bx_FGSFKIMG = 0;
                        let bx_FGSSJ = 0;
                        let bx_FGSXSZB = 0;
                        let bx_SYBFKIMG = 0;
                        let bx_SYBSJ = 0;
                        let bx_SYBXSZB = 0;
                        let bx_XHFKIMG = 0;
                        let bx_XHSJ = 0;
                        let bx_XHXSZB = 0;
                        let bx_ZBGSFKIMG = 0;
                        let bx_ZBGSSJ = 0;
                        let bx_ZBGSXSZB = 0;

                        let h = 0;
                        while (h < xiancai.length) {
                            bx_FKIMG += xiancai[h].FKIMG;
                            bx_ZYFKIMG += xiancai[h].ZYFKIMG;
                            bx_ZYXSZB += xiancai[h].ZYXSZB;
                            bx_FGSFKIMG += xiancai[h].FGSFKIMG;
                            bx_FGSXSZB += xiancai[h].FGSXSZB;
                            bx_SYBFKIMG += xiancai[h].SYBFKIMG;
                            bx_SYBXSZB += xiancai[h].SYBXSZB;
                            bx_XHFKIMG += xiancai[h].XHFKIMG;
                            bx_XHXSZB += xiancai[h].XHXSZB;
                            bx_ZBGSFKIMG += xiancai[h].ZBGSFKIMG;
                            bx_ZBGSXSZB += xiancai[h].ZBGSXSZB;
                            h++;
                        }
                        bx_FKIMG==0? bx_ZYXSZB=0.00 :bx_ZYXSZB = bx_ZYFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_FGSXSZB=0.00 :bx_FGSXSZB = bx_FGSFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_SYBXSZB=0.00 :bx_SYBXSZB = bx_SYBFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_XHXSZB=0.00 :bx_XHXSZB = bx_XHFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_ZBGSXSZB=0.00 :bx_ZBGSXSZB = bx_ZBGSFKIMG/bx_FKIMG;
                        let hh=0;
                        while(hh<xiancai.length)
                        {
                            bx_ZYSJ += xiancai[hh].ZYFKIMG*xiancai[hh].ZYSJ;
                            bx_FGSSJ += xiancai[hh].FGSFKIMG*xiancai[hh].FGSSJ;
                            bx_SYBSJ += xiancai[hh].SYBFKIMG*xiancai[hh].SYBSJ;
                            bx_XHSJ += xiancai[hh].XHFKIMG*xiancai[hh].XHSJ;
                            bx_ZBGSSJ += xiancai[hh].ZBGSFKIMG*xiancai[hh].ZBGSSJ;
                            hh++;
                        }
                        bx_ZSJ=bx_ZYSJ+bx_FGSSJ+bx_SYBSJ+bx_XHSJ+bx_ZBGSSJ;
                        bx_ZYFKIMG==0?bx_ZYSJ=0.00:bx_ZYSJ=bx_ZYSJ/bx_ZYFKIMG;
                        bx_FGSFKIMG==0?bx_FGSSJ=0.00:bx_FGSSJ=bx_FGSSJ/bx_FGSFKIMG;
                        bx_SYBFKIMG==0?bx_SYBSJ=0.00:bx_SYBSJ=bx_SYBSJ/bx_SYBFKIMG;
                        bx_XHFKIMG==0?bx_XHSJ=0.00:bx_XHSJ=bx_XHSJ/bx_XHFKIMG;
                        bx_ZBGSFKIMG==0?bx_ZBGSSJ=0.00:bx_ZBGSSJ=bx_ZBGSSJ/bx_ZBGSFKIMG;
                        bx_FKIMG==0?bx_ZSJ=0.00:bx_ZSJ=bx_ZSJ/bx_FKIMG;
                        let xiancaixj={
                            ZL:"线材",
                            CXNAME:"线材小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:bx_FKIMG,
                            ZSJ:bx_ZSJ,
                            ZYFKIMG:bx_ZYFKIMG,
                            ZYSJ:bx_ZYSJ,
                            ZYXSZB:bx_ZYXSZB,
                            FGSFKIMG:bx_FGSFKIMG,
                            FGSSJ:bx_FGSSJ,
                            FGSXSZB:bx_FGSXSZB,
                            SYBFKIMG:bx_SYBFKIMG,
                            SYBSJ:bx_SYBSJ,
                            SYBXSZB:bx_SYBXSZB,
                            XHFKIMG:bx_XHFKIMG,
                            XHSJ:bx_XHSJ,
                            XHXSZB:bx_XHXSZB,
                            ZBGSFKIMG:bx_ZBGSFKIMG,
                            ZBGSSJ:bx_ZBGSSJ,
                            ZBGSXSZB:bx_ZBGSXSZB,
                        }
                        xiancai.unshift(xiancaixj,xiancai_pucai_k,xiancai_pinzhonggang_k,
                            xiancai_gaoduan_k,xiancai_tese_k,xiancai_qita_k);
                        let abc=0
                        while(abc<xiancai.length)
                        {
                            if(JSON.stringify(xiancai[abc])=='{}')
                            {
                                xiancai.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //型材 产线

                    //型材普材
                    if (xingcai_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xingcai_pucai.length) {
                            rb_FKIMG += xingcai_pucai[a].FKIMG;
                            rb_ZYFKIMG += xingcai_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += xingcai_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += xingcai_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += xingcai_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += xingcai_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += xingcai_pucai[a].SYBXSZB;
                            rb_XHFKIMG += xingcai_pucai[a].XHFKIMG;
                            rb_XHXSZB += xingcai_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += xingcai_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xingcai_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xingcai_pucai.length)
                        {
                            rb_ZYSJ += xingcai_pucai[aa].ZYFKIMG*xingcai_pucai[aa].ZYSJ;
                            rb_FGSSJ += xingcai_pucai[aa].FGSFKIMG*xingcai_pucai[aa].FGSSJ;
                            rb_SYBSJ += xingcai_pucai[aa].SYBFKIMG*xingcai_pucai[aa].SYBSJ;
                            rb_XHSJ += xingcai_pucai[aa].XHFKIMG*xingcai_pucai[aa].XHSJ;
                            rb_ZBGSSJ += xingcai_pucai[aa].ZBGSFKIMG*xingcai_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xingcai_pucaixj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xingcai_pucai_k=xingcai_pucaixj;
                    }

                    //型材品种钢
                    if (xingcai_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xingcai_pinzhonggang.length) {
                            rb_FKIMG += xingcai_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += xingcai_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += xingcai_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += xingcai_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += xingcai_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += xingcai_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += xingcai_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += xingcai_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += xingcai_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += xingcai_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xingcai_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xingcai_pinzhonggang.length)
                        {
                            rb_ZYSJ += xingcai_pinzhonggang[aa].ZYFKIMG*xingcai_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += xingcai_pinzhonggang[aa].FGSFKIMG*xingcai_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += xingcai_pinzhonggang[aa].SYBFKIMG*xingcai_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += xingcai_pinzhonggang[aa].XHFKIMG*xingcai_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += xingcai_pinzhonggang[aa].ZBGSFKIMG*xingcai_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xingcai_pinzhonggangxj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xingcai_pinzhonggang_k=xingcai_pinzhonggangxj;
                    }

                    //型材高端产品
                    if (xingcai_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xingcai_gaoduan.length) {
                            rb_FKIMG += xingcai_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += xingcai_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += xingcai_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += xingcai_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += xingcai_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += xingcai_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += xingcai_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += xingcai_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += xingcai_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += xingcai_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xingcai_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xingcai_gaoduan.length)
                        {
                            rb_ZYSJ += xingcai_gaoduan[aa].ZYFKIMG*xingcai_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += xingcai_gaoduan[aa].FGSFKIMG*xingcai_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += xingcai_gaoduan[aa].SYBFKIMG*xingcai_gaoduan[aa].SYBSJ;
                            rb_XHSJ += xingcai_gaoduan[aa].XHFKIMG*xingcai_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += xingcai_gaoduan[aa].ZBGSFKIMG*xingcai_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xingcai_gaoduanxj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xingcai_gaoduan_k=xingcai_gaoduanxj;
                    }

                    //型材特色战略产品
                    if (xingcai_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xingcai_tese.length) {
                            rb_FKIMG += xingcai_tese[a].FKIMG;
                            rb_ZYFKIMG += xingcai_tese[a].ZYFKIMG;
                            rb_ZYXSZB += xingcai_tese[a].ZYXSZB;
                            rb_FGSFKIMG += xingcai_tese[a].FGSFKIMG;
                            rb_FGSXSZB += xingcai_tese[a].FGSXSZB;
                            rb_SYBFKIMG += xingcai_tese[a].SYBFKIMG;
                            rb_SYBXSZB += xingcai_tese[a].SYBXSZB;
                            rb_XHFKIMG += xingcai_tese[a].XHFKIMG;
                            rb_XHXSZB += xingcai_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += xingcai_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xingcai_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xingcai_tese.length)
                        {
                            rb_ZYSJ += xingcai_tese[aa].ZYFKIMG*xingcai_tese[aa].ZYSJ;
                            rb_FGSSJ += xingcai_tese[aa].FGSFKIMG*xingcai_tese[aa].FGSSJ;
                            rb_SYBSJ += xingcai_tese[aa].SYBFKIMG*xingcai_tese[aa].SYBSJ;
                            rb_XHSJ += xingcai_tese[aa].XHFKIMG*xingcai_tese[aa].XHSJ;
                            rb_ZBGSSJ += xingcai_tese[aa].ZBGSFKIMG*xingcai_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xingcai_tesexj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xingcai_tese_k=xingcai_tesexj;
                    }

                    //型材其他
                    if (xingcai_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < xingcai_qita.length) {
                            rb_FKIMG += xingcai_qita[a].FKIMG;
                            rb_ZYFKIMG += xingcai_qita[a].ZYFKIMG;
                            rb_ZYXSZB += xingcai_qita[a].ZYXSZB;
                            rb_FGSFKIMG += xingcai_qita[a].FGSFKIMG;
                            rb_FGSXSZB += xingcai_qita[a].FGSXSZB;
                            rb_SYBFKIMG += xingcai_qita[a].SYBFKIMG;
                            rb_SYBXSZB += xingcai_qita[a].SYBXSZB;
                            rb_XHFKIMG += xingcai_qita[a].XHFKIMG;
                            rb_XHXSZB += xingcai_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += xingcai_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += xingcai_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<xingcai_qita.length)
                        {
                            rb_ZYSJ += xingcai_qita[aa].ZYFKIMG*xingcai_qita[aa].ZYSJ;
                            rb_FGSSJ += xingcai_qita[aa].FGSFKIMG*xingcai_qita[aa].FGSSJ;
                            rb_SYBSJ += xingcai_qita[aa].SYBFKIMG*xingcai_qita[aa].SYBSJ;
                            rb_XHSJ += xingcai_qita[aa].XHFKIMG*xingcai_qita[aa].XHSJ;
                            rb_ZBGSSJ += xingcai_qita[aa].ZBGSFKIMG*xingcai_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let xingcai_qitaxj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        xingcai_qita_k=xingcai_qitaxj;
                    }

                    //型材
                    if (xingcai.length > 0) {
                        let xc_FKIMG = 0;
                        let xc_ZSJ = 0;
                        let xc_ZYFKIMG = 0;
                        let xc_ZYSJ = 0;
                        let xc_ZYXSZB = 0;
                        let xc_FGSFKIMG = 0;
                        let xc_FGSSJ = 0;
                        let xc_FGSXSZB = 0;
                        let xc_SYBFKIMG = 0;
                        let xc_SYBSJ = 0;
                        let xc_SYBXSZB = 0;
                        let xc_XHFKIMG = 0;
                        let xc_XHSJ = 0;
                        let xc_XHXSZB = 0;
                        let xc_ZBGSFKIMG = 0;
                        let xc_ZBGSSJ = 0;
                        let xc_ZBGSXSZB = 0;

                        let i = 0;
                        while (i < xingcai.length) {
                            xc_FKIMG += xingcai[i].FKIMG;
                            xc_ZYFKIMG += xingcai[i].ZYFKIMG;
                            xc_ZYXSZB += xingcai[i].ZYXSZB;
                            xc_FGSFKIMG += xingcai[i].FGSFKIMG;
                            xc_FGSXSZB += xingcai[i].FGSXSZB;
                            xc_SYBFKIMG += xingcai[i].SYBFKIMG;
                            xc_SYBXSZB += xingcai[i].SYBXSZB;
                            xc_XHFKIMG += xingcai[i].XHFKIMG;
                            xc_XHXSZB += xingcai[i].XHXSZB;
                            xc_ZBGSFKIMG += xingcai[i].ZBGSFKIMG;
                            xc_ZBGSXSZB += xingcai[i].ZBGSXSZB;
                            i++;
                        }
                        xc_FKIMG==0? xc_ZYXSZB=0+'%' :xc_ZYXSZB = xc_ZYFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_FGSXSZB=0+'%' :xc_FGSXSZB = xc_FGSFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_SYBXSZB=0+'%' :xc_SYBXSZB = xc_SYBFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_XHXSZB=0+'%' :xc_XHXSZB = xc_XHFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_ZBGSXSZB=0+'%' :xc_ZBGSXSZB = xc_ZBGSFKIMG/xc_FKIMG;
                        let ii=0;
                        while(ii<xingcai.length)
                        {
                            xc_ZYSJ += xingcai[ii].ZYFKIMG*xingcai[ii].ZYSJ;
                            xc_FGSSJ += xingcai[ii].FGSFKIMG*xingcai[ii].FGSSJ;
                            xc_SYBSJ += xingcai[ii].SYBFKIMG*xingcai[ii].SYBSJ;
                            xc_XHSJ += xingcai[ii].XHFKIMG*xingcai[ii].XHSJ;
                            xc_ZBGSSJ += xingcai[ii].ZBGSFKIMG*xingcai[ii].ZBGSSJ;
                            ii++;
                        }
                        xc_ZSJ=xc_ZYSJ+xc_FGSSJ+xc_SYBSJ+xc_XHSJ+xc_ZBGSSJ;
                        xc_ZYFKIMG==0?xc_ZYSJ=0.00:xc_ZYSJ=xc_ZYSJ/xc_ZYFKIMG;
                        xc_FGSFKIMG==0?xc_FGSSJ=0.00:xc_FGSSJ=xc_FGSSJ/xc_FGSFKIMG;
                        xc_SYBFKIMG==0?xc_SYBSJ=0.00:xc_SYBSJ=xc_SYBSJ/xc_SYBFKIMG;
                        xc_XHFKIMG==0?xc_XHSJ=0.00:xc_XHSJ=xc_XHSJ/xc_XHFKIMG;
                        xc_ZBGSFKIMG==0?xc_ZBGSSJ=0.00:xc_ZBGSSJ=xc_ZBGSSJ/xc_ZBGSFKIMG;
                        xc_FKIMG==0?xc_ZSJ=0.00:xc_ZSJ=xc_ZSJ/xc_FKIMG;
                        let xingcaixj={
                            ZL:"型材",
                            CXNAME:"型材小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:xc_FKIMG,
                            ZSJ:xc_ZSJ,
                            ZYFKIMG:xc_ZYFKIMG,
                            ZYSJ:xc_ZYSJ,
                            ZYXSZB:xc_ZYXSZB,
                            FGSFKIMG:xc_FGSFKIMG,
                            FGSSJ:xc_FGSSJ,
                            FGSXSZB:xc_FGSXSZB,
                            SYBFKIMG:xc_SYBFKIMG,
                            SYBSJ:xc_SYBSJ,
                            SYBXSZB:xc_SYBXSZB,
                            XHFKIMG:xc_XHFKIMG,
                            XHSJ:xc_XHSJ,
                            XHXSZB:xc_XHXSZB,
                            ZBGSFKIMG:xc_ZBGSFKIMG,
                            ZBGSSJ:xc_ZBGSSJ,
                            ZBGSXSZB:xc_ZBGSXSZB,
                        }
                        xingcai.unshift(xingcaixj,xingcai_pucai_k,xingcai_pinzhonggang_k,
                            xingcai_gaoduan_k,xingcai_tese_k,xingcai_qita_k);
                        let abc=0
                        while(abc<xingcai.length)
                        {
                            if(JSON.stringify(xingcai[abc])=='{}')
                            {
                                xingcai.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //圆钢 产线

                    //圆钢普材
                    if (yuangang_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < yuangang_pucai.length) {
                            rb_FKIMG += yuangang_pucai[a].FKIMG;
                            rb_ZYFKIMG += yuangang_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += yuangang_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += yuangang_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += yuangang_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += yuangang_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += yuangang_pucai[a].SYBXSZB;
                            rb_XHFKIMG += yuangang_pucai[a].XHFKIMG;
                            rb_XHXSZB += yuangang_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += yuangang_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += yuangang_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<yuangang_pucai.length)
                        {
                            rb_ZYSJ += yuangang_pucai[aa].ZYFKIMG*yuangang_pucai[aa].ZYSJ;
                            rb_FGSSJ += yuangang_pucai[aa].FGSFKIMG*yuangang_pucai[aa].FGSSJ;
                            rb_SYBSJ += yuangang_pucai[aa].SYBFKIMG*yuangang_pucai[aa].SYBSJ;
                            rb_XHSJ += yuangang_pucai[aa].XHFKIMG*yuangang_pucai[aa].XHSJ;
                            rb_ZBGSSJ += yuangang_pucai[aa].ZBGSFKIMG*yuangang_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let yuangang_pucaixj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        yuangang_pucai_k=yuangang_pucaixj;
                    }

                    //圆钢品种钢
                    if (yuangang_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < yuangang_pinzhonggang.length) {
                            rb_FKIMG += yuangang_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += yuangang_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += yuangang_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += yuangang_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += yuangang_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += yuangang_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += yuangang_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += yuangang_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += yuangang_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += yuangang_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += yuangang_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<yuangang_pinzhonggang.length)
                        {
                            rb_ZYSJ += yuangang_pinzhonggang[aa].ZYFKIMG*yuangang_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += yuangang_pinzhonggang[aa].FGSFKIMG*yuangang_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += yuangang_pinzhonggang[aa].SYBFKIMG*yuangang_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += yuangang_pinzhonggang[aa].XHFKIMG*yuangang_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += yuangang_pinzhonggang[aa].ZBGSFKIMG*yuangang_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let yuangang_pinzhonggangxj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        yuangang_pinzhonggang_k=yuangang_pinzhonggangxj;
                    }

                    //圆钢高端产品
                    if (yuangang_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < yuangang_gaoduan.length) {
                            rb_FKIMG += yuangang_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += yuangang_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += yuangang_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += yuangang_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += yuangang_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += yuangang_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += yuangang_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += yuangang_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += yuangang_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += yuangang_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += yuangang_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<yuangang_gaoduan.length)
                        {
                            rb_ZYSJ += yuangang_gaoduan[aa].ZYFKIMG*yuangang_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += yuangang_gaoduan[aa].FGSFKIMG*yuangang_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += yuangang_gaoduan[aa].SYBFKIMG*yuangang_gaoduan[aa].SYBSJ;
                            rb_XHSJ += yuangang_gaoduan[aa].XHFKIMG*yuangang_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += yuangang_gaoduan[aa].ZBGSFKIMG*yuangang_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let yuangang_gaoduanxj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        yuangang_gaoduan_k=yuangang_gaoduanxj;
                    }

                    //圆钢特色战略产品
                    if (yuangang_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < yuangang_tese.length) {
                            rb_FKIMG += yuangang_tese[a].FKIMG;
                            rb_ZYFKIMG += yuangang_tese[a].ZYFKIMG;
                            rb_ZYXSZB += yuangang_tese[a].ZYXSZB;
                            rb_FGSFKIMG += yuangang_tese[a].FGSFKIMG;
                            rb_FGSXSZB += yuangang_tese[a].FGSXSZB;
                            rb_SYBFKIMG += yuangang_tese[a].SYBFKIMG;
                            rb_SYBXSZB += yuangang_tese[a].SYBXSZB;
                            rb_XHFKIMG += yuangang_tese[a].XHFKIMG;
                            rb_XHXSZB += yuangang_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += yuangang_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += yuangang_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<yuangang_tese.length)
                        {
                            rb_ZYSJ += yuangang_tese[aa].ZYFKIMG*yuangang_tese[aa].ZYSJ;
                            rb_FGSSJ += yuangang_tese[aa].FGSFKIMG*yuangang_tese[aa].FGSSJ;
                            rb_SYBSJ += yuangang_tese[aa].SYBFKIMG*yuangang_tese[aa].SYBSJ;
                            rb_XHSJ += yuangang_tese[aa].XHFKIMG*yuangang_tese[aa].XHSJ;
                            rb_ZBGSSJ += yuangang_tese[aa].ZBGSFKIMG*yuangang_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let yuangang_tesexj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        yuangang_tese_k=yuangang_tesexj;
                    }

                    //圆钢其他
                    if (yuangang_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < yuangang_qita.length) {
                            rb_FKIMG += yuangang_qita[a].FKIMG;
                            rb_ZYFKIMG += yuangang_qita[a].ZYFKIMG;
                            rb_ZYXSZB += yuangang_qita[a].ZYXSZB;
                            rb_FGSFKIMG += yuangang_qita[a].FGSFKIMG;
                            rb_FGSXSZB += yuangang_qita[a].FGSXSZB;
                            rb_SYBFKIMG += yuangang_qita[a].SYBFKIMG;
                            rb_SYBXSZB += yuangang_qita[a].SYBXSZB;
                            rb_XHFKIMG += yuangang_qita[a].XHFKIMG;
                            rb_XHXSZB += yuangang_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += yuangang_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += yuangang_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<yuangang_qita.length)
                        {
                            rb_ZYSJ += yuangang_qita[aa].ZYFKIMG*yuangang_qita[aa].ZYSJ;
                            rb_FGSSJ += yuangang_qita[aa].FGSFKIMG*yuangang_qita[aa].FGSSJ;
                            rb_SYBSJ += yuangang_qita[aa].SYBFKIMG*yuangang_qita[aa].SYBSJ;
                            rb_XHSJ += yuangang_qita[aa].XHFKIMG*yuangang_qita[aa].XHSJ;
                            rb_ZBGSSJ += yuangang_qita[aa].ZBGSFKIMG*yuangang_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let yuangang_qitaxj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        yuangang_qita_k=yuangang_qitaxj;
                    }

                    //圆钢
                    if (yuangang.length > 0) {
                        let xc_FKIMG = 0;
                        let xc_ZSJ = 0;
                        let xc_ZYFKIMG = 0;
                        let xc_ZYSJ = 0;
                        let xc_ZYXSZB = 0;
                        let xc_FGSFKIMG = 0;
                        let xc_FGSSJ = 0;
                        let xc_FGSXSZB = 0;
                        let xc_SYBFKIMG = 0;
                        let xc_SYBSJ = 0;
                        let xc_SYBXSZB = 0;
                        let xc_XHFKIMG = 0;
                        let xc_XHSJ = 0;
                        let xc_XHXSZB = 0;
                        let xc_ZBGSFKIMG = 0;
                        let xc_ZBGSSJ = 0;
                        let xc_ZBGSXSZB = 0;

                        let i = 0;
                        while (i < yuangang.length) {
                            xc_FKIMG += yuangang[i].FKIMG;
                            xc_ZYFKIMG += yuangang[i].ZYFKIMG;
                            xc_ZYXSZB += yuangang[i].ZYXSZB;
                            xc_FGSFKIMG += yuangang[i].FGSFKIMG;
                            xc_FGSXSZB += yuangang[i].FGSXSZB;
                            xc_SYBFKIMG += yuangang[i].SYBFKIMG;
                            xc_SYBXSZB += yuangang[i].SYBXSZB;
                            xc_XHFKIMG += yuangang[i].XHFKIMG;
                            xc_XHXSZB += yuangang[i].XHXSZB;
                            xc_ZBGSFKIMG += yuangang[i].ZBGSFKIMG;
                            xc_ZBGSXSZB += yuangang[i].ZBGSXSZB;
                            i++;
                        }
                        xc_FKIMG==0? xc_ZYXSZB=0+'%' :xc_ZYXSZB = xc_ZYFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_FGSXSZB=0+'%' :xc_FGSXSZB = xc_FGSFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_SYBXSZB=0+'%' :xc_SYBXSZB = xc_SYBFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_XHXSZB=0+'%' :xc_XHXSZB = xc_XHFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_ZBGSXSZB=0+'%' :xc_ZBGSXSZB = xc_ZBGSFKIMG/xc_FKIMG;
                        let ii=0;
                        while(ii<yuangang.length)
                        {
                            xc_ZYSJ += yuangang[ii].ZYFKIMG*yuangang[ii].ZYSJ;
                            xc_FGSSJ += yuangang[ii].FGSFKIMG*yuangang[ii].FGSSJ;
                            xc_SYBSJ += yuangang[ii].SYBFKIMG*yuangang[ii].SYBSJ;
                            xc_XHSJ += yuangang[ii].XHFKIMG*yuangang[ii].XHSJ;
                            xc_ZBGSSJ += yuangang[ii].ZBGSFKIMG*yuangang[ii].ZBGSSJ;
                            ii++;
                        }
                        xc_ZSJ=xc_ZYSJ+xc_FGSSJ+xc_SYBSJ+xc_XHSJ+xc_ZBGSSJ;
                        xc_ZYFKIMG==0?xc_ZYSJ=0.00:xc_ZYSJ=xc_ZYSJ/xc_ZYFKIMG;
                        xc_FGSFKIMG==0?xc_FGSSJ=0.00:xc_FGSSJ=xc_FGSSJ/xc_FGSFKIMG;
                        xc_SYBFKIMG==0?xc_SYBSJ=0.00:xc_SYBSJ=xc_SYBSJ/xc_SYBFKIMG;
                        xc_XHFKIMG==0?xc_XHSJ=0.00:xc_XHSJ=xc_XHSJ/xc_XHFKIMG;
                        xc_ZBGSFKIMG==0?xc_ZBGSSJ=0.00:xc_ZBGSSJ=xc_ZBGSSJ/xc_ZBGSFKIMG;
                        xc_FKIMG==0?xc_ZSJ=0.00:xc_ZSJ=xc_ZSJ/xc_FKIMG;
                        let yuangangxj={
                            ZL:"圆钢",
                            CXNAME:"圆钢小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:xc_FKIMG,
                            ZSJ:xc_ZSJ,
                            ZYFKIMG:xc_ZYFKIMG,
                            ZYSJ:xc_ZYSJ,
                            ZYXSZB:xc_ZYXSZB,
                            FGSFKIMG:xc_FGSFKIMG,
                            FGSSJ:xc_FGSSJ,
                            FGSXSZB:xc_FGSXSZB,
                            SYBFKIMG:xc_SYBFKIMG,
                            SYBSJ:xc_SYBSJ,
                            SYBXSZB:xc_SYBXSZB,
                            XHFKIMG:xc_XHFKIMG,
                            XHSJ:xc_XHSJ,
                            XHXSZB:xc_XHXSZB,
                            ZBGSFKIMG:xc_ZBGSFKIMG,
                            ZBGSSJ:xc_ZBGSSJ,
                            ZBGSXSZB:xc_ZBGSXSZB,
                        }
                        yuangang.unshift(yuangangxj,yuangang_pucai_k,yuangang_pinzhonggang_k,
                            yuangang_gaoduan_k,yuangang_tese_k,yuangang_qita_k);
                        let abc=0
                        while(abc<yuangang.length)
                        {
                            if(JSON.stringify(yuangang[abc])=='{}')
                            {
                                yuangang.splice(abc,1);
                                abc=abc-1;
                            }
                            abc++
                        }
                    }

                    //中厚板 产线

                    //中厚板普材
                    if (zhonghouban_pucai.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < zhonghouban_pucai.length) {
                            rb_FKIMG += zhonghouban_pucai[a].FKIMG;
                            rb_ZYFKIMG += zhonghouban_pucai[a].ZYFKIMG;
                            rb_ZYXSZB += zhonghouban_pucai[a].ZYXSZB;
                            rb_FGSFKIMG += zhonghouban_pucai[a].FGSFKIMG;
                            rb_FGSXSZB += zhonghouban_pucai[a].FGSXSZB;
                            rb_SYBFKIMG += zhonghouban_pucai[a].SYBFKIMG;
                            rb_SYBXSZB += zhonghouban_pucai[a].SYBXSZB;
                            rb_XHFKIMG += zhonghouban_pucai[a].XHFKIMG;
                            rb_XHXSZB += zhonghouban_pucai[a].XHXSZB;
                            rb_ZBGSFKIMG += zhonghouban_pucai[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += zhonghouban_pucai[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<zhonghouban_pucai.length)
                        {
                            rb_ZYSJ += zhonghouban_pucai[aa].ZYFKIMG*zhonghouban_pucai[aa].ZYSJ;
                            rb_FGSSJ += zhonghouban_pucai[aa].FGSFKIMG*zhonghouban_pucai[aa].FGSSJ;
                            rb_SYBSJ += zhonghouban_pucai[aa].SYBFKIMG*zhonghouban_pucai[aa].SYBSJ;
                            rb_XHSJ += zhonghouban_pucai[aa].XHFKIMG*zhonghouban_pucai[aa].XHSJ;
                            rb_ZBGSSJ += zhonghouban_pucai[aa].ZBGSFKIMG*zhonghouban_pucai[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let zhonghouban_pucaixj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'普材',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        zhonghouban_pucai_k=zhonghouban_pucaixj;
                    }

                    //中厚板品种钢
                    if (zhonghouban_pinzhonggang.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < zhonghouban_pinzhonggang.length) {
                            rb_FKIMG += zhonghouban_pinzhonggang[a].FKIMG;
                            rb_ZYFKIMG += zhonghouban_pinzhonggang[a].ZYFKIMG;
                            rb_ZYXSZB += zhonghouban_pinzhonggang[a].ZYXSZB;
                            rb_FGSFKIMG += zhonghouban_pinzhonggang[a].FGSFKIMG;
                            rb_FGSXSZB += zhonghouban_pinzhonggang[a].FGSXSZB;
                            rb_SYBFKIMG += zhonghouban_pinzhonggang[a].SYBFKIMG;
                            rb_SYBXSZB += zhonghouban_pinzhonggang[a].SYBXSZB;
                            rb_XHFKIMG += zhonghouban_pinzhonggang[a].XHFKIMG;
                            rb_XHXSZB += zhonghouban_pinzhonggang[a].XHXSZB;
                            rb_ZBGSFKIMG += zhonghouban_pinzhonggang[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += zhonghouban_pinzhonggang[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<zhonghouban_pinzhonggang.length)
                        {
                            rb_ZYSJ += zhonghouban_pinzhonggang[aa].ZYFKIMG*zhonghouban_pinzhonggang[aa].ZYSJ;
                            rb_FGSSJ += zhonghouban_pinzhonggang[aa].FGSFKIMG*zhonghouban_pinzhonggang[aa].FGSSJ;
                            rb_SYBSJ += zhonghouban_pinzhonggang[aa].SYBFKIMG*zhonghouban_pinzhonggang[aa].SYBSJ;
                            rb_XHSJ += zhonghouban_pinzhonggang[aa].XHFKIMG*zhonghouban_pinzhonggang[aa].XHSJ;
                            rb_ZBGSSJ += zhonghouban_pinzhonggang[aa].ZBGSFKIMG*zhonghouban_pinzhonggang[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let zhonghouban_pinzhonggangxj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'品种钢',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        zhonghouban_pinzhonggang_k=zhonghouban_pinzhonggangxj;
                    }

                    //中厚板高端产品
                    if (zhonghouban_gaoduan.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < zhonghouban_gaoduan.length) {
                            rb_FKIMG += zhonghouban_gaoduan[a].FKIMG;
                            rb_ZYFKIMG += zhonghouban_gaoduan[a].ZYFKIMG;
                            rb_ZYXSZB += zhonghouban_gaoduan[a].ZYXSZB;
                            rb_FGSFKIMG += zhonghouban_gaoduan[a].FGSFKIMG;
                            rb_FGSXSZB += zhonghouban_gaoduan[a].FGSXSZB;
                            rb_SYBFKIMG += zhonghouban_gaoduan[a].SYBFKIMG;
                            rb_SYBXSZB += zhonghouban_gaoduan[a].SYBXSZB;
                            rb_XHFKIMG += zhonghouban_gaoduan[a].XHFKIMG;
                            rb_XHXSZB += zhonghouban_gaoduan[a].XHXSZB;
                            rb_ZBGSFKIMG += zhonghouban_gaoduan[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += zhonghouban_gaoduan[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<zhonghouban_gaoduan.length)
                        {
                            rb_ZYSJ += zhonghouban_gaoduan[aa].ZYFKIMG*zhonghouban_gaoduan[aa].ZYSJ;
                            rb_FGSSJ += zhonghouban_gaoduan[aa].FGSFKIMG*zhonghouban_gaoduan[aa].FGSSJ;
                            rb_SYBSJ += zhonghouban_gaoduan[aa].SYBFKIMG*zhonghouban_gaoduan[aa].SYBSJ;
                            rb_XHSJ += zhonghouban_gaoduan[aa].XHFKIMG*zhonghouban_gaoduan[aa].XHSJ;
                            rb_ZBGSSJ += zhonghouban_gaoduan[aa].ZBGSFKIMG*zhonghouban_gaoduan[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let zhonghouban_gaoduanxj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'高端产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        zhonghouban_gaoduan_k=zhonghouban_gaoduanxj;
                    }

                    //中厚板特色战略产品
                    if (zhonghouban_tese.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < zhonghouban_tese.length) {
                            rb_FKIMG += zhonghouban_tese[a].FKIMG;
                            rb_ZYFKIMG += zhonghouban_tese[a].ZYFKIMG;
                            rb_ZYXSZB += zhonghouban_tese[a].ZYXSZB;
                            rb_FGSFKIMG += zhonghouban_tese[a].FGSFKIMG;
                            rb_FGSXSZB += zhonghouban_tese[a].FGSXSZB;
                            rb_SYBFKIMG += zhonghouban_tese[a].SYBFKIMG;
                            rb_SYBXSZB += zhonghouban_tese[a].SYBXSZB;
                            rb_XHFKIMG += zhonghouban_tese[a].XHFKIMG;
                            rb_XHXSZB += zhonghouban_tese[a].XHXSZB;
                            rb_ZBGSFKIMG += zhonghouban_tese[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += zhonghouban_tese[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<zhonghouban_tese.length)
                        {
                            rb_ZYSJ += zhonghouban_tese[aa].ZYFKIMG*zhonghouban_tese[aa].ZYSJ;
                            rb_FGSSJ += zhonghouban_tese[aa].FGSFKIMG*zhonghouban_tese[aa].FGSSJ;
                            rb_SYBSJ += zhonghouban_tese[aa].SYBFKIMG*zhonghouban_tese[aa].SYBSJ;
                            rb_XHSJ += zhonghouban_tese[aa].XHFKIMG*zhonghouban_tese[aa].XHSJ;
                            rb_ZBGSSJ += zhonghouban_tese[aa].ZBGSFKIMG*zhonghouban_tese[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let zhonghouban_tesexj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'特色战略产品',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        zhonghouban_tese_k=zhonghouban_tesexj;
                    }

                    //中厚板其他
                    if (zhonghouban_qita.length > 0) {
                        let rb_FKIMG = 0;
                        let rb_ZSJ = 0;
                        let rb_ZYFKIMG = 0;
                        let rb_ZYSJ = 0;
                        let rb_ZYXSZB = 0;
                        let rb_FGSFKIMG = 0;
                        let rb_FGSSJ = 0;
                        let rb_FGSXSZB = 0;
                        let rb_SYBFKIMG = 0;
                        let rb_SYBSJ = 0;
                        let rb_SYBXSZB = 0;
                        let rb_XHFKIMG = 0;
                        let rb_XHSJ = 0;
                        let rb_XHXSZB = 0;
                        let rb_ZBGSFKIMG = 0;
                        let rb_ZBGSSJ = 0;
                        let rb_ZBGSXSZB = 0;

                        let a = 0;
                        while (a < zhonghouban_qita.length) {
                            rb_FKIMG += zhonghouban_qita[a].FKIMG;
                            rb_ZYFKIMG += zhonghouban_qita[a].ZYFKIMG;
                            rb_ZYXSZB += zhonghouban_qita[a].ZYXSZB;
                            rb_FGSFKIMG += zhonghouban_qita[a].FGSFKIMG;
                            rb_FGSXSZB += zhonghouban_qita[a].FGSXSZB;
                            rb_SYBFKIMG += zhonghouban_qita[a].SYBFKIMG;
                            rb_SYBXSZB += zhonghouban_qita[a].SYBXSZB;
                            rb_XHFKIMG += zhonghouban_qita[a].XHFKIMG;
                            rb_XHXSZB += zhonghouban_qita[a].XHXSZB;
                            rb_ZBGSFKIMG += zhonghouban_qita[a].ZBGSFKIMG;
                            rb_ZBGSXSZB += zhonghouban_qita[a].ZBGSXSZB;
                            a++;
                        }
                        rb_FKIMG==0? rb_ZYXSZB=0+'%' :rb_ZYXSZB = rb_ZYFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_FGSXSZB=0+'%' :rb_FGSXSZB = rb_FGSFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_SYBXSZB=0+'%' :rb_SYBXSZB = rb_SYBFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_XHXSZB=0+'%' :rb_XHXSZB = rb_XHFKIMG/rb_FKIMG;
                        rb_FKIMG==0? rb_ZBGSXSZB=0+'%' :rb_ZBGSXSZB = rb_ZBGSFKIMG/rb_FKIMG;
                        let aa=0;
                        while(aa<zhonghouban_qita.length)
                        {
                            rb_ZYSJ += zhonghouban_qita[aa].ZYFKIMG*zhonghouban_qita[aa].ZYSJ;
                            rb_FGSSJ += zhonghouban_qita[aa].FGSFKIMG*zhonghouban_qita[aa].FGSSJ;
                            rb_SYBSJ += zhonghouban_qita[aa].SYBFKIMG*zhonghouban_qita[aa].SYBSJ;
                            rb_XHSJ += zhonghouban_qita[aa].XHFKIMG*zhonghouban_qita[aa].XHSJ;
                            rb_ZBGSSJ += zhonghouban_qita[aa].ZBGSFKIMG*zhonghouban_qita[aa].ZBGSSJ;
                            aa++;
                        }
                        rb_ZSJ=rb_ZYSJ+rb_FGSSJ+rb_SYBSJ+rb_XHSJ+rb_ZBGSSJ;
                        rb_ZYFKIMG==0?rb_ZYSJ=0.00:rb_ZYSJ=rb_ZYSJ/rb_ZYFKIMG;
                        rb_FGSFKIMG==0?rb_FGSSJ=0.00:rb_FGSSJ=rb_FGSSJ/rb_FGSFKIMG;
                        rb_SYBFKIMG==0?rb_SYBSJ=0.00:rb_SYBSJ=rb_SYBSJ/rb_SYBFKIMG;
                        rb_XHFKIMG==0?rb_XHSJ=0.00:rb_XHSJ=rb_XHSJ/rb_XHFKIMG;
                        rb_ZBGSFKIMG==0?rb_ZBGSSJ=0.00:rb_ZBGSSJ=rb_ZBGSSJ/rb_ZBGSFKIMG;
                        rb_FKIMG==0?rb_ZSJ=0.00:rb_ZSJ=rb_ZSJ/rb_FKIMG;
                        let zhonghouban_qitaxj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'其他',
                            FKIMG:rb_FKIMG,
                            ZSJ:rb_ZSJ,
                            ZYFKIMG:rb_ZYFKIMG,
                            ZYSJ:rb_ZYSJ,
                            ZYXSZB:rb_ZYXSZB,
                            FGSFKIMG:rb_FGSFKIMG,
                            FGSSJ:rb_FGSSJ,
                            FGSXSZB:rb_FGSXSZB,
                            SYBFKIMG:rb_SYBFKIMG,
                            SYBSJ:rb_SYBSJ,
                            SYBXSZB:rb_SYBXSZB,
                            XHFKIMG:rb_XHFKIMG,
                            XHSJ:rb_XHSJ,
                            XHXSZB:rb_XHXSZB,
                            ZBGSFKIMG:rb_ZBGSFKIMG,
                            ZBGSSJ:rb_ZBGSSJ,
                            ZBGSXSZB:rb_ZBGSXSZB,
                        }
                        zhonghouban_qita_k=zhonghouban_qitaxj;
                    }

                    //中厚板
                    if (zhonghouban.length > 0) {
                        let khb_FKIMG = 0;
                        let khb_ZSJ = 0;
                        let khb_ZYFKIMG = 0;
                        let khb_ZYSJ = 0;
                        let khb_ZYXSZB = 0;
                        let khb_FGSFKIMG = 0;
                        let khb_FGSSJ = 0;
                        let khb_FGSXSZB = 0;
                        let khb_SYBFKIMG = 0;
                        let khb_SYBSJ = 0;
                        let khb_SYBXSZB = 0;
                        let khb_XHFKIMG = 0;
                        let khb_XHSJ = 0;
                        let khb_XHXSZB = 0;
                        let khb_ZBGSFKIMG = 0;
                        let khb_ZBGSSJ = 0;
                        let khb_ZBGSXSZB = 0;

                        let e = 0;
                        while (e < zhonghouban.length) {
                            khb_FKIMG += zhonghouban[e].FKIMG;
                            khb_ZYFKIMG += zhonghouban[e].ZYFKIMG;
                            khb_ZYXSZB += zhonghouban[e].ZYXSZB;
                            khb_FGSFKIMG += zhonghouban[e].FGSFKIMG;
                            khb_FGSXSZB += zhonghouban[e].FGSXSZB;
                            khb_SYBFKIMG += zhonghouban[e].SYBFKIMG;
                            khb_SYBXSZB += zhonghouban[e].SYBXSZB;
                            khb_XHFKIMG += zhonghouban[e].XHFKIMG;
                            khb_XHXSZB += zhonghouban[e].XHXSZB;
                            khb_ZBGSFKIMG += zhonghouban[e].ZBGSFKIMG;
                            khb_ZBGSXSZB += zhonghouban[e].ZBGSXSZB;
                            e++;
                        }
                        khb_FKIMG==0? khb_ZYXSZB=0+'%' :khb_ZYXSZB = khb_ZYFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_FGSXSZB=0+'%' :khb_FGSXSZB = khb_FGSFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_SYBXSZB=0+'%' :khb_SYBXSZB = khb_SYBFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_XHXSZB=0+'%' :khb_XHXSZB = khb_XHFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_ZBGSXSZB=0+'%' :khb_ZBGSXSZB = khb_ZBGSFKIMG/khb_FKIMG;
                        let ee=0;
                        while(ee<zhonghouban.length)
                        {
                            khb_ZYSJ += zhonghouban[ee].ZYFKIMG*zhonghouban[ee].ZYSJ;
                            khb_FGSSJ += zhonghouban[ee].FGSFKIMG*zhonghouban[ee].FGSSJ;
                            khb_SYBSJ += zhonghouban[ee].SYBFKIMG*zhonghouban[ee].SYBSJ;
                            khb_XHSJ += zhonghouban[ee].XHFKIMG*zhonghouban[ee].XHSJ;
                            khb_ZBGSSJ += zhonghouban[ee].ZBGSFKIMG*zhonghouban[ee].ZBGSSJ;
                            ee++;
                        }
                        khb_ZSJ=khb_ZYSJ+khb_FGSSJ+khb_SYBSJ+khb_XHSJ+khb_ZBGSSJ;
                        khb_ZYFKIMG==0?khb_ZYSJ=0.00:khb_ZYSJ=khb_ZYSJ/khb_ZYFKIMG;
                        khb_FGSFKIMG==0?khb_FGSSJ=0.00:khb_FGSSJ=khb_FGSSJ/khb_FGSFKIMG;
                        khb_SYBFKIMG==0?khb_SYBSJ=0.00:khb_SYBSJ=khb_SYBSJ/khb_SYBFKIMG;
                        khb_XHFKIMG==0?khb_XHSJ=0.00:khb_XHSJ=khb_XHSJ/khb_XHFKIMG;
                        khb_ZBGSFKIMG==0?khb_ZBGSSJ=0.00:khb_ZBGSSJ=khb_ZBGSSJ/khb_ZBGSFKIMG;
                        khb_FKIMG==0?khb_ZSJ=0.00:khb_ZSJ=khb_ZSJ/khb_FKIMG;
                        let zhonghoubanxj={
                            ZL:"中厚板",
                            CXNAME:"中厚板小计",
                            PRODUCT_GRADE:'内贸合计',
                            FKIMG:khb_FKIMG,
                            ZSJ:khb_ZSJ,
                            ZYFKIMG:khb_ZYFKIMG,
                            ZYSJ:khb_ZYSJ,
                            ZYXSZB:khb_ZYXSZB,
                            FGSFKIMG:khb_FGSFKIMG,
                            FGSSJ:khb_FGSSJ,
                            FGSXSZB:khb_FGSXSZB,
                            SYBFKIMG:khb_SYBFKIMG,
                            SYBSJ:khb_SYBSJ,
                            SYBXSZB:khb_SYBXSZB,
                            XHFKIMG:khb_XHFKIMG,
                            XHSJ:khb_XHSJ,
                            XHXSZB:khb_XHXSZB,
                            ZBGSFKIMG:khb_ZBGSFKIMG,
                            ZBGSSJ:khb_ZBGSSJ,
                            ZBGSXSZB:khb_ZBGSXSZB,
                        }
                        zhonghouban.unshift(zhonghoubanxj,zhonghouban_pucai_k,zhonghouban_pinzhonggang_k,
                            zhonghouban_gaoduan_k,zhonghouban_tese_k,zhonghouban_qita_k);
                        let abc=0
                        while(abc<zhonghouban.length) {
                            if (JSON.stringify(zhonghouban[abc]) == '{}') {
                                zhonghouban.splice(abc, 1);
                                abc = abc - 1;
                            }
                            abc++
                        }
                    }


                    let arr=jgj.concat(reban).concat(baoban).concat(lengban).concat(luowengang).concat(suanxi).concat(duxin).concat(zhonghouban).concat(xiancai).concat(xingcai).concat(yuangang);
                    // arr.sort(this.paixu("ZL","CXNAME","PRODUCT_GRADE"));
                    let ii=0
                    let jj=0
                    let k1=0
                    let k2=0
                    let k3=0
                    let k4=0
                    let k5=0
                    let k6=0
                    let k7=0
                    let k8=0
                    let k9=0
                    let k10=0
                    let k11=0
                    let k12=0
                    let k13=0
                    let k14=0
                    let k15=0
                    let k16=0
                    let k17=0
                    let k18=0
                    let k19=0
                    let k20=0
                    let k21=0
                    let k22=0
                    let k23=0
                    let k24=0
                    let k25=0
                    let k26=0
                    let k27=0
                    let k28=0
                    let k29=0
                    let k30=0
                    let k31=0
                    let k32=0
                    let k33=0
                    let k34=0
                    let k35=0
                    let k36=0
                    let k37=0
                    let k38=0
                    let k39=0
                    let k40=0
                    let k41=0
                    let k42=0
                    let k43=0
                    let k44=0
                    let k45=0
                    let k46=0
                    let k47=0
                    let k48=0
                    let k49=0
                    let k50=0
                    let k51=0
                    let k52=0
                    let k53=0
                    let k54=0
                    let k55=0
                    let k56=0
                    let k57=0
                    let k58=0
                    let k59=0
                    let k60=0
                    let k61=0
                    let k62=0
                    let k63=0
                    let k64=0
                    let k65=0
                    let k66=0
                    let k67=0
                    let k68=0
                    let k69=0
                    let k70=0
                    let k71=0
                    let k72=0
                    let k73=0
                    let k74=0
                    let k75=0
                    let k76=0
                    let k77=0
                    let k78=0
                    let k79=0
                    let k80=0
                    let k81=0
                    let k82=0
                    let k83=0
                    let k84=0
                    let k85=0
                    let k86=0
                    let k87=0
                    let k88=0
                    let k89=0
                    let k90=0
                    let k91=0
                    let k92=0
                    let k93=0
                    let k94=0
                    let k95=0
                    let k96=0
                    let k97=0
                    let k98=0
                    let k99=0
                    let k100=0



                    while(ii<arr.length)
                    {
                        if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='唐钢1580热轧线')
                        {
                            if(k1==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='唐钢1580热轧线')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k1++
                            }

                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='唐钢本部热板')
                        {
                            if(k2==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='唐钢本部热板')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k2++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='承钢热板')
                        {
                            if(k3==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='承钢热板')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k3++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='邯钢CSP')
                        {
                            if(k4==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='邯钢CSP')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k4++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if(k5==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='唐钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k5++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if(k6==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='邯钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k6++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if(k7==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='宣钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k7++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='承钢其他')
                        {
                            if(k8==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='承钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k8++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if(k9==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='舞钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k9++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='石钢其他')
                        {
                            if(k10==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='石钢其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k10++
                            }
                        }
                        else if(arr[ii].ZL=='热板' && arr[ii].CXNAME=='衡板其他')
                        {
                            if(k11==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='热板' && res[0][jj].CXNAME=='衡板其他')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k11++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='衡板薄板')
                        {
                            if(k12==0)
                            {
                                while(jj<res[0].length)
                                {
                                    if(res[0][jj].ZL=='薄板' && res[0][jj].CXNAME=='衡板薄板')
                                    {
                                        arr.splice(ii,0,res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k12++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k13 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k13++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k14 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k14++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k15 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k15++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k16 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k16++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k17 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k17++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k18 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k18++
                            }
                        }
                        else if(arr[ii].ZL=='薄板' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k19 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '薄板' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k19++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='唐钢一冷冷轧')
                        {
                            if (k20 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '唐钢一冷冷轧')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k20++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='唐钢二冷冷轧')
                        {
                            if (k21 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '唐钢二冷冷轧')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k21++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='邯钢东区冷轧')
                        {
                            if (k22 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '邯钢东区冷轧')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k22++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k23 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k23++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k24 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k24++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k25 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k25++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k26 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k26++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k27 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k27++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k28 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k28++
                            }
                        }
                        else if(arr[ii].ZL=='冷板' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k29 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '冷板' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k29++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='唐钢螺纹')
                        {
                            if (k30 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '唐钢螺纹')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k30++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='宣钢螺纹')
                        {
                            if (k31 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '宣钢螺纹')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k31++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='承钢螺纹')
                        {
                            if (k32 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '承钢螺纹')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k32++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='邯钢螺纹')
                        {
                            if (k33 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '邯钢螺纹')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k33++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k34 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k34++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k35 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k35++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k36 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k36++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k37 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k37++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k100 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k100++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k38 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k38++
                            }
                        }
                        else if(arr[ii].ZL=='螺纹钢' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k39 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '螺纹钢' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k39++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='唐钢酸洗')
                        {
                            if (k40 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '唐钢酸洗')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k40++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='邯钢酸洗')
                        {
                            if (k41 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '邯钢酸洗')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k41++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k42 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k42++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k43 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k43++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k44 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k44++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k45 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k45++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k46 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k46++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k47 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k47++
                            }
                        }
                        else if(arr[ii].ZL=='酸洗' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k48 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '酸洗' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k48++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='唐钢二冷镀锌')
                        {
                            if (k49 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '唐钢二冷镀锌')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k49++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='唐钢一冷镀锌')
                        {
                            if (k50 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '唐钢一冷镀锌')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k50++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='邯钢东区镀锌')
                        {
                            if (k51 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '邯钢东区镀锌')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k51++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k52 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k52++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k53 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k53++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k54 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k54++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k55 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k55++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k56 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k56++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k57 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k57++
                            }
                        }
                        else if(arr[ii].ZL=='镀锌' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k58 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '镀锌' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k58++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='宣钢线材')
                        {
                            if (k59 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '宣钢线材')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k59++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='承钢线材')
                        {
                            if (k60 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '承钢线材')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k60++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='邯钢线材')
                        {
                            if (k61 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '邯钢线材')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k61++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k62 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k62++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k63 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k63++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k64 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k64++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k65 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k65++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k66 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k66++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k67 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k67++
                            }
                        }
                        else if(arr[ii].ZL=='线材' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k68 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '线材' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k68++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='唐钢中型')
                        {
                            if (k69 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '唐钢中型')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k69++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='唐钢大型')
                        {
                            if (k70 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '唐钢大型')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k70++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='宣钢型材')
                        {
                            if (k71 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '宣钢型材')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k71++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='邯钢型材')
                        {
                            if (k72 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '邯钢型材')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k72++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k73 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k73++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k74 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k74++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k75 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k75++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k76 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k76++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k77 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k77++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k78 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k78++
                            }
                        }
                        else if(arr[ii].ZL=='型材' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k79 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '型材' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k79++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='宣钢圆钢')
                        {
                            if (k80 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '宣钢圆钢')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k80++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='石钢圆钢')
                        {
                            if (k81 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '石钢圆钢')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k81++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='邯钢圆钢')
                        {
                            if (k82 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '邯钢圆钢')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k82++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k83 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k83++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k84 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k84++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k85 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k85++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k86 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k86++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k87 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k87++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k88 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k88++
                            }
                        }
                        else if(arr[ii].ZL=='圆钢' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k89 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '圆钢' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k89++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='唐钢中厚板')
                        {
                            if (k90 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '唐钢中厚板')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k90++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='舞钢中厚板')
                        {
                            if (k91 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '舞钢中厚板')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k91++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='邯钢中板')
                        {
                            if (k92 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '邯钢中板')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k92++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='唐钢其他')
                        {
                            if (k93 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '唐钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k93++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='邯钢其他')
                        {
                            if (k94 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '邯钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k94++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='宣钢其他')
                        {
                            if (k95 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '宣钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k95++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='承钢其他')
                        {
                            if (k96 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '承钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k96++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='舞钢其他')
                        {
                            if (k97 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '舞钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k97++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='石钢其他')
                        {
                            if (k98 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '石钢其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k98++
                            }
                        }
                        else if(arr[ii].ZL=='中厚板' && arr[ii].CXNAME=='衡板其他')
                        {
                            if (k99 == 0)
                            {
                                while (jj < res[0].length) {
                                    if (res[0][jj].ZL == '中厚板' && res[0][jj].CXNAME == '衡板其他')
                                    {
                                        arr.splice(ii, 0, res[0][jj])
                                    }
                                    jj++
                                }
                                ii--
                                k99++
                            }
                        }
                        ii++
                        jj=0
                    }
                    this.data = this.utils.mergeRow(arr, 'CXNAME','ZL',);
                    this.loading = false;
                    this.mxstats = false;
                });
            },
            download(){
                this.downMx()
            },
            downMx(){

                let zlStr = '&zl='+this.zl;
                let cxArr = '&cx=' +this.cx.toString()
                let startTime='startTime=';
                let endTime='&endTime=';
                startTime = startTime+this.utils.formatMonthStart(this.startTime)
                endTime = endTime+this.utils.formatMonthStart(this.endTime)
                this.downloadUrl=this.$store.state.fetchPath + "/export/exportReport?"+startTime+endTime+zlStr+cxArr;
            }
        },
    }
</script>

<style scoped>
    button {
        background: #3497db;
        color: #fff;
    }

    .paging {
        float: right;
        margin-top: 10px;
    }
</style>