function CakeChart (option){
    this._init(option);
}

CakeChart.prototype = {

    _init:function(option){
        this.x = option.x||0,
            this.y = option.y||0
        this.data = option.data||[];

        this.group = new Konva.Group({//最外面的组
            x:this.x,
            y:this.y
        });

        this.textGroup = new Konva.Group({//最外面的组
            x:0,
            y:0
        });
        this.group.add(this.textGroup);

        var tempAngel = -90;

        var self =this;

        data.forEach(function(item,index){
            var angel = 360*data[index].value;//item就是指data当前元素;
            //做一个扇形
            // wedge: 楔形物
            var wedge = new Konva.Wedge({
                x:0,
                y:0,
                angle:angel,
                fill:data[index].color,
                radius:100,
                rotation:tempAngel
            });

            self.group.add(wedge);

            tempAngel += angel;

            //绘制文本的 角度
            var textAngel = tempAngel + 1/2*angel;

            //绘制的 百分比的文本
            var text = new Konva.Text({
                x:(100+20)*Math.cos(Math.PI/180*textAngel),
                y:(100+20)*Math.sin(Math.PI/180*textAngel),
                text:self.data[index].value*100+'%',
                fill:self.data[index].color
            });
            //根据角度判断设置文字的 位置
            if(textAngel>90&&textAngel<270){
                //让文本向左边 移动文字宽度的位置。
                text.x(text.x()-text.getWidth());
            }
            self.textGroup.add(text);

        });

        //绘制外圆
        var circle = new Konva.Circle({
            x:0,
            y:0,
            radius:110,
            stroke:'black',
            strokeWidth:2
        });

        this.group.add(circle);

        /*//拿到所有的扇形
         var wedges = layer.find('Wedge');
         wedges.each(function(item,index){
         item.angle(0);//清零所有动画;
         });*/
        this.index = 0;
    },

    // 绘制动画
    animatePie:function(){
        var self =this;
        //根据索引显示动画
        //拿到所有的扇形
        var wedges = layer.find('Wedge');
        //把所有扇区 角度设置为0
        if(this.index==0){
            wedges.each(function(item,index){
                item.angle(0);//清零所有动画;
            });
        }

        //展示当前索引对应的动画
        var item = wedges[this.index];
        item.to({
            angle:this.data[this.index].value*360,
            duration:this.data[this.index].value*2,//转换时间根据角度等分大小而异
            onFinish:function(){ //当动画结束之后，执行此方法
                self.index++;
                if(self.index>=self.data.length){
                    self.index = 0;//让他的索引再回到0
                    return;//立即结束当前函数。
                }
                //否则,完成后继续调用自己，index加1执行下一个扇形的动画
                self.animatePie();
            }
        });

    },


    addGroupToLayer:function (layer){
        layer.add(this.group);
    }
}