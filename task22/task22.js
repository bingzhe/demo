/*
dom对象的innerText和innerHTML有什么区别？
innnerText只显示元素里的文本
innerHTML显示与元素里标签和文本
*/
/*
elem.children和elem.childNodes的区别？
elem.children返回指定元素的子元素集合，只包含Element子节点。
elem.childNodes返回NodeList对象（类数组对象），不但包括Element节点，还包括Text节点（换行，空格）
和注释节点。
*/
/*
查询元素有几种常见的方法？
*/

var btn = document.querySelector('#btn-modal'),
    modal = document.querySelector('#modal-1'),
    modalCt = document.querySelector('#modal-1 .modal-ct');

btn.addEventListener('click', function(e){
    e.stopPropagation();
    showModal(modal);
});

modalCt.addEventListener('click', function(e){
   e.stopPropagation();
   if( hasClass(e.target, 'close') || hasClass(e.target, 'btn-cancel') ){
       hideModal(modal);
   }
});

document.body.addEventListener('click', function(){
    hideModal(modal);
});



function showModal(modal){
    modal.style.display = 'block';
}
function hideModal(modal){
    modal.style.display = 'none';
}
function hasClass (ele, cls){
    return !!ele.className.match(new RegExp('\\b'+cls+'\\b'));
}
