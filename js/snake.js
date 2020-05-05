function Snake(imgs) {
    //定义数组，存储蛇的身体属性
    this.snakeArr = [
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 }
    ];
    //定义锁
    this.lock = false;
    //定义方法
    this.direction = 39;
    //头部图片
    this.head = imgs.head_pic;
    this.head_index = 2;
    //身体图片
    this.body = imgs.body_pic;
    //尾部图片
    this.tail = imgs.tail_pic;
    this.tail_index = 0;
};

//蛇移动方法
Snake.prototype.move = function() {
    var me = this;
    var snakeHead = {
        x: me.snakeArr[me.snakeArr.length - 1].x,
        y: me.snakeArr[me.snakeArr.length - 1].y
    };

    // console.log(snakeHead);
    // 根据当前的鼠标方法，从而改变蛇运动的方向
    switch (this.direction) {
        case 37:
            snakeHead.y--;
            break;
        case 38:
            snakeHead.x--;
            break;
        case 39:
            snakeHead.y++;
            break;
        case 40:
            snakeHead.x++;
            break;
    }
    this.snakeArr.push(snakeHead);
    this.snakeArr.shift();
    this.lock = true;
}

//蛇转向的方法
Snake.prototype.change = function(direction) {
    if (this.lock) {
        var result = Math.abs(direction - this.direction);
        if (result === 0 || result === 2) {
            return;
        } else {
            this.direction = direction;
            //根据按下按键的方法来改变this.head_index从而改变蛇头的图片
            switch (direction) {
                case 37:
                    this.head_index = 0;
                    break;
                case 38:
                    this.head_index = 1;
                    break;
                case 39:
                    this.head_index = 2;
                    break;
                case 40:
                    this.head_index = 3;
                    break;
            }
        }
    }
    this.lock = false;
}

//蛇生长
Snake.prototype.growUp = function() {
    var one = this.snakeArr[0];
    this.snakeArr.unshift(one);
}