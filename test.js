//请求截图 
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

const width = device.width;
const height = device.height;

var task;
var shop;
var miao;

function findTask() {
    let temp = images.read("task.JPG");
    let p = findImage(captureScreen(), temp, {
        //region: [width * 0.75, height * 0.75], //搜索区域
        threshold: 0.8
    });
    if (p) {
        //  toast("找到啦:" + p);
        task = [p.x, p.y];
    } else {
        alert("没找到任务入口(初始化)");
        exit();
    }
}

function checkTask() {
    let temp = images.read("task.JPG");
    let p = findImage(captureScreen(), temp, {
        region: task, //搜索区域
        threshold: 0.2
    });
    if (p) {
        //  toast("找到啦:" + p);
        return true;
    } else {
        return false;
    }
}

function findShop() {
    let temp = images.read("go.JPG");
    let p = findImage(captureScreen(), temp, {
        //region: [width * 0.75, height * 0.3], //搜索区域
        threshold: 0.8
    });
    if (p) {
        // toast("找到啦:" + p);
        shop = [p.x, p.y];
    } else {
        alert("没找到店铺入口(初始化)");
        exit();
    }
}

function checkShop() {
    let temp = images.read("go.JPG");
    let p = findImage(captureScreen(), temp, {
        region: shop, //搜索区域
        threshold: 0.2
    });
    if (p) {
        // toast("找到啦:" + p);
        return true;
    } else {
        return false;
    }
}

function findMiao() {
    let temp = images.read("miao.JPG");
    let p = findImage(captureScreen(), temp, {
        //region: [width * 0.75, height * 0.5], //搜索区域
        threshold: 0.8
    });
    if (p) {
        // toast("找到啦:" + p);
        miao = [p.x, p.y];
    } else {
        alert("没找到猫币入口(初始化)");
        exit();
    }
}

function checkMiao() {
    let temp = images.read("miao.JPG");
    let p = findImage(captureScreen(), temp, {
        region: miao, //搜索区域
        threshold: 0.2
    });
    if (p) {
        // toast("找到啦:" + p);
        return true;
    } else {
        return false;
    }
}

function loopMain() {
    var flag;

    if (!task) {
        findTask();
    }
    flag = false;
    for (let j = 0; j < 5; j++) {
        flag = checkTask();
        if (flag) {
            click(task[0], task[1]);
            break;
        }
        sleep(200 * j);
    }
    if (!flag) {
        alert("任务入口不存在");
        exit();
    }

    if (!shop) {
        sleep(1500);
        findShop();
    }
    flag = false;
    for (let j = 0; j < 5; j++) {
        flag = checkShop();
        if (flag) {
            click(shop[0], shop[1]);
            break;
        }
        sleep(200 * j);
    }
    if (!flag) {
        alert("店铺入口不存在");
        exit();
    }

    sleep(10000);

    if (!miao) {
        sleep(6000);
        findMiao();
    }
    flag = false;
    for (let j = 0; j < 5; j++) {
        flag = checkMiao();
        if (flag) {
            click(miao[0], miao[1]);
            sleep(500);
            break;
        }
        sleep(400 * j);
    }
    if (!flag) {
        toast("猫币入口不存在");
    }

    /*
        temp = images.read("get.JPG");
        p = findImage(captureScreen(), temp, {
            region: [width * 0.35, height * 0.5], //搜索区域
            threshold: 0.4
        });
        if (p) {
            // toast("找到啦:" + p);
            click(p.x, p.y);
            sleep(1000);
        } else {
            toast("没找到收下入口");
            //exit();
        }
    */
    back();
}

for (let i = 0; i < 40; i++) {
    toast("第" + (i + 1) + "个店铺");
    loopMain();
}

alert("完成！")