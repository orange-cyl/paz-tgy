<template>
	<div class="index">
		<!-- 首页顶部 -->
		<div class="index-top">
			<el-row :gutter="20">

			  <el-col :span="6"><div class="grid-content" style="background-color:#63B8FF;padding-left:20px;padding-right:10px;">
			  	<div class="index-top-inner" style="color:white;">
			  		<span>账户余额：元</span>
			  		<br>
			  		<br>
			  	    <span>累计赚取：元</span>
			  	</div>
			  </div></el-col>
			  <el-col :span="6"><div class="grid-content" style="background-color:#28B779;padding-left:20px;padding-right:10px;">
			  	<div class="index-top-inner" style="color:white;"> 
			  		<span>累积邀请商家:家</span>
			  		<br>
			  		<br>
			  	    <span>商家累积发单:单</span>
			  		<br>
			  	</div>
			  </div></el-col>
			  <el-col :span="10"><div class="grid-content" style="background-color:#836FFF;padding-left:20px;padding-right:10px;">
          <div class="index-top-inner" id="last" style="color:white;">
            <span>您的邀请码是：</span>
     
            <span>1234567</span>
            <br>
            <br>
              <span>您的邀请链接是：</span>
         
              <span>www.domain.com</span>
            <br>
          </div>
        </div></el-col>
			
			</el-row>
		</div>
     <div class="readDiv" style="">
     <!--  <div class="readTitle" style="color:black;">今日必读</div> -->
      <div class="readContent">
        <el-tabs v-model="activeName">
          <el-tab-pane label="推广员公告" name="news">推广员公告
            <div class="itemDiv" v-for="(item,index) in newsData" :key="index" @click="findNewsById(item.id)">
              <div>（{{index+1}}）{{item.title}}</div>
              <div>{{item.checkTime | dateParse}}</div>
            </div>
            <div class="indexCenter-page">
              <el-pagination small background @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
	</div>
</template>
<script>
import service from '@/utils/request'
import config from '@/http/config';
  export default{
     name: 'Index',
    data() {
      return {
        currentPage:1,
         total:0,
          activeName:'news',
          newsData:[],
      }
    },
    created(){
      this.findNewsByBusinessId()
    },
    methods:{
       /* 通过商家id查找公告 */
    findNewsByBusinessId(page){
      let obj = {
        page:page?(page-1):(this.currentPage-1),
        pageSize:5,
        // business_id:this.userId,
        /* receiver:'business' */
      };
      service.get('/notice/pageQuery', {params:obj}).then((data) => {
        if(data.status==200){
          this.newsData = data.data.data.list;
          this.total = data.data.data.total;
        }else{
          config.errorTitle(this,data.status,'查找失败');
        }
      }).catch(() => {
        this.$notify({title:'失败',type: 'error', message: '查找失败!'});
      })
    },
    /* 通过id查找公告 */
    findNewsById(id){
      this.$router.push({path: '/newsDetails', query:{id:id}});
    },
        /* 公告分页页数更改之后 */
    handleCurrentChange(val) {
      this.findNewsByBusinessId(val);
    },
    }
  }
</script>
<style lang="scss" scoped>
.grid-content[data-v-1badc801] {
    min-height: 160px;
   
}
    .itemDiv{
      color:#909090;
      font-weight: bold;
      padding:7px 10px;
      cursor: pointer;
      overflow: hidden;
      &:hover{
        color:#409EFF;
      }
      &>div:first-child{
        float:left;
      }
      &>div:last-child{
        float:right;
      }
    }
    .readDiv{
     
      width:89%;
      margin-left:20px;
      border:1px solid #e6e6e6;
      .readTitle{
        border-bottom:1px solid #e6e6e6;
        padding:15px;
        font-weight: bold;
        background:#F7F8FA;
      }  
      .readContent{
        font-size:12px;
        padding:10px 20px;
      }  
      
    }
    .indexTask{
      border:1px solid #e6e6e6;
      margin-top:10px;
      .taskTitle{
        border-bottom:1px solid #e6e6e6;
        padding:15px;
        font-weight: bold;
        background:#F7F8FA;
      } 
      .taskContent{
        padding:10px 20px;
        .orderManage-table{
          margin-top:5px;
        }
      } 
    }
    .indexCenter-page{
      margin-top:10px;
      margin-left:10px;
    }
.card_content{
  width:100%;
  height:200px;
  margin-top:50px;
  padding-top:50px;
  padding-left:30px;
  font-size:18px;
  line-height:50px;
}
.card{
   width:800px;
   height:300px;
   border:1px solid #FFB748;
   background-color:#FFB748;
   box-shadow: 0 2px 2px rgba(0, 0, 0, .12), 0 0 10px rgba(0, 0, 0, .04);
   margin:0 auto;
  border-radius: 6px;

}
.index {
  margin: 1em;
  background: #FFFFFF;
  border-radius: 3px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  overflow: hidden;
  min-height: calc(100vh - 84px);
  color: #fff;
}

.index .index-top {
  min-height:100px;
  overflow: hidden;
  padding: 1em;
}
.index-bottom {
  min-height:550px;
  overflow: hidden;
  padding: 1em;
  margin-top: 20px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 180px;
    overflow: hidden;
    position: relative;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .index-top-inner{
  	width: 180px;
  	height: 80px;
  	margin: 0 auto;
  	margin-top: 50px;
    
  }
  #last{
    width: 100%;
    height:110px;
    margin-left:20px;
  }
  .index-content{
    margin-top: 30px;
    height: 30px;
    text-align: right;
  }
</style>
