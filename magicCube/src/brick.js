function Field(){

}

Field.prototype.bricks = [];
Field.prototype.e = [];
Field.prototype.theta = 0;
Field.prototype.matrix = null;
Field.prototype.rID = null;
Field.prototype.matrixStr = "";

function Brick(){
    
}

Brick.prototype.dom = null;
Brick.prototype.position = "";

Brick.prototype.changePos = function(pos, dir){
    if(this.position.match(pos)){
        if(dir == 1){
            if(pos == "left" || pos == "right"){
                this.leftRightDown();
            }else if(pos == "top" || pos == "bottom"){
                this.topBottomLeft();
            }else{  //front和behind
                this.frontBehindNeg();
            }
        }else{
            if(pos == "left" || pos == "right"){
                this.leftRightUp();
            }else if(pos == "top" || pos == "bottom"){
                this.topBottomRight();
            }else{  //front和behind
                this.frontBehindPos();
            }
        }
    }else{
        return
    }

}

Brick.prototype.leftRightUp = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "front");
        }
        if(temp.match("top")){
            this.position = temp.replace("top", "behind");
        }
        if(temp.match("front")){
            this.position = temp.replace("front", "top");
        }
        if(temp.match("behind")){
            this.position = temp.replace("behind", "bottom");
        }
    }
    if(temp.match("front")){
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "top");
        }
        if(temp.match("top")){
            this.position = temp.replace("front", "behind");
        }
    }
    if(temp.match("behind")){
        if(temp.match("top")){
            this.position = temp.replace("top", "bottom");
        }
        if(temp.match("bottom")){
            this.position = temp.replace("behind", "front");
        }
    }
}
Brick.prototype.leftRightDown = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "behind");
        }
        if(temp.match("top")){
            this.position = temp.replace("top", "front");
        }
        if(temp.match("front")){
            this.position = temp.replace("front", "bottom");
        }
        if(temp.match("behind")){
            this.position = temp.replace("behind", "top");
        }
    }
    if(temp.match("front")){
        if(temp.match("bottom")){
            this.position = temp.replace("front", "behind");
        }
        if(temp.match("top")){
            this.position = temp.replace("top", "bottom");
        }
    }
    if(temp.match("behind")){
        if(temp.match("top")){
            this.position = temp.replace("behind", "front");
        }
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "top");
        }
    }
}
Brick.prototype.topBottomLeft = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("right")){
            this.position = temp.replace("right", "front");
        }
        if(temp.match("left")){
            this.position = temp.replace("left", "behind");
        }
        if(temp.match("front")){
            this.position = temp.replace("front", "left");
        }
        if(temp.match("behind")){
            this.position = temp.replace("behind", "right");
        }
    }
    if(temp.match("front")){
        if(temp.match("left")){
            this.position = temp.replace("front", "behind");
        }
        if(temp.match("right")){
            this.position = temp.replace("right", "left");
        }
    }
    if(temp.match("behind")){
        if(temp.match("left")){
            this.position = temp.replace("left", "right");
        }
        if(temp.match("right")){
            this.position = temp.replace("behind", "front");
        }
    }
}
Brick.prototype.topBottomRight = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("right")){
            this.position = temp.replace("right", "behind");
        }
        if(temp.match("left")){
            this.position = temp.replace("left", "front");
        }
        if(temp.match("front")){
            this.position = temp.replace("front", "right");
        }
        if(temp.match("behind")){
            this.position = temp.replace("behind", "left");
        }
    }
    if(temp.match("front")){
        if(temp.match("left")){
            this.position = temp.replace("left", "right");
        }
        if(temp.match("right")){
            this.position = temp.replace("front", "behind");
        }
    }
    if(temp.match("behind")){
        if(temp.match("left")){
            this.position = temp.replace("behind", "front");
        }
        if(temp.match("right")){
            this.position = temp.replace("right", "left");
        }
    }
}
Brick.prototype.frontBehindPos = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("right")){
            this.position = temp.replace("right", "bottom");
        }
        if(temp.match("left")){
            this.position = temp.replace("left", "top");
        }
        if(temp.match("top")){
            this.position = temp.replace("top", "right");
        }
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "left");
        }
    }
    if(temp.match("top")){
        if(temp.match("left")){
            this.position = temp.replace("left", "right");
        }
        if(temp.match("right")){
            this.position = temp.replace("top", "bottom");
        }
    }
    if(temp.match("bottom")){
        if(temp.match("left")){
            this.position = temp.replace("bottom", "top");
        }
        if(temp.match("right")){
            this.position = temp.replace("right", "left");
        }
    }
}
Brick.prototype.frontBehindNeg = function(){
    let temp = this.position;
    if(temp.match("mid")){
        if(temp.match("right")){
            this.position = temp.replace("right", "top");
        }
        if(temp.match("left")){
            this.position = temp.replace("left", "bottom");
        }
        if(temp.match("top")){
            this.position = temp.replace("top", "left");
        }
        if(temp.match("bottom")){
            this.position = temp.replace("bottom", "right");
        }
    }
    if(temp.match("top")){
        if(temp.match("left")){
            this.position = temp.replace("top", "bottom");
        }
        if(temp.match("right")){
            this.position = temp.replace("right", "left");
        }
    }
    if(temp.match("bottom")){
        if(temp.match("left")){
            this.position = temp.replace("left", "right");
        }
        if(temp.match("right")){
            this.position = temp.replace("bottom", "top");
        }
    }
}


