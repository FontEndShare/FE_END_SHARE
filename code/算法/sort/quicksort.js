/**@format */

/**
 * 快速排序
 * 思想：每次选择一个base(通常选择最左边的开始作为base)，将小于base的放到左边，将大于base的放到右边
 */

let arr = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 100, 9, 70];

function SORT(l, r) {
    if (l < r) {
        const p = PARTITION(l, r);
        SORT(l, p - 1);
        SORT(p + 1, r);
    }
}

function PARTITION(l, r) {
    const base = arr[l];
    while (l < r) {
        while (base <= arr[r] && l < r) {
            r--;
        }
        if (base > arr[r]) {
            arr[l] = arr[l];
        }
        while (base >= arr[l] && l < r) {
            l++;
        }
        if (base < arr[l]) {
            arr[r] = arr[l];
        }
    }
    arr[l] = base;
    return l;
}

SORT(0, arr.length - 1);

console.log(arr);
