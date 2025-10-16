import { ISelectMenu, IDomEditor, Boot, SlateEditor, SlateNode, SlateElement } from '@wangeditor/editor'
import { cloneDeep } from 'lodash-es'
import PubSub from 'pubsub-js'
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
    const newSelection = editor.selection
    PubSub.publish('ai-menu', {
      editor,
      eventKey: value,
      editContent: editor.getSelectionText(),
      content: editor.getText()
    })

    // 替换选中的内容
    switch (value) {
      case 'polish':
        // SlateEditor.marks(editor)
        // 对选择的文字添加浅蓝色的背景色
        editor.addMark('bgColor', 'lightblue')
        // editor.insertText('<span id="polish"></span>')
        // editor.addMark('bold', true)
        // editor.insertText('润色')
        break
      case 'optimize':
        // editor.insertText('优化')
        break
      default:
        break
    }
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

