import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Lead from "./lead";

const Container = styled.div`
  border: 1px solid lightgrey;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h5`
  padding: 8px;
`;

const LeadList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "lightgrey" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Container>
          <Title>{this.props.column.title}</Title>
        </Container>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <LeadList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.leads.map((lead, index) => (
                <Lead key={lead.id} lead={lead} index={index} />
              ))}
              {provided.placeholder}
            </LeadList>
          )}
        </Droppable>
      </Container>
    );
  }
}
