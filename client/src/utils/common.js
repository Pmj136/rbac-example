export function createDebounce(delay = 300) {
    let timer
    return function (fn) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

// export function list2tree(list) {
//     const tree = [], map = {}
//     for (const v of list) {
//         map[v.id] = v
//     }
//     for (const v of list) {
//         const item = map[v.parentId]
//         if (item !== undefined) {
//             let children = item.children
//             if (children === undefined) children = []
//             children.push(v)
//         } else {
//             tree.push(v)
//         }
//     }
//     return tree;
// }