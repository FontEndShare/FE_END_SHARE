/** @format */

// 冒泡排序
// 相邻的两个数比较比较大小，前一个数，比后一个数大，
// 交换位置，进行下一步比较，如此循环，直到这一轮中，最大的数排到最后，
// 重复上述步骤，直到所有的数比较完毕

function bubbleSort(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (arr.length === 1) return arr;
    for (let i = 0; i < arr.length - 1; i++) {
        // 外层循环，保证所有数都能进行比较
        for (let j = 0; j < arr.length - 1 - i; j++) {
            // 内层循环，两个相邻的数进行比较；
            // 比较的数据，每一次循环会少一个，因为每一次内层循环都会将，最大的数放到最后
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
