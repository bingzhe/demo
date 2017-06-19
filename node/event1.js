var events = require('events');

var eventEmitter = new events.EventEmitter();

var listenter1 = function listenter1() {
    console.log('监听器 listenter1 执行。')
};

var listenter2 = function listenter2() {
    console.log('监听器 listenter2 执行');   
}

eventEmitter.addListener('connection', listenter1);


eventEmitter.on('connection', listenter2);


var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listenter1);
console.log("listener1不在受监听");

eventEmitter.emit('connection');


eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");
console.log('执行完毕');