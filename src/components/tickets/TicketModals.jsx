import Modal from "../common/Modal";
import TicketDetailsModal from "./TicketDetailModal";
import TicketForm from "./TicketForm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";

export default function TicketModals({
  viewingTicket,
  editingTicket,
  deletingTicket,
  confirmDiscardEditOpen,
  onCloseView,
  onRequestCloseEdit,
  onKeepEditing,
  onDiscardChanges,
  onCancelDelete,
  onConfirmDelete,
  onEditDirtyChange,
  onEditSubmit,
}) {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const expectedDeleteValue = useMemo(
    () => (deletingTicket ? `TIC-${deletingTicket.id}` : ""),
    [deletingTicket],
  );

  const isDeleteConfirmed = deleteConfirmation.trim() === expectedDeleteValue;

  const handleCancelDeleteModal = () => {
    setDeleteConfirmation("");
    onCancelDelete();
  };

  const handleConfirmDeleteModal = () => {
    if (!isDeleteConfirmed) return;

    setDeleteConfirmation("");
    onConfirmDelete();
  };

  return (
    <>
      {/* View Details Modal */}
      <TicketDetailsModal
        ticket={viewingTicket}
        isOpen={!!viewingTicket}
        onClose={onCloseView}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingTicket}
        onClose={onRequestCloseEdit}
        title="Edit Ticket"
        size="sm"
      >
        {editingTicket && (
          <TicketForm
            ticket={editingTicket}
            mode="edit"
            onSubmit={onEditSubmit}
            onCancel={onRequestCloseEdit}
            onDirtyChange={onEditDirtyChange}
          />
        )}
      </Modal>

      <Modal
        isOpen={confirmDiscardEditOpen}
        onClose={onKeepEditing}
        title="Discard Changes?"
        size="sm"
      >
        <div className="space-y-4 text-sm">
          <p>You have unsaved changes. Close without saving?</p>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onKeepEditing}>
              Keep Editing
            </Button>
            <Button type="button" variant="destructive" onClick={onDiscardChanges}>
              Discard
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!deletingTicket}
        onClose={handleCancelDeleteModal}
        title="Delete Ticket"
        size="sm"
      >
        {deletingTicket && (
          <div className="space-y-4 text-sm">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">TIC-{deletingTicket.id}</span>?
            </p>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Type <span className="font-semibold text-foreground">{expectedDeleteValue}</span> to confirm deletion.
              </p>
              <Input
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                placeholder={`Type ${expectedDeleteValue}`}
                aria-label="Type ticket reference to confirm delete"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={handleCancelDeleteModal}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDeleteModal}
                disabled={!isDeleteConfirmed}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
