<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="8">
                    <FormItem label="日期：">
                        <DatePicker type="month" placeholder="开始时间" :editable="false" :clearable="false"
                                    v-model="startTime"
                                    style="width:110px;margin-left: -80px"></DatePicker>
                        <DatePicker type="month" placeholder="结束时间" :editable="false" :clearable="false"
                                    v-model="endTime"
                                    style="width:110px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="margin-left: -50px;float: left">
                    <Button @click="getListed()" icon="ios-search" style="margin-right:10px;">查询</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="550" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "cpdjjgfb",
        data() {
            return {
                startTime: new Date(),
                endTime: new Date(),
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
                        width: '100',
                        key: 'CXNAME'
                    },
                    {
                        title: '产品等级',
                        align: "center",
                        width: '110',
                        key: 'PRODUCT_GRADE'
                    },
                    {
                        title: '销售量\n' +
                            '（吨）',
                        align: "center",
                        width: '100',
                        key: 'FKIMG',
                        render: (h, params) => {
                            params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                            return h('span',
                                (Number(params.row[params.column.key])).toFixed(2)
                            )
                        }
                    },
                    {
                        title: '税前售价\n' +
                            '（元/吨）',
                        align: "center",
                        width: '100',
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
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'ZYFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
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
                                width: '80',
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
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'FGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
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
                                width: '80',
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
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'SYBFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
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
                                width: '80',
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
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'XHFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
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
                                width: '80',
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
                                title: '销量',
                                align: "center",
                                width: '80',
                                key: 'ZBGSFKIMG',
                                render: (h, params) => {
                                    params.row[params.column.key] = params.row[params.column.key] == null ? '0.00' : params.row[params.column.key];
                                    return h('span',
                                        (Number(params.row[params.column.key])).toFixed(2)
                                    )
                                }
                            },
                            {
                                title: '均价',
                                align: "center",
                                width: '80',
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
                                width: '80',
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
            this.getListed();
        },
        methods: {
            getListed() {
                this.loading = true;
                let startTime = 'startTime=' + this.utils.formatMonthStart(this.startTime);
                let endTime = 'endTime=' + this.utils.formatMonthStart(this.endTime);
                fetch(this.$store.state.fetchPath + "/report-product-class-level/getcxfb", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime + '&' + endTime,
                    credentials: 'include'
                }).then((res) => {
                    if (res.status != 200) {
                        this.$Message.error('请求失败！');
                    } else {
                        return res.text();
                    }
                }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : []
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].ZL == '棒线' && res[i].CXNAME == '唐钢其他') {
                            res[i].CXNAME = '唐钢其他123'
                        }
                    }

                    let cx =['唐钢本部热板','邯钢CSP','邯钢2250'];
                    let PZ=['热板','冷板'];



























                    let reban = []
                    let reban_pucai=[]
                    let reban_pinzhonggang=[]
                    let reban_gaoduan=[]
                    let reban_tesechanpin=[]
                    let lengban = []
                    let lengban_pucai=[]
                    let lengban_pinzhonggang=[]
                    let lengban_gaoduan=[]
                    let lengban_tesechanpin=[]
                    let kuanhouban = []
                    let kuanhouban_pucai=[]
                    let kuanhouban_pinzhonggang=[]
                    let kuanhouban_gaoduan=[]
                    let kuanhouban_tesechanpin=[]
                    let bangxian = []
                    let bangxian_pucai=[]
                    let bangxian_pinzhonggang=[]
                    let bangxian_gaoduan=[]
                    let bangxian_tesechanpin=[]
                    let xingdai = []
                    let xingdai_pucai=[]
                    let xingdai_pinzhonggang=[]
                    let xingdai_gaoduan=[]
                    let xingdai_tesechanpin=[]
                    let jgj = []
                    for (var i = 0; i < res.length; i++) {
                        switch (res[i].ZL) {
                            case "热板":
                                reban.push(res[i])
                                switch (res[i].PRODUCT_GRADE) {
                                    case '普材':
                                        reban_pucai.push(res[i])
                                        break;
                                    case '品种钢':
                                        reban_pinzhonggang.push(res[i])
                                        break;
                                    case '高端品种钢':
                                        reban_gaoduan.push(res[i])
                                        break;
                                    case '特色产品':
                                        reban_tesechanpin.push(res[i])
                                        break;
                                }
                                break;
                            case "冷板":
                                lengban.push(res[i])
                                switch (res[i].PRODUCT_GRADE) {
                                    case '普材':
                                        lengban_pucai.push(res[i])
                                        break;
                                    case '品种钢':
                                        lengban_pinzhonggang.push(res[i])
                                        break;
                                    case '高端品种钢':
                                        lengban_gaoduan.push(res[i])
                                        break;
                                    case '特色产品':
                                        lengban_tesechanpin.push(res[i])
                                        break;
                                }
                                break;
                            case "宽厚板":
                                kuanhouban.push(res[i])
                                switch (res[i].PRODUCT_GRADE) {
                                    case '普材':
                                        kuanhouban_pucai.push(res[i])
                                        break;
                                    case '品种钢':
                                        kuanhouban_pinzhonggang.push(res[i])
                                        break;
                                    case '高端品种钢':
                                        kuanhouban_gaoduan.push(res[i])
                                        break;
                                    case '特色产品':
                                        kuanhouban_tesechanpin.push(res[i])
                                        break;
                                }
                                break;
                            case "棒线":
                                bangxian.push(res[i])
                                switch (res[i].PRODUCT_GRADE) {
                                    case '普材':
                                        bangxian_pucai.push(res[i])
                                        break;
                                    case '品种钢':
                                        bangxian_pinzhonggang.push(res[i])
                                        break;
                                    case '高端品种钢':
                                        bangxian_gaoduan.push(res[i])
                                        break;
                                    case '特色产品':
                                        bangxian_tesechanpin.push(res[i])
                                        break;
                                }
                                break;
                            case "型带":
                                xingdai.push(res[i])
                                switch (res[i].PRODUCT_GRADE) {
                                    case '普材':
                                        xingdai_pucai.push(res[i])
                                        break;
                                    case '品种钢':
                                        xingdai_pinzhonggang.push(res[i])
                                        break;
                                    case '高端品种钢':
                                        xingdai_gaoduan.push(res[i])
                                        break;
                                    case '特色产品':
                                        xingdai_tesechanpin.push(res[i])
                                        break;
                                }
                                break;
                        }

                    }
                    //总计
                    if (res.length > 0) {
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
                        while (z < res.length) {
                            zj_FKIMG += res[z].FKIMG;
                            zj_ZYFKIMG += res[z].ZYFKIMG;
                            zj_FGSFKIMG += res[z].FGSFKIMG;
                            zj_FGSSJ += res[z].FGSSJ;
                            zj_SYBFKIMG += res[z].SYBFKIMG;
                            zj_SYBSJ += res[z].SYBSJ;
                            zj_SYBXSZB += res[z].SYBXSZB;
                            zj_XHFKIMG += res[z].XHFKIMG;
                            zj_XHSJ += res[z].XHSJ;
                            zj_XHXSZB += res[z].XHXSZB;
                            zj_ZBGSFKIMG += res[z].ZBGSFKIMG;
                            zj_ZBGSSJ += res[z].ZBGSSJ;
                            zj_ZBGSXSZB += res[z].ZBGSXSZB;
                            z++;
                        }
                        zj_FKIMG==0? zj_ZYXSZB=0+'%' :zj_ZYXSZB = zj_ZYFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_FGSXSZB=0+'%' :zj_FGSXSZB = zj_FGSFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_SYBXSZB=0+'%' :zj_SYBXSZB = zj_SYBFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_XHXSZB=0+'%' :zj_XHXSZB = zj_XHFKIMG/zj_FKIMG;
                        zj_FKIMG==0? zj_ZBGSXSZB=0+'%' :zj_ZBGSXSZB = zj_ZBGSFKIMG/zj_FKIMG;
                        let zz=0;
                        while(zz<res.length)
                        {
                            zj_ZYSJ += res[zz].ZYFKIMG*res[zz].ZYSJ;
                            zj_FGSSJ += res[zz].FGSFKIMG*res[zz].FGSSJ;
                            zj_SYBSJ += res[zz].SYBFKIMG*res[zz].SYBSJ;
                            zj_XHSJ += res[zz].XHFKIMG*res[zz].XHSJ;
                            zj_ZBGSSJ += res[zz].ZBGSFKIMG*res[zz].ZBGSSJ;
                            zj_ZSJ+=res[zz].FKIMG*res[zz].ZSJ;
                            zz++;
                        }
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
                            rb_ZYSJ += reban[a].ZYSJ;
                            rb_ZYXSZB += reban[a].ZYXSZB;
                            rb_FGSFKIMG += reban[a].FGSFKIMG;
                            rb_FGSSJ += reban[a].FGSSJ;
                            rb_FGSXSZB += reban[a].FGSXSZB;
                            rb_SYBFKIMG += reban[a].SYBFKIMG;
                            rb_SYBSJ += reban[a].SYBSJ;
                            rb_SYBXSZB += reban[a].SYBXSZB;
                            rb_XHFKIMG += reban[a].XHFKIMG;
                            rb_XHSJ += reban[a].XHSJ;
                            rb_XHXSZB += reban[a].XHXSZB;
                            rb_ZBGSFKIMG += reban[a].ZBGSFKIMG;
                            rb_ZBGSSJ += reban[a].ZBGSSJ;
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
                            rb_ZSJ+=reban[aa].FKIMG*reban[aa].ZSJ;
                            aa++;
                        }
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
                        reban.unshift(rebanxj);
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
                            lb_ZSJ += lengban[c].ZSJ;
                            lb_ZYFKIMG += lengban[c].ZYFKIMG;
                            lb_ZYSJ += lengban[c].ZYSJ;
                            lb_ZYXSZB += lengban[c].ZYXSZB;
                            lb_FGSFKIMG += lengban[c].FGSFKIMG;
                            lb_FGSSJ += lengban[c].FGSSJ;
                            lb_FGSXSZB += lengban[c].FGSXSZB;
                            lb_SYBFKIMG += lengban[c].SYBFKIMG;
                            lb_SYBSJ += lengban[c].SYBSJ;
                            lb_SYBXSZB += lengban[c].SYBXSZB;
                            lb_XHFKIMG += lengban[c].XHFKIMG;
                            lb_XHSJ += lengban[c].XHSJ;
                            lb_XHXSZB += lengban[c].XHXSZB;
                            lb_ZBGSFKIMG += lengban[c].ZBGSFKIMG;
                            lb_ZBGSSJ += lengban[c].ZBGSSJ;
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
                            lb_ZSJ+=lengban[cc].FKIMG*lengban[cc].ZSJ;
                            cc++;
                        }
                        lb_ZYFKIMG==0?lb_ZYSJ=0.00:lb_ZYSJ=lb_ZYSJ/lb_ZYFKIMG;
                        lb_FGSFKIMG==0?lb_FGSSJ=0.00:lb_FGSSJ=lb_FGSSJ/lb_FGSFKIMG;
                        lb_SYBFKIMG==0?lb_SYBSJ=0.00:lb_SYBSJ=lb_SYBSJ/lb_SYBFKIMG;
                        lb_XHFKIMG==0?lb_XHSJ=0.00:lb_XHSJ=lb_XHSJ/lb_XHFKIMG;
                        lb_ZBGSFKIMG==0?lb_ZBGSSJ=0.00:lb_ZBGSSJ=lb_ZBGSSJ/lb_ZBGSFKIMG;
                        lb_FKIMG==0?lb_ZSJ=0.00:lb_ZSJ=lb_ZSJ/lb_FKIMG;
                        let lengbanxj={
                            ZL:"冷板",
                            CXNAME:"冷板小计",
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
                        lengban.unshift(lengbanxj);
                    }

                    //宽厚板
                    if (kuanhouban.length > 0) {
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
                        while (e < kuanhouban.length) {
                            khb_FKIMG += kuanhouban[e].FKIMG;
                            khb_ZSJ += kuanhouban[e].ZSJ;
                            khb_ZYFKIMG += kuanhouban[e].ZYFKIMG;
                            khb_ZYSJ += kuanhouban[e].ZYSJ;
                            khb_ZYXSZB += kuanhouban[e].ZYXSZB;
                            khb_FGSFKIMG += kuanhouban[e].FGSFKIMG;
                            khb_FGSSJ += kuanhouban[e].FGSSJ;
                            khb_FGSXSZB += kuanhouban[e].FGSXSZB;
                            khb_SYBFKIMG += kuanhouban[e].SYBFKIMG;
                            khb_SYBSJ += kuanhouban[e].SYBSJ;
                            khb_SYBXSZB += kuanhouban[e].SYBXSZB;
                            khb_XHFKIMG += kuanhouban[e].XHFKIMG;
                            khb_XHSJ += kuanhouban[e].XHSJ;
                            khb_XHXSZB += kuanhouban[e].XHXSZB;
                            khb_ZBGSFKIMG += kuanhouban[e].ZBGSFKIMG;
                            khb_ZBGSSJ += kuanhouban[e].ZBGSSJ;
                            khb_ZBGSXSZB += kuanhouban[e].ZBGSXSZB;
                            e++;
                        }
                        khb_FKIMG==0? khb_ZYXSZB=0+'%' :khb_ZYXSZB = khb_ZYFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_FGSXSZB=0+'%' :khb_FGSXSZB = khb_FGSFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_SYBXSZB=0+'%' :khb_SYBXSZB = khb_SYBFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_XHXSZB=0+'%' :khb_XHXSZB = khb_XHFKIMG/khb_FKIMG;
                        khb_FKIMG==0? khb_ZBGSXSZB=0+'%' :khb_ZBGSXSZB = khb_ZBGSFKIMG/khb_FKIMG;
                        let ee=0;
                        while(ee<kuanhouban.length)
                        {
                            khb_ZYSJ += kuanhouban[ee].ZYFKIMG*kuanhouban[ee].ZYSJ;
                            khb_FGSSJ += kuanhouban[ee].FGSFKIMG*kuanhouban[ee].FGSSJ;
                            khb_SYBSJ += kuanhouban[ee].SYBFKIMG*kuanhouban[ee].SYBSJ;
                            khb_XHSJ += kuanhouban[ee].XHFKIMG*kuanhouban[ee].XHSJ;
                            khb_ZBGSSJ += kuanhouban[ee].ZBGSFKIMG*kuanhouban[ee].ZBGSSJ;
                            khb_ZSJ+=kuanhouban[ee].FKIMG*kuanhouban[ee].ZSJ;
                            ee++;
                        }
                        khb_ZYFKIMG==0?khb_ZYSJ=0.00:khb_ZYSJ=khb_ZYSJ/khb_ZYFKIMG;
                        khb_FGSFKIMG==0?khb_FGSSJ=0.00:khb_FGSSJ=khb_FGSSJ/khb_FGSFKIMG;
                        khb_SYBFKIMG==0?khb_SYBSJ=0.00:khb_SYBSJ=khb_SYBSJ/khb_SYBFKIMG;
                        khb_XHFKIMG==0?khb_XHSJ=0.00:khb_XHSJ=khb_XHSJ/khb_XHFKIMG;
                        khb_ZBGSFKIMG==0?khb_ZBGSSJ=0.00:khb_ZBGSSJ=khb_ZBGSSJ/khb_ZBGSFKIMG;
                        khb_FKIMG==0?khb_ZSJ=0.00:khb_ZSJ=khb_ZSJ/khb_FKIMG;
                        let kuanhoubanxj={
                            ZL:"宽厚板",
                            CXNAME:"宽厚板小计",
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
                        kuanhouban.unshift(kuanhoubanxj);
                    }

                    //棒线
                    if (bangxian.length > 0) {
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
                        while (h < bangxian.length) {
                            bx_FKIMG += bangxian[h].FKIMG;
                            bx_ZSJ += bangxian[h].ZSJ;
                            bx_ZYFKIMG += bangxian[h].ZYFKIMG;
                            bx_ZYSJ += bangxian[h].ZYSJ;
                            bx_ZYXSZB += bangxian[h].ZYXSZB;
                            bx_FGSFKIMG += bangxian[h].FGSFKIMG;
                            bx_FGSSJ += bangxian[h].FGSSJ;
                            bx_FGSXSZB += bangxian[h].FGSXSZB;
                            bx_SYBFKIMG += bangxian[h].SYBFKIMG;
                            bx_SYBSJ += bangxian[h].SYBSJ;
                            bx_SYBXSZB += bangxian[h].SYBXSZB;
                            bx_XHFKIMG += bangxian[h].XHFKIMG;
                            bx_XHSJ += bangxian[h].XHSJ;
                            bx_XHXSZB += bangxian[h].XHXSZB;
                            bx_ZBGSFKIMG += bangxian[h].ZBGSFKIMG;
                            bx_ZBGSSJ += bangxian[h].ZBGSSJ;
                            bx_ZBGSXSZB += bangxian[h].ZBGSXSZB;
                            h++;
                        }
                        bx_FKIMG==0? bx_ZYXSZB=0.00 :bx_ZYXSZB = bx_ZYFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_FGSXSZB=0.00 :bx_FGSXSZB = bx_FGSFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_SYBXSZB=0.00 :bx_SYBXSZB = bx_SYBFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_XHXSZB=0.00 :bx_XHXSZB = bx_XHFKIMG/bx_FKIMG;
                        bx_FKIMG==0? bx_ZBGSXSZB=0.00 :bx_ZBGSXSZB = bx_ZBGSFKIMG/bx_FKIMG;
                        let hh=0;
                        while(hh<bangxian.length)
                        {
                            bx_ZYSJ += bangxian[hh].ZYFKIMG*bangxian[hh].ZYSJ;
                            bx_FGSSJ += bangxian[hh].FGSFKIMG*bangxian[hh].FGSSJ;
                            bx_SYBSJ += bangxian[hh].SYBFKIMG*bangxian[hh].SYBSJ;
                            bx_XHSJ += bangxian[hh].XHFKIMG*bangxian[hh].XHSJ;
                            bx_ZBGSSJ += bangxian[hh].ZBGSFKIMG*bangxian[hh].ZBGSSJ;
                            bx_ZSJ+=bangxian[hh].FKIMG*bangxian[hh].ZSJ;
                            hh++;
                        }
                        bx_ZYFKIMG==0?bx_ZYSJ=0.00:bx_ZYSJ=bx_ZYSJ/bx_ZYFKIMG;
                        bx_FGSFKIMG==0?bx_FGSSJ=0.00:bx_FGSSJ=bx_FGSSJ/bx_FGSFKIMG;
                        bx_SYBFKIMG==0?bx_SYBSJ=0.00:bx_SYBSJ=bx_SYBSJ/bx_SYBFKIMG;
                        bx_XHFKIMG==0?bx_XHSJ=0.00:bx_XHSJ=bx_XHSJ/bx_XHFKIMG;
                        bx_ZBGSFKIMG==0?bx_ZBGSSJ=0.00:bx_ZBGSSJ=bx_ZBGSSJ/bx_ZBGSFKIMG;
                        bx_FKIMG==0?bx_ZSJ=0.00:bx_ZSJ=bx_ZSJ/bx_FKIMG;
                        let bangxianxj={
                            ZL:"棒线",
                            CXNAME:"棒线小计",
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
                        bangxian.unshift(bangxianxj);
                    }

                    //型带
                    if (xingdai.length > 0) {
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
                        while (i < xingdai.length) {
                            xc_FKIMG += xingdai[i].FKIMG;
                            xc_ZSJ += xingdai[i].ZSJ;
                            xc_ZYFKIMG += xingdai[i].ZYFKIMG;
                            xc_ZYSJ += xingdai[i].ZYSJ;
                            xc_ZYXSZB += xingdai[i].ZYXSZB;
                            xc_FGSFKIMG += xingdai[i].FGSFKIMG;
                            xc_FGSSJ += xingdai[i].FGSSJ;
                            xc_FGSXSZB += xingdai[i].FGSXSZB;
                            xc_SYBFKIMG += xingdai[i].SYBFKIMG;
                            xc_SYBSJ += xingdai[i].SYBSJ;
                            xc_SYBXSZB += xingdai[i].SYBXSZB;
                            xc_XHFKIMG += xingdai[i].XHFKIMG;
                            xc_XHSJ += xingdai[i].XHSJ;
                            xc_XHXSZB += xingdai[i].XHXSZB;
                            xc_ZBGSFKIMG += xingdai[i].ZBGSFKIMG;
                            xc_ZBGSSJ += xingdai[i].ZBGSSJ;
                            xc_ZBGSXSZB += xingdai[i].ZBGSXSZB;
                            i++;
                        }
                        xc_FKIMG==0? xc_ZYXSZB=0+'%' :xc_ZYXSZB = xc_ZYFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_FGSXSZB=0+'%' :xc_FGSXSZB = xc_FGSFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_SYBXSZB=0+'%' :xc_SYBXSZB = xc_SYBFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_XHXSZB=0+'%' :xc_XHXSZB = xc_XHFKIMG/xc_FKIMG;
                        xc_FKIMG==0? xc_ZBGSXSZB=0+'%' :xc_ZBGSXSZB = xc_ZBGSFKIMG/xc_FKIMG;
                        let ii=0;
                        while(ii<xingdai.length)
                        {
                            xc_ZYSJ += xingdai[ii].ZYFKIMG*xingdai[ii].ZYSJ;
                            xc_FGSSJ += xingdai[ii].FGSFKIMG*xingdai[ii].FGSSJ;
                            xc_SYBSJ += xingdai[ii].SYBFKIMG*xingdai[ii].SYBSJ;
                            xc_XHSJ += xingdai[ii].XHFKIMG*xingdai[ii].XHSJ;
                            xc_ZBGSSJ += xingdai[ii].ZBGSFKIMG*xingdai[ii].ZBGSSJ;
                            xc_ZSJ+=xingdai[ii].FKIMG*xingdai[ii].ZSJ;
                            ii++;
                        }
                        xc_ZYFKIMG==0?xc_ZYSJ=0.00:xc_ZYSJ=xc_ZYSJ/xc_ZYFKIMG;
                        xc_FGSFKIMG==0?xc_FGSSJ=0.00:xc_FGSSJ=xc_FGSSJ/xc_FGSFKIMG;
                        xc_SYBFKIMG==0?xc_SYBSJ=0.00:xc_SYBSJ=xc_SYBSJ/xc_SYBFKIMG;
                        xc_XHFKIMG==0?xc_XHSJ=0.00:xc_XHSJ=xc_XHSJ/xc_XHFKIMG;
                        xc_ZBGSFKIMG==0?xc_ZBGSSJ=0.00:xc_ZBGSSJ=xc_ZBGSSJ/xc_ZBGSFKIMG;
                        xc_FKIMG==0?xc_ZSJ=0.00:xc_ZSJ=xc_ZSJ/xc_FKIMG;
                        let xingdaixj={
                            ZL:"型带",
                            CXNAME:"型带小计",
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
                        xingdai.unshift(xingdaixj);
                    }

                    
                    

                    let arr=jgj.concat(reban).concat(lengban).concat(kuanhouban).concat(bangxian).concat(xingdai);
                    this.data = this.utils.mergeRow(arr, 'CXNAME','ZL',);
                    this.loading = false;
                });
            },
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