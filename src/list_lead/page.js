import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./page.css";
import initialData from "./initial_data";
import Column from "./components/column";

const Container = styled.div`
  display: flex;
`;

export default class ListLeadPage extends Component {
  state = initialData;

  onDragEnd = (result) => {
    const { destination, source, dragglableId } = result;

    if (!destination) return;

    // drag same place
    if (
      destination.index === source.index ||
      Math.abs(destination.droppableId - source.droppableId) !== 1
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    const startLeadIds = Array.from(start.leadIds);
    startLeadIds.splice(source.index, 1);
    const newStart = {
      ...start,
      leadIds: startLeadIds,
    };

    const finishLeadIds = Array.from(finish.leadIds);
    finishLeadIds.splice(destination.index, 0, dragglableId);
    const newFinish = {
      ...finish,
      leadIds: finishLeadIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
    return;
  };

  render() {
    return (
      <div class="card-body">
        <div class="toolbar">
          <div class="header">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              width="200"
              style={{ marginBottom: 10 }}
              alt="logo"
            />

            <h3 class="title">Painel de leads</h3>
          </div>

          <button class="btn btn-primary" style={{ margin: 20 }}>
            Adicionar lead [+]
          </button>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
              {this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const leads = column.leadIds.map(
                  (leadId) => this.state.leads[leadId]
                );
                return <Column key={column.id} column={column} leads={leads} />;
              })}
            </Container>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
