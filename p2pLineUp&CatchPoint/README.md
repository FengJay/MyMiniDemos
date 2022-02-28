#### 这个demo是页面一堆无序的点自主地做着有序的匀速直线运动
#### 如果两个点之间距离达到一定区间，就将两个点连接起来，so p2pLineUp
#### 如果点碰到页面边缘，就改变运动方向
#### 主要部分是鼠标对这些点的捕捉
#### 捕捉效果就是这些无序点进入到鼠标某个范围，就被catch
#### 被caught的点又进入到一个相对小一点的范围内不能出去
#### 一开始比较笨，想了挺久怎么catch
#### 还准备定义一个caught类，写一个caught后的位移动画
#### 但是用canvas写的，这个没办法
#### 后来想如果是写个位移动画，不就是一帧帧地把caught的点的坐标向鼠标靠拢嘛，然后就豁然开朗了。。。

```
 //鼠标点之间的连线和捕捉
   if(catchDot(dot)){ 
      let distance = dis(dot, mouse);
      let opacity = (1-(distance/22500)).toFixed(1);
      if(distance < 22500){
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255,255,255,' + opacity +')';
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          //捕捉
          if(distance > 10000){
              dot.x -= (dot.x - mouse.x)*0.02;
              dot.y -= (dot.y - mouse.y)*0.02;
          }
      }
  }
```
#### 每一帧靠近0.02倍距离
< let i = 1; >
