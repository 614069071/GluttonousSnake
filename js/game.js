function Game(map, snake, food, block) {
    this.map = map;
    this.snake = snake;
    this.food = food;
    this.block = block;
    this.timer = null;
    this.flag = true;

    this.init();
}

//初始化游戏
Game.prototype.init = function() {
    this.renderMap();
    this.renderBlock();
    this.start();
    this.renderFood();
    this.renderSnake();
    this.bindEvent();
}

//渲染地图
Game.prototype.renderMap = function() {
    this.map.fill();
};

//渲染食物
Game.prototype.renderFood = function() {
    //定义变量，简化书写
    var row = this.food.x;
    var col = this.food.y;
    // this.map.arr[row][col].style.backgroundColor = "red";
    this.map.arr[row][col].style.backgroundImage = "url(" + this.food.src + ")";
};
//渲染蛇
Game.prototype.renderSnake = function() {
    //蛇头
    var head = this.snake.snakeArr[this.snake.snakeArr.length - 1]; //蛇头的坐标
    this.map.arr[head.x][head.y].style.backgroundImage = "url(" + this.snake.head[this.snake.head_index] + ")";
    //蛇身体
    for (var i = 1; i < this.snake.snakeArr.length - 1; i++) {
        //蛇身体的横坐标
        var x = this.snake.snakeArr[i].x;
        //蛇身体的纵坐标
        var y = this.snake.snakeArr[i].y;
        // this.map.arr[x][y].style.backgroundColor = "green";
        var body_pic = this.snake.body[0];
        this.map.arr[x][y].style.backgroundImage = "url(" + body_pic + ")";
    }
    //蛇尾巴
    var tail = this.snake.snakeArr[0]; //蛇尾巴的坐标
    this.map.arr[tail.x][tail.y].style.backgroundImage = "url(" + this.snake.tail[this.snake.tail_index] + ")";
};

//渲染障碍物
Game.prototype.renderBlock = function() {
	for (var i = 0; i < this.block.blockArr.length; i++) {
        //蛇身体的横坐标
        var x = this.block.blockArr[i].x;
        //蛇身体的纵坐标
        var y = this.block.blockArr[i].y;
        this.map.arr[x][y].style.backgroundImage = "url(" + this.block.src + ")";
    }
}

//清屏
Game.prototype.clear = function() {
    for (var i = 0; i < this.map.arr.length; i++) {
        for (var j = 0; j < this.map.arr[i].length; j++) {
            // this.map.arr[i][j].style.backgroundColor = "white";
            this.map.arr[i][j].style.backgroundImage = "none";
        }
    }
};

//游戏开始
Game.prototype.start = function() {
    var me = this;
    this.timer = setInterval(function() {
        me.eatFood();
        me.snake.move();
        me.chckeMap();
        me.eatSnake();
        me.chckeBlock();
        me.snakeTail();
        if (me.flag) {
            me.clear();
            me.renderFood();
            me.renderSnake();
        }
    	me.renderBlock();
    }, 300);
};

//绑定键盘事件,从而改变蛇运动的方向
Game.prototype.bindEvent = function() {
    var me = this;
    document.onkeydown = function(e) {
        var code = e.keyCode;
        if (code === 37 || code === 38 || code === 39 || code === 40) {
            me.snake.change(code);
        }
    }
}

//蛇吃食物
Game.prototype.eatFood = function() {
    //判断蛇头的坐标和食物的坐标是否一致
    var head = this.snake.snakeArr[this.snake.snakeArr.length - 1];
    var food = this.food;
    if (head.x === food.x && head.y === food.y) {
        //蛇长身体
        this.snake.growUp();
        //重置食物
        this.resetFood();
    }
}

//重置食物的方法
Game.prototype.resetFood = function() {
    var x = parseInt(Math.random() * this.map.row);
    var y = parseInt(Math.random() * this.map.col);
    //蛇身体数组
    var snake = this.snake.snakeArr;
    var block = this.block.blockArr;
    //食物出现在蛇身体上了,重新生成食物,重新调用重置食物的方法
    for (var i = 0; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            // console.log("我出现在身体里面了");
            this.resetFood();
            //return 停止执行函数
            return;
        }
    }

    //食物出现在障碍物上了,重新生成食物,重新调用重置食物的方法
    for (var i = 0; i < block.length; i++) {
        if (x === block[i].x && y === block[i].y) {
            // console.log("我出现在身体里面了");
            this.resetFood();
            //return 停止执行函数
            return;
        }
    }
    //生成食物
    this.food.resetFood(x, y);
}

//判断蛇是否撞墙
Game.prototype.chckeMap = function() {
    var me = this;
    var head = this.snake.snakeArr[this.snake.snakeArr.length - 1];
    if (head.x < 0 || head.x >= this.map.row || head.y < 0 || head.y >= this.map.col) {
        me.flag = false;
        clearInterval(this.timer);
    }
}

//蛇撞到障碍物上
Game.prototype.chckeBlock = function() {
    var me = this;
    var head = this.snake.snakeArr[this.snake.snakeArr.length - 1];
    var block = this.block.blockArr;
    for(var i = 0;i < block.length;i++){
    	var blockX = block[i].x;
    	var blockY = block[i].y;
	    if (head.x === blockX && head.y === blockY) {
	        me.flag = false;
	        clearInterval(this.timer);
	    } 	
    }
}

//判断蛇吃自己
Game.prototype.eatSnake = function() {
    var head = this.snake.snakeArr[this.snake.snakeArr.length - 1];
    for (var i = 0; i < this.snake.snakeArr.length - 1; i++) {
        if (head.x === this.snake.snakeArr[i].x && head.y === this.snake.snakeArr[i].y) {
            // console.log("蛇撞到自己了");
            clearInterval(this.timer);
        }
    }
}

//和蛇尾倒数第二个身体坐标来改变蛇尾的图片索引
Game.prototype.snakeTail = function() {
    var tail = this.snake.snakeArr[0]; //蛇尾巴的坐标
    var pg = this.snake.snakeArr[1]; //蛇屁股的坐标
    if (tail.x === pg.x) {
        // console.log("在同一水平方向");
        this.snake.tail_index = tail.y < pg.y ? 0 : 2;
    } else if (tail.y === pg.y) {
        // console.log("在同一垂直方向");
        this.snake.tail_index = tail.x < pg.x ? 1 : 3;
    }
}