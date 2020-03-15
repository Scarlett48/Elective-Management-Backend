import axios from "axios"

const register = async (newUser, sendmessage) => {
  // sendmessage("hello")
  return axios
    .post("/Register", {
      name: newUser.name,
      rollno: newUser.rollno,
      pass: newUser.pass,
      sec: newUser.sec,
      sem: newUser.sem
    })
    .then(res => {
      if (res.data === true) {
        console.log("Registered" + newUser.name + " " + newUser.rollno)
        sendmessage("Registered" + newUser.name + " " + newUser.rollno)
      } else if (res.data === false) {
        console.log("Unable to register User already exists")
        sendmessage(
          "User " + newUser.name + " with " + newUser.rollno + " already exists"
        )
      }
    })
    .catch(err => {
      console.log(err)
    })
}
export default register
