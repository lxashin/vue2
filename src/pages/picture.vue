<template>
  <div>
    <div class="picture">
      <ul class="yui3-g">
        <li class="yui3-u-1-5" v-for="photo in pictures" :key="photo.id">
          <div class="list-wrap">
            <div class="p-img" @click="toItem(photo.id)">
              <img :src="baseUrl+photo.picture" />
              <div class="title">
              <strong>
                {{ photo.title }}
              </strong>
            </div>
            </div>
            
          </div>
        </li>
      </ul>
    </div>
    <div class="fix">
      <Fix>
      </Fix>
    </div>
  </div>
</template>

<script>
import Fix from "../components/pictureFix.vue";
export default {
  data() {
    return {
      pictures: [],
      baseUrl:'http://192.168.1.103:8000'
    };
  },
  methods: {
    toItem(id) {
      setTimeout(() => {
        this.$bus.$emit("toImg", id);
      }, 500);

      this.$router.push("/imgItem");
    },
    // news() {
    //   this.$axios.get("picture/news/").then((res) => {
    //     this.pictures = res.data.date;
    //   });
    // },
    // hots() {
    //   this.$axios.get("picture/hotphoto/").then((res) => {
    //     this.pictures = res.data.date;
    //   });
    // },
    // category() {
    //   this.$axios.get("picture/category/R/").then((res) => {
    //     this.pictures = res.data.date;
    //   });
    // },
  },
  created(){
    this.$bus.$on('news',()=>{
      this.$axios.get("picture/news/").then((res) => {
        this.pictures = res.data.date;
      });
    })

    this.$bus.$on('hots',()=>{
      this.$axios.get("picture/hotphoto/").then((res) => {
        this.pictures = res.data.date;
      });
    })

    this.$bus.$on('yx',()=>{
      this.$axios.get("picture/category/o/").then((res) => {
        this.pictures = res.data.date;
      });
    })

    this.$bus.$on('xc',()=>{
      this.$axios.get("picture/category/r/").then((res) => {
        this.pictures = res.data.date;
      });
    })
    this.$bus.$on('mh',()=>{
      this.$axios.get("picture/category/p/").then((res) => {
        this.pictures = res.data.date;
      });
    })
  },
  components: { Fix },
  beforeCreate() {
    this.$axios.get("picture/").then((res) => {
      this.pictures = res.data.date;
    });
  },
};
</script>

<style lang="less">
.fix {
  position: fixed;
  flex-direction: column;
  top: 88px;
  right: 176px;
}
.picture {
  width: 80%;

  margin: 20px 0;

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      height: 100%;

      margin-bottom: 300px;
      line-height: 28px;
      list-style: none;

      .list-wrap {
         height: 22px;
        .p-img {
          padding-left: 72px;
          width: 215px;
          height: 255px;

            color: #666;

            img {
              width: 100%;
              height: auto;
              vertical-align: middle;
            }
          
           .title {
          margin-left: -32px;
          font-size: 18px;
          color: #c81623;
          margin-top: 20px;

          strong {
            font-weight: 700;

            i {
              margin-left: -5px;
            }
          }
        }
        }
       
      }
    }
  }
}
</style>