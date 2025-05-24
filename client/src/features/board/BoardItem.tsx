import { memo } from "react"

type Props = {
    title : string
}

export const BoardItem = memo(({title} : Props) => {

    return(
        <div className="p-4 bg-cyan-500/70 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-lg font-bold">{title}</h3>
        </div>
    )
})