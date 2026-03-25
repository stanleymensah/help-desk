const STORAGE_KEY = "helpdesk_tickets";

const getStoredTickets = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(stored);
};

//Fetch all tickets
export const fetchTickets = async () => {
  const alltickets = getStoredTickets();
  await new Promise((resolve) => setTimeout(resolve, 500));
  return alltickets;
};

//Fetch single ticket by id
export const fetchTicketById = async (id) => {
  const allTickets = getStoredTickets();
  await new Promise((resolve) => setTimeout(resolve, 500));
  return allTickets.find((ticket) => ticket.id === parseInt(id));
};

//Create new ticket
export const createTicket = async (newTicket) => {
  const allTickets = getStoredTickets();
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
  const allTickets = getStoredTickets();

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
  const allTickets = getStoredTickets();

  const filtered = allTickets.filter((t) => t.id !== parseInt(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
};
