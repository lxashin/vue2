<template>
  <div class="echart">
      <div ref="chart" style="width:100%;height:376px">

    </div>
  </div>
</template>

<script>
export default {
 data() {
   return {
     collect_count:[],
     collectData:[],
     heng:[],
     zong:[],
      option:{
            title: {
                text: ' 好友收藏'
            },
            tooltip: {},
            legend: {
                data:['收藏数量']
            },
            xAxis: {
                data: this.heng  //横坐标名字
            },
            yAxis: {},
            series: [{
                name: '收藏数',
                type: 'bar',
                data:[] //纵坐标点赞数量
            }]
      }
   }
 },
  methods: {
     getEchartData() {
     var chart = this.$refs.chart
      if (chart) {
        const myChart = this.$echarts.init(chart)
        const option = this.option
        myChart.setOption(option,true)
        window.addEventListener("resize", function() {
          myChart.resize()
        })
      }
  },
  getData(){
    this.$axios.get('user/friendCollect/').then((res)=>{
      this.collectData = res.data.data
     this.option.xAxis.data =  this.collectData.map(v=>v.username)
     this.option.series[0].data = this.collectData.map(v=>v.collect_count)
     console.log(this.option.xAxis.data)
      console.log(this.option.series[0].data)
    })
  }
  
},
created() {
  this.getData()
},
mounted() {
  setTimeout(() => {
     this.getEchartData()  
  }, 1000);
   
  },
}
</script>

<style lang='less'>
.echart{
  margin-top: 20px;
}
</style>