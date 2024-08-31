import { create } from 'zustand'

const useStore = create((set) => {
  const storedTheme = localStorage.getItem('isDarkMode')
  const initialTheme = storedTheme === null ? true : storedTheme === 'true'

  return {
    isDarkMode: initialTheme,
    toggleDarkMode: () => {
      set((state) => {
        const newMode = !state.isDarkMode // 현재 상태를 반전
        localStorage.setItem('isDarkMode', newMode) // localStorage에 저장
        return { isDarkMode: newMode } // 새로운 상태 반환
      })
    },
  }
})

export default useStore
