// 引入其他的类
import Food from './Food';
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

// 游戏控制器,控制其他的所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive: boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);

        this.init()
    }

    // 游戏的初始化方法，调用后游戏既开始
    init(){
        let that = this;
        document.addEventListener('keydown', this.panhandler.bind(this))
        // 调用run方法，使蛇移动
        that.run()
    }

    /*
    ArrowUp上    up
    ArrowRight右 Right
    ArrowDown下  Down
    ArrowLeft 左 Left
    */
    // 创建一个键盘按下的响应函数
    panhandler(event: KeyboardEvent){
        // 需要检查event.key的值是否合法(用户是否按了正确的按键)
        // 修改direction属性
        this.direction = event.key
    }

    // 创建一个控制蛇移动的方法
    run(){
       /*
        根据方向 (this.direction)来使蛇的位置改发
        向上 top 藏少
        向下 top 增加
        向左 left 藏少
        向右 left 增加
        */
        // 获取蛇现在坐标
        let X = this.snake.x;
        let Y = this.snake.y;
       /* ArrowUp  up
        ArrowRight Right
        ArrowDown  Down
        ArrowLeft  Left*/
        switch (this.direction) {
            case 'ArrowUp':
            case 'up':
                // 向上移动top减小
                Y -= 10;
                break
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break
        }

        // 检查蛇是否吃到食物
        this.checkEat(X,Y)

        // 修改蛇的x和y值
        try {
            this.snake.x = X;
            this.snake.y = Y;
        }catch(e){
           // 进入catch，说明出现了异常，游戏结束，弹出一个提示信息
            alert('蛇头撞了！')

            // 将isLive设置为false
            this.isLive = false
        }

        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level-1) * 30)
    }

    // 定义一个方法，检查蛇是否吃到了食物
    checkEat(X:number,Y:number){
        if(X === this.food.x && Y === this.food.y){
            console.log('吃到食物')
            // 食物的位置要进行重置
            this.food.change()
            // 分数增加
            this.scorePanel.addScore()
            // 蛇要增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl;




















