/*


转载注明出处
作者: @𝐃𝐃
=========================================


下载链接🔗https://bbc.iboxpay.com/ht-ka/#/invited-receive-cash/help-friend-h5?qrcode=1348511657509240832
=========================================

说明:

笑谱APP 看视频可以获得金币兑换现金

圈x获取不到ck就把body改成header

打开软件签到获取ck 签过到可能获取不到ck

⚠️1个ck  看视频

定时建议2分钟左右自己设置


=========================================



一共1个cookie 



=========================================
surge:本地
签到获取ck
笑谱APP = type=http-request,pattern=^https:\/\/veishop\.iboxpay\.com\/*,requires-body=1,max-size=0,script-path=xiaopusign.js




=========================================
圈x:本地
签到获取ck
^https:\/\/veishop\.iboxpay\.com\/* url script-request-body xiaopusign.js

 



=========================================
loon:本地
签到获取ck
http-request ^https:\/\/veishop\.iboxpay\.com\/* script-path=xiaopusign.js, requires-body=true, timeout=10, tag=笑谱APP





=========================================
小火箭:本地
签到获取ck
笑谱APP = type=http-request,script-path=xiaopusign.js,pattern=^https:\/\/veishop\.iboxpay\.com\/*,max-size=131072,requires-body=true,timeout=10,enable=true





MITM= veishop.iboxpay.com
=========================================



*/




















const DD ='笑谱APP';

const $ = new Env(DD);
$.idx = ($.idx = ($.getval('xiaopuSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符

const logs=0;//设置0关闭日志,1开启日志

const log=0;//0关闭系统日志,1开启系统日志,和系统通知不要一起打开,关闭系统通知就要打开,系统日志


let noNolog = ($.getval('noNolog') || '0');//1关闭系统通知,0打开系统通知



let dd = "" //
let score = 0;



const iboxpayheaderArr = [];
const iboxpaybodyArr = [];





let iboxpayheader = $.getdata('iboxpayheader');
let iboxpaybody = $.getdata('iboxpaybody');



iboxpayheaderArr.push($.getdata("iboxpayheader"));
iboxpaybodyArr.push($.getdata("iboxpaybody"));


 // boxjs中设置多账号数
  let xiaopuCount = ($.getval('xiaopuCount') || '1') - 0;
  for (let i = 2; i <= xiaopuCount; i++) {
    if ($.getdata(`iboxpayheader${i}`)) {	
iboxpayheaderArr.push($.getdata(`iboxpayheader${i}`));

iboxpaybodyArr.push($.getdata(`iboxpaybody${i}`));


    }
  }

!(async () => {
if (typeof $request != "undefined") {
    await xiaopusign()
  } else{

if (!iboxpayheaderArr[0]) {
    $.msg($.name, '运行前需要获取cookie点击前往\n', 'https://bbc.iboxpay.com/ht-ka/#/invited-receive-cash/help-friend-h5?qrcode=1348511657509240832', {"open-url": "https://bbc.iboxpay.com/ht-ka/#/invited-receive-cash/help-friend-h5?qrcode=1348511657509240832"});
    return;
  } else {console.log(`\n************ 脚本共${iboxpayheaderArr.length}个${$.name}账号  ************\n`
  );
  console.log(`\n============ 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})}  =============\n`)}

  for (let i = 0; i < iboxpayheaderArr.length; i++) {
if(iboxpayheaderArr[i]){
    iboxpayheader = iboxpayheaderArr[i];
    iboxpaybody = iboxpaybodyArr[i];

     $.index = i + 1;
console.log(`\n开始【${$.name}${$.index}】\n`) 
}
    await iboxpay();
    await Coin();
    await profit();
    await Msg();

}

}
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())






function iboxpay(timeout=0) {
  return new Promise((resolve) => {

    setTimeout( ()=>{
      let Url = {
        url : `https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json`,
        headers : JSON.parse(iboxpayheader),
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.iboxpay = data;
if($.iboxpay.resultCode==1)
console.log("...开始执行【"+$.iboxpay.data.customerInfo.nickname+"】账号任务...\n")

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}


function Coin() {
  return new Promise((resolve) => {
for (let i = 0; i < 5; i++) {
   $.index = i + 1;

    setTimeout( ()=>{
      let Url = {
        url : `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_gold_coin_by_video.json`,
        headers : JSON.parse(iboxpayheader),
        body: iboxpaybody,
     
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
      
          if(logs==1)console.log(data)
          $.complete = data;
if($.complete.resultCode== 1){
console.log('开始第'+(i+1)+'次阅读视频+'+$.complete.data.goldCoinNumber+"金币,请等待20s\n") 

score += $.complete.data.goldCoinNumber;}
await $.wait(90000);
dd+=('','',`本次共完成${$.index}次阅读,共计获得${score}个金币,阅读结束\n`)
if($.complete.resultCode== 0)
console.log($.complete.errorDesc+'\n');
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },i*20000)
}
  })
}





 
function profit(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let Url = {
        url : `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/balance.json?source=WX_APP_KA_HTZP`,
        headers : JSON.parse(iboxpayheader),
     
      }
      $.get(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.profit = data;
if($.profit.resultCode== 1)
dd+= "金币查询,现金约"+(Number($.profit.data.balanceSum)/100).toFixed(2)+"元💸"+",今日"+$.profit.data.coinSum+"💰金币\n";

        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}






function Msg() {

if(log==1)console.log(dd)


 if(noNolog==0)$.msg($.name,"",dd)

}









function xiaopusign() {


if($request.url.indexOf("give_gold_coin_by_video") > 0&&$request.body.indexOf("isFinishWatch") > 0){
    
 const iboxpayheader = JSON.stringify($request.headers);
if(iboxpayheader)
$.setdata(iboxpayheader,"iboxpayheader" + $.idx);
const iboxpaybody = $request.body;
if(iboxpaybody)
    $.setdata(iboxpaybody,"iboxpaybody" + $.idx);
 $.msg($.name + $.idx,"","[获取看视频数据]✅成功");}



}





























function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
