import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

function CompanyCard({ company }) {
  const { name, description } = company;
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h3>{name}</h3>
        </CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;
