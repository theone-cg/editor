<template>
  <div>
    <tema-editor 
      v-model="text" 
      :config="config" 
      type="custom" 
      @on-ready="onReady" />
    <div class="panel">
      <Button :type="font.bold ? 'primary' : 'default'" @click="execute('bold')">B</Button>
    </div>
  </div>
</template>

<script>
import temaEditor from '@/ckeditor/tmeditor'
export default {
  name: 'customEditor',
  components: {
    temaEditor
  },
  data() {
    return {
      config: {
        getFontStyle: this.onStyle,
        keepFocus: true
      },
      text: '<div>Custom Editor123456</div>',
      editor: null,
      font: {
        bold: false
      }
    }
  },
  created() {
    window.c = this
  },
  mounted() {
    
  },
  methods: {
    onReady(editor) {
      this.editor = editor
    },
    onStyle(style) {
      _.each(style, (value, key) => {
        this.font[key] = value
      })
    },
    execute(type) {
      this.font[type] = !this.font[type]
      this.editor.execute(type)
    },
  }
}
</script>

<style>

</style>