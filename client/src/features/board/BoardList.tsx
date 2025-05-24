import { memo, useState } from "react"
import { closeCreateBoardModal, useCreateBoardModal } from "../../hooks/hooks"
import { BoardItem } from "./BoardItem"
import { CreateBoardButton } from "./CreateBoardButton"
import { CreateBoardModal } from "./CreateBoardModal"
import { Board } from "../../types/types"
import axios from "axios"



export const BoardList = memo(() => {

    const [boards, setBoards] = useState<Board[]>([
        {
            id : 1,
            title : "Board-1",
        },
        {
            id : 2,
            title : "Board-2"
        },
        {
            id : 3,
            title : "Board-3"
        }
    ])

    const getBoards = async() => {

        try{
            const response = await axios({
                method : "GET",
                url : "http://localhost:3000/board"
            }) 
            setBoards(response.data)
            console.log(response.data)
        }catch (e){
            console.error('Error:', e);
        }
    }

    const handeCreateBoard = async (title : string) =>{
        try{
            const response = await axios({
                method : "POST",
                url : 'http://localhost:3000/board',
                data : {title}
            })
            alert(response.data.message)
            console.log(response.data)
            getBoards();
            closeCreateBoardModal();
        }catch(e){
            console.error('Error:', e)
        }
    }

    const {isOpen} = useCreateBoardModal()

    return (
        <div>
            <div className=" grid grid-cols-2 p-4">
                <h2 className="text-lg font-semibold mb-4">Your Boards :</h2>
                <div className="col-end-4">
                    <CreateBoardButton />
                </div>
            </div>
            {isOpen && <CreateBoardModal onCreate={handeCreateBoard} />}
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">  
                {boards.map((board) => <BoardItem key={board.id} title={board.title} />)}
            </div>
        </div>
    )

})