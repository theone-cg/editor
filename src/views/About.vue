<template>
  <div class="about">
    <div ref="panel" class="ck-editor-panle" style="margin-bottom: 20px">
      <Select style="width: 80px" @on-change="onFontSize">
        <Option v-for="op in opts.fontSize" :value="op.value" :key="op.value">{{ op.label }}</Option>
      </Select>
      <Button type="primary" icon="ios-american-football"></Button>
    </div>
    <div class="ck-editor">
      <!-- The toolbar of the editor. -->
      <div class="btn-toolbar" role="toolbar" aria-label="Editor toolbar">
        <!-- The headings dropdown. -->
        <div class="btn-group mr-2" role="group" aria-label="Headings">
          <div class="dropdown" id="heading">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>Headings</span></button>
            <div class="dropdown-menu" aria-labelledby="heading-button"></div>
          </div>
        </div>

        <!-- Basic styles buttons. -->
        <div class="btn-group mr-2" role="group" aria-label="Basic styles">
          <button type="button" class="btn btn-primary btn-sm" id="bold">B</button>
          <button type="button" class="btn btn-primary btn-sm" id="italic">I</button>
          <button type="button" class="btn btn-primary btn-sm" id="underline">U</button>
        </div>

        <!-- Undo and redo buttons. -->
        <div class="btn-group mr-2" role="group" aria-label="Undo">
          <button type="button" class="btn btn-primary btn-sm" id="undo">&larr;</button>
          <button type="button" class="btn btn-primary btn-sm" id="redo">&rarr;</button>
        </div>
      </div>
    </div>

    <!-- The container with the data of the editor. -->
    <div id="editor">
      <p>Hello world!</p>
    </div>
  </div>
</template>
<script>
import BootstrapEditor from '@/components/bseditor'

// Basic features that every editor should enable.
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';
import Enter from '@ckeditor/ckeditor5-enter/src/enter';
import Typing from '@ckeditor/ckeditor5-typing/src/typing';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import UndoEditing from '@ckeditor/ckeditor5-undo/src/undoediting';

// Basic features associated with the edited content.
import BoldEditing from '@ckeditor/ckeditor5-basic-styles/src/bold/boldediting';
import ItalicEditing from '@ckeditor/ckeditor5-basic-styles/src/italic/italicediting';
import UnderlineEditing from '@ckeditor/ckeditor5-basic-styles/src/underline/underlineediting';
import HeadingEditing from '@ckeditor/ckeditor5-heading/src/headingediting';
export default {
  name: 'bseditor',
  data() {
    return {
      opts: {
        fontSize: [
          { label: '11px', value: 11 },
          { label: '12px', value: 12 },
          { label: '13px', value: 13 },
        ]
      },
      editor: null
    }
  },
  created() {
    window.bs = this
  },
  mounted() {
    BootstrapEditor.create(this.$el.querySelector('#editor'), {
      plugins: [
        Clipboard, Enter, Typing, Paragraph,
        BoldEditing, ItalicEditing, UnderlineEditing, HeadingEditing, UndoEditing
      ],
      custom: {
        el: this.$refs.panel
      }
    }).then(editor => {
      this.editor = editor
      console.log('bseditor', editor)
    }).catch(err => {
      console.log('err', err.stack)
    })
  },
  methods: {
    onFontSize(value) {
      console.log('font-size', value)
    }
  }
}
</script>
<style lang="less" scoped>
.ck-editor {
  margin: 1em 0;
  border: 1px solid hsla(0, 0%, 0%, 0.1);
  border-radius: 4px;
}

/* Adding internal spacing, border and background to the toolbar.  */
.ck-editor .btn-toolbar {
  padding: .5rem;
  background: hsl(240, 14%, 97%);
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
}

/* Tweaking the editable area for better readability. */
.ck-editor .ck-editor__editable {
  padding: 2em 2em 1em;
  overflow: auto;
}

/* When in read–only mode, the editable should fade out. */
.ck-editor .ck-editor__editable.ck-read-only {
  background: hsl(0, 0%, 98%);
  color: hsl(0, 0%, 47%);
}

/* Make sure the headings dropdown button does not change its size
as different headings are selected. */
.ck-editor .dropdown-toggle span {
  display: inline-block;
  width: 100px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}

/* Make the headings dropdown items visually distinctive. */
.ck-editor .heading-item_heading1 { font-size: 1.5em; }
.ck-editor .heading-item_heading2 { font-size: 1.3em; }
.ck-editor .heading-item_heading3 { font-size: 1.1em; }

.ck-editor [class*="heading-item_"] {
  line-height: 22px;
  padding: 10px;
}

.ck-editor [class*="heading-item_heading"] {
  font-weight: bold;
}

/* Give the basic styles buttons the icon–like look and feel. */
.ck-editor #bold { font-weight: bold; }
.ck-editor #italic { font-style: italic; }
.ck-editor #underline { text-decoration: underline; }
</style>