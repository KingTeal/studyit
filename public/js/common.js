// 1 进行登录的判断
// 根据 cookie 中有没有 PHPSESSID
// 如果没有，就说明用户没有登录，此时，应该跳到：登录页面！

// 只要是通过登录页面登录的，此时，服务器就会自动给我们设置好一个 PHPSESSID
// 但是，如果没有登录，此时，说明没有这个id，那么，就让用户跳到登录页面进行登录！

if(!$.cookie('PHPSESSID') && location.pathname !== '/login') {
	location.href = '/login';
}

// 根据用户登录的时候， 设置好的cookie 获取到用户的用户名和头像
// 进行设置！
var userinfo = JSON.parse( $.cookie('userinfo') );
var $profile = $('.profile');
// 查找当前元素的所有后代元素
$profile.find('img').attr('src', userinfo.tc_avatar)
$profile.find('h4').text(userinfo.tc_name);


// 退出功能！
$('#logout').on('click', function() {
	// alert(123213);
	if( !confirm('您确定要退出吗？') ) {
		return;
	}

	$.ajax({
		url: '/api/logout',
		type: 'post',
		success: function( data ) {
			if( data.code === '200' ) {
				location.href = '/login';
			}
		}
	});
});