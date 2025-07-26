import axios from "axios";

const uploadImage = async (img) => {
    const imageUpload = new FormData()
    imageUpload.append('image', img)
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`, imageUpload)
    console.log('upload image imageBb', res);

    return res?.data?.data?.url
};

export default uploadImage;