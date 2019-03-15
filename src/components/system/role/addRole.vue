<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="角色" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入角色" @on-change="nameChange"></Input>
        </FormItem>
        <FormItem label="上级" prop="pid">
            <Cascader :data="roledata" trigger="hover" @on-change="pidChange"></Cascader>
        </FormItem>
        <FormItem label="别名" prop="description">
            <Input v-model="formValidate.description" placeholder="请输入别名" @on-change="descriptionChange"></Input>
        </FormItem>
        <FormItem label="排序" prop="sort">
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
                    name:'',
                    pid:'',
                    description:'',
                    sort:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '角色不为空', trigger: 'blur' }
                    ],
                    pid:[
                        { required: true, message: '上级不为空', trigger: 'blur' }
                    ],
                    description:[
                        { required: true, message: '别名不为空', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '序号不为空', trigger: 'blur' },
                    ],
                },
            }
        },
        created(){
            fetch("http://18.4.18.5:8081/role/treeView", {
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
            nameChange:function() {
                this.$emit('name', this.formValidate.name)
            },
            pidChange(e){
                this.formValidate.pId= e[e.length-1];
                this.$emit('pid', this.formValidate.pId);
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
