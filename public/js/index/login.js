/* 这是登录模块 */
define(['jquery', 'cookie'], function($) {
	
  $('#loginForm').on('submit', function() {
    var params = $(this).serialize();

    $.ajax({
      url: '/api/login?' + params,
      type: 'get',
      success: function(data) {
        if (data.code === 200) {
          $.cookie('userinfo', JSON.stringify(data.result));
          // 跳转到首页！
          location.href = '/';
        } else {
          alert('登录失败！！！')
        }
      }
    });

    return false;
  });
  
});
