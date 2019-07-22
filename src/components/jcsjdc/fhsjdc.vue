<template>
    <div>
        <Form :label-width="60">
            <Row>
                <Col span="5">
                <FormItem label="钢厂：" style="margin-left: 0px">
                    <Select v-model="companyName" placeholder="请选择钢厂">
                        <!--<Option value="全部">全部</Option>-->
                        <Option value="唐钢">唐钢</Option>
                        <Option value="邯钢">邯钢</Option>
                        <Option value="邯宝">邯宝</Option>
                        <Option value="宣钢">宣钢</Option>
                        <Option value="承钢">承钢</Option>
                        <Option value="舞钢">舞钢</Option>
                        <Option value="石钢">石钢</Option>
                        <Option value="衡板">衡板</Option>
                    </Select>
                </FormItem>
                </Col>

                <Col span="5">
                <FormItem label="品种：">
                    <Select v-model="variety" placeholder="请选择品种">
                        <!--<Option value="">全部</Option>-->
                        <Option value="螺纹">螺纹</Option>
                        <Option value="热板">热板</Option>
                        <Option value="酸洗">酸洗</Option>
                        <Option value="冷轧">冷轧</Option>
                        <Option value="冷硬">冷硬</Option>
                        <Option value="涂镀">涂镀</Option>
                        <Option value="线材">线材</Option>
                        <Option value="圆钢">圆钢</Option>
                        <Option value="型材">型材</Option>
                        <Option value="中厚板">中厚板</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="10">
                    <FormItem  style="margin-left: -60px">
                        <label style="width:120px">实际发货日期：</label>
                        <DatePicker type="date" placeholder="起始日期" :editable="false" :clearable="false" v-model="actualStartTime" style="width:120px;margin-left:0px"></DatePicker>
                        - <DatePicker type="date" placeholder="终止日期"  :editable="false" :clearable="false" v-model="actualEndTime" style="width:120px;margin-left:0px"></DatePicker>
                    </FormItem>
                </Col>

                </Row>

                <Row>
                <Col span="5">
                <FormItem  style="margin-left: -60px">
                    <label style="width:80px;margin-left: -50px">交货单号：</label>
                    <Input v-model="delivNumb" placeholder="交货单号" clearable style="width: 120px" />
                </FormItem>
                </Col>
                <Col span="5">
                <FormItem style="margin-left: -60px">
                    <label style="width:80px;margin-left: -60px">交货单行号：</label>
                    <Input v-model="delivItem" placeholder="交货单行号" clearable style="width: 120px" />
                </FormItem>
                </Col>
                <Col span="9">
                <FormItem style="margin-left: -60px">
                    <label style="width:100px;margin-left: -60px">插入数据库时间：</label>
                    <DatePicker type="date" placeholder="起始时间" :editable="false" :clearable="false" v-model="ModifyStartTime" style="width:120px;margin-left:0px"></DatePicker>
                    -
                    <DatePicker type="date" placeholder="终止时间"  :editable="false" :clearable="false" v-model="ModifyEndTime" style="width:120px;margin-left:0px
"></DatePicker>
                </FormItem>
                </Col>
                <Col span="4" style="float: left">
                    <!--<Button @click="downLoad()" icon="ios-cloud-download-outline">导出</Button>-->
                    <a :href="downloadUrl"><Button type="primary" :loading="mxstats" style="margin-left:10px" @click="dw()">明细导出</Button></a>
                </Col>
            </Row>
        </Form>

    </div>
</template>

<script>
    export default {
        name: "jcsjdcfh",
        data() {
            return {
                mxstats:false,
                downloadUrl:'',
                companyName:'唐钢',
                variety:'螺纹',
                loading:true,
                actualStartTime: new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                actualEndTime: new Date(new Date().getFullYear(), new Date().getMonth()-1, new Date(new Date().getFullYear(),new Date().getMonth()-1,0).getDate()-1),
                delivNumb:'',
                delivItem:'',
                ModifyStartTime:'',
                ModifyEndTime:''
            }
        },
        mounted() {
             this.mxstats = false;
        },
        methods: {
            dw(){
                this.downMx();
            },
            downMx(){
                let actualStartTime='actualStartTime='+this.utils.formatdate(this.actualStartTime).substring(0, 10);
                let actualEndTime='';
                actualEndTime+='&actualEndTime='+this.utils.formatdate(this.actualEndTime).substring(0, 10);
                let companyName= "&companyName="+this.companyName
                let variety= "&variety="+this.variety
                let delivNumb = "&delivNumb="+this.delivNumb
                let delivItem = "&delivItem="+this.delivItem

                let ModifyStartTime='&ModifyStartTime=';
                if(this.ModifyStartTime!=''){
                    ModifyStartTime+=this.utils.formatdate(this.ModifyStartTime).substring(0, 10)
                }else{
                    ModifyStartTime+=this.ModifyStartTime;
                }
                let ModifyEndTime='&ModifyEndTime=';
                if(this.ModifyEndTime!=''){
                    ModifyEndTime+=this.utils.formatdate(this.ModifyEndTime).substring(0, 10)
                }else{
                    ModifyEndTime+=this.ModifyEndTime;
                }

                this.downloadUrl=this.$store.state.fetchPath + "/export/exportFHSJ?"+actualStartTime+actualEndTime+companyName+variety+delivNumb+delivItem+ModifyStartTime+ModifyEndTime;
                const msg = this.$Message.loading({//iview
                    content: '正在导出数据，请稍后',
                    duration: 0
                });
                setTimeout(msg, 20000);

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
    .addTable{
        position: absolute;
        bottom:-48px;
        z-index: 10000000 ;
        width:100%;
        height:48px;
        border-collapse:collapse;
        border-bottom:1px solid #e8eaec;
    }
    .addTable td{
        width:20%;
        height:48px;
    }
</style>