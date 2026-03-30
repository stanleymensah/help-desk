import Modal from "../common/Modal";
import Badge from "../common/Badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { toast } from "react-toastify";

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

  const activeTicket = ticket ? (getTicketById(ticket.id) || ticket) : null;
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const comments = Array.isArray(activeTicket?.comments)
    ? activeTicket.comments
    : [];
  const effectiveAssignee = selectedAssignee || activeTicket?.assignedTo || "";
  const effectiveCommentAuthor = commentAuthor || activeTicket?.assignedTo || users?.[0] || "";

  if (!activeTicket) return null;

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString();
  };

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

  const getNextStepHint = () => {
    switch (activeTicket.status) {
      case "open":
        return effectiveAssignee
          ? `Next valid step: assign to ${effectiveAssignee} (status becomes assigned).`
          : "Next valid step: assign this ticket to a user.";
      case "assigned":
        return "Next valid step: start work (moves to in-progress).";
      case "reopened":
        return "Next valid step: start work again (moves to in-progress).";
      case "in-progress":
        return "Next valid step: mark as resolved.";
      case "resolved":
        return "Next valid step: close ticket or reopen it.";
      case "closed":
        return "Workflow complete: closed tickets have no next action.";
      default:
        return "";
    }
  };

  const renderWorkflowActions = () => {
    switch (activeTicket.status) {
      case "open":
        return (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assign User
              </label>
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={effectiveAssignee}
                onChange={(event) => setSelectedAssignee(event.target.value)}
              >
                <option value="">Select user</option>
                {(users ?? []).map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              variant="default"
              disabled={!effectiveAssignee}
              onClick={handleAssign}
            >
              Assign Ticket
            </Button>
          </div>
        );
      case "assigned":
      case "reopened":
        return (
          <Button
            type="button"
            onClick={() => runAction(() => startWork(activeTicket.id), "Work started")}
          >
            Start Work
          </Button>
        );
      case "in-progress":
        return (
          <Button
            type="button"
            onClick={() => runAction(() => markResolved(activeTicket.id), "Ticket resolved")}
          >
            Mark as Resolved
          </Button>
        );
      case "resolved":
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => runAction(() => closeTicket(activeTicket.id), "Ticket closed")}
            >
              Close Ticket
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => runAction(() => reopenTicket(activeTicket.id), "Ticket reopened")}
            >
              Reopen Ticket
            </Button>
          </div>
        );
      default:
        return (
          <span className="text-xs text-muted-foreground">
            No actions available for this status.
          </span>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ticket Details" size="md">
      <div className="space-y-5 text-sm">
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Ticket ID
            </label>
            <p className="text-lg font-semibold text-foreground">#{activeTicket.id}</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Title
            </label>
            <p className="text-base font-medium text-foreground">{activeTicket.title}</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </label>
            <p className="text-sm leading-relaxed text-foreground/90">{activeTicket.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Created By
            </label>
            <p className="text-sm text-foreground">{activeTicket.email || activeTicket.customerEmail}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Assigned To
            </label>
            <p className="text-sm text-foreground">{activeTicket.assignedTo || "Unassigned"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase me-1 tracking-wide text-muted-foreground">
              Status
            </label>
            <Badge type="status" value={activeTicket.status} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase me-1 tracking-wide text-muted-foreground">
              Priority
            </label>
            <Badge type="priority" value={activeTicket.priority} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Ticket Actions
          </label>
          {renderWorkflowActions()}
          <p className="text-xs text-muted-foreground">{getNextStepHint()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Assigned At
            </label>
            <p className="text-sm text-foreground">{formatDateTime(activeTicket.assignedAt)}</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Created At
            </label>
            <p className="text-sm text-foreground">{formatDateTime(activeTicket.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Last Updated
          </label>
          <p className="text-sm text-foreground">{formatDateTime(activeTicket.updatedAt)}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Comments
          </label>

          <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-border bg-muted/20 p-3">
            {comments.length === 0 ? (
              <p className="text-xs text-muted-foreground">No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div key={`${comment.createdAt}-${index}`} className="rounded-md border border-border bg-background p-2">
                  <p className="text-sm text-foreground">{comment.message}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {comment.author} • {formatDateTime(comment.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <textarea
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Add a comment..."
              value={commentMessage}
              onChange={(event) => setCommentMessage(event.target.value)}
            />
            <div className="flex flex-col gap-2">
              <select
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                value={effectiveCommentAuthor}
                onChange={(event) => setCommentAuthor(event.target.value)}
              >
                {(users ?? []).map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleAddComment}
                disabled={!commentMessage.trim() || !effectiveCommentAuthor}
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>

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
