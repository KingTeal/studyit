define(['jquery', 'template'], function($, template) {
	// 根据url中有没有 tc_id 参数来确定是编辑还是添加！
	// 怎么获取到 url 中的参数？？？
	// console.log(location)
	function getParam(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	}

	var id = getParam('tc_id');

	if(id) {
		// 有id参数，此时，就是编辑！
		// 此时，需要根据id获取到讲师的信息
		$.ajax({
			url: '/api/teacher/edit?tc_id=' + id,
			type: 'get',
			success: function( data ) {
				// console.log(data)
				
				// 拿到数据以后，使用模板引擎渲染页面
				// 给数据中添加一个标题，用来显示 是编辑还是添加
				// 因为页面结构就是根据 数据的值 来渲染的！
				data.result.title = '讲师编辑';
				data.result.btnTxt = '修 改';

				var html = template('teacher_edit_tpl', data.result);
				$('#teacher_edit').html( html );
			}
		});
	} else {
		// 添加
		// 模板引擎中可以提供一个空的数据，此时，也会展示HTML结构！
		// 只不过，数据没有而已！
		var html = template('teacher_edit_tpl', {
			title: '讲师添加',
			btnTxt: '添 加'
		});
		$('#teacher_edit').html( html );
	}

});