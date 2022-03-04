let fieldCounter = 0;
let fieldMatrix, fieldMatrixStr, field_e, fieldTheta, field_rID;
let field;

function rotateOne(choice){ //根据按钮旋转指定的面90度
    //先获取对应面的9个bricks，并确定旋转轴的单位向量
    getField(choice);

    //获取到后就可以开始旋转
    rotateAnimationField();

    //旋转过后还需要改变其位置类
    changePosition(choice)
}

//获取当前旋转的面及旋转轴单位向量
function getField(choice){
    switch(choice){
        case 1:
            field = document.querySelectorAll(".right");
            field_e = [-1,0,0];
            break;
        case 2:
            field = document.querySelectorAll(".right");
            field_e = [1,0,0];
            break;
        case 3:
            field = document.querySelectorAll(".left");
            field_e = [-1,0,0];
            break;
        case 4:
            field = document.querySelectorAll(".left");
            field_e = [1,0,0];
            break;
        case 5:
            field = document.querySelectorAll(".top");
            field_e = [0,1,0];
            break;
        case 6:
            field = document.querySelectorAll(".top");
            field_e = [0,-1,0];
            break;
        case 7:
            field = document.querySelectorAll(".bottom");
            field_e = [0,1,0];
            break;
        case 8:
            field = document.querySelectorAll(".bottom");
            field_e = [0,-1,0];
            break;
        case 9:
            field = document.querySelectorAll(".front");
            field_e = [0,0,-1];
            break;
        case 10:
            field = document.querySelectorAll(".front");
            field_e = [0,0,1];
            break;
        case 11:
            field = document.querySelectorAll(".behind");
            field_e = [0,0,-1];
            break;
        case 12:
            field = document.querySelectorAll(".behind");
            field_e = [0,0,1];
            break;
    }
}

function rotateAnimationField(){
    fieldCounter++;
    let FN = 30; //帧数

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

//转动后改变bricks的位置类
function changePosition(choice){
    switch(choice){
        case 1: 
            leftRightUp();
            break;
        case 2: 
            leftRightDown();
            break;
        case 3: 
            leftRightUp();
            break;
        case 4: 
            leftRightDown();
            break;
        case 5: 
            topBottomLeft();
            break;
        case 6: 
            topBottomRight();
            break;
        case 7: 
            topBottomLeft();
            break;
        case 8: 
            topBottomRight();
            break;
        case 9: 
            frontBehindPos();
            break;
        case 10: 
            frontBehindNeg();
            break;
        case 11: 
            frontBehindPos();
            break;
        case 12: 
            frontBehindNeg();
            break;
    }
}

function leftRightUp(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "front");
            }
            if(classes.match("top")){
                brick.className = classes.replace("top", "behind");
            }
            if(classes.match("front")){
                brick.className = classes.replace("front", "top");
            }
            if(classes.match("behind")){
                brick.className = classes.replace("behind", "bottom");
            }
            continue;
        }
        if(classes.match("front")){
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "top");
            }
            if(classes.match("top")){
                brick.className = classes.replace("front", "behind");
            }
            continue;
        }
        if(classes.match("behind")){
            if(classes.match("top")){
                brick.className = classes.replace("top", "bottom");
            }
            if(classes.match("bottom")){
                brick.className = classes.replace("behind", "front");
            }
        }

    }
}
function leftRightDown(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "behind");
            }
            if(classes.match("top")){
                brick.className = classes.replace("top", "front");
            }
            if(classes.match("front")){
                brick.className = classes.replace("front", "bottom");
            }
            if(classes.match("behind")){
                brick.className = classes.replace("behind", "top");
            }
            continue;
        }
        if(classes.match("front")){
            if(classes.match("bottom")){
                brick.className = classes.replace("front", "behind");
            }
            if(classes.match("top")){
                brick.className = classes.replace("top", "bottom");
            }
            continue;
        }
        if(classes.match("behind")){
            if(classes.match("top")){
                brick.className = classes.replace("behind", "front");
            }
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "top");
            }
        }

    }
}
function topBottomLeft(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("right")){
                brick.className = classes.replace("right", "front");
            }
            if(classes.match("left")){
                brick.className = classes.replace("left", "behind");
            }
            if(classes.match("front")){
                brick.className = classes.replace("front", "left");
            }
            if(classes.match("behind")){
                brick.className = classes.replace("behind", "right");
            }
            continue;
        }
        if(classes.match("front")){
            if(classes.match("left")){
                brick.className = classes.replace("front", "behind");
            }
            if(classes.match("right")){
                brick.className = classes.replace("right", "left");
            }
            continue;
        }
        if(classes.match("behind")){
            if(classes.match("left")){
                brick.className = classes.replace("left", "right");
            }
            if(classes.match("right")){
                brick.className = classes.replace("behind", "front");
            }
        }

    }
}
function topBottomRight(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("right")){
                brick.className = classes.replace("right", "behind");
            }
            if(classes.match("left")){
                brick.className = classes.replace("left", "front");
            }
            if(classes.match("front")){
                brick.className = classes.replace("front", "right");
            }
            if(classes.match("behind")){
                brick.className = classes.replace("behind", "left");
            }
            continue;
        }
        if(classes.match("front")){
            if(classes.match("left")){
                brick.className = classes.replace("left", "right");
            }
            if(classes.match("right")){
                brick.className = classes.replace("front", "behind");
            }
            continue;
        }
        if(classes.match("behind")){
            if(classes.match("left")){
                brick.className = classes.replace("behind", "front");
            }
            if(classes.match("right")){
                brick.className = classes.replace("right", "left");
            }
        }

    }
}
function frontBehindPos(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("right")){
                brick.className = classes.replace("right", "bottom");
            }
            if(classes.match("left")){
                brick.className = classes.replace("left", "top");
            }
            if(classes.match("top")){
                brick.className = classes.replace("top", "right");
            }
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "left");
            }
            continue;
        }
        if(classes.match("top")){
            if(classes.match("left")){
                brick.className = classes.replace("left", "right");
            }
            if(classes.match("right")){
                brick.className = classes.replace("top", "bottom");
            }
            continue;
        }
        if(classes.match("bottom")){
            if(classes.match("left")){
                brick.className = classes.replace("bottom", "top");
            }
            if(classes.match("right")){
                brick.className = classes.replace("right", "left");
            }
        }

    }
}
function frontBehindNeg(){
    for(let brick of field){
        let classes = brick.className;
        if(classes.match("mid")){
            if(classes.match("right")){
                brick.className = classes.replace("right", "top");
            }
            if(classes.match("left")){
                brick.className = classes.replace("left", "bottom");
            }
            if(classes.match("top")){
                brick.className = classes.replace("top", "left");
            }
            if(classes.match("bottom")){
                brick.className = classes.replace("bottom", "right");
            }
            continue;
        }
        if(classes.match("top")){
            if(classes.match("left")){
                brick.className = classes.replace("top", "bottom");
            }
            if(classes.match("right")){
                brick.className = classes.replace("right", "left");
            }
            continue;
        }
        if(classes.match("bottom")){
            if(classes.match("left")){
                brick.className = classes.replace("left", "right");
            }
            if(classes.match("right")){
                brick.className = classes.replace("bottom", "top");
            }
        }

    }
}