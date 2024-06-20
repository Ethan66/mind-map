import { isPlainObject, mapValues } from 'lodash-es'
import { Storage } from 'lz-utils-lib'
const projectData = {
  name: 'mind-map',
  expire: 24,
  beforeSet: async (val: { value: any }) => {
    return await new Promise(resolve => {
      if (isRef(val.value)) {
        val.value = toRaw(unref(val.value))
        resolve(val)
      } else if (isReactive(val.value)) {
        val.value = toRaw(unref(val.value))
        resolve(val)
      } else if (isPlainObject(val.value)) {
        val.value = mapValues(val.value, value => {
          return toRaw(unref(value))
        })
        resolve(val)
      } else {
        resolve(val)
      }
    })
  }
}

export const localStore = new Storage('local', {
  ...projectData,
  keys: ['editing', 'data', 'tag-options']
})
export const sessionStore = new Storage('session', {
  ...projectData,
  keys: []
})
