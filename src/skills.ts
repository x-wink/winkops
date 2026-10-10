import path from 'node:path'

/**
 * 随包分发的 agent 技能（`.claude/skills/<name>/SKILL.md`，`package.json#files` 带上）。不软链进全局技能目录：
 * 常驻会让每个会话都背着它们的描述，而只有调用 winkops 时才用得上；改为在 `--help` 里列出，agent 跑一次帮助就找得到。
 * 新增或改名技能时同步这张表。
 */
export const BUILTIN_SKILLS = [
    { name: 'deploy', summary: '部署（SFTP 上传、备份与回滚、多机、多环境、配置文件写法）' },
    { name: 'pull', summary: '下载与浏览远程目录（pull / ls）' },
    { name: 'ops', summary: '运维原语：exec / status / logs / ps / service / edit' },
    { name: 'provision', summary: '按声明式 stack 初始化 / 收敛服务器环境' },
] as const

/** 根命令 `--help` 末尾的说明：内置技能所在目录、显式配置与 Windows 路径改写这两条最常踩的坑 */
export const skillsHelpText = (skillsDir: string): string => {
    const width = Math.max(...BUILTIN_SKILLS.map((s) => s.name.length))
    const rows = BUILTIN_SKILLS.map((s) => `  ${s.name.padEnd(width)}  ${s.summary}`)
    return [
        '',
        '内置技能（给 AI agent 的完整用法与安全规约，随包安装；动手前先读对应的 SKILL.md）：',
        ...rows,
        `  目录：${path.join(skillsDir, '<名字>', 'SKILL.md')}`,
        '',
        '配置：不会自动读取当前目录的 wink.json，每条命令都用 -c <配置文件> 指定，或用 --connect-* 参数给全连接信息。',
        'Windows Git Bash：MSYS 会把以 / 开头的参数改写成本机路径，先 export MSYS_NO_PATHCONV=1 再执行。',
    ].join('\n')
}
