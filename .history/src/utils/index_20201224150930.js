// 拓展方法
import moment from 'moment'
// 首字母大小
  export function titleCase(str) {
    return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
  }
  export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
  }
  function stringify(obj) {
    return JSON.stringify(obj, (key, val) => {
      if (typeof val === 'function') {
        return `${val}`
      }
      return val
    })
  }

  function parse(str) {
    JSON.parse(str, (k, v) => {
      if (v.indexOf && v.indexOf('function') > -1) {
        return eval(`(${v})`)
      }
      return v
    })
  }

  export function jsonClone(obj) {
    return parse(stringify(obj))
  }
  export function isPhoneNum(str) {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(str)
  }
  // 深拷贝对象
  export function deepClone(obj) {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
      return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
      return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
      const flags = []
      if (obj.global) { flags.push('g') }
      if (obj.multiline) { flags.push('m') }
      if (obj.ignoreCase) { flags.push('i') }

      return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
      result[key] = deepClone(obj[key])
    }

    return result
  }
  // 时间格式化
  export function dateFormat(date) {
    return data?moment(date).format("YYYY-MM-DD HH:mm:ss"):''
  }
// 多个表单验证
export function validateForms(formRefs) {
    let errlist = [];
    let results = formRefs.map(formRef =>
      new Promise((resolve, reject) => {
        formRef.validate((valid, object) => {
          if (valid) {
            resolve();
          } else {
            errlist.push(object);
            reject();
          }
        });
      })
    )
    return Promise.all(results).catch(() => {
      return Promise.reject(errlist);
    });

}