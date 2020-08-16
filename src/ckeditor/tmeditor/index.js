/**
 * name: tema-editor
 * description: ckeditor5 custom build
 * author: theone
 */

/**
 * require package:
 * 
 */

import _ from 'lodash'
import Editor from './editor'

const INPUT_DEBOUNCE_WAIT = 300

export default {
  name: 'temaEditor',
  props: {
    type: {
      type: String,
      default: 'classic',
      validator(value) {
        return _.includes(['classic', 'inline', 'custom'], value)
      }
    },
    value: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    config: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      instance: null,
      lastValue: ''
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue && newValue !== this.lastValue) {
        this.instance.setData(newValue)
      }
    },
    disabled(newValue) {
      this.instance.isReadOnly = newValue
    }
  },
  render(h) {
    return h(this.tag)
  },
  mounted() {
    const config =  this.config
    // _.merge(config, this.config)

    if (this.value) {
      config.initialData = this.value
    }

    const editorCreate = Editor[this.type]

    editorCreate(this.$el, config).then(editor => {
      this.instance = editor
      editor.isReadOnly = this.disabled
      this.setupEditorEvents()
      this.$emit('on-ready', editor)
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    setupEditorEvents() {
      const editor = this.instance

      editor.model.document.on('change:data', _.debounce(evt => {
        const data = this.lastValue = editor.getData()
      }, INPUT_DEBOUNCE_WAIT))

      editor.editing.view.document.on('focus', evt => {
        this.$emit('on-focus', evt, editor)
      })

      editor.editing.view.document.on('blur', evt => {
        this.$emit('on-blur', evt, editor)
      })
    }
  },
  beforeDestroy() {
    if (this.instance) {
      this.instance.destroy()
      this.instance = null
    }

    this.$emit('on-destroy')
  }
}