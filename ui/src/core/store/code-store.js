import { create } from 'zustand'

const useCodeStateStore = create((set, get) => ({
  codeState: null,
  isCodeLoaded: false,

  saveState: (code) => {
    const codeState = {
      code: code,
      lastUpdate: new Date().toISOString()
    }

    localStorage.setItem('code-state', JSON.stringify(codeState))
    set({ codeState: codeState, isCodeLoaded: false })
  },

  checkCodeState: () => {
    try {
      const storedCode = localStorage.getItem('code-state')

      if (storedCode) {
        const codeData = JSON.parse(storedCode)

        if (codeData?.code !== undefined && codeData?.lastUpdate) {
          set({ codeState: codeData, isCodeLoaded: true })
          return true
        }
      }

      set({ codeState: null, isCodeLoaded: false })
      return false
    } catch (err) {
      console.error(`Error parsing code data: ${err}`)
      set({ codeState: null, isCodeLoaded: false })
      return false
    }
  },

  initCodeState: () => {
    const { checkCodeState } = get()
    checkCodeState()
  }
}))

export default useCodeStateStore
