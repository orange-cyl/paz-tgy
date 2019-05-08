<!-- 商户管理 -->
<template>
  <div class="merchants">
    <div class="staffManage-title">我的商家</div>
    <!-- 搜索框 -->
   <div class="staffManage-option">
      <div class="searchOption">
        <div>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.businesId" placeholder="商家ID" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.qq" placeholder="qq" clearable></el-input>
        </div>
        <div>
          <el-input size="mini" v-model="searchObj.telephone" placeholder="手机号" clearable></el-input>
        </div>
        <div>
          <el-date-picker size='mini' v-model="searchObj.searchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <el-table border ref="multipleTable" size="mini" :data="Meusers" tooltip-effect="dark" style="width: 100%">
      <!-- <el-table-column type="selection" /> -->
      <el-table-column prop="id" label="商家ID" align="center" fixed width="120">
      </el-table-column>
      <!-- <el-table-column prop="username" label="商家姓名" align="center" /> -->
      <el-table-column prop="manager.telephone" label="手机号" align="center" width="180" />
      <el-table-column prop="manager.qq" label="QQ" align="center" width="180" />
      <el-table-column prop="historyOrderCount" label="累计放单量" align="center" width="160" />
      <el-table-column prop="finishedOrderCount" label="已完结订单量" align="center" width="170" />
      <el-table-column align="center" prop="registerTime" label="注册时间" width="200">
        <template slot-scope="scope">
          <div>{{scope.row.registerTime | dateParse}}</div>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="200" fixed="right" style="position:relative;">
        <template slot-scope="scope">
        <div style="width:100px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis" :title="scope.row.comment"  class="iconDiv" > {{scope.row.comment}}<span style="color:blue;cursor: pointer;position:absolute;right:10px;" @click="toNote(scope.row)">备注</span></div>
       
        </template>
      </el-table-column>
        <!-- <el-table-column prop="comment" label="备注内容" align="center" /> -->
      <!-- <el-table-column label="备注" align="center" width="200" fixed="right">
        <template slot-scope="scope">
        <div style="color:blue;cursor: pointer;"  class="iconDiv" title="备注" @click="toNote(scope.row)">备注</div>
        {{scope.row.comment}}
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
    <div class="staffManage-page">
      <el-pagination background @current-change="handleCurrentChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total"></el-pagination>
    </div>
    </el-table>
  </div>
</template>
<style>
.searchOption div{
	float: right;
	margin-right: 10px;
	margin-bottom: 5px;
}
  .staffManage-title {
	margin-bottom:10px;
      line-height: 40px;
      border-bottom:3px solid rgb(232, 232, 232);
    }
 .merchants .staffManage-title {
	color: black;
 }
.el-pagination {
	margin-top: 2em;
  
}
.merchants {
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
</style>
<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import axios from '@/http/axios'
import service from '@/utils/request'
import config from '@/http/config'
export default {
  data() {
    return {
      form: {comment:''},
      formLabelWidth: '100px',
      noteVisible: false,
      pagesize: 10,
      /* 当前页 */
      page: 0,
      total: 10,
      // 搜索数据
      searchObj:{
      },
    }
  },
  created() {
    this.loadAllUser();
  },
  computed: {
    ...mapGetters(['Meusers','siteId','agentId']),
  },
  watch: {
    page: function(now, old) {
      this.loadAllUser();
    }
  },
  methods: {
    ...mapActions(['getUser','changeComment']),
    // 模态框点击确定
    dialogForbiddenSubmit() {
      // let obj={
          
      //       id:this.form.id,
      //       comment:this.form.comment
          
      //    }
      //    console.log("11111",obj)
       this.changeComment(this.form).then(r=>{
        // console.log('mmm',r.data)
        if(r.data.status == 200){
           this.$notify({
            title: '提交成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        this.loadAllUser()
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
    // 筛选
    handleSearch() {
    	 this.page = 0
     let obj={
          params:{
            page: this.page,
          pageSize: this.pagesize,
          agentId:this.agentId,
          siteId:this.siteId,
          telephone:this.searchObj.telephone,
          qq:this.searchObj.qq,
          id:this.searchObj.businesId,
           beginTime:this.searchObj.searchTime?config.passToStartDate(this.searchObj.searchTime[0]):'',
        endTime:this.searchObj.searchTime?config.passToEndDate(this.searchObj.searchTime[1]):'',
          // ...this.searchObj
          }
         }
         this.getUser(obj).then(r => {
        this.total = r.data.data.total
      })    
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page - 1
    },
    // 查询所有列表
    loadAllUser() {
      let obj = {
        params: {
          page: this.page,
          pageSize: this.pagesize,
          agentId:this.agentId,
          siteId:this.siteId,
        }
      }
      this.getUser(obj).then(r => {
        this.total = r.data.data.total
      })
    }
  }
}

</script>
