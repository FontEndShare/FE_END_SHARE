function red() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("red");
            resolve();
        }, 1000);
    });
}
function green() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("green");
            resolve();
        }, 1000);
    });
}
function yellow() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("yellow");
            resolve();
        }, 1000);
    });
}

async function run() {
    await red();
    await green();
    await yellow();
    run();
}

run();
