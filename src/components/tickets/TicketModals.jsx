import Modal from "../common/Modal";
import EditTicketForm from "./EditTicketForm";
import TicketDetailsModal from "./TicketDetailModal";

export default function TicketModals({
  viewingTicket,
  editingTicket,
  onCloseView,
  onCloseEdit,
  onSubmit,
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
        onClose={onCloseEdit}
        title="Edit Ticket"
      >
        {editingTicket && (
          <EditTicketForm
            ticket={editingTicket}
            onSubmit={onSubmit}
            onCancel={onCloseEdit}
          />
        )}
      </Modal>
    </>
  );
}