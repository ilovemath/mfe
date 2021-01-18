export const key = 'Authorization'
export function getToken() {
    return sessionStorage.getItem(key)
}

export function setToken(token) {
    return sessionStorage.setItem(key, `Bearer ${token}`)
}

export function removeToken() {
    return sessionStorage.removeItem(key)
}