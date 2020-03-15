import React from "react"
import {
  Card,
  Button,
  CardText,
  Row,
  Col,
  CardHeader,
  CardBody,
  Container,
  CardImg
} from "reactstrap"

import { Link } from "react-router-dom"

import student_image from "../../assets/student.jpeg"

const container_style = {
  margin: "5%"
}

const Student = props => {
  return (
    <Container style={container_style}>
      <Row className="justify-content-center">
        <Col md="4">
          <Card>
            <CardImg src={student_image} alt="Card image cap"></CardImg>
          </Card>
        </Col>
        <Col md="6" className="text-center">
          <Card>
            <CardHeader tag="h4">Details :</CardHeader>
            <CardBody>
              <CardText>Name :{props.studata.name}</CardText>
              <CardText>Roll.No: {props.studata.rollno}</CardText>
              <CardText>Section:{props.studata.section}</CardText>
              <CardText>Semester:{props.studata.semester}</CardText>
              <CardText>
                Department:
                {props.studata.rollno.match(/\D\D\D/g)[0].toUpperCase()}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="4" sm={{ size: 6, order: 2, offset: 1 }}>
          <Card>
            <CardHeader className="text-center" tag="h4">
              Selected Electives
            </CardHeader>
            <CardBody className="text-center">
              <CardText>electives list placeholder</CardText>
              <Button>Change electives</Button>
            </CardBody>
          </Card>
        </Col>
        <Col md="4" sm={{ size: 6, order: 2, offset: 1 }}>
          <Card>
            <CardHeader className="text-center" tag="h4">
              Electives deadline
            </CardHeader>

            <CardBody className="text-center">
              <CardText>Date placeholder.</CardText>
              <Link to="/list_electives">
                <Button>Select Electives</Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Student
