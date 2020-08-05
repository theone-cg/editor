<template>
  <div class="tm-editor" style="text-align:left">
    <ckeditor
      ref="editor"
      v-model="comment"
      @on-ready="ready"
      @on-focus="onFocus"
      @on-blur="onBlur"
      @on-input="onInput" />
  </div>
</template>

<script>
// @ is an alias to /src
import ckeditor from '@/components/tmeditor'

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
    },
    onFocus(evt, editor) {
      console.log('focus', evt, editor)
    },
    onBlur(evt, editor) {
      console.log('blur', evt, editor)
    },
    onInput(evt, editor) {
      console.log('input', evt, editor)
    },
    onDestroy(evt, editor) {
      console.log('destroy', evt, editor)
    },
    saveMemo() {
      let data = this.parseMemoImage(this.comment)
      let form = new FormData()
      form.append('comment', data.comment)
      _.each(data.files, file => {
        form.append('file', file)
      })
      // 可以使用post向后端传送form
    },
    parseMemoImage(comment) {
      let files = []
      let imgNodes = comment.match(/<img[^>]+?src="[\s\S]+?"[^>]*?>/g)
      _.each(imgNodes, node => {
        let match = node.match(/src="data:image\/(png|jpg|jpeg|gif);base64,([\s\S]+?)"/i)
        if (match) {
          let suffix = match[1]
          let mime = `image/${suffix}`
          let data = match[2]
          let bstr = atob(data)
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          let random = Math.random().toString(32).slice(2) + Math.random().toString(32).slice(2)
          let name = `memo_${random}.${suffix}`
          let imageSrc = this.memoImagePath(name)
          comment = comment.replace(match[0], `src="${imageSrc}"`)
          files.push(new File([u8arr], name, { type: mime }))
        }
      })
      let res = {
        comment: comment,
        files: files
      }
      return res
    },
    memoImagePath(name) {
      // 根据实际图片保存情况加工路径
      return name
    }
  }
}
</script>
