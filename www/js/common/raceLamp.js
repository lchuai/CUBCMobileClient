var Mar = document.getElementById("Marquee"); 
        var child_div=Mar.getElementsByTagName("div");
        var picH = 30;//移动高度 
        var scrollstep=2;//移动步幅,越大越快 
        var scrolltime=20;//移动频度(毫秒)越大越慢 
        var stoptime=3000;//间断时间(毫秒) 
        var tmpH = 0; 
        Mar.innerHTML += Mar.innerHTML; 
        function start(){ 
            if(tmpH < picH){ 
                tmpH += scrollstep; 
                if(tmpH > picH )tmpH = picH ; 
                Mar.scrollTop = tmpH; 
                setTimeout(start,scrolltime); 
            }
//            else if(tmpH == picH){
//          	return;
//          }
            else{
                tmpH = 0;
                if(child_div[0]==null){
                	return;
                }else{
                	 Mar.appendChild(child_div[0]);
                	 Mar.scrollTop = 0; 
                     setTimeout(start,stoptime);
                }
                 
            } 
        } 
        onload=function(){setTimeout(start,stoptime)}; 
