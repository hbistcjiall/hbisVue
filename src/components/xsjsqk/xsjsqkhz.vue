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
                                key: 'ZBGSSJ',
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
        },
        methods: {
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '销售结算情况（产线）明细',
                });
            },
            getList() {
                this.loading = true;
                let startTime='startTime=';
                startTime+=this.utils.formatMonthStart(this.startTime)
                let endTime='&endTime=';
                endTime+=this.utils.formatMonthStart(this.endTime)
                fetch(this.$store.state.fetchPath + "/yxyb/getxsjswccx", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = res
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
                    for(var i=0;i<this.data.length;i++){
                        fkimg+= this.data[i].FKIMG
                        kzwi6 += this.data[i].KZWI6

                        nmfkimg += this.data[i].NMFKIMG
                        nmzsjss += this.data[i].NMFKIMG*this.data[i].NMSJ

                        xszgssjss+=this.data[i].XSZGSFKIMG*this.data[i].XSZGSSJ
                        xszgsfkimg += this.data[i].XSZGSFKIMG

                        zysjss += this.data[i].ZYFKIMG*this.data[i].ZYSJ
                        zyfkimg += this.data[i].ZYFKIMG

                        fgssjss+= this.data[i].FGSFKIMG*this.data[i].FGSSJ
                        fgsfimg += this.data[i].FGSFKIMG

                        zgsfkimg += this.data[i].ZGSFKIMG
                        zgssjss+= this.data[i].ZGSFKIMG*this.data[i].ZGSSJ

                        sybfkimg += this.data[i].SYBFKIMG
                        sybsjss+=this.data[i].SYBFKIMG*this.data[i].SYBSJ

                        xhfimg += this.data[i].XHFKIMG
                        xhsjss+=this.data[i].XHSJ*this.data[i].XHFKIMG

                        zbgsfkimg += this.data[i].ZBGSFKIMG
                        zbgssjss+=this.data[i].ZBGSFKIMG*this.data[i].ZBGSSJ

                        ckfkimg += this.data[i].CKFKIMG
                        cksjss+=this.data[i].CKFKIMG*this.data[i].CKSJ
                    }
                    zsj =(kzwi6/fkimg)*10000
                    nmsj = nmzsjss/nmfkimg
                    xszgssj = xszgssjss/xszgsfkimg
                    zysj = zysjss/zyfkimg
                    fgssj = fgssjss/fgsfimg
                    zgssj = zgssjss/zgsfkimg
                    sybsj = sybsjss/sybfkimg
                    xhsj = xhsjss/xhfimg
                    zbgssj = zbgssjss/zbgsfkimg
                    cksj += cksjss/ckfkimg
                    let obj = {
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
                    this.data.unshift(obj);
                    this.data = this.utils.mergeRow(this.data,'ZL');
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