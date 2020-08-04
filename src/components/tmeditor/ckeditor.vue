<template>
  <div class="tm-editor" v-once v-html="value"></div>
</template>

<script>
import Ckeditor from './ckeditor'
export default {
  name: 'ckeditor',
  props: {
    value: String,
    default: () => ''
  },
  data() {
    return {
      editorData: '',
      editor: null,
      editorDocument: null
    }
  },
  created() {
    window.g = this
  },
  mounted() {
    Ckeditor.create(this.$el, {
      customToolbar: 'gtest'
    }).then(editor => {
      this.editor = editor
      this.$emit('on-ready', editor)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleBlur(editor) {

    },
    handleFocus(editor) {

    },
    handleSelection(editor) {

    },
    focus() {
      this.editor.editing.view.focus()
    }
  },
  beforeDestroy() {
    let editorEl = _.get(this.editor, 'ui.view.element')
    if (editorEl) {
      editorEl.parentNode.removeChild(editorEl)
    }
  }
}
</script>

<style>

</style>