var oDiv=document.getElementsByTagName("div");
var list=document.getElementsByClassName("floor")[0].getElementsByTagName("li");
let HH=$.win("scrollHeight")-$.win("clientHeight");
let timer=null;
list[list.length-1].setAttribute("_L",0);
list[list.length-1].onclick=fn;
for(let i=0;i<oDiv.length;i++){
    let L=$.offset(oDiv[i]).top;
    list[i].setAttribute("_L",L);
    if(i==oDiv.length-1){
        list[i].setAttribute("_L",HH);
    }
    list[i].onclick=fn;
    /*list[i].onclick=function () {
        let L=$.offset(oDiv[i]).top;
        $.win("scrollTop",L);
    }*/
};
function fn() {
    select(this);
    clearInterval(timer);
    var _L=parseFloat(this.getAttribute("_L"));
    var H=$.win("scrollTop");
    if(H>_L){
        timer=setInterval(()=>{
            H-=5;
            $.win("scrollTop",H);
            if(H<=_L){
                clearInterval(timer);
            }
        },20)
    }else{
        timer=setInterval(()=>{
            H+=5;
            $.win("scrollTop",H);
            if(H>=_L){
                clearInterval(timer);
            }
        },20)
    }
};
function select(curEle){
    for(let i=0;i<list.length;i++){
        list[i].className="";
    };
    curEle.className="select";
}
let winH=$.win("clientHeight");
window.onscroll=function(){
    let T=$.win("scrollTop");
    for(let i=0;i<list.length-1;i++){
        let _L=list[i].getAttribute("_L");
        let L=list[i+1].getAttribute("_L");

        if(T>=_L-winH/2&&T<=L-winH/2){
            select(list[i]);
        }
        if(T>=$.offset(oDiv[8]).top-winH/2){
            select(list[8])
        }
    }
}
