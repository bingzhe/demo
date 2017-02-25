/**
 * Created by Rana on 2017/2/25.
 */
function Progress($ct){
    this.$ct = $ct;
    this.init();
    this.bind();
};

Progress.prototype.init = function(){
    this.$audio = $('#music');
    this.audio = $('#music')[0];
    this.$FM = $('#FM');
    this.$progress = this.$ct;
    this.$progressBar = this.$ct.find('.progress-bar');
    this.$progressLine = this.$ct.find('.progress-line');
    this.$progressPathway = this.$ct.find('.progress-pathway');
    this.$progressHandle = this.$ct.find('.progress-handle');
    this.$currentTime = this.$ct.find('.current-time');
    this.$fullTime = this.$ct.find('.full-time');
    this.clock1;
    
    
    //拖拽可控制播放进度
    this.drag = this.$progressHandle.draggabilly({
        axis: 'x',
        containment: true
    })
}

Progress.prototype.bind = function(){
    this.dragMove();
    this.clickCtrl();
    this.timeText();
}

Progress.prototype.clickCtrl = function(){
    var _this = this;
    this.$audio.on('play', fucntion(){
        var fullTime = _this.audio.duration;
        _this.clock1 = setTime
    });
};

Progress.prototype.toLength = function(str){
    var num = parseInt(str.replace('px',''));
    return num;
};