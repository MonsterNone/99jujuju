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
        alert("任务入口不存在");
        exit();
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
        alert("店铺入口不存在");
        exit();
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
        toast("猫币入口不存在");
        return false;
    }
}

function loopMain() {
    if (!task) {
        findTask();
    }
    if (checkTask()) {
        click(task[0], task[1]);
        sleep(1500);
    }
    
    if (!shop) {
        findShop();
    }
    if (checkShop()) {
        click(shop[0], shop[1]);
        sleep(1500);
    }
    
    sleep(15000);

    if (!miao) {
        findMiao();
    }
    
    if (checkMiao()) {
        click(miao[0], miao[1]);
        sleep(1500);
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
    sleep(1500);
}

for (let i = 0; i < 50; i++) {
    toast("第" + (i + 1) + "个店铺");
    loopMain();
}

alert("完成！")