import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useUsers } from "./UsersContext";

const TicketContext = createContext();
const STORAGE_KEY = "helpdesk_tickets";

const STATUS_TRANSITIONS = {
  open: ["assigned"],
  assigned: ["in-progress"],
  "in-progress": ["resolved"],
  resolved: ["closed", "reopened"],
  reopened: ["in-progress"],
  closed: [],
};

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {users} = useUsers();

  const normalizeId = (id) => String(id);
  const canTransition = (fromStatus, toStatus) => {
    if (fromStatus === toStatus) return true;
    return STATUS_TRANSITIONS[fromStatus]?.includes(toStatus) ?? false;
  };

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
    const now = new Date().toISOString();
    const assignedTo = ticketData.assignedTo?.trim() ?? "";
    const status = assignedTo ? "assigned" : "open";
    const newTicket = {
      ...ticketData,
      id: tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1,
      customerEmail: ticketData.customerEmail ?? ticketData.email ?? "",
      email: ticketData.email ?? ticketData.customerEmail ?? "",
      status,
      assignedTo,
      assignedAt: assignedTo ? now : null,
      comments: Array.isArray(ticketData.comments) ? ticketData.comments : [],
      createdAt: now,
      updatedAt: now,
    };
    setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
  };

    const updateTicket = async ({ id, updates }) => {
        let updatedTicket = null;
        let validationError = null;

      setTickets((prev) =>
        prev.map((ticket) => {
          if (normalizeId(ticket.id) !== normalizeId(id)) return ticket;

            const currentStatus = ticket.status ?? "open";
            const nextStatus = updates.status ?? currentStatus;
            const currentAssignedTo = ticket.assignedTo?.trim() ?? "";
            const nextAssignedTo =
              updates.assignedTo !== undefined
                ? updates.assignedTo?.trim() ?? ""
                : currentAssignedTo;

            if (!canTransition(currentStatus, nextStatus)) {
              validationError =
                `Invalid status transition: ${currentStatus} -> ${nextStatus}`;
              return ticket;
            }

            if (nextStatus === "assigned" && !nextAssignedTo?.trim()) {
              validationError = "Assign the ticket to a user before setting status to assigned.";
              return ticket;
            }

            if (nextStatus === "in-progress" && !nextAssignedTo?.trim()) {
              validationError = "Must assign ticket to a user before starting work.";
              return ticket;
            }

            const now = new Date().toISOString();
            const hasAssignmentChanged = nextAssignedTo !== currentAssignedTo;

          updatedTicket = {
            ...ticket,
            ...updates,
            status: nextStatus,
            customerEmail:
              updates.customerEmail ?? updates.email ?? ticket.customerEmail ?? ticket.email,
            email: updates.email ?? updates.customerEmail ?? ticket.email ?? ticket.customerEmail,
            assignedTo: nextAssignedTo,
            comments: Array.isArray(updates.comments)
              ? updates.comments
              : (Array.isArray(ticket.comments) ? ticket.comments : []),
            updatedAt: now,
            assignedAt:
              nextAssignedTo && hasAssignmentChanged
                ? now
                : nextAssignedTo
                  ? (ticket.assignedAt ?? now)
                  : null,
          };

          return updatedTicket;
        }),
      );

      if (validationError) {
        throw new Error(validationError);
      }

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

  const assignTicket = async (ticketId, user) => {
    const assignee =
      typeof user === "string"
        ? user.trim()
        : user?.fullName?.trim() ??
          user?.name?.trim() ??
          user?.username?.trim() ??
          user?.email?.trim() ??
          "";
    if (!assignee) {
      throw new Error("Assignee is required.");
    }

    const existingTicket = getTicketById(ticketId);
    if (!existingTicket) {
      throw new Error("Ticket not found");
    }

    if (existingTicket.status === "closed") {
      throw new Error("Cannot assign a closed ticket.");
    }

    let updatedTicket = null;

    setTickets((prev) =>
      prev.map((ticket) => {
        if (normalizeId(ticket.id) !== normalizeId(ticketId)) return ticket;

        const now = new Date().toISOString();

        updatedTicket = {
          ...ticket,
          assignedTo: assignee,
          assignedAt: now,
          status: ticket.status === "open" ? "assigned" : ticket.status,
          updatedAt: now,
        };

        return updatedTicket;
      }),
    );

    if (!updatedTicket) {
      throw new Error("Ticket not found");
    }

    return updatedTicket;
  };

  const transitionTicket = async (ticketId, nextStatus) => {
    const ticket = getTicketById(ticketId);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    if (!canTransition(ticket.status, nextStatus)) {
      throw new Error(`Invalid status transition: ${ticket.status} -> ${nextStatus}`);
    }

    if (
      (nextStatus === "assigned" || nextStatus === "in-progress") &&
      !ticket.assignedTo?.trim()
    ) {
      throw new Error("Must assign ticket to a user before this action.");
    }

    return updateTicket({ id: ticketId, updates: { status: nextStatus } });
  };

  const startWork = (ticketId) => transitionTicket(ticketId, "in-progress");
  const markResolved = (ticketId) => transitionTicket(ticketId, "resolved");
  const closeTicket = (ticketId) => transitionTicket(ticketId, "closed");
  const reopenTicket = (ticketId) => transitionTicket(ticketId, "reopened");

  const addComment = async (ticketId, commentData) => {
    const message = commentData?.message?.trim() ?? "";
    const author = commentData?.author?.trim() ?? "";

    if (!message) {
      throw new Error("Comment message is required.");
    }

    if (!author) {
      throw new Error("Comment author is required.");
    }

    const ticket = getTicketById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const comment = {
      message,
      author,
      createdAt: new Date().toISOString(),
    };

    return updateTicket({
      id: ticketId,
      updates: {
        comments: [...(ticket.comments ?? []), comment],
      },
    });
  };

  const value = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    isLoading,
    tickets,
    users,
    assignTicket,
    transitionTicket,
    startWork,
    markResolved,
    closeTicket,
    reopenTicket,
    addComment,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTickets = () => useContext(TicketContext);
