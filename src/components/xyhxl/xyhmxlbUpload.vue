<template>
    <div>
        <Upload
                multiple
                type="drag"
                action="http://47.94.21.130:8081/protocolAccountDetails/importexcel">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击选择或拖拽文件</p >
            </div>
        </Upload>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            // handleUpload (file) {
            //     this.file = file;
            //     return false;
            // },
            // upload () {
            //     this.loadingStatus = true;
            //     setTimeout(() => {
            //         this.file = null;
            //         this.loadingStatus = false;
            //         this.$Message.success('Success')
            //     }, 1500);
            // }
        }
    }
</script>
