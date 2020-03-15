import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap"
import {
  UploadElectives,
  UploadElectivesSingle
} from "../../Functions/AddElectives"
import { CSVReader } from "react-papaparse"

const UploadModal = props => {
  const { buttonLabel, className } = props
  let fileInput = React.createRef()
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState(false)
  const [sem, setSemester] = useState(null)
  const [capacity, setCapacity] = useState(null)
  const [course_code, setCourse_code] = useState(null)
  const [course, setCourse] = useState(null)
  const [department, setDepartment] = useState(null)

  const toggle = () => setModal(!modal)

  const handleReadCSV = data => {
    console.log("--------------------------------------------------")
    console.log(data)
    setFile(data)
    console.log("--------------------------------------------------")
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const onChange = e => {
    switch (e.target.name) {
      case "semester":
        setSemester(e.target.value)
        break
      case "Capacity":
        setCapacity(e.target.value)

        break
      case "option":
        setDepartment(e.target.value)
        break
      case "course":
        setCourse(e.target.value)
        break
      case "course_code":
        setCourse_code(e.target.value)
        break
    }
  }
  const onSubmit = e => {
    console.log(file)
    if (file) UploadElectives(file)
    else
      UploadElectivesSingle({
        sem,
        // , capacity
        course_code,
        course,
        department
      })
    e.preventDefault()
    toggle()
  }

  return (
    <div>
      <Button onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Upload Electives</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="Select Semester">Select Semester</Label>
              <Input
                type="select"
                name="semester"
                id="Semester Select"
                value={sem}
                onChange={onChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="Select capacity">Enter Capacity </Label>
              <Input
                type="number"
                min="0"
                max="70"
                name="Capacity"
                value={capacity}
                onChange={onChange}
                id="Semester Select"
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Elective Course Code</Label>
              <Input
                type="text"
                name="course_code"
                id="exampleText"
                value={course_code}
                onChange={onChange}
              />
              <FormText color="muted">Elective course Code.</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Elective Course Title</Label>
              <Input
                type="text"
                name="course"
                id="exampleText"
                value={course}
                onChange={onChange}
              />
              <FormText color="muted">Elective course Title</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="electivefile">File</Label>
              <CSVReader
                onFileLoaded={handleReadCSV}
                inputRef={fileInput}
                // style={{ display: "none" }}
                onError={handleOnError}
                configOptions={{ header: true }}
              />
              {/* <button onClick={handleImportOffer}>Upload</button> */}
              {/* <Input ref={fileInput} type="file" name="file" id="exampleFile" /> */}
              <FormText color="muted">Upload the electives file.</FormText>
            </FormGroup>
            <FormGroup tag="fieldset" name="Department">
              <legend>Select Department</legend>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="option" />
                  MECH
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="option"
                    value="CSE"
                    onChange={onChange}
                  />
                  CSE
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="option"
                    value="CHEM"
                    onChange={onChange}
                  />{" "}
                  CHEM
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="option"
                    value="EEE"
                    onChange={onChange}
                  />{" "}
                  EEE
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="option"
                    value="ECE"
                    onChange={onChange}
                  />{" "}
                  ECE
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default UploadModal
