import { SignUpButton } from "../features/auth/SignUpButton"


export const Home = ()=>{

    return(
        <div>
            <h2>
                Your Kanban Board
            </h2>
            <h3>
                Organize. Track. Succeed.
            </h3>
            <div>
                <SignUpButton />
                <button>
                    Sign In
                </button>
            </div>
        </div>
    )
}