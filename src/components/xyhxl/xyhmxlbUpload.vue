<template>
    <!--<div>
        <Upload multiple ref="upload" :before-upload="handleUpload" :show-upload-list="false" :on-success="uploadSuccess"
                action="http://18.4.17.20:8081/protocolAccountDetails/importexcel">
            <Button type="primary" icon="ios-cloud-upload-outline">浏览</Button>
        </Upload>
        <div v-for="(item, index) in file">文件名称: {{ item.name }}
            <a href="javascript:;" @click="delectFile(item.keyID)">X</a>
            <Button style="margin-left:30px;" size="small" v-if="index === 0" type="primary" @click="upload">上传</Button>
        </div>
    </div>-->
    <div>
        <form target="myIframe" action="http://18.4.17.200:8081/protocolAccountDetails/importexcel" method="post"
              enctype="multipart/form-data"  >
            <span style="font-size: 16px">选择文件:</span><input type="file"  name="file" style="border: 1px solid #0075C3;width: 300px" >
            <input type="submit" value="提交" @click="sub" style="background-color: #2D8CF0;color: #fff;width: 50px;border: 0px;height: 26px;margin-left: 5px">
        </form>
        <iframe name="myIframe" style="display:none" ></iframe>
    </div>
</template>
<script>
    export default {

        data() {
            return {
                file: [], // 总文件List
                uploadFile: [],
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
        },
        methods: {
            sub() {
                alert('上传成功');
            }
            // handleUpload(file) { // 保存需要上传的文件
            //     let keyID = Math.random().toString().substr(2);
            //     file['keyID'] = keyID;
            //     this.file.push(file);
            //     this.uploadFile.push(file)
            //     return false;
            // },
            // delectFile(keyID) { // 删除文件
            //     this.file = this.file.filter(item => {
            //         return item.keyID != keyID
            //     })
            //     this.uploadFile = this.uploadFile.filter(item => {
            //         return item.keyID != keyID
            //     })
            // },
            // upload() { // 上传文件
            //     if (this.uploadFile.length === 0) {
            //         this.$Message.error('未选择上传文件')
            //         return false
            //     }
            //     for (let i = 0; i < this.uploadFile.length; i++) {
            //         let item = this.file[i]
            //         this.$refs.upload.post(item);
            //     }
            // },
            // uploadSuccess(response, file, fileList) { // 文件上传回调 上传成功后删除待上传文件
            //     window.console.log(response) // 后端返回数据
            //     window.console.log(file) // 当前上传文件
            //     window.console.log(fileList) // 整个input file 里的文件数组
            // },
        }
    }
</script>
<style scoped>

</style>
