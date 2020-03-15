import React, { Component } from "react"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap"

import register from "../../../Functions/Register"

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      rollno: "",
      pass: "",
      sec: "",
      sem: "",
      msg: ""
    }
    this.sendmessage = this.sendmessage.bind(this)
    this.setmessage = this.setmessage.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value })
  }
  sendmessage(msg1) {
    console.log(msg1)
    this.setState({ msg: msg1 })
  }
  setmessage() {
    if (this.state.msg) return <InputGroupText>{this.state.msg}</InputGroupText>
    else return
  }
  onSubmit(e) {
    const user = {
      name: this.state.name,
      rollno: this.state.rollno,
      pass: this.state.pass,
      sec: this.state.sec,
      sem: this.state.sem
    }

    console.log(user)

    register(user, this.sendmessage)

    e.preventDefault()
    // this.props.history.replace("/");
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create student account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        {/* <i className="icon-user"></i> */}
                        <InputGroupText>Name</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Student Name"
                        autoComplete="username"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Reg.No</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Registration Number"
                        autoComplete="Registration Number"
                        name="rollno"
                        value={this.state.rollno}
                        onChange={this.onChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          {/* <i className="icon-"></i> */}
                          Password
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="pass"
                        value={this.state.pass}
                        onChange={this.onChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Section</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="Text"
                        placeholder="Section"
                        autoComplete="section"
                        maxLength="1"
                        name="sec"
                        pattern="^[a-zA-Z]+$"
                        value={this.state.sec}
                        onChange={this.onChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Semester</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="Number"
                        placeholder="Semester"
                        autoComplete="Semester"
                        maxLength="1"
                        min="1"
                        max="8"
                        name="sem"
                        value={this.state.sem}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <Button
                      color="success"
                      type="submit"
                      block
                      disabled={
                        this.state.name.length === 0 ||
                        this.state.rollno.length === 0 ||
                        this.state.pass.length === 0 ||
                        this.state.sec.length === 0 ||
                        this.state.sem.length === 0
                      }
                    >
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            {this.setmessage()}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Register
