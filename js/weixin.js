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





    });

}
