import { StateStorage } from 'zustand/middleware'
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV({
    id: 'balance-storage',
})

export const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return storage.set(name, value)
    },
    getItem: (name) => {
        const value = storage.getString(name)
        return value === undefined ? null : value
    },
    removeItem: (name) => {
        storage.remove(name)
    },
}
