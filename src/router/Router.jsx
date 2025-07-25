import { createBrowserRouter } from "react-router-dom"
import LayOut from "../mainLayout/LayOut"
import SignUp from "../userAuthentication/signUpForm/SignUp"
import SignIn from "../userAuthentication/signInForm/SignIn"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "/",
                element: <SignUp />
            },
            {
                path: "signIn",
                element: <SignIn />
            },
        ]

    }
])

export default router