 var data = [
    '北京',
    '上海',
    '广州',
    '深圳',
    '杭州',
    '长沙',
    '合肥',
    '宁夏',
    '成都',
    '西安',
    '南昌',
    '上饶',
    '沈阳',
    '济南',
    '厦门',
    '福州',
    '九江',
    '宜春',
    '赣州',
    '宁波',
    '绍兴',
    '无锡',
    '苏州',
    '徐州',
    '东莞',
    '佛山',
    '中山',
    '成都',
    '武汉',
    '青岛',
    '天津',
    '重庆',
    '南京',
    '九江',
    '香港',
    '澳门',
    '台北'
  ];
  var nums = 5;
  var render = function (data, curr){
      var arr = [];
      var thisData = data.concat().splice(curr*nums - nums, nums);
      layui.each(thisData, function(idnex, item){
          arr.push('<li>' + item + '</li>');
      });
      return arr.join('');
  }

  laypage({
      cont: 'demo8',
      pages: Math.ceil(data.length/nums),
      jump: function(obj){
          document.getElementById('biuuu_city_list').innerHTML = render(data, obj.curr);
      }
  });