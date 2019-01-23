let $buttons=  $('#wrapperbuttons>div')
//console.log($buttons)
let $slides = $('#slides')
let $imges = $slides.children('img')
//console.log($imges)
let current =0

initSlides()
$slides.css({transform:'translateX(-600px)'}) //为了将复制的第三张放到合适的位置
listenEvents()

let time = setInterval(function(){
    goToSlides(current+1) 
},3000)

$('.container').on('mouseenter',function(){ //鼠标状态反应
    window.clearInterval(time)
}).on('mouseleave',function(){
    time = setInterval(function(){
        goToSlides(current+1) 
    },3000)
})

document.addEventListener('visibilitychange',function(){//这段是浏览器查看其它页面时，轮播保持切换页面前的状态
    if(this.visibilityState==='hidden'){  //在页面切换回来之后接着之前的图片往后播
        window.clearInterval(time)
    }else{
        time = setInterval(function(){
            goToSlides(current+1) 
        },3000)
    }
})


function listenEvents(){
    $('#wrapperbuttons').on('click','div',function(e){ //这里的button是被委托的事件监听
        let $button =$(e.currentTarget)      //
        let index = $button.index()
        $(e.currentTarget).addClass('active').siblings().removeClass('active')
       // console.log(current,index)
       goToSlides(index)
    })
}

function goToSlides(index){   //这个if语句本是写在listenEvents()里的，单独拿出来是方便后续操作，index这个值必须传进来
    if(index> $buttons.length -1){//这段是为了给上一张和下一张这两个按钮一个限制
        index=0
    }else if(index<0){
        index=$buttons.length -1
    } 
    if(current===$buttons.length-1 && index===0){
       
        $slides.css({transform:`translateX(${-($buttons.length+1 )*600}px)`})
          .one('transitionend',function(){
            $slides.hide().offset()  //当hide（）和show（）冲突的时候用这个来
            $slides.css({transform:`translateX(${-(index +1)*600}px)`}).show()
        })
      }else if(current===0 && index===$buttons.length-1){
       
        $slides.css({transform:`translateX(${0}px)`})
        .one('transitionend',function(){
          $slides.hide().offset()
          $slides.css({transform:`translateX(${-(index +1)*600}px)`}).show()  
      })
      }else{
       
        $slides.css({transform:`translateX(${-(index +1)*600}px)`})
      }  
      current = index
    
    }

function initSlides(){  //初始化图片
    let $firstCopy=$imges.eq(0).clone(true)
    //console.log($firstCopy)
    let $lastCopy =$imges.eq($imges.length-1).clone(true)
    //console.log($lastCopy[0].outerHTML)//打印出整体 
    $slides.append($firstCopy) //将$firstCopy添加到最后
    $slides.prepend($lastCopy)//将$firstCopy添加到最前
}
