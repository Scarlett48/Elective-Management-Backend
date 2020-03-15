import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "../Login/loginstyle.css"
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: "",
      password: "",
      errmsg: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  UNSAFE_componentWillMount() {
    // if (this.Auth.loggedIn()) this.props.history.replace("/");
  }

  onSubmit(e) {
    if (this.state.user_name === "admin" && this.state.password === "admin") {
      localStorage.setItem("uid", this.state.user_name)
      localStorage.setItem("perm", "admin")
      this.props.history.push("/admin")

      this.props.setPerm("admin")
      this.props.setName("admin")
    } else {
      axios
        .post("/Login", {
          rollno: this.state.user_name,
          pass: this.state.password
        })
        .then(res => {
          console.log(res)

          if (res.data === "NO SUCH ROLL NUMBER EXISTS")
            this.setState({
              errmsg: "No Such Roll Number Exists",
              user_name: "",
              password: ""
            })
          else if (res.data === "WRONG PASSWORD")
            this.setState({ errmsg: "Wrong Password Try Again", password: "" })
          else {
            this.props.setStuData(res.data)

            localStorage.setItem("uid", res.data.name)
            localStorage.setItem("perm", "student")
            this.props.setPerm("student")
            this.props.setName(this.state.user_name)
            this.props.history.push("/student")
          }
        })
    }
    e.preventDefault()
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="user_name"
                          type="text"
                          placeholder="RollNo"
                          autoComplete="username"
                          value={this.state.user_name}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            disabled={
                              this.state.user_name.length === 0 ||
                              this.state.password.length === 0
                            }
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="signc" style={{ width: "44%" }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>
                        {" "}
                        {this.state.errmsg ? this.state.errmsg : "Welcome"}
                      </h2>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Login
