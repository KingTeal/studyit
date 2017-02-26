// 1 创建模块
define(['jquery', 'template', 'cookie'], function($, template) {
	// 为了避免 以下代码出问题, 做以下修改!
	// 因为以下所有的操作, 与登录页面是没有关系的! 
	// 所以, 如果是登录页面, 就不执行判断以后的代码了!
	if(location.pathname === '/login') {
		return;
	}
	
	// 作用: 实现登录判断
	// 如果没有登录, 会跳到登录页, 让用户登录!
  if (!$.cookie('PHPSESSID') && location.pathname !== '/login') {
    location.href = '/login';
  }

/*  // 作用: 设置用户的头像和用户名
  var userinfo = JSON.parse( $.cookie('userinfo') );
  var $profile = $('.profile');
  $profile.find('img').attr('src', userinfo.tc_avatar)
  $profile.find('h4').text(userinfo.tc_name);*/

  // 使用模板引擎来设置用户信息
  var userInfoTpl = 
    '<!-- 头像 -->' +
    '<div class="avatar img-circle">' +
      '<img src="{{ tc_avatar }}">' +
    '</div>' +
    '<h4>{{ tc_name }}</h4>';

  // 数据
  var userinfo = JSON.parse( $.cookie('userinfo') || '{}' );
  // 获取一个渲染函数
  var render = template.compile(userInfoTpl);
  // 根据数据，生成html字符串结构
  var html = render(userinfo);
  // 设置内容
  $('#userinfo').html( html );

  // 作用: 退出
  $('#logout').on('click', function() {
    if (!confirm('您确定要退出吗？')) {
      return;
    }

    $.ajax({
      url: '/api/logout',
      type: 'post',
      success: function(data) {
        if (data.code === '200') {
          location.href = '/login';
        }
      }
    });
  });

  /*// 因为每一个页面中都需要用到该方法，所以，需要创建一个工具模块
  // 这个模块中，用来存放所有页面共用的一些方法！
  // 左侧菜单的高亮处理
  var setMenuClass = function( path ) {
    var $aLink = $('.navs a[href="' + path + '"]');
    $aLink.addClass('active');
    // 将其兄弟元素移除样式
    $aLink.parent().siblings().children('a').removeClass('active')
  };
  
  setMenuClass('/teacher/list');*/
});
