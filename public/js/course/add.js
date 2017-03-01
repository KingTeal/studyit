define(['jquery','validate','form'],function ( $ ) {
	
	var $form = $('#course_add_form');

	$form.validate({
		sendForm: false,
		onBlur: true,
		valid: function() {

			$form.ajaxSubmit({
				url: '/api/course/create',
				type: 'post',
				success: function( data ){
					if(data.code === 200 ){
						location.href = '/course/basic?cs_id=' + data.result.cs_id;
					}
				}
			})
		},

		eachInvalidField: function() {
    	// 验证失败
      $(this).parent().parent().addClass('has-error').removeClass('has-success')
    },

    eachValidField: function() {
    	// 验证成功
    	$(this).parent().parent().addClass('has-success').removeClass('has-error')
    },

    description: {
    	csNameDesc: {
    		required: '必填'
    	}
    }
	})
})