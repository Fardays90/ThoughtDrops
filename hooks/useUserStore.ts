import { create } from 'zustand';
type storeProps = {
    usernameState: string | 'Anonymous',
    changeUsername: (name: string) => void
}

const useUserStore = create<storeProps>((set) => ({
    usernameState: 'Anonymous',
    changeUsername: (name: string) => set((state) => ({...state, usernameState: name})),
}))

export { useUserStore }