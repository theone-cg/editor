<template>
  <div class="tm-editor" style="text-align:left">
    <!-- test
    <slot></slot> -->
    <ckeditor ref="editor" v-model="comment" @on-ready="ready" />
    <div style="margin-top: 20px">
      <div>
        <button @click="focus">Focus</button>
      </div>
      <div>
        <select>
          <option value="op1">OP1</option>
          <option value="op2">OP2</option>
        </select>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ckeditor from '@/components/tmeditor'
// import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Link from '@ckeditor/ckeditor5-link/src/link'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'

// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';

export default {
  name: 'Home',
  components: {
    ckeditor
  },
  data() {
    return {
      comment: '<div>Comment</div>',
      editor: null
    }
  },
  created() {
    window.home = this
  },
  mounted() {

  },
  methods: {
    ready(editor) {
      console.log('ready', editor)
      this.editor = editor
    },
    focus() {
      console.log('focus')
      this.$refs.editor.focus()
    }
  }
}
</script>
