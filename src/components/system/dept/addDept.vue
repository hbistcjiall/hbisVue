<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="部门名称" prop="simpleName">
            <Input v-model="formValidate.simpleName" placeholder="请输入部门名称" @on-change="simplenameChange"></Input>
        </FormItem>
        <FormItem label="上级部门" prop="pid">
            <Cascader :data="roledata" trigger="hover" @on-change="pidChange"></Cascader>
        </FormItem>
        <FormItem label="部门全称" prop="fullName">
            <Input v-model="formValidate.fullName" placeholder="请输入部门全称" @on-change="fullnameChange"></Input>
        </FormItem>
        <FormItem label="部门描述">
            <Input v-model="formValidate.description" placeholder="请输入描述内容" @on-change="descriptionChange"></Input>
        </FormItem>
        <FormItem label="排序">
            <Input v-model="formValidate.sort" placeholder="请输入排序" @on-change="sortChange"></Input>
        </FormItem>

    </Form>
</template>
<script>
    export default {
        name:'addRole',
        data () {
            return {
                roledata: [],
                formValidate: {
                    simpleName:'',
                    pid:'',
                    fullName:'',
                    description:'',
                    sort:0
                },
                ruleValidate: {
                    simpleName: [
                        { required: true, message: '部门名称不为空', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '上级部门不为空', trigger: 'blur' }
                    ],
                    fullName:[
                        { required: true, message: '部门全称不为空', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
            fetch("http://18.4.18.5:8081/dept/treeView", {
                method: "POST",
                headers: {//fetch请求头
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                credentials:'include'
            })
                .then((res) => {
                    return res.text();
                }).then((res) => {
                res = res.length>0?JSON.parse(res):[]
                // 保存取到的所有数据
                this.roledata =  this.utils.buildDeptTree(res);

            })
        },
        methods: {
            simplenameChange:function() {
                this.$emit('simpleName', this.formValidate.simpleName)
            },
            pidChange(e){
                this.formValidate.pId= e[e.length-1];
                this.$emit('pid', this.formValidate.pId);
            },
            fullnameChange:function() {
                this.$emit('fullName', this.formValidate.fullName)
            },
            descriptionChange:function() {
                this.$emit('description', this.formValidate.description)
            },
            sortChange:function() {
                this.$emit('sort',this.formValidate.sort)
            }
        }
    }
</script>
