define(['jquery','template','utils'],function ($ , template, utils) {
	var cs_id = utils.getParam('cs_id');

	$.ajax({
		url: '/api/course/basic?cs_id=' + cs_id,
		type: 'get',
		success: function ( data ) {
			// console.log(data);
			if(data.code === 200 ){
				var html = template('course_basic_tpl',data.result);
				$('#course_basic').html(html);
			}
		}
	})
})