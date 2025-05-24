import { useState } from "react"

let globalSetIsOpen: (val: boolean) => void

export function useCreateBoardModal() {
  const [isOpen, setIsOpen] = useState(false)
  globalSetIsOpen = setIsOpen

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }
}

export function openCreateBoardModal() {
  globalSetIsOpen?.(true)
}

export function closeCreateBoardModal() {
  globalSetIsOpen?.(false)
}
