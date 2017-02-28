define(['jquery', 'template', 'utils', 'bootstrap'], function($, template, utils) {
	// 设置菜单高亮
	utils.setMenuClass('/teacher/list');

	var $teacher_list = $('#teacher_list');

	// 1 实现讲师列表
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success: function( data ) {
			console.log(data)
			if( data.code !== 200) {
				console.log('请求失败！')
				return;
			}

			// 根据模板以及数据渲染html结构
			var html = template('teacher_list_tpl', {list: data.result});
			$teacher_list.html( html );
		}
	});

	// 2 实现讲师详情的查看
	$teacher_list.on('click', '.view', function() {
		// 1 获取讲师详情
		// 2 展示模态框

		// 3 获取 id 
		var id = $(this).parent('td').data('id');
		// alert(id);

		$.ajax({
			url: '/api/teacher/view?tc_id=' + id,
			type: 'get',
			success: function( data ) {
				// console.log(data);
				data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');

				var html = template('teacher_info_tpl', data.result);
				$('#teacher_info').html( html );
				$('#teacherModal').modal();
			}
		})
	});

	// 3 注销或启用讲师
	$teacher_list.on('click', '.handle', function() {
		// 思路:
		// 如果当前状态是开启(0)的,那么点击后,就变为注销(1)
		// 如果当前状态是注销(1)的,那么点击后,就变为开启(0)
		
		var $this = $(this);
		// 0表示启用
		// 1表示注销
		var id = $this.parent('td').data('id'),
			status = $this.parent('td').data('status');
		
		// console.log(id, status)
		$.ajax({
			url: '/api/teacher/handle',
			type: 'post',
			data: {
				tc_id: id,
				tc_status: status
			},
			success: function( data ) {
				// console.log(data);
				if( data.code !== 200 ){
					return;
				}

				// 将展示的文字改变
				$this.text( data.result.tc_status === 1 ? '启 用' : '注 销' );
				// 将存储状态值的data- 修改!
				$this.parent('td').data('status', data.result.tc_status);
			}
		});
	});
});