// 定义食物类 Food
class Food {
    element: HTMLElement;

    constructor() {
        // 获取页面中的food元素,并将其赋值给element
        // ts检查元素可能为空，加！表示不可能为空，不加报红色波浪线
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物 x 抽坐标的方法
    get x(){
        return this.element.offsetLeft;
    }

    // 定义一个获取食物 y 抽坐标的方法
    get y(){
        return this.element.offsetTop;
    }

    // 修改食物的位置
    change(){
        // 生成随机的位置
        // 食物最小位置是0 最大位置是290，单位10
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';

    }
}

export default Food;

// 测试代码
// const food = new Food()
// food.change()
// console.log(food.x, food.y);