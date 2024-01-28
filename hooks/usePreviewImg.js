import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImg = () => {
    const showToast = useShowToast()
    const [imgUrl, setImgUrl] = useState("")

    const handleImageChange = (ev) => {
        const file = ev.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        }
        else {
            showToast("Error", "Error in uploading", "error")
            return
        }
    }
    return { handleImageChange, imgUrl, setImgUrl }
}
export default usePreviewImg