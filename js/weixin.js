var stage = new Konva.Stage({
    container:'container',
    width:window.innerWidth,
    height:window.innerHeight
});

// 总的思路：
//上滑：  让索引+1， 执行sceneBuilders数组中下一个场景的play（）
//下滑：  让索引-1， 执行sceneBuilders数组中下一个场景的play（）

// 场景的构造器
var sceneBuilders = [builderHtml5Scene,builderCSS3Scene,builderDemoScene];

//当前场景的执行的索引
var sceneIndex = 0;

//上来之后执行第一个场景
sceneBuilders[0]().play();

//构造h5的场景
function builderHtml5Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    var rect = new Konva.Rect({
        x:-100,
        y:-100,
        fill:'red',
        width:100,
        height:100
    });

    return new ItcastScene({
        name: '场景1',
        layers:[bgLayer, animateLayer, lightLayer], //最后的层放到最上面
        stage:stage,
        init:function(){
            //初始化场景中的所有形状
            animateLayer.add(rect);
            this.layers.forEach(function(layer){
                layer.draw();
            });
        },
        pre:function(){
            rect.to({
                x:100,
                y:100,
                duration:1,
                scaleX:2,
                scaleY:2,
                opacity:.4
            });
        },
        post:function(dopre){
            var self = this,
            rect.to({
                x:-100,
                y:-100,
                duration:1,
                scaleX:2,
                scaleY:2,
                opacity:.4,
                onFinish:function(){
                    self.layers.forEach(function(item){
                        item.destroy();//把所有层销毁
                    });
                    dopre();//必须执行next方法，执行下一个场景的初始化和入场动画
                }
            });
        }
    });
}

//构造css3的场景
function builderC3Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    var rect = new Konva.Rect({
        x:-100,
        y:-100,
        fill:'green',
        width:100,
        height:100
    });


    //柱状图的数据
    var data = [
        { name: '前端', value: '.8', color: 'green'},
        { name: 'PHP', value: '.3', color: 'blue'},
        { name: 'Java', value: '.7', color: 'red'},
        { name: 'UI', value: '.9', color: 'orange'},
        { name: 'IOS', value: '.4', color: 'purple'},
        { name: 'Android', value: '.9', color: 'pink'}
    ];


    var h = new HistogramChart({
        x: 1/8 * stage.width(),
        y: 3/4 * stage.height(),
        w: 3/4 * stage.width(),
        h: 1/2 * stage.height(),
        data:data
    });


    return new ItcastScene({
        name: '场景2',
        layers:[bgLayer, animateLayer, lightLayer], //最后的层放到最上面
        stage:stage,
        init:function(){
            //初始化场景中的所有形状
            animateLayer.add(rect);
            h.addGroupToLayer(animateLayer);//将柱状图也加入到层中;

            this.layers.forEach(function(layer){
                layer.draw();
            });
        },
        pre:function(){
            rect.to({
                x:100,
                y:100,
                duration:1,
                scaleX:2,
                scaleY:2,
                opacity:.4,
                yoyo:true//重复
            });
        },
        post:function(dopre){
                this.layers.forEach(function(item){
                    item.destroy();//把所有层销毁
            });
            dopre();//传什么方法进来调用什么方法;
        }
    });
}

//构造demo的场景
function builderDemoScene(){
    return new ItcastScene({

    })
}


//给舞台添加 上滑动，和下滑动的事件
function addStageEvent(){

    



}


//触发添加舞台滑动事件
addStageEvent();
















