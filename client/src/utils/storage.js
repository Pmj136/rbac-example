export function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function get(key, spare = null) {
    const data = localStorage.getItem(key)
    if (!data) return spare;
    return JSON.parse(data)
}

export function clear() {
    localStorage.clear()
}

export function has(key) {
    return get(key) != null
}

export function remove(key) {
    localStorage.removeItem(key)
}