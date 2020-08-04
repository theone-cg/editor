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
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Link from '@ckeditor/ckeditor5-link/src/link'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'

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
        Bold,
        Italic,
        Link,
        Paragraph,
        RakutenPlugin
      ],
      toolbar: [
        'bold', 'italic',
        'link',
        'undo', 'redo'
      ],
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