function HistogramChart (option){
    this._init(option); //对象构造函数
}


HistogramChart.prototype ={//函数都存在原型中;
    _init:function(option){
        this.x = option.x||0;//初始化参数
        this.y = option.y||0;
        this.w = option.w||0;
        this.h = option.h||0;

        this.data = option.data||[];

        this.group = new Konva.Group({//最外面的组
            x:this.x,
            y:this.y
        });

        //绘制底线
        var bsLine = new Konva.Line({
            //x:从 1/8 x,  3/4
            //y: 3/4 高度处
            points: [0,0,this.w,0],//0以组的x,y为基准
            strokeWidth:1,
            stroke:"lightgreen"
        });

        this.group.add(bsLine);

        //放矩形的组
        this.rectGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.rectGroup);//子组放入父组中

        //添加一个放百分比文字的组
        this.textPercentGroup = new Konva.Group({
            x:0,
            y:0
        });
        this.group.add(this.textPercentGroup);




        var rectWidth = this.w/this.data.length;
        var maxH = this.h;
        var data = this.data;
        var self = this;


        //绘制柱状图的矩形：  遍历每一条数据然后生成一个矩形

        // forEach： 是EcamScript5之后添加的新语法，可以替代for循环，
        //数组的方法。
        // ie9以上才支持。注意兼容性。
        this.data.forEach(function(item,index) {// item:数组中元素，index是索引值
            //生成一个矩形
            var rect = new Konva.Rect({
                x: (1 / 4 + index) * rectWidth,// 空出1/4宽度，加上n个宽度(方块宽和两边相加)为x起点;
                y: - data[index].value * maxH,//在y0上累加最大高度*value值(用减号)为起点;
                width: 1 / 2 * rectWidth,//固定的1/2宽度
                height: data[index].value * maxH,//绘下来正好到y0高度;
                fill: data[index].color,
                opacity: .8,
                cornerRadius: 10,
                shadowBlur: 10,
                shadowColor: "black"
            });
            self.rectGroup.add(rect);//每次都把该对象立刻存入组中;

            //把描述文字放到 柱状图的底部
            var textBottom = new Konva.Text({
                x: (1 / 4 + index) * rectWidth,
                y: 0,
                fontSize: 14,
                text: data[index].name,
                fill: data[index].color,
                rotation: 30
            })

            //把百分比的文字放到 柱状图的顶部
            var text = new Konva.Text({
                x: index * rectWidth,//x起点在方块宽和两边相加
                y: -data[index].value * maxH - 14,
                fontSize: 14,
                text: data[index].value * 100 + "%",
                fill: data[index].color,
                width: rectWidth,// 配合让文字居中
                align: 'center',
                name: 'textPercent'//用来被选择器选取;
            });
            self.textPercentGroup.add(text);


            self.group.add(textBottom);
        });

    },
    addGroupToLayer:function(layer){
        layer.add(this.group);
    },

    playAnimation:function(){
        var self = this;
        this.rectGroup.getChildren().each(function(item,index){
            var oldY = -self.data[index].value*self.h;
            var oldHeight = self.data[index].value*self.h;
            var oldConerRadius = 5;

            item.y(0);//在konva中，如果传参数：设置值， 如果不传参代表取值
            item.height(0);
            item.cornerRadius(0);
            item.to({
                duration:1,//1秒钟
                y:oldY,//初始y0参数，减去最大高度*当前比例值
                height:oldHeight,//最大高度*当前比例值 高度;
                cornerRadius:oldConerRadius,
                easing: Konva.Easings.StrongEaseIn
            });
        });
        this.textPercentGroup.getChildren().each(function(item,i){
            var oldY = -self.data[i].value*self.h-14;
            item.y(-14);
            item.height(0);
            item.to({
                duration:1,//1秒钟
                y:oldY,//初始y0参数，减去最大高度*当前比例值
                easing: Konva.Easings.StrongEaseIn
            });
        });
    }
}