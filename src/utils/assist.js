// 向上寻找指定name的组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent
  if (!parent) {
    return
  }
  let name = parent.$options.name
  if (name === componentName) {
    return parent
  } else {
    return findComponentUpward(parent, componentName)
  }
}
export { findComponentUpward }

// 向上寻找所有指定name的组件
function findComponentsUpward (context, componentName) {
  const parents = []
  let parent = context.$parent
  if (parent) {
    parents.push(parent)
  }
  return parents.concat(findComponentsUpward(parent, componentName))
}
export { findComponentsUpward }

// 向下寻找指定name的组件

function findComponentDownward (context, componentName) {
  let children = context.$children
  if (children && children.length) {
    for (let child of children) {
      const name = child.$options.name
      if (name === componentName) {
        return child
      } else {
        return findComponentDownward(child, componentName)
      }
    }
  }
}
export { findComponentDownward }

// 向下寻找指定name的所有组件

function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}
export { findComponentsDownward }

// 找到指定组件的兄弟组件

function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) {
    res.splice(index, 1)
  }
  return res
}
export { findBrothersComponents }
