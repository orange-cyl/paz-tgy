<template>
  <div class="account">
    <div class="staffManage-title">资金明细</div>
    <!-- 搜索框 -->
   <div class="staffManage-option">
      <div class="searchOption">
        <div class="staffManage-option">
      <div class="searchOption">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        
        <div>
         <el-select size="mini" v-model="searchObj.type" placeholder="类型" clearable>
            <el-option
              v-for="item in typeFilter"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
           <!-- <el-input size="mini" v-model="searchObj.type" title="类型" placeholder="类型" clearable></el-input> -->
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.id"  title="收益所属订单" placeholder="收益所属订单" clearable></el-input>
        </div> 
         <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>    
      </div>
    </div>
        
      </div>
    </div>
    <!-- 表格 -->
    <el-table border :data="Acinformation" size="mini" style="width: 100%">
      <!-- <el-table-column type="selection" /> -->
      <el-table-column align="center" prop="transactionTime" label="交易时间">
          <template slot-scope="scope">
              <div>{{scope.row.transactionTime | dateParse}}</div>
          </template>
        </el-table-column>
      <el-table-column prop="type" label="类型" align="center" />

      <el-table-column label="收益所属订单" align="center" width="100">
       <template slot-scope="scope">
              <div v-if="scope.row.type == '订单利润'">{{scope.row.orderId}}</div>
          </template>
      </el-table-column>
      <el-table-column prop="transactionMoney" label="交易金额" align="center" />
      <el-table-column prop="balance" label="账户余额" align="center" />   
     <!-- <el-table-column align="center" prop="orderId" label="收益所属订单"></el-table-column> -->
     <el-table-column label="备注" align="center" width="200" fixed="right" style="position:relative;">
        <template slot-scope="scope">
        <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.comment"  class="iconDiv" > {{scope.row.comment}}<span style="color:blue;cursor: pointer;position:absolute;right:10px;" @click="toNote(scope.row)">备注</span></div>
       
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="comment" label="备注"></el-table-column> -->
      <!-- <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <span class="el-dropdown-link" @click="details(row.num)">详情</span>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 备注模态框 -->
    <el-dialog center title="备注" :visible.sync="noteVisible" width="50%" position="middle">
      <div class='dialogCenter'>
        <el-form v-model="form" ref="forbiddenForm" name="form">
          <div class="row">
            <div class="col-sm-6">
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea" placeholder="请输入备注原因" v-model='form.comment'>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class='dialogBottom' text-align='right'>
        <el-button size='mini' @click="handleForbiddenCancle">取消</el-button>
        <el-button size='mini' type='primary' @click="dialogForbiddenSubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
     <div class="accountManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
 
  </div>
</template>
<style>
.searchOption div{
  float: right;
  margin-right: 10px;
  margin-bottom: 5px;
}
  .el-pagination{
	margin-top: 2em;
}
.staffManage-title {
  /*margin-top: 5px;*/
      margin-bottom:10px;
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
 .account .staffManage-title {
  color: black;
 }
.account {
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
  /*position: relative;*/
}
.el-dropdown-link{
	cursor: pointer;
	color: #409EFF;
}
</style>
<script type="text/javascript">
import {mapActions,mapGetters,mapMutations} from 'vuex';
import config from '@/http/config'
export default {
  data() {
    return {
      formLabelWidth: '100px',
      
      form: {comment:''},
      typeFilter:[
        '订单利润',
        '推广员提现'
      ],
      noteVisible: false,
       pagesize:10,
      /* 当前页 */
      page:0,
      total:10,
      // 搜索数据
      searchObj:{
      },
      tableData: [{
        num: 1,
        allMoney: '108',
        lastMoney: '1000',
        tradingTime: '2019-03-05',
        belongOrder: '12345',
        note: '无',
      }, {
        num: 1,
        allMoney: '108',
        lastMoney: '1000',
        tradingTime: '2019-03-05',
        belongOrder: '12345',
        note: '无',
      }, {
        num: 1,
        allMoney: '108',
        lastMoney: '1000',
        tradingTime: '2019-03-05',
        belongOrder: '12345',
        note: '无',
      }]
    }
  },
   watch:{
    page:function(now,old) {
      this.loadAllAccount();
    }
  },
  created(){
    this.loadAllAccount()
  },
  computed:{
    ...mapGetters(['Acinformation','siteId','agentId']),
    },
  methods: {
    ...mapActions(['getInformation','changenote']),
     // 模态框点击确定
    dialogForbiddenSubmit() {
      // let obj={
          
      //       id:this.form.id,
      //       comment:this.form.comment
          
      //    }
      //    console.log("11111",obj)
       this.changenote(this.form).then(r=>{
        // console.log('mmm',r.data)
        if(r.data.status == 200){
           this.$notify({
            title: '提交成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        this.loadAllAccount()
      }else{
        this.$notify.error({
            title: '提交失败',
            message: '这是一条错误的提示消息'
          })
      }
          
      }).catch(() => {
          this.$notify.error({
            title: '提交失败',
            message: '这是一条错误的提示消息'
          })
        })
      this.form = {}
      this.noteVisible = false;
    },
     // 模态框点击取消
    handleForbiddenCancle() {
      this.form = {}
      this.noteVisible = false;
    },
    
 // 显示备注模态框
    toNote(row) {
     this.form = {
      id:row.id
     }
      this.noteVisible = true
    },
 handleSearch() {
       this.page = 0
     let obj={
         
            page: this.page,
          pageSize: this.pagesize,
          orderId:this.searchObj.id,
          type:this.searchObj.type,
          agentId:this.agentId,
          // siteId:this.siteId,
           beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          
         }
           for(let key in obj){
        if(!obj[key]&&obj[key]!==0){
          delete obj[key];
        }
      }
         this.getInformation({params:obj}).then(r => {
        this.total = r.data.data.total
      })    
    },
    /* 分页页数更改之后 */
    handleCurrentChange(val) {
     this.page = val - 1
    },
    // 加载所有的账户信息
    loadAllAccount(){
       let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          agentId:this.agentId,
          // siteId:this.siteId,
          }
         }
      this.getInformation(obj).then(r=>{
          this.total = r.data.data.total
        })
    },
    // 导出
     exportInformation() {
      this.$confirm('确认要导出么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        // this.url = 'http://192.168.50.50:10000/api_alarm/export_alarm_list/?'
        // window.location.href = this.url
        this.$notify({
          title: '成功',
          message: '正在下载...',
          type: 'success'
        })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          message: '已取消'
        })
      })
    },
  }
}

</script>
