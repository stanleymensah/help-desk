const STORAGE_KEY = "helpdesk_tickets";

const initializeTickets = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const initialTickets = [];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTickets));
  }
};

//Fetch all tickets
export const fetchTickets = async () => {
  initializeTickets();
  const tickets = localStorage.getItem(STORAGE_KEY);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return JSON.parse(tickets);
};

//Fetch single ticket by id
export const fetchTicketById = async (id) => {
  initializeTickets();
  const tickets = localStorage.getItem(STORAGE_KEY);
  const allTickets = JSON.parse(tickets);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return allTickets.find((ticket) => ticket.id === parseInt(id));
};

//Create new ticket
export const createTicket = async (newTicket) => {
  initializeTickets();
  const tickets = localStorage.getItem(STORAGE_KEY);
  const allTickets = JSON.parse(tickets);
  const ticket = {
    ...newTicket,
    id:
      allTickets.length > 0 ? Math.max(...allTickets.map((t) => t.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  allTickets.push(ticket);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allTickets));
  await new Promise((resolve) => setTimeout(resolve, 500));
  return ticket;
};

//Update Ticket
export const updateTicket = async ({ id, updates }) => {
  initializeTickets();
  const tickets = localStorage.getItem(STORAGE_KEY);
  const allTickets = JSON.parse(tickets);

  const index = allTickets.findIndex((t) => t.id === parseInt(id));
  if (index === -1) throw new Error("Ticket not found");

  allTickets[index] = {
    ...allTickets[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allTickets));
  await new Promise((resolve) => setTimeout(resolve, 300));

  return allTickets[index];
};

// Delete Ticket
export const deleteTicket = async (id) => {
  console.log("Deleting ID:", id);
  initializeTickets();
  const tickets = localStorage.getItem(STORAGE_KEY);
  const allTickets = JSON.parse(tickets);

  const filtered = allTickets.filter((t) => t.id !== parseInt(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
};
