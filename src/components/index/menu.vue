<template>
    <Menu ref="side_menu" :theme="theme3" @on-open-change="getParentName" @on-select="getName" :accordion="true">
        <div v-for="(item,index) of menulist" :key="index">
            <MenuItem v-if="!item.children" :name="item.mName"><Icon type="ios-filing" style="margin-right:8px "/>{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
            <Submenu v-if="item.children"  :name="item.mName" >
                <template slot="title">
                    <Icon type="ios-filing" />
                    {{item.title}}
                </template>
                <label v-if="item.children">
                    <MenuItem  v-for="tab2 of item.children"  :key="tab2.mName" :name="tab2.mName" :to="tab2.path">{{tab2.title}}</MenuItem>
                </label>
            </Submenu>
        </div>

    </Menu>
</template>
<script>
    export default {
        name:'menuList',
        data () {
            return {
                theme3: 'dark',
                menulist:[],
                getNames:[],
                layout:'',
                components:''
            }
        },
        created() {
            this.newMenu();
        },
        methods:{
            getParentName(e){
                this.components=e[0];
            },
            getName(e){
                this.layout=e;
                this.getNames=[];
                if(this.components){
                this.getNames.push({'name': this.components});
                this.getNames.push({'name': this.layout});
                }else{
                    this.getNames.push({'name': this.layout});
                }
                this.$store.commit('setHeaders',this.getNames);
                if(this.getNames[1].name==='用户管理'){
                    this.$store.commit("updateCurrent", 0);
                }
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