<template>
  <div>
    <div ref="panel">
      <Button type="primary" icon="md-add" />
    </div>
    <div ref="editor">Editor Custom UI</div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Link from '@ckeditor/ckeditor5-link/src/link'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'

import RakutenPlugin from './ck'

export default {
  name: 'editor',
  data() {
    return {
      editor: null
    }
  },
  created() {
    window.ed = this
  },
  mounted() {
    ClassicEditor.create(this.$refs.editor, {
      plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        Alignment,
        Link,
        FontColor,
        FontBackgroundColor,
        FontSize,

        RakutenPlugin
      ],
      toolbar: [
        'heading',
        '|',
        'bold', 'italic', 'strikethrough', 'underline',
        'link',
        '|',
        'alignment:left',
        'alignment:center',
        'alignment:right',
        '|',
        'fontcolor',
        'fontbackgroundcolor',
        'fontsize',
        '|',
        'undo', 'redo'
      ],
      fontSize: {
        options: [
          '11px',
          '12px',
          '13px',
          '14px',
          '16px',
          '18px',
          '20px',
          '22px',
          '24px',
        ]
      },
      heading: {
        options: [
          { model: 'paragraph', title: 'P', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'H1', class: 'ck-heading_headng1' },
          { model: 'heading2', view: 'h2', title: 'H2', class: 'ck-heading_headng2' },
          { model: 'heading3', view: 'h3', title: 'H3', class: 'ck-heading_headng3' },
          { model: 'heading4', view: 'h4', title: 'H4', class: 'ck-heading_headng4' },
          { model: 'heading5', view: 'h5', title: 'H5', class: 'ck-heading_headng5' },
          { model: 'heading6', view: 'h6', title: 'H6', class: 'ck-heading_headng6' }
        ]
      },
      rakuten: {
        el: this.$refs.panel
      }
    }).then(editor => {
      this.editor = editor
    })
  }
}
</script>

<style>

</style>