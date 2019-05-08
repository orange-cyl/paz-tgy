import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  state:{
    // 所有的账户信息
    Acinformation:[],
    
  },
  getters:{
    Acinformation:state=>state.Acinformation,
  
  },
  mutations:{
    // 对其做出改变
    changeInformation(state,data){
      state.Acinformation=data.data.data.list
    }
  },
  actions:{
      changenote(context,params){
        return new Promise((resolve,reject)=>{
        service.post('/busines/comment',params).then((res)=>{
          // console.log('======',res.data.data.list)
          // context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      },
    // 获取所有的账户信息
      getInformation(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/account/query',params).then((res)=>{
          console.log('======',res.data.data)
          context.commit("changeInformation",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }else{
        return new Promise((resolve,reject)=>{
        service.get('').then((res)=>{
          console.log('======',res.data.data)
          // context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }
    },
  }
}