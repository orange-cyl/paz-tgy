<!--公告信息-->
<template>
  <div id="newsDetails">
    <div class="readDiv">
      <div class="readContent">
        <div class="newsTitle">
          <div style="float:right;margin-right:50px;">
            {{newsDetailsData.site?newsDetailsData.site.name:''}}&nbsp; &nbsp; &nbsp;发布时间：{{newsDetailsData.checkTime | dateParse}}
          </div>
          <div>{{newsDetailsData.title}}</div>
        </div>
        <div class="newsContent">
          <div v-html="newsDetailsData.contentSource"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import service from '@/utils/request'
import config from '@/http/config';
export default {
  name: 'newsDetails',
  data(){
    return {
      newsDetailsData:{},
    };
  },
  computed: {

  },
  created(){
    service.get('/notice/findVMById', {params:{id:this.$route.query.id}}).then((data) => {
      if(data.status==200){
        this.newsDetailsData = data.data.data;
      }else{
        config.errorTitle(this,data.status,'查找失败');
      }
    }).catch(() => {
      this.$notify({title:'失败',type: 'error', message: '查找失败!'});
    })
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
  #newsDetails{
    font-size:16px;
    .readDiv{
      .readContent{
        padding:20px;
        .newsTitle{
          text-align: center;
          border-bottom:2px solid #e6e6e6;
          padding-bottom:10px;
        }
      }  
    }
  }
</style>
