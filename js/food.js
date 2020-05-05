function Food(x, y, src) {
    this.x = x;
    this.y = y;
    this.src = src;
}
//生成食物
Food.prototype.resetFood = function(x, y) {
    this.x = x;
    this.y = y;
};