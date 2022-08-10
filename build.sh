set -e

# 编译ts为js
npm run tsc

# 编译生成二进制文件
pkg . --targets node16-win-x64 --out-path ./dist

# 清理临时js文件
npm run clean