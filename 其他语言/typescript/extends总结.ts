// 1.接口继承
interface T1 {
    name: string;
}

interface T2 extends T1 {
    sex: number;
}

//2.条件判断:如果extends前面的类型能够赋值给extends后面的类型，那么表达式判断为真，否则为假。

type A = "x" extends "x" | "y" ? number : string;
type A2 = "x" | "y" extends "x" | "y" ? number : string;
type A3 = ["x" | "y"];

/**
 * 3.泛型用法:
 *   3.1遵循分配律
 *   3.2若要防止分配，可以使用[]
 *   3.3特殊的never类型，根据分配律返回的也是never类型
 */

type P<T> = T extends "x" ? string : number;
type A4 = P<"x" | "y">;

type P1<T> = [T] extends ["x"] ? string : number;
type A5 = P1<"x" | "y">;

type A6 = P<never>;

//4.约束泛型参数
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type A7 = MyPick<T2, "name" | "sex">;
