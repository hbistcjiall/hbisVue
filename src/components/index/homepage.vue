<template>
    <div>
        <ul v-for="item in arry2" style="margin-left:12%;">
            <router-link :to="item.URL">
                <li>
                    <p>{{item.MENUNAME}}</p>
                    <img v-bind:src="item.background" alt="">
                </li>
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "homepage",
        components: {
        },
        data() {
            return {
                arry2: [],
                list: [],
                roleData: {
                    menuname: '',
                    page: '1',
                    limit: '100',
                },
                bkcolor: [
                    {
                        background: require("../../assets/indexImg/jggImg1.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg2.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg3.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg4.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg5.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg6.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg7.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg8.png"),
                    },
                    {
                        background: require("../../assets/indexImg/jggImg9.png"),
                    },
                ]
            }
        },
        methods: {
            handleListApproveHistory() {
                fetch(this.$store.state.fetchPath + "/settings/selsettings", {
                    method: "POST",
                    headers: this.$store.state.fetchHeader,
                    body: this.utils.formatParams(this.roleData),
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
                    this.list = res.data;
                    this.list.map(((item, index) => {
                        if (index >= this.bkcolor.length) {
                            let x = index - this.bkcolor.length;
                            this.arry2.push(Object.assign({}, item, {background: this.bkcolor[x].background,}))
                        } else {
                            this.arry2.push(Object.assign({}, item, {background: this.bkcolor[index].background,}))
                        }

                    }))
                })
            },
        },
        created() {
            this.handleListApproveHistory();
        },
    }
</script>
<style scoped>
    a {
        color: white;
    }

    ul {
        list-style: none;
        margin-top: 80px;
        width:80%;
        margin-left: 30%;
    }

    li {
        width: 25%;
        height: 130px;
        float: left;
        position: relative;
        margin-left:5%;
        margin-bottom:20px;
    }
    li p{
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        bottom:10px;
        left:0;
        z-index: 100;
        width:100%;
        height:30px;
    }
    li img{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0
    }
</style>