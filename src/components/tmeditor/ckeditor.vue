<template>
  <div class="tm-editor" v-once v-html="value"></div>
</template>

<script>
import Ckeditor from './ckeditor'
export default {
  name: 'ckeditor',
  model: {
    'props': 'value',
    'event': 'on-change'
  },
  props: {
    value: String,
    default: () => ''
  },
  data() {
    return {
      editorData: '',
      editor: null,
      editorDocument: null,
      lastData: ''
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
      this.init()
    }).catch(err => {
      console.log(err)
    })
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue && newValue !== this.lastData) {
        this.editor.setData(newValue)
      }
    }
  },
  methods: {
    init() {
      const editor = this.editor
      const view = editor.editing.view

      this.$emit('on-ready', editor)

      view.document.on('focus', (evt) => {
        this.$emit('on-focus', evt, editor)
      })
      view.document.on('blur', (evt) => {
        this.$emit('on-blur', evt, editor)
      })
      editor.model.document.on('change:data', _.debounce(evt => {
        const data = editor.getData()
        this.lastData = data
        this.$emit('on-change', data, evt, editor)
      }, 300))
    },
    focus() {
      this.editor.editing.view.focus()
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
    this.$emit('on-destroy', this.editor)
  }
}
</script>

<style>

</style>