import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./page.css";
import initialData from "./initial_data";
import columnsData from "./components/columns_data";
import Column from "./components/column";

const Container = styled.div`
  display: flex;
`;

export default class ListLeadPage extends Component {
  constructor(props) {
    super(props);

    var allLeads = {},
      columns = columnsData.columns,
      columnOrder = columnsData.columnOrder;

    var leads = JSON.parse(localStorage.getItem("leads") || "[]");

    leads.forEach((element) => {
      allLeads[element.id] = element;
      columns[element.status].leadIds.push(element.id);
    });

    this.state = {
      columns: columnsData.columns,
      columnOrder: columnOrder,
      leads: allLeads,
    };
  }

  state = initialData;

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      Math.abs(destination.droppableId - source.droppableId) > 1
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newLeadIds = Array.from(start.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        leadIds: newLeadIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      localStorage.setItem("leads", JSON.stringify(this.state.leads))
      return;
    }

    const startLeadIds = Array.from(start.leadIds);
    startLeadIds.splice(source.index, 1);
    const newStart = {
      ...start,
      leadIds: startLeadIds,
    };

    const finishLeadIds = Array.from(finish.leadIds);
    finishLeadIds.splice(destination.index, 0, draggableId);
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
  };

  newLead = () => {
    window.location.assign("/new_lead")
  }

  render() {
    return (
      <div class="container">
        <div class="toolbar">
          <div class="logo">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              width="200"
              style={{ marginBottom: 10 }}
              alt="logo"
            />
          </div>
          <div class="header">
            <button class="btn btn-primary" style={{ margin: 20 }} onClick={this.newLead}>
              Adicionar lead [+]
            </button>
            <h3 class="title">Painel de leads</h3>
          </div>

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
