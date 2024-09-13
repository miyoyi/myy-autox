const MyClick = (str) => {
    var meButton = text(str).findOnce() || textContains(str).findOnce()
    if (meButton != undefined) {
        while (!meButton.clickable()) {
            meButton = meButton.parent();
        }
        toastLog('找到了' + str)
        meButton.click()
        return true
    } else {
        return false
    }
}

const CloseAd = (caption) => {
    toastLog('看视频等待20s' + caption)
    sleep(20000)
    if (text('跳过广告').exists()) {
        text('跳过广告').click()
    } else {
        var meButtons = className('android.widget.ImageView').find()
        if (meButtons.empty()) {
            toastLog('没找到关闭按钮╭(╯^╰)╮');
        } else {
            meButtons.some(function (bt) {
                if (bt.clickable()) {
                    bt.click();
                    return true;
                }
            });
        }
    }
    sleep(1000)
    MyClick('我知道了')
    toastLog('看视频结束: ' + caption)
    sleep(1000)
}

const LookAd = () => {
    for (let index = 1; index <= 8; index++) {
        if (MyClick('看视频领福利')) {
            CloseAd('前8次的第' + index + '次')
        }
    }
    for (let index = 1; index <= 3; index++) {
        if (MyClick('看视频')) {
            CloseAd('后3次的第' + index + '次')
        }
    }
    if (MyClick('领奖励')) {
        MyClick('我知道了')
    }

}

const findAndClickAppIcon = (appName) => {
    let elements = descContains(appName).find();
    if (elements.empty()) {
        toastLog('未找到应用图标');
        return false;
    }

    for (let element of elements) {
        if (element.clickable()) {
            element.click();
            toastLog('已点击应用图标');
            return true;
        } else {
            toastLog('找到了应用图标，但无法点击');
            return false;
        }
    }
}

home()
sleep(1000)
const appName = '起点读书'
if (findAndClickAppIcon(appName)) {
    sleep(5000)
    toastLog('启动成功')
    MyClick('我')
    sleep(3000)
    if (MyClick('我知道了')) {
        sleep(1500)
    }
    MyClick('福利中心')
    sleep(3000)
    LookAd()
} else {
    toastLog('启动失败')
}