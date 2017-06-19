// var events = require('events');

// var eventEmitter = new events.EventEmitter();

// var listenter1 = function listenter1() {
//     console.log('监听器 listenter1 执行。')
// };

// var listenter2 = function listenter2() {
//     console.log('监听器 listenter2 执行');   
// }

// eventEmitter.addListener('connection', listenter1);


// eventEmitter.on('connection', listenter2);


// var eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + " 个监听器监听连接事件。");

// eventEmitter.emit('connection');

// eventEmitter.removeListener('connection', listenter1);
// console.log("listener1不在受监听");

// eventEmitter.emit('connection');


// eventListeners = eventEmitter.listenerCount('connection');
// console.log(eventListeners + " 个监听器监听连接事件。");
// console.log('执行完毕');


// buf = new Buffer(256);
// len = buf.write("www.baidsssu.com");

// console.log("写入字节数： " + len);

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde