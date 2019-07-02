function loops (childrens, componentName, eventName, params) {
  for (let child of childrens) {
    let name = child.$options.name
    if (name && name !== componentName) {
      loops(child.$children, componentName, eventName, params)
    } else {
      child.$emit(eventName, params)
    }
  }
}

export default {
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      parent.$emit(eventName, params)
    },
    capture (componentName, eventName, params) {
      let childrens = this.$children
      loops(childrens, componentName, eventName, params)
    }
  }
}
