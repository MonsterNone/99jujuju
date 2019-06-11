let shops = []

function ten_shop() {
    // 两边
    for (let x = 1; x <= 5; x += 3) {
        for (let y = 2; y <= 7; y += 2) {
            shops.push([1080 / 5 * x, 1920 / 8 * y]);
        }
    }
    // 中间
    for (let y = 1; y <= 7; y += 2) {
        shops.push([1080 / 2, 1920 / 8 * y]);
    }
}

function click_shop() {
    let miao = [955, 1095];
    let get = [550, 1300];
    shops.forEach(shop => {
        sleep(1500);
        longClick(shop[0], shop[1]);
        click(shop[0], shop[1]);
        sleep(18000);
        click(miao[0], miao[1]);
        sleep(1000);
        click(get[0], get[1]);
        sleep(1000);
        back();
    });
}

ten_shop();
click_shop();
alert("完成！");
