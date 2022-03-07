let fieldCounter = 0;
// let fieldMatrix, fieldMatrixStr, field_e, fieldTheta, field_rID;
// let field;

let field = new Field();

//绑定初始状态的每个brick的dom
let bricks = [];
let aims = document.querySelectorAll(".brick");
for(let dom of aims){
    let brick = new Brick();
    brick.dom = dom;
    brick.position = dom.className.replace("brick ", "");
    bricks.push(brick);
}


function rotateOne(pos, dir){ //根据按钮旋转指定的面90度
    if(field.rID){//如果上一次动画还未结束, 不执行
        return;
    }

    //获取旋转面，pos<string>为front, behind, left, right, top, bottom之一， dir<int>为+-1表示正反方向
    field.bricks = bricks.filter((brick) => brick.position.match(pos));
    field.e = [(pos == "right"||pos == "left")? dir : 0, (pos == "top"||pos == "bottom")? dir : 0, (pos == "front"||pos == "behind")? dir : 0];

    //获取到后就可以开始旋转
    rotateAnimationField();

    //旋转过后还需要改变其位置类
    bricks.map((brick) => {brick.changePos(pos, dir); });
}


function rotateAnimationField(){
    fieldCounter++;
    let FN = 30; //帧数

    field.theta = Math.PI/2;

    for(let brick of field.bricks){
        field.matrixStr = document.defaultView.getComputedStyle(brick.dom, null).transform;  //获取浏览器计算后的cubic的3d矩阵值
        //把上一次装态的matrix的数据提取出来，并生成这个表示原状态的矩阵
        
        let nums = field.matrixStr.replace(/(matrix3d\()|[ \)]/g, "").split(",").map((item)=>+item);
        if(nums.length != 16){
            field.matrix = [[1,0,0,0],
                            [0,1,0,0],
                            [0,0,1,0],
                            [0,0,0,1]]
        }else{
            field.matrix = math.matrix([nums.slice(0,4),
                                nums.slice(4,8),
                                nums.slice(8,12),
                                nums.slice(12,16)])
        }
        myrotate3d(field.matrix, field.e, field.theta / FN, brick.dom); 
    }
    
    if(!(fieldCounter%FN)) {  //100帧，停止
        cancelAnimationFrame(field.rID);
        field.rID = null;  
        fieldCounter = 0;
        return
    }
    field.rID = requestAnimationFrame(rotateAnimationField);
}
