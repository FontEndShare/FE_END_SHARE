/** @format */

/**
 * 插入排序
 * 思想：每次排序前都认为左边排好序了，还需要将当前元素插入到对应的位置
 */

let array = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 100, 9, 70];

function SORT(array) {
    for (let index = 1; index < array.length; index++) {
        let cur = index;
        while (array[cur] && cur - 1 >= 0) {
            if (array[cur] > array[cur - 1]) {
                break;
            }
            const t = array[cur];
            array[cur] = array[cur - 1];
            array[cur - 1] = t;
            cur--;
        }
    }
}

SORT(array);

console.log(array);
