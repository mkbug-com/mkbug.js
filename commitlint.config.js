/*
 * @Description: description
 * @Author: caoky(caoky@dchealth.com)
 * @Date: 2020-11-05 11:12:36
 * @LastEditors: caoky(caoky@dchealth.com)
 * @LastEditTime: 2020-11-09 15:35:46
 */
const types = [
  'build',
  'ci',
  'chore',
  'docs',
  'feat',
  'fix',
  'pref',
  'refactor',
  'revert',
  'style',
  'test'
]

const typeEnum = {
  rules: {
    'type-enum': [2, 'always', types]
  },
  value: () => types
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
    'type-enum': typeEnum.rules['type-enum']
  }
}
