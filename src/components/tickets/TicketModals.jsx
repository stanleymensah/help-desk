import Modal from "../common/Modal";
import TicketDetailsModal from "./TicketDetailModal";
import TicketForm from "./TicketForm";
import { Button } from "../ui/button";

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
        size="lg"
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
        onClose={onCancelDelete}
        title="Delete Ticket"
        size="sm"
      >
        {deletingTicket && (
          <div className="space-y-4 text-sm">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">#{deletingTicket.id}</span>?
            </p>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={onCancelDelete}>
                Cancel
              </Button>
              <Button type="button" variant="destructive" onClick={onConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
