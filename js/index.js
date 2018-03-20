/**
 * Created by Administrator on 2017/7/30.
 */

function gleft(x) {
    var ele = document.getElementById(x);
    var i = parseInt( ele.style.left );
    var w = document.getElementById(x).clientWidth;
    (function fn(){
        if(i > -(w/2)){
            i -= 10;
            ele.style.left = i+"px";
            var stime=setTimeout(fn,5);
        }
    }())
}
function ggleft(x) {
    return function(){
        gleft(x);
    }
}

function gright(x) {
    var ele = document.getElementById(x);
    var i = parseInt( ele.style.left );
    i -= i%10;                                  //滚动越界bug = =i可能不是10的整倍数 为了对应i每次+10 取整10正好可以为0
    (function fn() {
        if (i < 0) {
            i += 10;
            ele.style.left = i + "px";
            setTimeout(fn, 5);
        }
    }())
}
function ggright(x) {
    return function() {
        gright(x);
    }
}


function lunbo(ele,time) {
    var elet = document.getElementById(ele);            //操作对象1
    var oldl = parseInt( elet.style.left );             //起始位置
    var w = elet.clientWidth;                           //移动距离
    var le = w / 8;                                     //每次移动距离
    var runtime = setInterval(scr,time)                 //初始化计时器

    document.addEventListener("visibilitychange",handlevisibilitychange, false); //监听visibilitychange
    function handlevisibilitychange(){
        if(document.hidden){                                              //页面不可见移除计时器
            window.clearInterval(runtime);
        }else {                                                           //页面可见开始计时器
            runtime = setInterval(scr,time);
        }
    }

    function scr() {
        if (oldl > -w / 2) {                               //判断位置
            srcc(oldl,oldl -= le);                         //传递移动前后的位置
        }
        else {                                             //恢复初始位置
            gright(ele);
            oldl = 0;
        }
        function srcc(oldl, newl){
            if(newl < oldl) {
                oldl -= 1;
                elet.style.left = oldl + 'px';
                setTimeout( _srcc(oldl, newl), 5);
            }
        }
        function _srcc(oldl, newl) {
            return function(){
                srcc(oldl,newl)
            }
        }
    }
}

