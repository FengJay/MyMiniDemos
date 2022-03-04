let fieldCounter = 0;
let fieldMatrix, fieldMatrixStr, field_e, fieldTheta, field_rID;
let field;

function rotateOne(){
    field = document.querySelectorAll(".right");
    rotateAnimationField();
}


function rotateAnimationField(){
    fieldCounter++;
    let FN = 30; //帧数

    field_e = [-1,0,0];
    fieldTheta = Math.PI/2;

    for(let dom of field){
        fieldMatrixStr = document.defaultView.getComputedStyle(dom, null).transform;  //获取浏览器计算后的cubic的3d矩阵值
        //把上一次装态的matrix的数据提取出来，并生成这个表示原状态的矩阵
        // matrixStr = rotateParams.dom.style.getPropertyValue("transform");  //这里需要设置初始状态的transform为matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)
        // console.log(matrixStr);
        
        let nums = fieldMatrixStr.replace(/(matrix3d\()|[ \)]/g, "").split(",").map((item)=>+item);
        if(nums.length != 16){
            fieldMatrix = [[1,0,0,0],
                            [0,1,0,0],
                            [0,0,1,0],
                            [0,0,0,1]]
        }else{
            fieldMatrix = math.matrix([nums.slice(0,4),
                                nums.slice(4,8),
                                nums.slice(8,12),
                                nums.slice(12,16)])
        }
        myrotate3d(fieldMatrix, field_e, fieldTheta / FN, dom); 
    }
    
    if(!(fieldCounter%FN)) {  //100帧，停止
        cancelAnimationFrame(field_rID);
        field_rID = null;  
        fieldCounter = 0;
        return
    }
    field_rID = requestAnimationFrame(rotateAnimationField);
}