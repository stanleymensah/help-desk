import Modal from "../common/Modal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useTickets } from "@/context/TicketContext";
import { toast } from "sonner";
import TicketWorkflowActions from "./TicketWorkflowActions";
import TicketCommentsSection from "./TicketCommentsSection";
import { formatDateTime } from "@/lib/date";

function getStatusBadgeStyle(status) {
  switch (status) {
    case "open":
      return {
        backgroundColor: "#dbeafe",
        borderColor: "#93c5fd",
        color: "#1d4ed8",
      };
    case "assigned":
      return {
        backgroundColor: "#ffedd5",
        borderColor: "#fdba74",
        color: "#c2410c",
      };
    case "in-progress":
      return {
        backgroundColor: "#dcfce7",
        borderColor: "#86efac",
        color: "#15803d",
      };
    case "resolved":
      return {
        backgroundColor: "#e5e7eb",
        borderColor: "#9ca3af",
        color: "#374151",
      };
    case "closed":
      return {
        backgroundColor: "#f3e8ff",
        borderColor: "#d8b4fe",
        color: "#7e22ce",
      };
    case "reopened":
      return {
        backgroundColor: "#fef9c3",
        borderColor: "#fde047",
        color: "#a16207",
      };
    default:
      return {
        backgroundColor: "transparent",
        borderColor: "currentColor",
        color: "inherit",
      };
  }
}

function getPriorityBadgeStyle(priority) {
  switch (priority) {
    case "low":
      return {
        backgroundColor: "#ccfbf1",
        borderColor: "#5eead4",
        color: "#0f766e",
      };
    case "medium":
      return {
        backgroundColor: "#fef3c7",
        borderColor: "#fcd34d",
        color: "#b45309",
      };
    case "high":
      return {
        backgroundColor: "#fee2e2",
        borderColor: "#fca5a5",
        color: "#b91c1c",
      };
    default:
      return {
        backgroundColor: "transparent",
        borderColor: "currentColor",
        color: "inherit",
      };
  }
}

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

  const getUserDisplayName = (user) => {
    if (typeof user === "string") return user.trim();
    return (
      user?.fullName?.trim() ??
      user?.name?.trim() ??
      user?.username?.trim() ??
      user?.email?.trim() ??
      ""
    );
  };

  const defaultCommentAuthor = getUserDisplayName(users?.[0]);

  const comments = Array.isArray(activeTicket?.comments)
    ? activeTicket.comments
    : [];
  const effectiveAssignee = selectedAssignee || activeTicket?.assignedTo || "";
  const effectiveCommentAuthor =
    commentAuthor || activeTicket?.assignedTo || defaultCommentAuthor || "";

  const handleCloseDetails = () => {
    setCommentMessage("");
    onClose();
  };

  if (!activeTicket) return null;

  const modalTitle = `TIC-${activeTicket.id} ${activeTicket.title}`;

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
    <Modal
      isOpen={isOpen}
      onClose={handleCloseDetails}
      title={modalTitle}
      size="md"
    >
      <div className="flex flex-col gap-4 text-[11px]">
        <div className="rounded-lg border border-border bg-muted/30 p-2 space-y-3">
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </label>
            <p className="text-[11px] leading-relaxed text-foreground/90">
              {activeTicket.description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1 ">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Created By
              </label>
              <div></div>
              <p className="text-[11px] text-foreground">
                {activeTicket.email || activeTicket.customerEmail}
              </p>
            </div>
            <div className="space-y-1 ">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Assigned To
              </label>
              <div></div>
              <p className="text-[11px] text-foreground">
                {activeTicket.assignedTo || "Unassigned"}
              </p>
            </div>
            <div className="space-y-1 flex flex-col">
              <label className="text-[10px] font-semibold uppercase me-1 tracking-wide text-muted-foreground">
                Status
              </label>
              <div>
                <Badge
                  variant="outline"
                  className="capitalize text-[10px]"
                  style={getStatusBadgeStyle(activeTicket.status)}
                >
                  {activeTicket.status}
                </Badge>
              </div>
            </div>{" "}
            <div className="space-y-1 flex flex-col">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Priority
              </label>
              <div>
                <Badge
                  variant="outline"
                  className="capitalize text-[10px]"
                  style={getPriorityBadgeStyle(activeTicket.priority)}
                >
                  {activeTicket.priority}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-4 gap-4 text-[11px]">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Assigned At
              </label>
              <p className="text-foreground">
                {formatDateTime(activeTicket.assignedAt)}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Created At
              </label>
              <p className="text-foreground">
                {formatDateTime(activeTicket.createdAt)}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Last Updated
              </label>
              <p className="text-foreground">
                {formatDateTime(activeTicket.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-2">
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
        </div>

        {/* <Separator />

        <div className="flex items-center justify-center pt-1">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={handleCloseDetails}
          >
            Close
          </Button>
        </div> */}
      </div>
    </Modal>
  );
}
