import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import columnsData from "./columns_data";
import Column from "./components/column";
import Logo from "../../components/logo";
import HelloUser from "../../components/hello_user";
import verifyUser from "../../functions/verify_user";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default class ListLeadPage extends Component {
  constructor(props) {
    super(props);
    verifyUser();

    var allLeads = {},
      columns = columnsData.columns,
      columnOrder = columnsData.columnOrder;

    var leads = JSON.parse(localStorage.getItem("leads") || "[]");

    leads.forEach((element, index) => {
      allLeads[String(element.id)] = element;
      columns[element.status].leadIds[index] = element.id;
    });

    this.state = {
      columns: columnsData.columns,
      columnOrder: columnOrder,
      leads: allLeads,
    };
  }

  searchError(newState) {
    Object.values(newState.columns).forEach((element) => {
      element.leadIds.forEach((leadId, index) => {
        if (!leadId) {
          delete element.leadIds[index];
        }
      });
    });
    return newState;
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    var leads = [];

    if (!destination) return;

    if (
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) ||
      destination.droppableId - source.droppableId !== 1
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

    let finishLeadIds = Array.from(finish.leadIds);
    finishLeadIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      leadIds: finishLeadIds,
    };

    let newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    newState.leads[draggableId].status = finish.id;

    newState = this.searchError(newState);

    this.setState(newState);
    Object.values(this.state.leads).forEach((element) => {
      leads.push(element);
    });

    localStorage.setItem("leads", JSON.stringify(leads));
  };

  newLead = () => {
    window.location.assign("/new_lead");
  };

  render() {
    return (
      <div class="container">
        <div class="toolbar">
          <div class="logo">
            <Logo></Logo>
          </div>
          <HelloUser></HelloUser>
          <div class="header">
            <button
              class="btn btn-primary"
              style={{ margin: 20 }}
              onClick={this.newLead}
            >
              Adicionar lead [+]
            </button>
            <h3 class="title">Painel de leads</h3>
          </div>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <div class="d-flex">
              {this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const leads = column.leadIds.map(
                  (leadId) => this.state.leads[leadId]
                );
                return <Column key={column.id} column={column} leads={leads} />;
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}
