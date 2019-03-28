<template>
    <div>
        <ul v-for="item in arry2">
            <router-link :to="item.URL">
                <li :style="{'background-color':item.color}">
                    {{item.MENUNAME}}
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
                        color: "#90dcec",
                    },
                    {
                        color: "#02abdc"
                    },
                    {
                        color: "#96e89c"
                    },
                    {
                        color: "#4cc6ea"
                    },
                    {
                        color: "#0093d8"
                    },
                    {
                        color: "#52c985"
                    },
                    {
                        color: "#14b5e4"
                    },
                    {
                        color: "#027ad6"
                    },
                    {
                        color: "#1dc063"
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
                            this.arry2.push(Object.assign({}, item, {color: this.bkcolor[x].color,}))
                        } else {
                            this.arry2.push(Object.assign({}, item, {color: this.bkcolor[index].color,}))
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
    }

    li {
        width: 33%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        float: left;
        color: #ffffff;
        font-size: 20px;
    }
</style>