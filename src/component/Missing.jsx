import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Missing = () => {
    const navigate = useNavigate()

    useEffect(() => {
        toast.error('The page you are looking for does not exist!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigate("/")
    }, [])

    return (
        <></>
    )
}

export default Missing