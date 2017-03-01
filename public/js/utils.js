define(['jquery'], function($) {
	// 模块依赖与 jQuery 是因为：当前模块中需要使用jQuery的功能！
	
	return {
		// 根据 url 参数，设置菜单高亮！
		setMenuClass: function( path ) {
	    var $aLink = $('.navs a[href="' + path + '"]');
	    $aLink.addClass('active');
	    // 将其兄弟元素移除样式
	    $aLink.parent().siblings().children('a').removeClass('active')
	  },
	    getParam: function (name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	 }
	};
});