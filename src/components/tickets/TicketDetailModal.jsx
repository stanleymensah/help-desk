import Modal from "../common/Modal";
import Badge from "../common/Badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { toast } from "react-toastify";
import TicketWorkflowActions from "./TicketWorkflowActions";
import TicketCommentsSection from "./TicketCommentsSection";
import { formatDateTime } from "@/lib/date";

export default function TicketDetailsModal({ ticket, isOpen, onClose }) {
  const {
    users,
    getTicketById,
    assignTicket,
    startWork,
    markResolved,
    closeTicket,
    reopenTicket,
    addComment,
  } = useTickets();

  const activeTicket = ticket ? getTicketById(ticket.id) || ticket : null;
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const comments = Array.isArray(activeTicket?.comments)
    ? activeTicket.comments
    : [];
  const effectiveAssignee = selectedAssignee || activeTicket?.assignedTo || "";
  const effectiveCommentAuthor =
    commentAuthor || activeTicket?.assignedTo || users?.[0] || "";

  if (!activeTicket) return null;

  const runAction = async (actionFn, successMessage) => {
    try {
      await actionFn();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error?.message || "Action failed");
    }
  };

  const handleAssign = () => {
    runAction(
      () => assignTicket(activeTicket.id, effectiveAssignee),
      "Ticket assigned",
    );
  };

  const handleAddComment = async () => {
    const message = commentMessage.trim();
    if (!message) return;

    await runAction(
      () =>
        addComment(activeTicket.id, {
          author: effectiveCommentAuthor,
          message,
        }),
      "Comment added",
    );

    setCommentMessage("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ticket Details" size="md">
      <div className="space-y-5 text-sm">
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <div className="grid grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Ticket ID
              </label>
              <p className="text-lg font-semibold text-foreground">
                #{activeTicket.id}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Title
              </label>
              <p className="text-base font-medium text-foreground">
                {activeTicket.title}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </label>
            <p className="text-sm leading-relaxed text-foreground/90">
              {activeTicket.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Created By
            </label>
            <p className="text-[13px] text-foreground">
              {activeTicket.email || activeTicket.customerEmail}
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-[xs] font-semibold uppercase tracking-wide text-muted-foreground">
              Assigned To
            </label>
            <p className="text-[13px] text-foreground">
              {activeTicket.assignedTo || "Unassigned"}
            </p>
          </div>
          <div className="space-y-1 flex flex-col">
            <label className="text-xs font-semibold uppercase me-1 tracking-wide text-muted-foreground">
              Status
            </label>
            <div>
              <Badge type="status" value={activeTicket.status} />
            </div>
          </div>{" "}
          <div className="space-y-1 flex flex-col">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Priority
            </label>
            <div>
              <Badge type="priority" value={activeTicket.priority} />
            </div>
          </div>
        </div>

        <TicketWorkflowActions
          ticket={activeTicket}
          users={users}
          effectiveAssignee={effectiveAssignee}
          onAssigneeChange={setSelectedAssignee}
          onAssign={handleAssign}
          onStartWork={() =>
            runAction(() => startWork(activeTicket.id), "Work started")
          }
          onMarkResolved={() =>
            runAction(() => markResolved(activeTicket.id), "Ticket resolved")
          }
          onCloseTicket={() =>
            runAction(() => closeTicket(activeTicket.id), "Ticket closed")
          }
          onReopenTicket={() =>
            runAction(() => reopenTicket(activeTicket.id), "Ticket reopened")
          }
        />

        <div className="grid grid-cols-3 gap-4 text-[13px]">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Assigned At
            </label>
            <p className="text-foreground">
              {formatDateTime(activeTicket.assignedAt)}
            </p>
          </div>

          <div className="space-y-1">
            <label className=" font-semibold uppercase tracking-wide text-muted-foreground">
              Created At
            </label>
            <p className="text-foreground">
              {formatDateTime(activeTicket.createdAt)}
            </p>
          </div>
          <div className="space-y-1">
            <label className="font-semibold uppercase tracking-wide text-muted-foreground">
              Last Updated
            </label>
            <p className="text-foreground">
              {formatDateTime(activeTicket.updatedAt)}
            </p>
          </div>
        </div>

        <Separator />

        <TicketCommentsSection
          comments={comments}
          users={users}
          commentMessage={commentMessage}
          onCommentMessageChange={setCommentMessage}
          effectiveCommentAuthor={effectiveCommentAuthor}
          onCommentAuthorChange={setCommentAuthor}
          onAddComment={handleAddComment}
          formatDateTime={formatDateTime}
        />

        <Separator />

        <div className="flex items-center justify-center pt-1">
          <Button type="button" variant="outline" size="lg" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
