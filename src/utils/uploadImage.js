import SummaryApi from "../common/SummaryApi"
import Axios from "./Axios.js"

const uploadImage = async (image) => {
  try {
    const formData = new FormData()
    formData.append('image', image)
    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
      withCredentials: true
    })
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      data: response.data
    };
  }
}

export default uploadImage