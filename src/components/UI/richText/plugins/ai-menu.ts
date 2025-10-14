import { ISelectMenu, IDomEditor, Boot } from '@wangeditor/editor'

class AiMenu implements ISelectMenu {
  title: string
  tag: string
  width: number
  value: string
  constructor() {
    ; (this.title = 'My Select Menu'), (this.tag = 'select')
    this.width = 60
  }

  // 下拉框的选项
  getOptions (editor: IDomEditor) {
    // TS 语法
    // getOptions(editor) {            // JS 语法
    const options = [
      // {
      //   value: 'beijing',
      //   text: '北京',
      //   styleForRenderMenuList: { 'font-size': '32px', 'font-weight': 'bold' },
      // },
      { value: 'polish', text: '润色', },
      { value: 'optimize', text: '优化' },
    ]
    return options
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive (editor: IDomEditor): boolean {
    // TS 语法
    // isActive(editor) {                      // JS 语法
    return true
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue (editor: IDomEditor): string | boolean {
    // TS 语法
    // getValue(editor) {                               // JS 语法
    return 'polish' // 匹配 options 其中一个 value
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled (editor: IDomEditor): boolean {
    // TS 语法
    // isDisabled(editor) {                     // JS 语法
    return false
  }

  // 点击菜单时触发的函数
  exec (editor: IDomEditor, value: string | boolean) {
    console.log(editor, value);
    editor.insertText(value as string)
    editor.insertText(' ')

    // TS 语法
    // exec(editor, value) {                              // JS 语法
    // Select menu ，这个函数不用写，空着即可
  }
}
const aiMenuConf = {
  key: 'AiMenu',
  factory () {
    return new AiMenu()
  }
}
Boot.registerMenu(aiMenuConf)

export default aiMenuConf

