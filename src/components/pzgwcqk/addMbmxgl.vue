<template>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="年份：" style="width:150px">
            <DatePicker type="year" placeholder="请选择年份"  v-model="formValidate.year" style="width:120px" @on-change="yearChange"></DatePicker>
        </FormItem>
        <FormItem label="责任单位">
            <Input v-model="formValidate.code" placeholder="请输入责任单位名称" @on-change="codeChange"></Input>
        </FormItem>
        <FormItem label="一月：" style="width:150px" prop="jan">
            <Input v-model="formValidate.jan" @on-change="janChange"></Input>
        </FormItem>
        <FormItem label="二月：" style="width:150px" prop="feb">
            <Input v-model="formValidate.feb" @on-change="febChange"></Input>
        </FormItem>
        <FormItem label="三月：" style="width:150px" prop="mar">
            <Input v-model="formValidate.mar" @on-change="marChange"></Input>
        </FormItem>
        <FormItem label="四月：" style="width:150px" prop="apr">
            <Input v-model="formValidate.apr" @on-change="aprChange"></Input>
        </FormItem>
        <FormItem label="五月：" style="width:150px" prop="may">
            <Input v-model="formValidate.may" @on-change="mayChange"></Input>
        </FormItem>
        <FormItem label="六月：" style="width:150px" prop="jun">
            <Input v-model="formValidate.jun" @on-change="junChange"></Input>
        </FormItem>
        <FormItem label="七月：" style="width:150px" prop="jul">
            <Input v-model="formValidate.jul" @on-change="julChange"></Input>
        </FormItem>
        <FormItem label="八月：" style="width:150px" prop="aug">
            <Input v-model="formValidate.aug" @on-change="augChange"></Input>
        </FormItem>
        <FormItem label="九月：" style="width:150px" prop="sep">
            <Input v-model="formValidate.sep" @on-change="sepChange"></Input>
        </FormItem>
        <FormItem label="十月：" style="width:150px" prop="oct">
            <Input v-model="formValidate.oct" @on-change="octChange"></Input>
        </FormItem>
        <FormItem label="十一月：" style="width:150px" prop="nov">
            <Input v-model="formValidate.nov" @on-change="novChange"></Input>
        </FormItem>
        <FormItem label="十二月：" style="width:150px" prop="dec">
            <Input v-model="formValidate.dec" @on-change="decChange"></Input>
        </FormItem>

    </Form>
</template>
<script>
    export default {
        name:'addZrdwgl',
        data () {
            return {
                roledata: [],
                formValidate: {
                    year:'',
                    code:'',
                    jan:'',
                    feb:'',
                    mar:'',
                    apr:'',
                    may:'',
                    jun:'',
                    jul:'',
                    aug:'',
                    sep:'',
                    oct:'',
                    nov:'',
                    dec:''
                },
            }
        },
        created(){

        },
        methods: {
            yearChange:function() {
                this.$emit('year', this.formValidate.year)
            },
            codeChange:function() {
                this.$emit('code', this.formValidate.code)
            },
            janChange:function() {
                this.$emit('jan', this.formValidate.jan)
            },
            febChange:function() {
                this.$emit('feb', this.formValidate.feb)
            },
            marChange:function() {
                this.$emit('mar', this.formValidate.mar)
            },
            aprChange:function() {
                this.$emit('apr', this.formValidate.apr)
            },
            mayChange:function() {
                this.$emit('may', this.formValidate.may)
            },
            junChange:function() {
                this.$emit('jun', this.formValidate.jun)
            },
            julChange:function() {
                this.$emit('jul', this.formValidate.jul)
            },
            augChange:function() {
                this.$emit('aug', this.formValidate.aug)
            },
            sepChange:function() {
                this.$emit('sep', this.formValidate.sep)
            },
            octChange:function() {
                this.$emit('oct', this.formValidate.oct)
            },
            novChange:function() {
                this.$emit('nov', this.formValidate.nov)
            },
            decChange:function() {
                this.$emit('dec', this.formValidate.dec)
            },
        }
    }
</script>
