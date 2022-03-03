### DIY类demo
这个demo的表现效果是  
长按鼠标拨动cube，会表现为根据拖动距离施加一个力给cube  
然后cube根据拨动方向旋转一定角度，我设定的是200px的力转动180度  
```javascript
theta = Math.PI * Math.sqrt(xRange**2 + yRange**2) / 200;  //每200px的力转180度
```
实现方面，一开始其实并没有用矩阵，用的css3新增属性rotate3d，也需要一个旋转方向，但是结果写得很烂，也可能是我没有理解透彻这个属性  
由于写得烂，搁置了一段时间，期间看了很多3d动画类的实现，但是没找到相似度高的来借鉴，很多用canvas实现的视觉3d  
而我想要的是真的3d  
但他们给了我灵感，用矩阵  
矩阵肯定就得提到线代了，这玩意儿大一学的，早忘干净了，而且本来就学得不好  
但想实现，也不说恶补线代知识吧，至少旋转矩阵得概念得补上吧,[可以看这里](https://blog.csdn.net/csxiaoshui/article/details/65446125)  
其实看完只需要知道一个基本知识：  
在3d图形中，设旋转角度为theta，旋转方向由右手螺旋定则得到的旋转轴的单位方向向量e = (a,b,c)，|e| == 1  
原图像的形变矩阵为M，由e得到的旋转矩阵为M1，则M右乘M1得到的就是图像旋转过后的结果，至于推到可以看这里，[3d空间中点的旋转变换](https://zhuanlan.zhihu.com/p/360189741)  
至于二维的形变矩阵比较简单，但是有助于理解三维，可以先看二维  
我这里就直接站在巨人的肩膀上，直接套公式了，有e得到的旋转矩阵为：  
```javascript
let rotateMatrix = math.matrix([[a**2+(1-a**2)*cos, a*b*(1-cos)-c*sin, a*c*(1-cos)+b*sin, 0],
                                [a*b*(1-cos)+c*sin, b**2+(1-b**2)*cos, b*c*(1-cos)-a*sin, 0], 
                                [a*c*(1-cos)-b*sin, b*c*(1-cos)+a*sin, c**2+(1-c**2)*cos, 0], 
                                [0,                 0,                 0,                 1]])
```
可以看到这里用到的是math,而不是Math，js自带的Math库是不包含矩阵运算的，所以需要导入math.js，[下载和使用说明看这里](https://www.mathjs.cn/docs/datatypes/matrices.html)  

然后一个难点就是计算旋转轴的单位向量e：  
旋转方向好算，就是鼠标拨动的方向嘛，取两个点就行了  
但是旋转方向的方向向量有一个特点需要理解，就是拨动的力是在xoy平面的，所以这个向量在xoy平面，根据右手螺旋定则，可以判断旋转轴向量e也一定在xoy平面  
即c == 0  
而方向向量是垂直于e的，所以k * ke = -1  
```javascript
//计算旋转轴的单位方向向量
let l = Math.sqrt(xRange**2 + yRange**2);
let alpha = Math.acos(yRange/l); 
_e = [Math.cos(alpha), xRange>0? -Math.sin(alpha): Math.sin(alpha), 0];
```
这里为什么b的值需要判断Δx的正负我是根据实际情况来的，没能推导出直接公式。。。有大佬推出来直接公式球球教教  
整体来说这个demo没有任何算法层面的东西，主要是旋转矩阵的理解和运用，即css3中的transform属性的加深理解