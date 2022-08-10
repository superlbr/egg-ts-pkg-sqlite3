import { Service } from 'egg';

/**
 * 基于数据库操作进行封装
 */
class DbExtraService extends Service {

    async checkVersion() {
        const { service } = this
        // 检查数据库版本
        const version = await service.db.index.queryRow('select * from version')
        console.log('sqlite3 已连接', version)
    }

    async createParam(params, table) {
        if (Object.keys(params).length == 0 || !table) return
        const { service } = this
        let attr = ''
        const vals: any = []

        for (const k in params) {
            attr += `'${k}',` // 字符串拼接，防止特殊键名
            vals.push(params[k])
        }
        if (attr.length > 0) attr = attr.substring(0, attr.length - 1)

        const sql = `INSERT INTO ${table} (${attr}) VALUES (${vals.map(_ => `?`).join(',')})`
        const res = await service.db.index.run(sql, vals)
        return res
    }

    async updateParamsById(id, params, table) {
        if (!id || Object.keys(params).length == 0 || !table) return
        const { service } = this

        const keys: string[] = []
        const vals: any[] = []
        for (const k in params) {
            keys.push(k)
            vals.push(params[k])
        }
        const sql = `UPDATE ${table} SET ${keys.map(k => `${k} = ?`).join(',')} `
        const res = await service.db.index.run(`${sql} WHERE id = ${id}`, vals)
        return res
    }
}

module.exports = DbExtraService