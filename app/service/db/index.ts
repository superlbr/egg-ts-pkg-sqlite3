
var fs = require('fs')
import { Service } from 'egg'
import { Pool } from "better-sqlite-pool"

let pool
class DbService extends Service {
    /**
     * sqlite文件需要放在运行程序外储存
     */
    async init() {
        const { service } = this
        const dbPath = process.cwd()+ '/public/egg_ts_pkg.db3'
        const isExistDb = fs.existsSync(dbPath)
        if (!isExistDb) {
            fs.copyFileSync(__dirname + '/../../public/egg_ts_pkg.db3', dbPath)      
        }
        pool = new Pool(dbPath)
        // 打印数据库版本
        await service.db.extra.checkVersion()
    }

    /**
     * 读取某行数据
     * @param sql 
     * @returns {} Row | undefined
     */
    async queryRow(sql) {
        var db = await pool.acquire();

        var res = db.prepare(sql).get();
        db.release();
        return res
    }

    /**
     * 读取列表
     * @param sql 
     * @returns { rows: [], length: number}
     */
    async queryRowList(sql) {
        var db = await pool.acquire();

        var res = db.prepare(sql).all();
        db.release();
        return res
    }

    /**
     * 执行DML
     * @param sql 
     * @returns { changes: number, lastInsertRowid: number}
     */
     async run(sql, arg) {
        var db = await pool.acquire();

        var res = db.prepare(sql).run(...arg);
        db.release();
        return res
    }

    close() {
        pool.close()
    }
}

module.exports = DbService