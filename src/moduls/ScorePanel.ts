// 定义表示记分牌的类
class ScorePanel {
    score = 0;      //记录分数
    level = 1;      //等级

    scoreEle: HTMLElement;  //分数元素
    levelEle: HTMLElement;  //等级元素

    maxLevel: number;   //设置一个变量限制等级
    upScore: number;    //设置一个变量表示多少分升级

    constructor(maxLevel=10, upScore=10) {
        // 初始化，获取元素
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;

        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分方法
    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        if(this.score%this.upScore ===0){
            this.levelUp()
        }
    }

    // 设置等级提升的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }
    }
}

export default ScorePanel;

// 测试代码
// const scorePanel = new ScorePanel();
// scorePanel.addScore()
// scorePanel.addScore()
// scorePanel.addScore()
// scorePanel.levelUp()

