let req = require('request');
let net = require('net');
let fs=require('fs');
let webData = {};
try{webData=JSON.parse(fs.readFileSync("webData.json"));}catch(e){console.log(e);}
let serv = net.createServer((s)=>{
s.on('data',(data)=>{let keepalive=false;
  try{
    let JSONobj = JSON.parse(data);
    switch(JSONobj.g){
      case 'get':{
        let resp=[];
        for(let i=0;i<webData.length;i++){let score=0;
          let info=[webData[i][0],webData[i][1],webData[i][2]];
          if(info[0]==JSONobj.get||info[1]==JSONobj.get)score=1000;
          let split=JSONobj.get.split(" ");
          for(let a=0;a<split.length;a++){
            if(webData[i][2].includes(split[a])){
              score+=1;
            }
            if(webData[i][1].includes(split[a]))score+=1;
          }
          if(score)resp[resp.length]=[score,info];
        }
        
        s.end(JSON.stringify(resp));
      }
      case 'add':{
        
      }
    }
  }catch(e){console.log(e)}
  if(!keepalive)s.end();
});
s.on('error',console.log);
s.on('end',s.destroy);});
serv.listen(7001);
