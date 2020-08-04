import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class RakutenPlugin extends Plugin {
  init() {
    console.log('Rakuten - plugin')
    const editor = this.editor

    const config = editor.config.get('rakuten')
    const element = config.el
    element.addEventListener('click', () => {
      editor.editing.view.focus()
    })
    editor.editing.view.document.on('selectionChange', (evt, data) => {
      console.log('selectionChange', data)
    })
    editor.editing.view.document.on('selectionChangeDone', (evt, data) => {
      window.fk = data
      console.log('selectionChangeDone', data)
    })
    editor.editing.view.document.on('mousedown', evt => {
      let bold = editor.commands.get('bold')
      console.log('bold', bold.value)
      let italic = editor.commands.get('italic')
      console.log('italic', italic.value)
    })
    editor.editing.view.document.on('keydown', evt => {
      let bold = editor.commands.get('bold')
      console.log('bold', bold.value)
      let italic = editor.commands.get('italic')
      console.log('italic', italic.value)
    })
    editor.editing.view.document.on('focus', evt => {
      // let bold = editor.plugins.get('Bold')
      // let bc = editor.commands.get('bold')
      // console.log(bold.isEnabled)
      // console.log(bc.value)
    })
  }
}