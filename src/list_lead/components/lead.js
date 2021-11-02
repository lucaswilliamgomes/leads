import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  background-color: ${props => (props.isDragging ? '#ffb74d' : 'white')};
`;

export default class Lead extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.lead.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.lead.name}
          </Container>
        )}
      </Draggable>
    );
  }
}
