import { Outlet, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Modal from "../common/Modal";
import TicketForm from "../tickets/TicketForm";
import useCreateTicket from "../../hooks/useCreateTicket";
import { SidebarProvider } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function Layout() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateDirty, setIsCreateDirty] = useState(false);
  const [confirmDiscardCreateOpen, setConfirmDiscardCreateOpen] = useState(false);
  const { mutate: createTicket } = useCreateTicket();
  const navigate = useNavigate();
  const mainContentRef = useRef(null);

  const openCreateTicket = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateTicket = () => {
    setIsCreateModalOpen(false);
    setIsCreateDirty(false);
    setConfirmDiscardCreateOpen(false);
  };

  const handleRequestCloseCreate = () => {
    if (isCreateDirty) {
      setConfirmDiscardCreateOpen(true);
      return;
    }

    closeCreateTicket();
  };

  const handleKeepCreating = () => {
    setConfirmDiscardCreateOpen(false);
  };

  const handleDiscardCreateChanges = () => {
    setConfirmDiscardCreateOpen(false);
    closeCreateTicket();
  };

  const handleCreateDirtyChange = (dirtyState) => {
    setIsCreateDirty(dirtyState);
  };

  const handleCreateSubmit = (formData) => {
    createTicket(
      {
        ...formData,
        status: formData.assignedTo?.trim() ? "assigned" : "open",
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
    <SidebarProvider defaultOpen>
      <div className="w-full h-screen overflow-hidden flex flex-col">
        <Header creatingTicket={openCreateTicket} />

        <main className="flex flex-1 overflow-hidden">
          <Sidebar />

          <div ref={mainContentRef} className="flex-1 bg-dim overflow-y-auto p-3">
            <Outlet />
          </div>
        </main>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={handleRequestCloseCreate}
          title="Create Ticket"
          size="sm"
        >
          <TicketForm
            mode="create"
            onSubmit={handleCreateSubmit}
            onCancel={handleRequestCloseCreate}
            onDirtyChange={handleCreateDirtyChange}
          />
        </Modal>

        <Modal
          isOpen={confirmDiscardCreateOpen}
          onClose={handleKeepCreating}
          title="Discard Changes?"
          size="sm"
        >
          <div className="space-y-4 text-sm">
            <p>You have unsaved changes. Close without saving?</p>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={handleKeepCreating}>
                Keep Creating
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDiscardCreateChanges}
              >
                Discard
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarProvider>
  );
}