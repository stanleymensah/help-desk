import Modal from "../common/Modal";

export default function TicketDetailsModal({ ticket, isOpen, onClose }) {
  if (!ticket) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ticket Details">
      <div className="space-y-4">
        {/* ID and Title */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Ticket ID
          </label>
          <p className="text-lg font-bold">#{ticket.id}</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Title
          </label>
          <p className="text-base font-medium">{ticket.title}</p>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Description
          </label>
          <p className="text-sm text-gray-700">{ticket.description}</p>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">
            Created By
          </label>
          <p className="text-sm">{ticket.email}</p>
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Status
            </label>
            <p>
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                ticket.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
                ticket.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {ticket.status}
              </span>
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Priority
            </label>
            <p>
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {ticket.priority}
              </span>
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Created At
            </label>
            <p className="text-gray-600">
              {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </div>

          {ticket.updatedAt && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Last Updated
              </label>
              <p className="text-gray-600">
                {new Date(ticket.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}