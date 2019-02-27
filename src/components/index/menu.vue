<template>
    <Menu ref="side_menu" :theme="theme3" @on-open-change="getParentName" @on-select="getName" accordion>
        <Submenu  v-for="item of menulist" :key="item.mName" :name="item.mName" >
            <template v-if="item" slot="title">
                <Icon type="ios-filing" />
                {{item.title}}
            </template>
            <label v-if="item.children">
                <MenuItem  v-for="tab2 of item.children"  :key="tab2.mName" :name="tab2.mName" :to="tab2.path">{{tab2.title}}</MenuItem>
            </label>
        </Submenu>
    </Menu>
</template>
<script>
    export default {
        name:'menuList',
        data () {
            return {
                theme3: 'dark',
                menulist:[
                    // {
                    //     name : '系统管理',
                    //     title : '系统管理',
                    //     path:'',
                    //     icon : 'outlet',
                    //     children: [
                    //         { name : '新增用户', title : '新增用户', icon : 'outlet',path:'/userManager'},
                    //         { name : '日志管理', title : '用户管理', icon : 'outlet',path:'/logger', },
                    //         { name : '用户信息', title : '用户信息', icon : 'outlet',path:'/userMsg', }
                    //     ]
                    // }
                ],
                getNames:[]
            }
        },
        mounted(){
        },
        created() {
            this.newMenu();
        },
        methods:{
            getParentName(e){
              e.length==1?this.getNames=[]:this.getNames.push({'name':e[0]});
            },
            getName(e){
                this.getNames.length==2?(this.getNames.pop(),this.getNames.push({'name':e})):this.getNames.push({'name':e});
                this.$store.commit('setHeaders',this.getNames);
            },
            newMenu(){
                fetch(this.$store.state.fetchPath + "/t-user-entity/buildTree", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: '',
                    credentials:'include'
                })
                    .then((res) => {
                        return res.text();
                    }).then((res) => {
                    res = res.length>0?JSON.parse(res):[];
                    this.menulist=this.utils.buildTree(res);
                    window.console.log(typeof(this.menulist))
                    this.showMenu=true;
                })
            }
        }
    }
</script>
<style scoped>
    .ivu-menu{
        width: 200px !important;
    }
</style>