let cube = document.getElementById("cube");
let x1, x2, y1, y2;
let cubeClicked = false;
let xRange = 0, yRange = 0;
let counter = 0;
let matrixStr = "";
let rID = null;
let theta, _e, matrix;

cube.addEventListener("mousedown", (e)=>{
    if(rID){  //如果上一次动画还未结束,先清除
        cancelAnimationFrame(rID);
        rID = null;  
    }
    counter = 0;

    cubeClicked = true;
    x1 = e.clientX;
    y1 = e.clientY;
})
this.addEventListener("mouseup", (e)=>{
    if(cubeClicked){
        x2 = e.clientX;
        y2 = e.clientY;
        xRange = x2 - x1;
        yRange = y2 - y1;

        //计算旋转角度
        theta = Math.PI * Math.sqrt(xRange**2 + yRange**2) / 200;  //每200px的力转180度
        //计算旋转轴的单位方向向量
        let l = Math.sqrt(xRange**2 + yRange**2);
        let alpha = Math.acos(yRange/l); 
        _e = [Math.cos(alpha), xRange>0? -Math.sin(alpha): Math.sin(alpha), 0];

        //开始动画
        rotateAnimation();
    }
    cubeClicked = false;
})

init();

function init(){
    theta = Math.PI / 6;
    _e = [0.5, Math.sqrt(3)/2, 0];
    rotateAnimation();
}

function rotateAnimation(){
    counter++;
    let FN = 100; //帧数
    let k = counter / FN;

    let timeFuncK = (k-1)**2;  //时间函数，先快后慢
    
    // matrixStr = document.defaultView.getComputedStyle(cube, null).transform;  //获取浏览器计算后的cube的3d矩阵值
    //把上一次装态的matrix的数据提取出来，并生成这个表示原状态的矩阵
    matrixStr = cube.style.getPropertyValue("transform");  //这里需要设置初始状态的transform为matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)
    
    let nums = matrixStr.replace(/(matrix3d\()|[ \)]/g, "").split(",").map((item)=>+item);
    matrix = math.matrix([nums.slice(0,4),
                            nums.slice(4,8),
                            nums.slice(8,12),
                            nums.slice(12,16)])
    
    myrotate3d(matrix, _e, theta*timeFuncK/33, cube);  //除33是因为timeFunc在(0,1)的积分为1/3，而有100帧，即theta * 1/3 *100 约等于theta
                                                    //这里旋转结果算积分是因为每次动画都要旋转一个小角度，而不是像通常的动画直接覆盖值
    
    if(!(counter%FN)) {  //100帧，停止
        cancelAnimationFrame(rID);
        rID = null;  
        return
    }
    rID = requestAnimationFrame(rotateAnimation);
}

function myrotate3d(matrix, e, theta, dom){
    //旋转角度为theta,e=(a,b,c)表示旋转轴的单位向量，即|e| == 1，由于案例特殊，该旋转轴一定在xoy平面上，所以为e=(a,b,0)
    //某个点p的坐标为(x,y,z)，则其方向向量r=(x,y,z)，则r绕e右手定则旋转的结果是
    let cos = Math.cos(theta), sin = Math.sin(theta);
    let [a,b,c] = [...e];

    let rotateMatrix = math.matrix([[a**2+(1-a**2)*cos, a*b*(1-cos)-c*sin, a*c*(1-cos)+b*sin, 0],
                                    [a*b*(1-cos)+c*sin, b**2+(1-b**2)*cos, b*c*(1-cos)-a*sin, 0], 
                                    [a*c*(1-cos)-b*sin, b*c*(1-cos)+a*sin, c**2+(1-c**2)*cos, 0], 
                                    [0,0,0,1]])

    let res = math.multiply(matrix, rotateMatrix);
    let val = `matrix3d(${res._data[0][0]},${res._data[0][1]},${res._data[0][2]},${res._data[0][3]},
                        ${res._data[1][0]},${res._data[1][1]},${res._data[1][2]},${res._data[1][3]},
                        ${res._data[2][0]},${res._data[2][1]},${res._data[2][2]},${res._data[2][3]},
                        ${res._data[3][0]},${res._data[3][1]},${res._data[3][2]},${res._data[3][3]})`;
    dom.style.transform = val;  //原矩阵右乘了旋转矩阵rotateMatrix之后，得到的新矩阵就是旋转结果
}