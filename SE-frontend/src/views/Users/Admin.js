import React from "react";
import {
  Card,
  Button,
  CardText,
  Row,
  Col,
  CardHeader,
  CardBody,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";
import UploadModal from "../Components/Modals";

const container_style = {
  margin: "5%"
};

const Admin = props => {
  return (
    <Container style={container_style}>
      <Row className="justify-content-center">
        <Col md="4" sm={{ size: 6, order: 2, offset: 1 }}>
          <Card>
            <CardHeader className="text-center" tag="h4">
              Upload elective lists
            </CardHeader>
            <CardBody className="text-center">
              <CardText>electives list placeholder</CardText>
              <UploadModal buttonLabel="upload electives list " />
            </CardBody>
          </Card>
        </Col>
        <Col md="4" sm={{ size: 6, order: 2, offset: 1 }}>
          <Card>
            <CardHeader className="text-center" tag="h4">
              Register Users
            </CardHeader>

            <CardBody className="text-center">
              <Link to={"/register"}>
                <Button>Register Students </Button>
              </Link>
            </CardBody>
            <CardBody className="text-center">
              <Button>Register Teachers</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
