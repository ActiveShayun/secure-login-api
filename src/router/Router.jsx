import { createBrowserRouter } from "react-router-dom"
import LayOut from "../mainLayout/LayOut"
import SignUp from "../userAuthentication/signUpForm/SignUp"
import SignIn from "../userAuthentication/signInForm/SignIn"
import Profile from "../components/userProfile/Profile"

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
            {
                path: "profile",
                element: <Profile />
            }
        ]
    }
])

export default router