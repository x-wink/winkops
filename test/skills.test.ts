import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { BUILTIN_SKILLS, skillsHelpText } from '../src/skills'

const skillsDir = path.resolve(__dirname, '..', '.claude', 'skills')

describe('内置技能', () => {
    it('登记表与 .claude/skills 下的目录一一对应', () => {
        const dirs = fs
            .readdirSync(skillsDir, { withFileTypes: true })
            .filter((d) => d.isDirectory() && fs.existsSync(path.join(skillsDir, d.name, 'SKILL.md')))
            .map((d) => d.name)
            .toSorted()
        expect(BUILTIN_SKILLS.map((s) => s.name).toSorted()).toEqual(dirs)
    })

    it('--help 说明列出每个技能、技能所在目录，并写明不会自动读取 wink.json', () => {
        const text = skillsHelpText(skillsDir)
        for (const s of BUILTIN_SKILLS) expect(text).toContain(s.name)
        expect(text).toContain(path.join(skillsDir, '<名字>', 'SKILL.md'))
        expect(text).toMatch(/不会自动读取当前目录的 wink\.json/)
        expect(text).toMatch(/MSYS_NO_PATHCONV/)
    })
})
