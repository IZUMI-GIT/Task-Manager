import { useState } from "react";
import { useCreateBoardModal } from "../../hooks/hooks";

type createBoardModalProps = {
    onCreate : (title :string) => void
}

export function CreateBoardModal({onCreate} : createBoardModalProps) {

    const [title, setTitle] = useState("")
    const {closeBoard} = useCreateBoardModal();


    const handleSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        console.log(title)
    }

    const handleCreate = (e : React.FormEvent) => {
        e.preventDefault();
        // debounceChange.flush(); //forces last input to proceed
        onCreate(title)
    }

    // const debounceChange =  useMemo(() => debounce((value : string) =>{
    //     setTitle(value);
    // } , 300), [])

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
        <form onSubmit={handleCreate}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-800">Create New Board</h2>

            <div>
                <label className="text-sm font-medium text-gray-700 pr-2">
                    Title :
                </label>
                <input 
                    type="text"
                    name="title"
                    onChange={handleSubmit}
                    placeholder="Enter Board Title"
                    className="border  border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
            </div>
            <div className="flex justify-end gap-4 pt-2">
                <button
                    type="submit"
                    className="bg-sky-400 text-white rounded-lg font-semibold px-4 py-2 hover:bg-sky-600 transition"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={closeBoard}
                    className="border border-gray-300 rounded-lg font-semibold px-4 py-2 hover:bg-gray-200 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
        </div>
    )
}