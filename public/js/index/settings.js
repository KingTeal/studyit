define(['jquery', 'template', 'ckeditor', 'uploadify', 'cookie','datelanguage','region', 'form'], function($, template, CKEDITOR) {
	// 实现功能的思路：
	// 1 查看文档，找到查看 个人中心 对应的接口
	// 2 拿到接口，并发送 ajax 请求，获取数据
	// 3 根据接口返回的数据，到 settings 页面中写好模板
	// 		根据数据挖坑！
	// 4 调用 template 方法，渲染数据
	
	// 获取用户的详细信息
	$.ajax({
		url: '/api/teacher/profile',
		type: 'get',
		success: function( data ) {
			// console.log(data)

			if(data.code !== 200) {
				return;
			}

			var html = template('user_settings_tpl', data.result);
			$('#user_settings').html( html );

			//  省市区县选择
			$('#pcd').region({
				url: '/public/assets/jquery-region/region.json'
			});
			// 因为要获取的元素是通过 ajax+template 渲染出来的，所以，需要等到页面
			// 渲染之后，才能够调用！！！
			// 头像上传
			$('#upfile').uploadify({
				swf: '/public/assets/uploadify/uploadify.swf',
				// 与服务器约定好的上传文件的名称，服务器就是根据这个名称来获取到用户上传的文件
				fileObjName: 'tc_avatar',
				uploader: '/api/uploader/avatar',
				fileTypeExts: '*.gif; *.jpg; *.png',
				fileSizeLimit : '1MB',
				buttonText: '',
				height: 120,
				width: 120,
				onUploadSuccess : function(file, data, response) {
		    	var ret = JSON.parse(data);
		    	if(ret.code !== 200) {
		    		return;
		    	}

		    	// 拿到图片路径，并且渲染
		    	$('.preview').children('img').attr('src', ret.result.path);
		    	// 重新设置侧边栏中的头像
		    	// 1 需要修改cookie中头像的值
		    	// 2 把头像img的src修改为当前头像
		    	
		    	var userinfo = $.cookie('userinfo');
		    	var userinfoObj = JSON.parse( userinfo );
		    	userinfoObj.tc_avatar = ret.result.path;
		    	$.cookie('userinfo', JSON.stringify(userinfoObj));

		    	// 修改头像的地址
		    	$('#userinfo').find('img').attr('src' , ret.result.path);
		    }
			});
			
			// 使用富文本编辑器
			CKEDITOR.replace( 'tc_introduce' );
		}
	});

	
	$('#user_settings').on('submit','form',function () {
		var p = $('#tc_province').children(':selected').text();
		var c = $('#tc_city').children(':selected').text();
		var d = $('#tc_district').children(':selected').text();

		$(this).ajaxSubmit({
			url: '/api/teacher/modify',
			type:'post',
			data: {
				tc_hometown: p + '|' + c + '|' + d 
			},
			success: function (data) {
				console.log(data);
			}
		})
		return false;
	})

});