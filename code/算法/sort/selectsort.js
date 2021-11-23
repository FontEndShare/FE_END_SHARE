/** @format */

// 选择排序
/**
 * 每次将最小（最大）的数放在最前（最后）面，在剩余的中找到最小数或者最大数，
 * 放到已经排好的顺序的末尾；
 * */

function selectSort(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (arr.length === 1) return arr;
    let minIndex = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            minIndex = arr[j] > arr[minIndex] ? minIndex : j;
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}

let arr = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 100, 9, 70];
// bubbleSort(arr);
console.log("selectSort(arr)", selectSort(arr));
