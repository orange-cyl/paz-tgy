import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  state:{
  	Meusers:[],
  },
  getters:{
    Meusers:state=>state.Meusers
  },
  mutations:{
  	changeUser(state,data){
      state.Meusers=data.data.data.list
    }
  },
  actions:{
      changeComment(context,params){
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
      getUser(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/busines/pageQuery',params).then((res)=>{
          console.log('======',res.data.data.list)
          context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }
    },
  }
}