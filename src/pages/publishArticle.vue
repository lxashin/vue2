<template>
  <div class="publishArticle">
    <div class="title">
      <el-input v-model="title" placeholder="输入文章标题"></el-input>
    </div>

    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <div style="height: 100px; line-height: 100px">
      <span style="padding-right: 20px; font-weight: 700">文章类型：</span>
      <el-radio-group v-model="article_type_id">
        <el-radio label="1">抗疫故事</el-radio>
        <el-radio label="2">平凡英雄</el-radio>
        <el-radio label="3">防疫资讯</el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 20px; height: 100px; line-height: 100px">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="info" @click="del">取消</el-button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "PublishArticle",
  components: { quillEditor },
  data() {
    return {
        title: "",
        content: ``,
        article_type_id: "",
      editorOption: {
        placeholder: "请开始您的表演",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
          ],
        },
      },
    };
  },

  methods: {
    onEditorReady() {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件

    submit() {
      this.$axios({
        method:'post',
        url:'article/article/',
       params:{title:this.title,content:this.content,article_type_id:this.article_type_id},
      }).then(()=>{
        this.$message({
          message:'发布成功',
          type:'success'
        })
      })
      console.log(this.article);
      this.$router.push("/main");
    },
    del() {
      this.article = {};
    },
  },
  computed: {
    // editor() {
    //     return this.$refs.myQuillEditor.quill;
    // },
  },
};
</script>

<style>
.title {
  height: 100px;
  line-height: 100px;
}
.ql-editor {
  height: 300px;
}
.ql-toolbar.ql-snow {
  height: 128px;
  line-height: 120px;
}
</style>