<template>
    <Menu ref="side_menu" :theme="theme3" @on-open-change="getParentName" @on-select="getName" accordion>
        <Submenu  v-for="item of menulist" :key="item.name" :name="item.name" >
            <template v-if="item" slot="title">
                <Icon type="ios-filing" />
                {{item.title}}
            </template>
            <label v-if="item.children">
                <MenuItem  v-for="tab2 of item.children"  :key="tab2.name" :name="tab2.name" :to="tab2.path">{{tab2.name}}</MenuItem>
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
                firstList:'',
                menulist:[
                    {
                        name : '系统管理',
                        title : '系统管理',
                        path:'',
                        icon : 'outlet',
                        children: [
                            { name : '用户管理', title : '用户管理', icon : 'outlet',path:'/userManager'},
                            { name : '日志管理', title : '用户管理', icon : 'outlet',path:'/logger', }
                        ]
                    }
                ],
                getNames:[]
            }
        },
        mounted(){
        },
        methods:{
            getParentName(e){
              e.length==0?this.getNames=[]:this.getNames.push({'name':e[0]});
            },
            getName(e){
                this.getNames.length==2?(this.getNames.pop(),this.getNames.push({'name':e})):this.getNames.push({'name':e});
                this.$store.commit('setHeaders',this.getNames);
            }
        }
    }
</script>
<style scoped>
    .ivu-menu{
        width: 200px !important;
    }
</style>