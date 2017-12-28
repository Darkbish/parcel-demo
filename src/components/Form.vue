<template>
  <form ref="form"
        class="el-form"
        :class="labelClass"
        @submit.prevent="submit">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'ElForm',
  componentName: 'ElForm',
  provide() {
    return {
      elForm: this,
    }
  },
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: '',
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
    submited: Boolean,
  },
  watch: {
    rules() {
      this.validate()
    },
    submited(val) {
      if (val) {
        this.submit()
      }
    },
  },
  data() {
    return {
      fields: [],
      labelClass: [
        this.labelPosition ? `el-form--label-${this.labelPosition}` : '',
        { 'el-form--inline': this.inline },
      ],
    }
  },
  created() {
    this.$on('el.form.addField', field => {
      if (field) {
        this.fields.push(field)
      }
    })
    /* istanbul ignore next */
    this.$on('el.form.removeField', field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },
  methods: {
    submit() {
      if (typeof this.rules === 'undefined') {
        this.$emit('submit')
      } else {
        this.validate(valid => {
          if (valid) {
            this.$emit('submit')
          }
        })
      }
      this.$emit('update:submited', false)
    },
    resetFields() {
      if (!this.model) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[Element Warn][Form]model is required for resetFields to work.') // eslint-disable-line no-console
        }
        return
      }
      this.fields.forEach(field => {
        field.resetField()
      })
    },
    clearValidate() {
      this.fields.forEach(field => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for validate to work!') // eslint-disable-line no-console
        return
      }

      let promise
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function cb(valid) {
            valid ? resolve(valid) : reject(valid) // eslint-disable-line
          }
        })
      }

      let valid = true
      let count = 0
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true)
      }
      this.fields.forEach(field => {
        field.validate('', errors => {
          if (errors) {
            valid = false
          }
          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid)
          }
        })
      })

      if (promise) {
        return promise // eslint-disable-line
      }
    },
    validateField(prop, cb) {
      const field = this.fields.filter(item => item.prop === prop)[0]
      if (!field) {
        throw new Error('must call validateField with valid prop string!')
      }
      field.validate('', cb)
    },
  },
}
</script>
