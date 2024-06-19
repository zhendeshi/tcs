class Snake {
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div')
    }

    // 定义一个变量表示蛇头的 x 轴坐标
    get x(){
        return this.head.offsetLeft;
    }

    // 定义一个变量表示蛇头的 y 轴坐标
    get y(){
        return this.head.offsetTop;
    }

    // 设置蛇头 x 轴坐标
    set x(value){
        // 如果新值和旧值相同，则直接返回不再修改
        if(this.x === value) return

        // x值的合法范围是0-290之间
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了，抛出一个异常
            throw new Error('蛇撞墙了！')
        }

        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // console.log('水平方向发生了掉头');
            // 如果发生了掉头，让蛇向反方向继续移动
            if(value > this.x){ //原本向左走
                value = this.x-10
            }else {//原本向游走
                value = this.x+10
            }
        }

        // 移动身体
        this.moveBody()

        this.head.style.left = value + 'px';

        this.checkHeadBody()
    }

    // 设置蛇头 y 轴坐标
    set y(value){
        if(this.y === value) return

        // x值的合法范围是0-290之间
        if(value < 0 || value > 290){
            // 进入判断说明蛇撞墙了
            throw new Error('蛇头撞墙了！')
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.y){
                value = this.y-10
            }else {
                value = this.y+10
            }
        }

        // 移动身体
        this.moveBody()

        this.head.style.top = value + 'px';

        this.checkHeadBody()
    }

    // 蛇增加身体的方法
    addBody(){
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    // 添加一个蛇身体移动的方法
    moveBody(){
    /*
    * 将后边的身体设置为前边身体的位置*/
        for (let i= this.bodies.length-1;i>0;i--){
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头是否撞到身体
    checkHeadBody(){
        // 获取所有身体，检查其是否跟蛇头发生重叠

        for(let i= 1; i<this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.x === bd.offsetLeft && this.y === bd.offsetTop){
                // 进入判断，说明蛇头撞到身体
                throw new Error('蛇头撞身体了！')
            }
        }
    }
}

export default Snake;