import { memo } from "react"
import { openCreateBoardModal } from "../../hooks/hooks"

export const CreateBoardButton = memo(() => {
    
    return(
        <button 
            onClick={openCreateBoardModal}
            className="px-2 py-1 bg-sky-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
             + Create Board
        </button>
    )
})