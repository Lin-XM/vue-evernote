export function friendDate(dateStr) {
    let dataObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
    let time = dataObj.getTime()
    let now = Date.now()
    let spaceTime = now - time
    let str

    switch (true) {
        case spaceTime < 1000 * 60:
            str = '刚刚'
            break
        case spaceTime < 1000 * 60 * 60 :
            str = Math.floor(spaceTime / (1000 * 60)) + '分钟前'
            break
        case spaceTime < 1000 * 60 * 60 * 24:
            str = Math.floor(spaceTime / (1000 * 60 * 60)) + '小时前'
            break
        default:
            str = Math.floor(spaceTime / (1000 * 60 * 60 * 24)) + '天前'

    }
    return str
}