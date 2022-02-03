<template>
  <div class="imgItem">
      <div class="picture">
        <div class="list-wrap">
          <div class="p-img" v-for="img,index in imgs.photos" :key="index">
              <img :src="img"/>
             <div class="title">
            <strong>
              {{imgs.title}}
            </strong>
          </div>
          </div>
         
          
        </div>
  </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgs:{}
        }
    },
    beforeCreate() {
        this.$bus.$on('toImg',(id)=>{
            console.log('我收到了id',id)
            this.$axios.get('picture/photo/'+id +'/').then((res)=>{
                this.imgs = res.data.date
        })
        })
        
    },
    mounted() {
        setTimeout(()=>{
            console.log(this.imgs)
        },6000)
    },
}
</script>

<style lang="less">
.imgItem {
     margin: 20px 0;
    .picture{
        width: 100%;
        height: 800px;
.list-wrap {
                  display: flex;
                  flex-wrap: wrap;
                  width: 100%;
                .p-img {
                    margin-bottom: 130px;
                  padding-left: 15px;
                  width: 30%;
                  height: 200px;

                    img {
                      max-width: 100%;
                      height: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  
                  .title {
                  margin-left: -32px;
                  font-size: 18px;
                  color: #c81623;
                  margin-top: -37px;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }
                }

                
              height: 22px;
                }
    }  
          }
</style>