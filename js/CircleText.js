function CircleText(option){
    this._init(option);
}


CircleText.prototype ={
    _init:function(option){
        this.x = option.x||0;   //圆形组的中心点坐标
        this.y = option.y||0;
        this.innerRadius = option.innerRadius || 0;
        this.outterRadius = option.outterRadius || 0;
        this.text = option.text ||"canvas";//圆内的文字
        this.innerStyle = option.innerStyle || "red";//内圆的填充样式
        this.outterStyle = option.outterStyle || "yellow";//外圆的填充样式

        //创建文字和圆形的一个组
        this.group = new Konva.Group({
            //设置组的x，y坐标后，所有的内部元素按照组内的新坐标系定位。
            x:this.x,
            y:this.y
        });

        //初始化一个内部圆
        var innerCircle = new Konva.Circle({
            x:0,//都设为0;相当于以group的中心点为圆心
            y:0,
            radius:this.innerRadius,
            fill:this.innerStyle,
            opacity:.8
        });

        //把内部圆，添加到组内
        this.group.add(innerCircle);

        //初始化一个圆环
        var outerRing = new Konva.Ring({
            x:0,
            y:0,
            innerRadius:this.innerRadius,   //内圆的半径
            outerRadius:this.outterRadius, //外圆的半径
            fill:this.outterStyle,          //圆环的填充的样式
            opacity:.3                      //透明度
        });
        //把外环，添加到组内
        this.group.add(outerRing);

        //初始化一个文字
        var text = new Konva.Text({
            x:0-this.outterRadius,//?
            y:-7,
            width:this.outterRadius*2,//文字的宽度
            fill:"#fff",
            fontSize:17,
            text:this.text,
            align:"center",
            fontStyle:"bold"
        })
        //把文字添加到组内
        this.group.add(text);
    },


    //把 组添加到层或者其他组中。
    addToGroupOrLayer:function(arg){
        arg.add(this.group);//层添加了这个组;
    }
}