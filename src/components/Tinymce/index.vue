<template>
  <div class='tinymce-container editor-container'>
    <textarea class='tinymce-textarea' :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
     <editorImage  color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from '@/components/Tinymce/editorImage'

export default {
  name: 'tinymce',
  components: {
    editorImage
  },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [' removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code | media link', 'fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright']
      }
    },
    menubar: {
      default: ''
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date()
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    const _this = this
    window.tinymce.init({
      selector: `#${this.tinymceId}`,
      height: this.height,
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: this.toolbar,
      menubar: this.menubar,
      plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,wordcount, imagetools',
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      block_formats: '普通标签=p;小标题=h2;',
      imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
      imagetools_toolbar: 'watermark',
      default_link_target: '_blank',
      link_title: false,
      font_formats:'微软雅黑=微软雅黑,Microsoft YaHei;宋体=宋体,SimSun;黑体=黑体, SimHei;隶书=隶书, SimLi;楷体=楷体,楷体_GB2312, SimKai;andale mono=andale mono;arial=arial, helvetica,sans-serif;arial black=arial black,avant garde;comic sans ms=comic sans ms;impact=impact,chicago;Arial=Arial;Verdana=Verdana;Georgia=Georgia;Times New Roman=Times New Roman;Trebuchet MS=Trebuchet MS;Courier New=Courier New;Impact=Impact;Comic Sans MS=Comic Sans MS;Calibri=Calibri',
      fontsize_formats: '8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt',
      language:'zh_CN',
      // theme_advanced_fonts : '宋体=宋体;微软雅黑=微软雅黑;新宋体=新宋体;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
      // fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      init_instance_callback: editor => {
        if (_this.value) {
          editor.setContent(_this.value)
        }
        _this.hasInit = true
        editor.on('NodeChange Change KeyUp', () => {
          this.hasChange = true
          this.$emit('input', editor.getContent({ format: 'raw' }))
        })
      },

      // setup(editor) {
      //   editor.addButton('h2', {
      //     title: '小标题', // tooltip text seen on mouseover
      //     text: '小标题',
      //     onclick() {
      //       editor.execCommand('mceToggleFormat', false, 'h2')
      //     },
      //     onPostRender() {
      //       const btn = this
      //       editor.on('init', () => {
      //         editor.formatter.formatChanged('h2', state => {
      //           btn.active(state)
      //         })
      //       })
      //     }
      //   })
      //   editor.addButton('p', {
      //     title: '正文',
      //     text: '正文',
      //     onclick() {
      //       editor.execCommand('mceToggleFormat', false, 'p')
      //     },
      //     onPostRender() {
      //       const btn = this
      //       editor.on('init', () => {
      //         editor.formatter.formatChanged('p', state => {
      //           btn.active(state)
      //         })
      //       })
      //     }
      //   })
      // }
    })
  },
  methods: {
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(url) {
      window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${url}" >`)
    }
  },
  destroyed() {
    window.tinymce.get(this.tinymceId).destroy()
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  /*z-index: 2005;*/
  top: 38px;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
