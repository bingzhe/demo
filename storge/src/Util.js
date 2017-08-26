
function copy(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function (name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);  //获取指定对象的自身属性描述符
        // console.log(desc)
        Object.defineProperty(copy, name, desc);
    });

    return copy;
}

const ls = window.localStorage;


function getItem(key) {
    try {
        return JSON.parse(ls.getItem(key))
    } catch (err) {
        return null
    }
};


function setItem(key, val) {
    ls.setItem(key, JSON.stringify(val))
};

function clear() {
    ls.clear()
};

function keys() {
    return ls.keys()
};

function removeItem(key) {
    ls.removeItem(key)
};


export const myPlugin = store => {
    // 当 store 初始化后调用
    const savedState = getItem('storeClone');
    if (savedState) {
        store.replaceState(savedState);
    }

    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }

        let storeClone = copy(state);
        setItem('storeClone', storeClone);

    })
}



const merge = createAssigner((object, source, srcIndex) => {
    baseMerge(object, source, srcIndex)
})

function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
        return
    }
    baseFor(source, (srcValue, key) => {
        if (isObject(srcValue)) {
            stack || (stack = new Stack)
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
        }
        else {
            let newValue = customizer
                ? customizer(object[key], srcValue, `${key}`, object, source, stack)
                : undefined

            if (newValue === undefined) {
                newValue = srcValue
            }
            assignMergeValue(object, key, newValue)
        }
    }, keysIn)
}

export default baseMerge