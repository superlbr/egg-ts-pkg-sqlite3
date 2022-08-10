class AppBootHook {
    constructor(app) {
        // @ts-ignore
        this.app = app;
    }

    // 可以用来加载应用自定义的文件，启动自定义的服务
    async didReady() {
        // @ts-ignore
        const ctx = await this.app.createAnonymousContext();
        await ctx.service.db.index.init()
    }

    async beforeClose() {
        // @ts-ignore
        const ctx = await this.app.createAnonymousContext();
        ctx.service.db.index.close()
    }
}

module.exports = AppBootHook;