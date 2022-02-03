<template>
  <div class="video-list">
      <div class="item">
        <video-player class="video-player vjs-custom-skin" 
            ref="videoPlayer" 
            :playsinline="true" 
            :options="playerOptions">
      </video-player>
      <div class="title">{{title}}</div>
      <div class="btn" ><el-button type="primary" @click="previous">上一个视频</el-button><el-button type="primary" @click="next">下一个视频</el-button></div>
      </div>
      
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
  components:{videoPlayer},
  data() {
    return {
      title:'',
      i:1,
      playerOptions: {
            playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
            autoplay: false, // 如果为true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 是否视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "video/mp4", // 类型
              src:'' // url地址
            }],
            poster: '', // 封面地址
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: true, // 当前时间和持续时间的分隔符
              durationDisplay: true, // 显示持续时间
              remainingTimeDisplay: false, // 是否显示剩余时间功能
              fullscreenToggle: true // 是否显示全屏按钮
            }
          }
    }
  },
  // mounted() {
  //   this.playerOptions.sources[0].src = this.videoUrl[0]
  // },
  methods: {
    getVideo(){
      this.$axios.get(`video/video/${this.i}/`).then((res)=>{
        this.playerOptions.sources[0].src = res.data.date.mv_code
        this.title = res.data.date.title
      })
    },
    
    next(){
      this.i++
      if(this.i<=6){
        this.$axios.get(`video/video/${this.i}/`).then((res)=>{
        this.playerOptions.sources[0].src = res.data.date.mv_code
        this.title = res.data.date.title
      })
      }else if(this.i==7){
        this.i=1
        this.$axios.get(`video/video/${this.i}/`).then((res)=>{
        this.playerOptions.sources[0].src = res.data.date.mv_code
        this.title = res.data.date.title
      })
      }
      
    },
    previous(){
      this.i--
      if(this.i<1){
        this.i=6
         this.$axios.get(`video/video/${this.i}/`).then((res)=>{
        this.playerOptions.sources[0].src = res.data.date.mv_code
        this.title = res.data.date.title
      })
      }else{
        this.$axios.get(`video/video/${this.i}/`).then((res)=>{
        this.playerOptions.sources[0].src = res.data.date.mv_code
        this.title = res.data.date.title
      })
      }
      
    }
  },
  mounted() {
    this.getVideo()
  },
}
</script>

<style lang="less">
.video-list{
  .item{
    .title{
      text-align: left;
      font-size: 16px;
      font-weight: 800;
      height: 50px;
      line-height: 50px;
    }
    .btn{
      position: relative;
      top: -100px;
      left: 250px;
    }
  }
  width: 80%;
  
}
</style>