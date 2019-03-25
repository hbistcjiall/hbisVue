<style scoped>
    .ivu-menu-light, .ivu-layout-header {
        background: none;
    }

    .newheader {
        /*background-image: url("../../assets/indexImg/bg.jpg");*/
        background-color: #134598;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        /*width: 238px;*/
        /*height: 74px;*/
        width: 190px;
        height: 59px;
        border-radius: 3px;
        top: 5px;
        float: left;
        margin-left: -30px;
        position: relative;
        background-image: url("../../assets/indexImg/indexLog.png");
        background-size: 100% 100%;
    }

    .ivu-menu-horizontal {
        height: 65px;
    }

    .layout-title {
        width: 300px;
        color: #ffffff;
        text-align: center;
        float: left;
        font-size: 24px;
        font-weight: bold;
        margin-left: 30%;
        cursor: default;
    }

    .layout-nav {
        width: 100px;
        margin: 0 auto;
        margin-right: 20px;
        color: white;
    }

    .layout-header-bar {
        width: 100%;
        height: 30px;
        background-color: #f2f9fd;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .ivu-layout-sider {
        background-color: #f2f9fd;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .ivu-icon-ios-arrow-down:before {
        content: "\F116";
        color: #0075c1;
    }

    .ivu-layout-content {
        background-color: #fff;
    }
    .ios-arrow-down:before{
        color: #ffffff;
    }
    .ivu-icon-ios-arrow-down:before{
        color: white;
        content: "\F116";
    }
    li{
        list-style: none;

    }
    .content_div{
        background-color: white;
        position: absolute;
        right: 0px;
        top: 64px;
        width: 180px;
    }
    .content_ul li:hover{
        color: white;
        background-color: #3491ce;
        cursor: pointer;
    }
    .content_div li{
        height: 45px;
        line-height: 45px;
    }
</style>
<template>

    <div class="layout">
        <Layout>
            <Header class="newheader">
                <Menu mode="horizontal" active-name="1">
                    <div class="layout-logo"></div>
                    <!--<div class="layout-title">河钢销售营销数据中心</div>-->
                    <div @mouseenter="mousein()"  style="background-color: #134598;width: 180px;float: right;height: 64px"  >
                        <img src="../../assets/indexImg/guanliyuan.png" style="position: relative;right: 10px;top: 10px;"/>
                        <span style="color: white;margin-top:-10px">系统管理员</span>
                        <Icon type="ios-arrow-down" style="position: relative;" size="20" />
                    </div>
                    <div class="content_div" v-if="isdiv" @mouseleave="mouseout()">
                        <ul class="content_ul">
                            <li>修改密码</li>
                            <li>版本信息</li>
                            <li @click="loginOut()">安全退出</li>
                        </ul>
                    </div>
                    <div class="layout-nav">
                        <!--<Button type="info" style="float: right;margin-top: 14px" @click="loginOut()">退 出</Button>-->

                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider breakpoint="md" v-model="isCollapsed" :width="179">
                    <menuList/>
                </Sider>
                <Layout>
                    <Header class="layout-header-bar">
                        <headerList/>
                    </Header>
                    <Content :style="{margin: '2px',padding:'20px', background: '#fff', minHeight:screenHeight}">
                        <contentList/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import menuList from './menu';
    import headerList from './header';
    import contentList from './content';

    export default {
        data() {
            return {
                isdiv:false,
                isCollapsed: false,
                screenHeight: document.documentElement.clientHeight - 110 + 'px',
                loginOutData: {
                    username: '',
                    password: '',
                    remember: ''
                }
            };
        },
        mounted() {
            const that = this;
            window.onresize = () => {
                return (() => {
                    that.screenHeight = document.documentElement.clientHeight - 110 + 'px';
                })()
            }
        },
        watch: {
            screenHeight(val) {
                this.screenHeight = val
            }
        },
        components: {
            menuList,
            contentList,
            headerList
        },
        methods: {
            mouseout(){
                this.isdiv=false;
            },
            mousein(){
                this.isdiv=true;
            },
            loginOut() {
                fetch(this.$store.state.fetchPath + "/logout", {
                    method: "get",
                    headers: this.$store.state.fetchHeader,
                    credentials: 'include'
                })
                    .then((res) => {
                        if (res.status != 200) {
                            this.$Message.error('请求失败！');
                        } else {
                            return res.text();
                        }
                    }).then((res) => {
                    res = res && res.length > 0 ? JSON.parse(res) : [];
                    this.$store.commit('setHeaders', this.headerss);
                    this.loginOutData.username = res.userName;
                    this.loginOutData.password = res.password;
                    sessionStorage.setItem("Flag", "");
                    this.$Message.success("请重新登录！");
                    return this.$router.push({name: "login", params: this.loginOutData});
                })
            }
        }
    }
</script>

