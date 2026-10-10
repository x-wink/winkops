# 更新日志

## v1.4.0

[compare changes](https://github.com/x-wink/winkops/compare/v1.1.0...v1.4.0)

> **行为变化**：远程路径以盘符开头（如 `C:/site`）缺省判配置错误，防 Windows Git Bash 把 `/path` 改写成本机路径后写错远端位置。远端确实是 Windows 主机的，加 `--allow-drive-path` 或在配置文件写 `allowDrivePath: true`。
>
> 版本号从 1.1.0 直接到 1.4.0：`v1.2.0`–`v1.3.2` 的 tag 被改名前的旧包占用。

### 🚀 Enhancements

- --help 列出随包技能及其安装位置，缺配置时提示不会自动读取 wink.json，远程路径缺省拒绝盘符开头（防 Git Bash 改写），--allow-drive-path / allowDrivePath 放行 Windows 远端 ([5c697b4](https://github.com/x-wink/winkops/commit/5c697b4))

### 📖 Documentation

- CLAUDE.md 按当前全局约定重写——通用协作规则改为指向 wink-skills RULES.md、不再复述（去掉与「按需提交」冲突的「不主动提交」），面向人的文字统一中文，只描述现状 ([ff3177a](https://github.com/x-wink/winkops/commit/ff3177a))
- 架构与路线图同步盘符路径拦截、配置显式指定与 --help 列出随包技能 ([5890747](https://github.com/x-wink/winkops/commit/5890747))

### ✅ Tests

- 补盘符拦截的 edit、小写盘符与反例单测，e2e 验证命令行没传 --allow-drive-path 时不覆盖配置文件的 allowDrivePath ([d162579](https://github.com/x-wink/winkops/commit/d162579))

### ❤️ Contributors

- 向文可 <1041367524@qq.com>

## v1.1.0

[compare changes](https://github.com/x-wink/winkops/compare/v3.0.0...v1.1.0)

### 🚀 Enhancements

- PrivateKey 支持配置私钥文件路径（resolveConfig 统一归一化，支持 ~/ 展开） ([e50e0cd](https://github.com/x-wink/winkops/commit/e50e0cd))

### 💅 Refactors

- 重命名为 winkops（@xwink/ops），重置版本至 1.0.0 ([2a7a419](https://github.com/x-wink/winkops/commit/2a7a419))

### 📖 Documentation

- **roadmap:** 记录 provision recipe 实战暴露的短板（docker 端口/数据卷不可配、nvm 境内不可达） ([0857df7](https://github.com/x-wink/winkops/commit/0857df7))

### ❤️ Contributors

- Xwink <1041367524@qq.com>

## v1.0.0

`@xwink/ops`（CLI `winkops`）首个版本：面向个人开发者与 AI Agent 的 agentless「SSH 快捷操作入口」，覆盖单机服务器的完整生命周期。

### 能力

- **部署**：单机 / 多机 SFTP 传输，增量（size+mtime）、`.winkignore`、扁平化、清空、覆盖控制、失败重试 + 并发池、文件级备份/回滚；`pull` 下载、`ls` 浏览。
- **运维**：`status`（资源快照）、`logs`（tail/grep，`--follow`）、`ps`、`exec`（`--stream`）只读原语；`service`（systemd/pm2/docker）、`edit`（守护式改配置）写操作（须 `--yes`，记审计）。
- **环境初始化**：`provision` 按声明式 `stack` 收敛单机——`nodejs`/`jdk`/`python`/`docker` + `nginx`/`redis`/`mysql`（install + verify），守护式 `configure` 下发配置文件；`--dry-run` 出 diff、`--yes` 执行、secret 脱敏。
- **配置**：JSON/YAML、多环境深合并（`--env`）、`${ENV_VAR}` secrets 注入。
- **接口**：所有命令 `--json` 结构化输出 + 退出码；稳定编程式 API（`@xwink/ops` 库入口）；随包 Skill（`deploy`/`pull`/`ops`/`provision`）供 Claude Code 调用。
