// app/stores/messagesStore.ts
import { create } from "zustand"

interface MessagesState {
  selectedMessages: string[]
  toggleMessage: (id: string) => void
  toggleAll: (ids: string[]) => void
  clearSelection: () => void
}

export const useMessagesStore = create<MessagesState>((set) => ({
  selectedMessages: [],
  toggleMessage: (id) =>
    set((state) => ({
      selectedMessages: state.selectedMessages.includes(id)
        ? state.selectedMessages.filter((messageId) => messageId !== id)
        : [...state.selectedMessages, id],
    })),
  toggleAll: (ids) =>
    set((state) => ({
      selectedMessages:
        state.selectedMessages.length === ids.length ? [] : [...ids],
    })),
  clearSelection: () => set({ selectedMessages: [] }),
}))