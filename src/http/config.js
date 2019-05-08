//@author liuyr
import Highcharts from 'highcharts';
Highcharts.setOptions({ 
  // 设置Highcharts中的时间少8小时
  global:{useUTC:false},
  lang: {
    resetZoom : '重置比例',
    // highcharts中的暂无数据的显示
    noData:'暂无数据'
  }
})
// 获取当天时间段
let time = function(){
  let time = new Date();
  let now = time.getTime();
  let today = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
  return([today,today]);
};
// 获取本月时间段
let month = function(){
  let time = new Date();
  let monthStart = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+1;
  let MonthNextFirstDay = new Date(time.getFullYear(),time.getMonth()+1,1);     
  let MonthLastDay = new Date(MonthNextFirstDay-86400000);     
  let M = Number(MonthLastDay.getMonth())+1;
  return [monthStart,MonthLastDay.getFullYear()+"-"+M+"-"+MonthLastDay.getDate()];
};
// 获取本年时间段
let year = function(){
  let time = new Date();
  let year = time.getFullYear();
  let start = year+'-'+1+'-'+1;
  let end = year+'-'+12+'-'+31;
  return [start,end];
};
/* 将年月日处理成时间戳 */
let passToStartDate = function(value){
  //value是一个年月日时间字符串
  return Date.parse(new Date(value+' 00:00:00'));
}
let passToEndDate = function(value){
  //value是一个年月日时间字符串
  return Date.parse(new Date(value+' 23:59:59'));
}
/* 异常提示 */
let errorTitle = function(status,message){
  if(status!=200){
    this.$notify({title:'失败',type: 'error', message: message});
    return;
  }
}
export default {
  passToStartDate,
  passToEndDate,
  time,
  month,
  year,
  errorTitle
};