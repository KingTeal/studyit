<?php 
// 处理错误级别 不显示 注意（notice）信息
error_reporting(E_ALL & ~E_NOTICE);

// 第一步：拿到 /teacher/add
$pathinfo = $_SERVER['PATH_INFO'];
// 第二步：根据 '/' 将字符串分割为数组
$pathinfo = explode('/', substr($pathinfo, 1));

// 当前文件夹名称（/teacher/add 中的 teacher）
$folder = $pathinfo[0];

// 当前文件名称（/teacher/add 中的 add）
$filename = $pathinfo[1];

// 如果只输入了一个路径（/login）
if( count($pathinfo) == 1 ) {
	// 判断一下， $folder 是否为空
	// 如果为空，说明：说明 index.php 后面没有路径
	// 如果不为空，说明后面是有一个路径的！
	if(!$folder) {
		$filename = 'index';
	} else {
		$filename = $folder;
	}

	$folder = 'index';
}

// 引入一个文件，并返回到前台（浏览器）
include '/views/' . $folder . '/' . $filename . '.html';

?>