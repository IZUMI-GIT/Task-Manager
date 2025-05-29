import { useState } from "react"

export function useCreateBoardModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openBoard = () => setIsOpen(true);
  const closeBoard = () => setIsOpen(false)

  return {
    isOpen,
    openBoard,
    closeBoard
  }
}


export function useAuthModal() {

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'signin'|'signup'>('signin')

  const openSignIn = () => {
    setIsOpen(true);
    setMode('signin')
  }

  const openSignUp = () => {
    setIsOpen(true);
    setMode('signup')
  }

  const closeModal = () => {setIsOpen(false)}

  return{
    isOpen,
    mode,
    openSignIn,
    openSignUp,
    closeModal
  }
}