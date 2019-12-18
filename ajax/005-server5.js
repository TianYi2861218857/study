/*
    1.搭建一个基本的服务器
    2.读取本地资源文件
    3.处理POST请求
    4.GET请求传参
    5.封装函数(htm中的ajax请求)(*)
*/
const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function(req,res){
	// console.log(req.method)
	const urlStr = req.url
	if(req.method == 'POST'){
		let body= ''
		req.on('data',function(chunk){
			body += chunk
		})
		req.on('end',function(){
			console.log("body:::",body)
			res.end(body)
		})
	}else if(req.method == 'GET'){
		if(urlStr.search(/\?/) != -1){
			const parm = url.parse(urlStr,true).query
			const json = JSON.stringify(parm)
			console.log(json)
			res.end(json)
		} 
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
	}
})

server.listen(3001,'127.0.0.1',()=>{
	console.log('server running at http://127.0.0.1:3001')
})