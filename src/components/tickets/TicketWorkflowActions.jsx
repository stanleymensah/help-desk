import { Button } from "../ui/button";

export default function TicketWorkflowActions({
  ticket,
  users,
  effectiveAssignee,
  canManageTickets = true,
  onAssigneeChange,
  onAssign,
  onStartWork,
  onMarkResolved,
  onCloseTicket,
  onReopenTicket,
}) {
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

  const userNames = (users ?? []).map(getUserDisplayName).filter(Boolean);

  if (!canManageTickets) {
    return (
      <div className="flex flex-col w-full items-center py-1">
        <div className="w-full mb-1">
          <label className="text-[10px] me-2 font-semibold uppercase text-muted-foreground">
            Ticket Actions
          </label>
        </div>
        <p className="w-full text-[11px] text-muted-foreground">
          Only admins can change ticket workflow.
        </p>
      </div>
    );
  }

  // const getNextStepHint = () => {
  //   switch (ticket.status) {
  //     case "open":
  //       return effectiveAssignee
  //         ? `Next valid step: assign to ${effectiveAssignee} (status becomes assigned).`
  //         : "Next valid step: assign this ticket to a user.";
  //     case "assigned":
  //       return "Next valid step: start work (moves to in-progress).";
  //     case "reopened":
  //       return "Next valid step: start work again (moves to in-progress).";
  //     case "in-progress":
  //       return "Next valid step: mark as resolved.";
  //     case "resolved":
  //       return "Next valid step: close ticket or reopen it.";
  //     case "closed":
  //       return "Workflow complete: closed tickets have no next action.";
  //     default:
  //       return "";
  //   }
  // };

  const renderActions = () => {
    switch (ticket.status) {
      case "open":
        return (
          <div className="flex min-w-0 items-end gap-2 flex-nowrap">
            <div className="min-w-0 flex-1">
              <select
                className="h-8 w-full rounded-md border border-input bg-background px-2 text-[11px]"
                value={effectiveAssignee}
                onChange={(event) => onAssigneeChange(event.target.value)}
              >
                <option value="">Select user</option>
                {userNames.map((userName) => (
                  <option key={userName} value={userName}>
                    {userName}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="xs"
              className="whitespace-nowrap py-4"
              disabled={!effectiveAssignee}
              onClick={onAssign}
            >
              Assign User
            </Button>
          </div>
        );
      case "assigned":
      case "reopened":
        return (
          <Button
            type="button"
            variant="secondary"
            size="xs"
            className="whitespace-nowrap py-4"
            onClick={onStartWork}
          >
            Start Work
          </Button>
        );
      case "in-progress":
        return (
          <Button
            type="button"
            variant="secondary"
            size="xs"
            className="whitespace-nowrap py-4"
            onClick={onMarkResolved}
          >
            Mark as Resolved
          </Button>
        );
      case "resolved":
        return (
          <div className="flex gap-2 flex-nowrap">
            <Button
              type="button"
              variant="secondary"
              size="xs"
              className="whitespace-nowrap py-4"
              onClick={onCloseTicket}
            >
              Close Ticket
            </Button>
            <Button
              type="button"
              size="xs"
              variant="secondary"
              className="whitespace-nowrap py-4"
              onClick={onReopenTicket}
            >
              Reopen Ticket
            </Button>
          </div>
        );
      default:
        return (
          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
            Ticket Closed
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-1">
      <div className="w-full mb-1">
        <label className="text-[10px] me-2 font-semibold uppercase text-muted-foreground">
          Ticket Actions
        </label>
      </div>

      <div className="w-full">{renderActions()}</div>
      {/* <p className="text-xs text-muted-foreground">{getNextStepHint()}</p> */}
    </div>
  );
}
