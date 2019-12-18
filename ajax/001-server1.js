/*
    1.搭建一个基本的服务器
    2.读取本地资源文件(*)
*/
const http = require('http')
const fs = require('fs')
// console.log(http)

const server = http.createServer(function(req,res){
	/* //基本服务器
	//改变状态码
	res.statusCode = 200;
	//向前台返回内容
	res.end('Hello World\n')
	// console.log(server)
	*/
	// console.log(req.url)
	const urlStr = req.url
	if(urlStr == './favicon.ico'){
		res.end('favicon.ico')
	}
	const filePath = './'+ urlStr
	fs.readFile(filePath,function(err,data){
		if(!err){
			res.end(data)
		}else{
			res.statusCode = 404
			res.end('not found...')
		}
	})

})

server.listen(3000,'127.0.0.1',()=>{
	console.log('server running at http://127.0.0.1:3000')
})