function Map(row, col, width, height) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.dom = document.createElement("div");
    this.arr = [];
}

//渲染地图
Map.prototype.fill = function() {
    this.dom.className = "map";
    for (var i = 0; i < this.col; i++) {
        var row_dom = document.createElement("div");
        row_dom.className = "row";
        var rowArr = [];
        for (var j = 0; j < this.row; j++) {
            var col_dom = document.createElement("span");
            col_dom.className = "grid";
            row_dom.appendChild(col_dom);
            rowArr.push(col_dom);
        }
        this.arr.push(rowArr);
        this.dom.appendChild(row_dom);
    }
    this.arr.push(row_dom);
    document.body.appendChild(this.dom);
}