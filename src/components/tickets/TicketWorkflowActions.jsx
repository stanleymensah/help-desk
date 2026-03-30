import { Button } from "../ui/button";

export default function TicketWorkflowActions({
  ticket,
  users,
  effectiveAssignee,
  onAssigneeChange,
  onAssign,
  onStartWork,
  onMarkResolved,
  onCloseTicket,
  onReopenTicket,
}) {
  const getNextStepHint = () => {
    switch (ticket.status) {
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

  const renderActions = () => {
    switch (ticket.status) {
      case "open":
        return (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assign User
              </label>
              <select
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs"
                value={effectiveAssignee}
                onChange={(event) => onAssigneeChange(event.target.value)}
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
              onClick={onAssign}
            >
              Assign Ticket
            </Button>
          </div>
        );
      case "assigned":
      case "reopened":
        return (
          <Button type="button" onClick={onStartWork}>
            Start Work
          </Button>
        );
      case "in-progress":
        return (
          <Button type="button" onClick={onMarkResolved}>
            Mark as Resolved
          </Button>
        );
      case "resolved":
        return (
          <div className="flex gap-2">
            <Button type="button" onClick={onCloseTicket}>
              Close Ticket
            </Button>
            <Button type="button" variant="outline" onClick={onReopenTicket}>
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
    <div className="space-y-2">
      <label className="text-xs me-2 font-semibold uppercase tracking-wide text-muted-foreground">
        Ticket Actions
      </label>
      {renderActions()}
      <p className="text-xs text-muted-foreground">{getNextStepHint()}</p>
    </div>
  );
}
