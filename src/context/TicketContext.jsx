import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const TicketContext = createContext();
const STORAGE_KEY = "helpdesk_tickets";
const USERS = ['Henry Saaka', 'Abu Gerald', 'Anthony Adtek', "Bright Andoh", 'Elvis Mussah'];

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeId = (id) => String(id);

  const getStoredTickets = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse Tickets:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const initFetch = async () => {
      setIsLoading(true);
      const data = getStoredTickets();
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTickets(data);
      setIsLoading(false);
    };
    initFetch();
  }, [getStoredTickets]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets, isLoading]);

  //Actions
    const getTicketById = (id) => {
      return tickets.find((ticket) => normalizeId(ticket.id) === normalizeId(id));
    };

  const createTicket = async (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
  };

    const updateTicket = async ({ id, updates }) => {
      let updatedTicket = null;

      setTickets((prev) =>
        prev.map((ticket) => {
          if (normalizeId(ticket.id) !== normalizeId(id)) return ticket;

          updatedTicket = {
            ...ticket,
            ...updates,
            updatedAt: new Date().toISOString(),
          };

          return updatedTicket;
        }),
      );

      if (!updatedTicket) {
        throw new Error("Ticket not found");
      }

      return updatedTicket;
  };

  const deleteTicket = async (id) => {
      let isDeleted = false;

      setTickets((prev) => {
        const filtered = prev.filter(
          (ticket) => normalizeId(ticket.id) !== normalizeId(id),
        );
        isDeleted = filtered.length !== prev.length;
        return filtered;
      });

      if (!isDeleted) {
        throw new Error("Ticket not found");
      }

      return { success: true };
    };

    const assignTicket = (ticketId, userName) => {
        setTickets((prev) => prev.map((ticket) => ticket.id === ticketId ? {...ticket, assignTo: userName}: ticket))
    }

  const value = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    isLoading,
    tickets,
    users: USERS,
    assignTicket
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTickets = () => useContext(TicketContext);
