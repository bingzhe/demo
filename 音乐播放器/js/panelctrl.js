function GetMusic($ct) {
    this.$ct = $ct;
    this.init();
    this.bind();
}

GetMusic.prototype.init = function(){
    this.$audio = $('#music');
    this.audio - $('#music')[0];
    this.$panel = this.$ct.find('.panel');
    this.$channels = this.$ct.find('.channels');
    this.$channelBtn = this.$ct.find('.channel-btn');
    this.$channelsList = this.$ct.find('.channels-list');
    this.$onoff = this.$ct.find('.on-off');
    this.$prev = this.$ct.find('.prev');
    this.$next = this.$ct.find('.next');
    this.$songName =this.$ct.find('.title .song-name');
    this.$singer = this.$ct.find('.title .singer');
    this.$rotate = this.$ct.find('.rotate');
    this.$disco = this.$ct.find('.rotate .disco');
    this.$needle = this.$ct.find('.rotate .needle');
    this.$cover = this.$ct.find('.current-cover');
    this.$getLyric = this.$ct.find('.get-lyric');
    this.$lyric = this.$ct.find('.lyric');
    this.$lyricCt = this.$ct.find('.lyric-ct');
    this.$lyricBox = this.$ct.find('.lyric-box');
    this.$lyricBtn = this.$ct.find('.lyric-btn');
    this.channelId = 'pubkic_tuijian_spring';
    this.song = {};
    this.currentTimeSec = 0;
    this.lyricTimeArr = [];
    this.islyricShow = false;
    this.letsPlay = false;
    this.songArr = [];

}

GetMusic.prototype.bind = function(){
    this.channelsIconChange();
    this.channelSelect();
    this.panelReady();
    this.rotateCtrl();
    this.canPlay();
    this.autoPlay();
    this.prev();
    this.nextSong();
    this.onOff();
    this.needleChange();
    this.lyricShow();
    this.timeUpdate();
};
// 频道列表切换
GetMusic.prototype.channelsIconChange = function(){
    var _this = this;
    this.$channels.on('mouseover', function(){
        _this.$channelsList.fadeIn(200);
        _this.$channelBtn.removeClass('icon-menu').addClass('icon-minus');
    });
    this.$channels.on('mouseleave', function(){
        _this.$channelsList.fadeOut(200);
        _this.$channelBtn.removeClass('icon-minus').addClass('icon-menu');
    })
};

GetMusic.prototype.channelSelect = function(){
    var _this = this;
    this.$channelsList.on('click', 'li', function(){
        _this.audio.pause();
        $(this).siblings().removeClass('list-selected');
        $(this).addClass('list-selected');
        _this.channelId = $(this).attr('channel-id');
        _this.letsPlay = true;
        _this.getAndReset(_this.channelId);
    });
};

GetMusic.prototype.panelReady = function(){
    var _this = this;
    this.$ct.ready(function(){
        $.get('http://api.jirengu.com/fm/getChannels.php')
            .done(function(channelsStr){
                var channelsArr =JSON.parse(channelsStr).channels;
                for (var i = 0; i < channelsArr.length; i++){
                    var channelName = channelsArr[i].name;
                    var channelID = channelsArr[i].channel_id;
                    var html = '<li channel-id=\"' + channelID + '\">' + channelName +'</li>';
                    _this.$channelsList.append(html);
                }
                $('.channels-list li').first().addClass('list-selected');
                _this.getAndReset(_this.channelId);
                _this.$disco.toggleClass('active');
                _this.$disco.css('animation-play-state', 'paused');
            })
    });
}