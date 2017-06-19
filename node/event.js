// var EventEmitter = require('events').EventEmitter;

// var event = new EventEmitter();

// event.on('some_event', function(){
//     console.log('some_event 时间触发');
// });

// setTimeout(function(){
//     event.emit('some_event');
// }, 2000);


// console.log("aaaaaa");

var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('someEvent', function(arg1, arg2){
    console.log('listener1', arg1, arg2);
})

emitter.on('someEvent', function(arg1, arg2){
    console.log('listener2', 'arg1', 'arg2');
})

emitter.emit('someEvent', 'arg1', 'arg2');

var a = emitter.listenerCount('someEvent');
console.log(a);