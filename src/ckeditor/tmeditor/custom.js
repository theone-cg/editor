import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import _ from 'lodash'

const getValue = props => {
  return _.get(props, 'value')
}
const getFontStyle = (evt, editor) => {
  const commands = editor.commands
  let style = {}

  let heading = commands.get('heading')
  style.heading = getValue(heading)

  let bold = commands.get('bold')
  style.bold = getValue(bold)

  let italic = commands.get('italic')
  style.italic = getValue(italic)

  let strikethrough = commands.get('strikethrough')
  style.strikethrough = getValue(strikethrough)

  let underline = commands.get('underline')
  style.underline = getValue(underline)

  let align = commands.get('alignment')
  style.align =  getValue(align)

  let fontSize = commands.get('fontSize')
  style.fontSize = getValue(fontSize)

  let fontColor = commands.get('fontColor')
  style.fontColor = getValue(fontColor)

  let fontBackgroundColor = commands.get('fontbackgroundcolor')
  style.fontBackgroundColor = getValue(fontBackgroundColor)

  return style
}

export default class Custom extends Plugin {
  init() {
    const editor = this.editor
    let execFontStyle = null

    const customConfig = editor.config.get('custom')
    if (_.isFunction(customConfig.getFontStyle)) {
      execFontStyle = customConfig.getFontStyle
    }
    // editor.editing.view.document.on('selectionChange', (evt, data) => {
    //   console.log('selectionChange', data)
    // })
    // editor.editing.view.document.on('selectionChangeDone', (evt, data) => {
    //   console.log('selectionChangeDone', data)
    // })
    if (execFontStyle) {
      editor.editing.view.document.on('click', evt => {
        let fontStyle = getFontStyle(evt, editor)
        execFontStyle(fontStyle)
      })
      editor.editing.view.document.on('keyup', evt => {
        let fontStyle = getFontStyle(evt, editor)
        execFontStyle(fontStyle)
      })
      editor.editing.view.document.on('focus', evt => {
        let fontStyle = getFontStyle(evt, editor)
        execFontStyle(fontStyle)
      })
    }    
  }
}