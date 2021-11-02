const initialData = {
  leads: {
    "1": {
      id: "1",
      name: "Lead 1",
      phone: "86 99999999",
      email: "lead1@gmail.com",
      opportunities: ["RPA", "Produto digital"],
      status: "Cliente em potêncial",
    },
    "2": {
      id: "2",
      name: "Lead 2",
      phone: "86 888888888",
      email: "lead2@gmail.com",
      opportunities: ["RPA", "Produto digital", "Analytics", "BPM"],
      status: "Cliente em potêncial",
    },
    "3": {
      id: "3",
      name: "Lead 3",
      phone: "86 77777777",
      email: "lead3@gmail.com",
      opportunities: ["Produto digital"],
      status: "Cliente em potêncial",
    },
  }, 

  columns: {
    "1": {
      id: "1",
      title: "Clientes em potêncial",
      leadIds: [1, 2, 3],
    },
    "2": {
      id: "2",
      title: "Dados confirmados",
      leadIds: [],
    },
    "3": {
      id: "3",
      title: "Reunião agendada",
      leadIds: [],
    },
  },

  columnOrder: ["1", "2", "3"],
};

export default initialData;
