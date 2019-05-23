<template>
    <div>
        <Form :label-width="100">
            <Row>
                <Col span="6" v-if="!switchTime">
                    <FormItem label="年份：">
                        <DatePicker type="year" placeholder="请选择年份" :editable="false" :clearable="false" v-model="year" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4"  v-if="switchTime">
                    <FormItem label="月份：">
                        <DatePicker type="month" placeholder="起始月份" :editable="false" :clearable="false" v-model="startTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="4" v-if="switchTime">
                    <FormItem>
                        <DatePicker type="month" placeholder="终止月份" :editable="false" :clearable="false" v-model="endTime" style="width:150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="1" style="margin-left: -20px">
                    <FormItem>
                        <i-switch v-model="switchTime" @on-change="changeSwitch">
                            <span slot="open">年</span>
                            <span slot="close">月</span>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col span="4" style="margin-left: 80px">
                    <FormItem label="责任单位：" style="width:180px">
                        <Select v-model="zrbm" style="width:120px" placeholder="请选择责任单位">
                            <Option value="">全部</Option>
                            <Option value="热板公司">热板公司</Option>
                            <Option value="冷板公司">冷板公司</Option>
                            <Option value="宽厚板公司">宽厚板公司</Option>
                            <Option value="棒线公司">棒线公司</Option>
                            <Option value="型材公司">型材公司</Option>
                            <Option value="唐钢分公司">唐钢分公司</Option>
                            <Option value="邯钢分公司">邯钢分公司</Option>
                            <Option value="宣钢分公司">宣钢分公司</Option>
                            <Option value="承钢分公司">承钢分公司</Option>
                            <Option value="舞钢分公司">舞钢分公司</Option>
                            <Option value="石钢分公司">石钢分公司</Option>
                            <Option value="衡板分公司">衡板分公司</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="5" style="margin-left: 20px">
                    <FormItem label="产品等级：" style="width:180px">
                        <Select v-model="zt" style="width:120px" placeholder="请选择品种" @on-change="changeTitle()">
                            <Option value="0">品种钢</Option>
                            <Option value="1">高端产品</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4" style="float: right">
                    <Button @click="getList()" icon="ios-search" type="primary" style="margin-right:10px;">查询</Button>
                    <Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>
                </Col>
            </Row>
        </Form>
        <Table :loading="loading" :columns="columns" :data="data" border height="700" ref="table"></Table>
    </div>
</template>

<script>
    export default {
        name: "pzgjs_zrzt",
        data() {
            return {
                loading:true,
                switchTime:true,
                zt:"0",
                year:new Date(),
                startTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                titleYear:'',
                titleMonth:'',
                endTime:new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                zrbm: '',
                columns:[
                    {
                        title: '责任单位',
                        key: 'COMPANYNAME',
                        align: 'center',
                    },
                    {
                        title: '',
                        key: 'nmjs',
                        align: 'center',
                        children:[
                            {

                                title: '总量（吨）',
                                key: 'FKIMG',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {

                                title: '品种钢量（吨）',
                                key: 'PZGL',
                                align: 'center',
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
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        ((Number(params.row[params.column.key]))*100).toFixed(2)+'%'
                                    )
                                }
                            },
                            {

                                title: '目标量（吨）',
                                key: 'MBL',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        Number(params.row[params.column.key]).toFixed(2)
                                    )
                                }
                            },
                            {

                                title: '完成/目标',
                                key: 'WCBL',
                                align: 'center',
                                render: (h, params) => {
                                    params.row[params.column.key]=params.row[params.column.key]==null?'0.00':params.row[params.column.key];
                                    return h('span',
                                        ((Number(params.row[params.column.key]))*100).toFixed(2)+'%'
                                    )
                                }
                            }

                        ]
                    },
                ],
                data:[]
            }
        },
        mounted() {
            this.getList();
            this.titleMonth = this.utils.formatMonthStart(this.startTime).substring(5,7);
            this.titleYear = this.utils.formatYearStart(this.startTime).substring(0,4);
            this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
        },
        methods:{
            changeSwitch(){
                let date=new Date();
                this.switchTime?(this.startTime=date,this.endTime=this.utils.formatMonthEnd()):this.year=date;
                if(this.switchTime == true){
                    this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
                }else{
                    this.columns[1].title = this.titleYear+'年内贸结算'
                }
            },
            getList() {
                this.loading = true;
                let params={
                };
                let zt='&zt='
                zt+= this.zt
                this.zrbm?params.zrbm=this.zrbm:'';
                let startTime='startTime=';
                let endTime='&endTime=';
                this.switchTime?(startTime=startTime+this.utils.formatMonthStart(this.startTime),endTime=endTime+this.utils.formatMonthStart(this.endTime)):(startTime=startTime+ this.utils.formatYearStart(this.year),endTime=endTime+this.utils.formatYearEnd(this.year));
                this.titleMonth = this.utils.formatMonthStart(this.startTime).substring(5,7);
                this.titleYear = this.utils.formatYearStart(this.startTime).substring(0,4);
                if(this.switchTime == true){
                    this.columns[1].title = this.titleYear+'年'+ this.titleMonth+'月内贸结算'
                }else{
                    this.columns[1].title = this.titleYear+'年内贸结算'
                }
                fetch(this.$store.state.fetchPath + "/scm-steel-settle/getzrbm", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: startTime+endTime+'&'+this.utils.formatParams(params)+zt,
                    credentials: 'include'
                }).then((res) => {
                    if(res.status!=200){
                        return this.$Message.error('请求失败！');
                    }else{
                        return res.text();
                    }
                }).then((res) => {
                    res =res && res.length > 0 ? JSON.parse(res) : [];
                    this.data = res;
                    let result1 = 0;
                    let result2 = 0;
                    let result3 = 0;
                    let sghj1 = 0;
                    let sghj2 = 0;
                    let sghj3 = 0;
                    let hbhj1 = 0;
                    let hbhj2 = 0;
                    let hbhj3 = 0;

                    let wcbl1 = 0;
                    let wcbl2 = 0;

                    let result10 = 0;
                    let result9 = 0;
                    for(var i=0;i<this.data.length;i++){
                        result1 += this.data[i].FKIMG
                        result2 += this.data[i].PZGL
                        result3 += Number(this.data[i].MBL)
                        if(this.data[i].COMPANYNAME == "石钢分公司"){
                            sghj1 = this.data[i].FKIMG
                            sghj2 = this.data[i].PZGL
                            sghj3 = Number(this.data[i].MBL)
                        }
                        if(this.data[i].COMPANYNAME == "衡板分公司"){
                            hbhj1 = this.data[i].FKIMG
                            hbhj2 = this.data[i].PZGL
                            hbhj3 = Number(this.data[i].MBL)
                        }
                    }
                    if((result2-sghj2-hbhj2)/2 == 0){
                        result10 = 0;
                    }else{
                        result10 = ((result2-sghj2-hbhj2)/2)/((result1-sghj1-hbhj1)/2);
                    }
                    if(result1 == 0 || result1=="" || result1 == null){
                        result9 = 0;
                    }else{
                        result9 = result2/result1
                    }
                    if(result3 == 0){
                        wcbl2 = 0;
                    }else{
                        wcbl2 = result1/result3;
                    }
                    if((Number(result3-sghj3-hbhj3).toFixed(2))/2 == 0){
                        wcbl1 = 0;
                    }else{
                        wcbl1 = ((result1-sghj1-hbhj1)/2)/((Number(result3-sghj3-hbhj3).toFixed(2))/2)
                    }
                    let xshj = {
                        FKIMG : (result1-sghj1-hbhj1)/2,
                        PZGL : (result2-sghj2-hbhj2)/2,
                        COMPANYNAME:"河钢销售合计",
                        BZ:result10,
                        MBL:(Number(result3-sghj3-hbhj3).toFixed(2))/2,
                        WCBL :wcbl1
                    }
                    let obj ={
                        FKIMG : result1,
                        PZGL : result2,
                        COMPANYNAME:"河钢集团合计",
                        BZ:result9,
                        MBL:Number(result3).toFixed(2),
                        WCBL : wcbl2

                    }
                    this.data.push(xshj)
                    this.data.push(obj)
                    this.loading = false;
                });
            },
            changeTitle(){
                if(this.zt=="0"){
                    this.columns[1].children[1].title="品种钢量";
                }else{
                    this.columns[1].children[1].title="高端产品";
                }
                this.getList();
            },
            downLoad(){
                this.$refs.table.exportCsv({
                    filename: '结算完成（责任主体）明细'
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
</style>