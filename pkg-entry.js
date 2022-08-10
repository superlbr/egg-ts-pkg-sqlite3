"use strict";
const fs = require("fs");

// 如果是egg的ts项目，由于egg-script会给ts项目通过-r引入sourcemap的注入文件，但是pkg的spawn不支持，所以把项目标识为飞ts
// 如果不是ts项目忽略一下两行
const pkgInfo = require("./package");
pkgInfo.egg.typescript = false; // 防止egg-script识别为 typescript 自动添加soucemap支持（--require 在pkg的spawn中不支持）

// 由于egg-script是默认以当前执行proccess.cwd() 路径为默认项目的，打包后需要每次输入 /snapshot/${项目文件夹名} 作为指定目录
// 所以，以下为修改参数，自动嵌入“/snapshot/${项目文件夹名}”
const baseDir = "C:/snapshot/" + fs.readdirSync("C:/snapshot")[0]; // windows所以C:/，其它/snapshot
// 当 start 的时候，自动嵌入bashDir为 /snapshot/${项目文件夹名}
// 如果要传入自定义启动参数也可以在这里处理,如指定是否后台运行，指定端口号等
const startIndex = process.argv.indexOf("start");
if (startIndex > -1) {
  process.argv = [].concat(
    process.argv.slice(0, startIndex + 1),
    baseDir,
    process.argv.slice(startIndex + 1)
  );
}

// 然后直接调起egg-scripts执行
require("./node_modules/egg-scripts/bin/egg-scripts.js");