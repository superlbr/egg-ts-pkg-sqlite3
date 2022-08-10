import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 配置运行时相关文件存储路径
  config.rundir = process.cwd() + "/run";

  // 配置日志目录
  config.logger = {
    dir: process.cwd() + "/logs",
  };

  // 配置静态资源路径
  config.static = {
    prefix: "/public",
    dir: process.cwd() + "/public",
  };

  return config;
};
