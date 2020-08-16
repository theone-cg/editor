// 编辑器的基础创建类
import Editor from '@ckeditor/ckeditor5-core/src/editor/editor'
import EditorUI from '@ckeditor/ckeditor5-core/src/editor/editorui'
import EditorUIView from '@ckeditor/ckeditor5-ui/src/editorui/editoruiview'
// import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker'
// import ComponentFactory from '@ckeditor/ckeditor5-ui/src/componentfactory'
import InlineEditableUIView from '@ckeditor/ckeditor5-ui/src/editableui/inline/inlineeditableuiview'
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor'
import ElementReplacer from '@ckeditor/ckeditor5-utils/src/elementreplacer'

// 基本编辑器IDE扩展接口API
import DataApiMixin from '@ckeditor/ckeditor5-core/src/editor/utils/dataapimixin'
import ElementApiMixin from '@ckeditor/ckeditor5-core/src/editor/utils/elementapimixin'

// 用于向编辑器类添加接口的辅助函数
import mix from '@ckeditor/ckeditor5-utils/src/mix'

// 从编辑器附加到的html元素获取数据的辅助函数
import getDataFromElement from '@ckeditor/ckeditor5-utils/src/dom/getdatafromelement'

// Helper function that binds the editor with an HTMLForm element.
import attachToFrom from '@ckeditor/ckeditor5-core/src/editor/utils/attachtoform'

// Basic features that every editor should enable.
// import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
// import Enter from '@ckeditor/ckeditor5-enter/src/enter'
// import Typing from '@ckeditor/ckeditor5-typing/src/typing'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import UndoEditing from '@ckeditor/ckeditor5-undo/src/undoediting'

// Basic features associated with the edited content.
// import BoldEditing from '@ckeditor/ckeditor5-basic-styles/src/bold/boldediting'
// import ItalicEditing from '@ckeditor/ckeditor5-basic-styles/src/italic/italicediting'
// import UnderlineEditing from '@ckeditor/ckeditor5-basic-styles/src/underline/underlineediting'
// import HeadingEditing from '@ckeditor/ckeditor5-heading/src/headingediting'

class BootstrapEditorUI extends EditorUI {
  constructor(editor, config) {
    super(editor)

    this._elementReplacer = new ElementReplacer()

    const view = this._view = new EditorUIView(editor.locale)

    view.editable = new InlineEditableUIView(editor.locale, editor.editing.view)


    view.element = document.querySelector('.ck-editor')
    view.dropdownMenu = view.element.querySelector('.dropdown-menu')
    view.dropdownToggle = view.element.querySelector('.dropdown-toggle')
    const customEl = config.custom.el
    customEl.addEventListener('click', () => {
      editor.editing.view.focus()
    })

    view.toolbarButtons = {}

    _.each(['bold', 'italic', 'underline', 'undo', 'redo'], name => {
      view.toolbarButtons[name] = view.element.querySelector(`#${name}`)
    })
  }

  get view() {
    return this._view
  }

  init(replacementElement) {
    const editor = this.editor
    const view = this.view
    const editingView = editor.editing.view

    const editingRoot = editingView.document.getRoot()

    view.editable.name = editingRoot.rootName

    view.editable.render()

    const editableElement = view.editable.element

    this.setEditableElement(view.editable.name, editableElement)

    this.focusTracker.add(editableElement)

    view.editable.bind('isFocused').to(this.focusTracker)

    editingView.attachDomRoot(editableElement)

    this._setupBootstrapToolbarButtons()
    this._setupBootstrapHeadingDropdown()

    this._elementReplacer.replace(replacementElement, editableElement)

    this.fire('ready')
  }

  destroy() {
    this._elementReplacer.destroy()

    this._view.editable.destroy()
    this._view.destroy()

    super.destroy()
  }

  _setupBootstrapToolbarButtons() {
    const editor = this.editor

    for (const name in this.view.toolbarButtons) {
      const command = editor.commands.get(name)
      const button = this.view.toolbarButtons[name]

      button.addEventListener('click', () => editor.execute(name))

      button.addEventListener('mousedown', evt => evt.preventDefault())

      const onValueChange = () => {
        if (command.value) {
          button.classList.add('active')
        } else {
          button.classList.remove('active')
        }
      }

      const onIsEnableChange = () => {
        if (command.isEnabled) {
          button.removeAttribute('disabled')
        } else {
          button.setAttribute('disabled', true)
        }
      }

      command.on('change:isEnabled', onIsEnableChange)
      onIsEnableChange()

      if (! new Set(['undo', 'redo']).has(name)) {
        command.on('change:value', onValueChange)
        onValueChange()
      }
    }
  }

  _setupBootstrapHeadingDropdown() {
    const editor = this.editor
    const dropdownMenu = this.view.dropdownMenu
    const dropdownToggle = this.view.dropdownToggle

    const headingCommand = editor.commands.get('heading')
    const paragraphCommand = editor.commands.get('paragraph')

    editor.config.get('heading.options').map(option => {
      const isParagraph = option.model === 'paragraph'

      let menuItem = document.createElement('a')
      menuItem.setAttribute('href', '#')
      menuItem.setAttribute('class', `dropdown-item heading-item_${option.model}`)
      menuItem.innerHTML = option.title

      menuItem.addEventListener('click', () => {
        const commandName = isParagraph ? 'paragraph' : 'heading'
        const commandValue = isParagraph ? undefined : { value: option.model }

        editor.execute(commandName, commandValue)
        editor.editing.view.focus()
      })

      dropdownMenu.appendChild(menuItem)

      const command = isParagraph ? paragraphCommand : headingCommand

      const onValueChange = isParagraph ? onValueChangeParagraph : onValueChangeHeading
      command.on('change:value', onValueChange)
      onValueChange()

      command.on('change:isEnabled', onIsEnableChange)
      onIsEnableChange()

      function onValueChangeHeading() {
        const isActive = !isParagraph && command.value === option.model

        if (isActive) {
          dropdownToggle.firstChild.innerText = option.title
          menuItem.classList.add('active')
        } else {
          menuItem.classList.remove('active')
        }

      }

      function onValueChangeParagraph() {
        if (command.value) {
          dropdownToggle.firstChild.innerText = option.title

          menuItem.classList.add('active')
        } else {
          menuItem.classList.remove('active')
        }
      }

      function onIsEnableChange() {
        if (command.isEnabled) {
          dropdownToggle.removeAttribute('disabled')
        } else {
          dropdownToggle.setAttribute('disabled', true)
        }
      }
    })
  }
}

export default class BootstrapEditor extends Editor {
  constructor(element, config) {
    super(config)

    this.sourceElement = element

    this.data.processor = new HtmlDataProcessor(this.data.viewDocument)

    this.model.document.createRoot()

    this.ui = new BootstrapEditorUI(this, config)

    attachToFrom(this)
  }

  destroy() {
    this.updateSourceElement()

    this.ui.destroy()

    return super.destroy()
  }

  static create(element, config) {
    return new Promise(resolve => {
      const editor = new this(element, config)

      resolve(
        editor.initPlugins()
          .then(() => editor.ui.init(element))
          .then(() => editor.data.init(getDataFromElement(element)))
          .then(() => editor.fire('ready'))
          .then(() => editor)
      )
    })
  }
}

mix(BootstrapEditor, DataApiMixin)
mix(BootstrapEditor, ElementApiMixin)


