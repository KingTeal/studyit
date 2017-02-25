// 1 创建模块
define(['jquery', 'cookie'], function($) {
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

  // 作用: 设置用户的头像和用户名
  var userinfo = JSON.parse( $.cookie('userinfo') );
  var $profile = $('.profile');
  $profile.find('img').attr('src', userinfo.tc_avatar)
  $profile.find('h4').text(userinfo.tc_name);

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
});
