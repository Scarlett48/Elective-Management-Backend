import axios from "axios"
import { Alert } from "reactstrap"

export const UploadElectives = data => {
  return axios
    .post("/addElectives", {
      data: data
    })
    .then(res => {
      Alert("uploaded sucessfully")
      console.log("uploaded sucessfully")
    })
}
export const UploadElectivesSingle = data => {
  return axios.post("/addOneElective", { ...data }).then(res => {
    Alert("uploaded sucessfully")
    console.log("uploaded sucessfully")
  })
}

export const GetElectives = (dept, sem, setElectiveList) => {
  return axios
    .post("/student/viewElectives", {
      department: dept,
      sem: sem
    })
    .then(res => {
      setElectiveList(res.data)
      console.log(res)
    })
}

// module.exports = { UploadElectives, UploadElectivesSingle }
