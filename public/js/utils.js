define(['jquery'], function($) {

	return {
		setMenuClass: function( path ) {
	    var $aLink = $('.navs a[href="' + path + '"]');
	    $aLink.addClass('active');
	    // 将其兄弟元素移除样式
	    $aLink.parent().siblings().children('a').removeClass('active')
	  }
	};
});