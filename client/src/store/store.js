import { create } from "zustand";
const useUserState = create((set) => ({
    id: "",
    username: "",
    userMoney: 0,
    tableChips: 0,
    isLoggedIn: false,
    isMiniGame: false,
    betsRemaining: 10,
    setUser: (id, money, username) => set({ id: id, userMoney: money, username: username }),
    setUserMoney: (updateFn) => set((state) => ({userMoney: updateFn(state.userMoney)})),
    setTableChips: (chips) => set((state) => ({ userMoney: state.userMoney - chips, tableChips: chips })),
    adjustTableChips: (chips) => set((state) => ({ tableChips: state.tableChips + chips })),
    returnChipsToTotal: () => set((state) => ({ userMoney: state.userMoney + state.tableChips, tableChips: 0 })),
    setIsLoggedIn: (bool) => set({ isLoggedIn: bool }),
    setIsMiniGame: (bool) => set({ isMiniGame: bool }),
    setBetsRemaining: (updateFn) => set((state) => ({ betsRemaining: updateFn(state.betsRemaining)}) ),
    resetUser: () => set({
        id: "",
        userMoney: 0,
        tableChips: 0,
        isLoggedIn: false
    })
}))
export default useUserState;