const t=()=>{let s="",e=new Date().getHours();return e>=0&&e<4||e>=18&&e<=23?s="晚上":e>=4&&e<10?s="早上":e>=10&&e<14?s="中午":e>=14&&e<18?s="下午":s="获取时间错误！",s};export{t as g};
