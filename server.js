/**
 * Created by ysy on 2016/8/28.
 */
var http = require("http")
var fs = require("fs")
var path = require("path")
var config = require("./config")
var url = require("url")
var server = http.createServer()
server.on("reqpasteuest", function (req, res) {
    var urlObj = url.parse(req.url, true)
    // console.log(urlObj)
    //路径有中文必须要解码,要不然会找不到路径
    var pathName = decodeURI(urlObj.pathname)
    var query = urlObj.query
    if (pathName === "/") {
        fs.readFile(path.join(__dirname, "./index.html"), function (err, data) {
            if (err) {
                return req.end(err.message)
            }
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.end(data)
        })
    } else if (pathName.startsWith("/node_modules/") || pathName.startsWith("/uploads/")) {
        fs.readFile(path.join(__dirname, pathName), function (err, data) {
            if (err) {
                return req.end(err.message)
            }
            res.end(data)
        })
    } else if (pathName === "/add") {
        fs.readFile(path.join(__dirname, "./add.html"), function (err, data) {
            if (err) {
                return req.end(err.message)
            }
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.end(data)
        })
    } else if (pathName === "/edit") {
        fs.readFile(path.join(__dirname, "./edit.html"), function (err, data) {
            if (err) {
                return req.end(err.message)
            }
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.end(data)
        })
    }
})
server.listen(config.port, function () {
    console.log("服务器启动成功")
})