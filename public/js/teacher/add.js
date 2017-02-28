define(['jquery', 'template', 'utils', 'datelanguage', 'form', 'validate'], function($, template, utils) {
	
	// 左侧菜单高亮
	utils.setMenuClass('/teacher/list');
	
	// 根据url中有没有 tc_id 参数来确定是编辑还是添加！
	// 怎么获取到 url 中的参数？？？
	// console.log(location)
	function getParam(name) {
	   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	   var r = window.location.search.substr(1).match(reg);
	   if (r!=null) return (r[2]); return null;
	}

	// 表单验证，并提交
	var validateTeacher = function() {
		var $form = $('#teacher_edit').find('form')

		$form.validate({
			onKeyup: true,
	  	// 阻止表单默认的提交方式，改用ajax的方式提交！
	  	sendForm: false,
	  	
	    eachInvalidField: function() {
	    	// 验证失败
	      $(this).parent().parent().addClass('has-error').removeClass('has-success')
	    },

	    eachValidField: function() {
	    	// 验证成功
	    	$(this).parent().parent().addClass('has-success').removeClass('has-error')
	    },

	    valid: function() {
	    	// console.log('成功！');
	    	// 验证成功，会执行这个 valid 回调函数的中的代码
	    	if(id) {
					// 编辑
					$form.ajaxSubmit({
						url: '/api/teacher/update',
						type: 'post',
						// 因为表单中没有表示id的元素，所以，需要单独添加一个
						// tc_id 参数！！！
						// data: {tc_id: id}, 
						success: function( data ) {
							if( data.code === 200 ) {
								// console.log(data)
								alert('修改成功！');
							}
						}
					})
				} else {
					// 添加
					$form.ajaxSubmit({
						url: '/api/teacher/add',
						type: 'post',
						success: function( data ) {
							// console.log(data);
							if(data.code === 200) {
								location.href = '/teacher/list';
							}
						}
					})
				}

	    },

	    description: {
	    	tcNameDesc: {
	    		required: '用户名为必填项'
	    	},
	    	tcPassDesc: {
	    		required: '请输入密码'
	    	},
	    	tcJoinDateDesc: {
	    		required: '请选择入职日期'
	    	}
	    }
		});
	};

	// 获取用户id
	var id = getParam('tc_id');

	// 根据用户id判断是编辑还是添加
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

				// 表单验证
				validateTeacher();
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

		// 表单验证
		validateTeacher();
	}
	
	// 因为编辑页面是通过 ajax 请求获取数据再渲染到页面中的，所以，如果直接获取
	// form是获取不到的！
	// console.log( $('#teacher_edit').find('form') );

});