let $slides = $('#slides')
let $buttons = $('ul>li')
let $tran = $('ul>li>div')
let n = 0
listenEvents()

let timer = setInterval(() => {
    goToSlides(n)
    n += 1
    if (n > 3) {
        n = 0
    }
}, 2000);


$('.window').on('mouseenter', function () { //鼠标状态反应
    window.clearInterval(timer)
})


$('.window').on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlides(n)
        n += 1
        if (n > 3) {
            n = 0
        }
    }, 2000);
})
document.addEventListener('visibilitychange',function(){
    if(this.visibilityState==='hidden'){
        window.clearInterval(timer)
    }else{
        timer = setInterval(() => {
            goToSlides(n)
            n += 1
            if (n > 3) {
                n = 0
            }
        }, 2000);
    }
})


function listenEvents() {
    $buttons.on('click', function (e) {
        let index = $(e.currentTarget).index()
        goToSlides(index)
        // n = index
    })
}

function goToSlides(index) {

    $slides.css({ transform: `translateX(-${index * 920}px)` })
    $buttons.eq(index).addClass('active').siblings().removeClass('active', 'show')
    $tran.eq(index).addClass('show')
    // $buttons.eq(index).siblings().children('.tran').removeClass('show')
}


