require.config({
	baseUrl: '/public',
	paths: {
		jquery: 'assets/jquery/jquery.min',
		bootstrap: 'assets/bootstrap/js/bootstrap.min',
		nprogress: 'assets/nprogress/nprogress',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		template: 'assets/artTemplate/template',
		datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker',
		datelanguage: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		form: 'assets/jquery-form/jquery.form',
		validate: 'assets/jquery-validate/jquery-validate.min',
		uploadify: 'assets/uploadify/jquery.uploadify',
		ckeditor: 'assets/ckeditor/ckeditor',

		common: 'js/common',
		utils: 'js/utils'
	},
	
	shim: {
		// 因为 bootstrap 需要依赖与jQuery才能使用，所以，需要配置依赖项
		bootstrap: {
			deps: ['jquery']
		},
		datelanguage: {
			deps: ['datepicker']
		},
		validate: {
			deps: ['jquery']
		},
		uploadify: {
			deps: ['jquery']
		},
		ckeditor: {
			// 因为 ckeditor 本身是不支持模块化功能(AMD规范)的
			// 因此,需要我们自己配置 exports
			// 又因为平时在使用的时候,是这种使用方式: CKEDITOR.replace('txt'.replace('txt')
			// 所以, 此处, 暴露 CKEDITOR !!!
			exports: 'CKEDITOR'
		},
		utils: {
			deps: ['jquery']
		}
	}
});

// 因为当前 js 在每一个页面中都会引入的! 所以,我们可以将原来引入 common.js 的操作
// 放到 这个文件中完成!
require(['common']);

// 因为当前 js 在每一个页面中都会引入的! 所以,我们可以将原来引入 common.js 的操作
// 放到 这个文件中完成!
require(['common']);


// 1 修改 views/common/script.html 文件, 只引入 requirejs 以及 config 文件
// 2 在 public/js/config.js 中, 对模块进行路径的配置
// 3 创建 public/js/index/login.js 文件, 使用模块化的方式, 创建一个 登录模块
// 4 在 views/index/login.html 页面中通过 require(['js/index/login']) 将写好的登录模块
// 	引入!
