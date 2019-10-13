let $slides = $('#slides')
let $buttons = $('ul>li')
let $tran = $('ul>li>div')
var n = 0

listenEvents()

let timer = setInterval(() => {
    goToSlides(n)
    n += 1
    if (n > 3) {
        n = 0
    }
}, 2000);


$('.slides').on('mouseenter', function () { //鼠标状态反应
    window.clearInterval(timer)
})


$('.slides').on('mouseleave', function () {
    timer = setInterval(() => {
        goToSlides(n)
        n += 1
        if (n > 3) {
            n = 0
        }
    }, 2000);
})

document.addEventListener('visibilitychange', function () {
    if (this.visibilityState === 'hidden') {
        window.clearInterval(timer)
    } else {
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
        let eq = $(e.currentTarget).index()
        n = eq  //缺少这个赋值会导致点击按钮后自动播放的下一张乱跳
        goToSlides(eq)
    })
}

function goToSlides(index) {
    $slides.css({ transform: `translateX(-${index * 920}px)` })
    $buttons.eq(index).addClass('active').siblings().removeClass('active')
    $tran.eq(index).addClass('show')
    $buttons.eq(index).siblings().children('.tran').removeClass('show')
}


