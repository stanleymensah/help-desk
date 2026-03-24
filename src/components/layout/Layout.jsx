import { Outlet, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modal from "../common/Modal";
import TicketForm from "../tickets/TicketForm";
import useCreateTicket from "../../hooks/useCreateTicket";

export default function Layout() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { mutate: createTicket } = useCreateTicket();
  const navigate = useNavigate();
  const mainContentRef = useRef(null);

  const openCreateTicket = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateTicket = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSubmit = (formData) => {
    createTicket(
      {
        ...formData,
        status: "open",
      },
      {
        onSuccess: () => {
          closeCreateTicket();
          navigate("/tickets");
          requestAnimationFrame(() => {
            mainContentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
          });
          toast.success("Ticket created successfully!");
        },
        onError: () => {
          toast.error("Failed to create ticket");
        },
      },
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <Header creatingTicket={openCreateTicket} />

      {/* Main area - scrollable */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - ONLY THIS SCROLLS */}
        <div ref={mainContentRef} className="flex-1 p-3 bg-dim overflow-y-auto">
          <Outlet />
        </div>
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateTicket}
        title="Create Ticket"
        size="lg"
      >
        <TicketForm
          mode="create"
          onSubmit={handleCreateSubmit}
          onCancel={closeCreateTicket}
        />
      </Modal>
    </div>
  );
}