import _ from 'lodash'

import classicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import inlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor'

// 包含基本编辑功能 https://ckeditor.com/docs/ckeditor5/latest/api/module_essentials_essentials-Essentials.html
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'

// 编辑器的段落功能 https://ckeditor.com/docs/ckeditor5/latest/api/module_paragraph_paragraph-Paragraph.html
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'

// 块格式化功能 https://ckeditor.com/docs/ckeditor5/latest/features/autoformat.html
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'

// basic styles
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'

import Link from '@ckeditor/ckeditor5-link/src/link'
import List from '@ckeditor/ckeditor5-list/src/list'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'

import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'

import Base64UploaderAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'

import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'

import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'

import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import Custom from './custom'

const basePlugins = {
  'essentials': Essentials,
  'paragraph': Paragraph,
  'autoFormat': Autoformat,
  'bold': Bold,
  'italic': Italic,
  'link': Link,
  'list': List,
  'heading': Heading,
  'image': Image,
  'imageCaption': ImageCaption,
  'imageStyle': ImageStyle,
  'imageToolbar': ImageToolbar,
  'imageUpload': ImageUpload,
  'base64UploaderAdapter': Base64UploaderAdapter,
  'table': Table,
  'tableToolbar': TableToolbar,
  'pasteFromOffice': PasteFromOffice,
  'textTransformation': TextTransformation,
  'fontColor': FontColor,
  'fontBackgroundColor': FontBackgroundColor,
  'fontSize': FontSize,
  'alignment': Alignment
}

const baseConfig = {
  plugins: _.values(basePlugins),
  toolbar: {
    items: [
      'heading',
      'fontSize',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'alignment:left',
      'alignment:center',
      'alignment:right',
      '|',
      'imageUpload',
      'insertTable',
      'undo',
      'redo'
    ]
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_headng1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_headng2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_headng3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_headng4' },
      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_headng5' },
      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_headng6' }
    ]
  },
  fontSize: {
    options: [
      9, 11, 13, 'default', 17, 19, 21
    ]
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ],
    types: ['png', 'jpg', 'jpeg', 'gif']
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  }
}

export const ClassicEditor = ($el, config) => {
  return new Promise((resolve, reject) => {    
    const editorConfig = _.get(config, 'clearBase') ? {} : _.cloneDeep(baseConfig)
    _.merge(editorConfig, config)
    editorConfig.plugins.push(Custom)

    classicEditor.create($el, editorConfig).then(editor => {
      resolve(editor)
    }).catch(err => {
      reject(err)
    })
  })
}

export const InlineEditor = ($el, config) => {
  return new Promise((resolve, reject) => {
    const editorConfig = _.get(config, 'clearBase') ? {} : _.cloneDeep(baseConfig)
    _.merge(editorConfig, config)

    inlineEditor.create($el, editorConfig).then(editor => {
      resolve(editor)
    }).catch(err => {
      reject(err)
    })
  })
}

export const CustomEditor = ($el, config) => {
  return new Promise((resolve, reject) => {
    const editorConfig = _.cloneDeep(baseConfig)
    editorConfig.plugins.push(Custom)
    
    if (_.get(config, 'initialData')) {
      editorConfig.initialData = config.initialData
    }

    editorConfig.custom = config

    inlineEditor.create($el, editorConfig).then(editor => {
      editor.ui.view.toolbar.element.style.display = 'none'
      if (_.has(config, 'keepFocus')) {
        editor.editing.view.document.on('blur', evt => {
          if (config.keepFocus) {
            editor.editing.view.focus()
          }
        })
      }
      resolve(editor)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  classic: ClassicEditor,
  inline: InlineEditor,
  custom: CustomEditor
}