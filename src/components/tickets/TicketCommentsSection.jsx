import { Button } from "../ui/button";

export default function TicketCommentsSection({
  comments,
  // users,
  commentMessage,
  onCommentMessageChange,
  // effectiveCommentAuthor,
  // onCommentAuthorChange,
  onAddComment,
  // canChooseAuthor = true,
  formatDateTime,
}) {
  // const getUserDisplayName = (user) => {
  //   if (typeof user === "string") return user.trim();
  //   return (
  //     user?.fullName?.trim() ??
  //     user?.name?.trim() ??
  //     user?.username?.trim() ??
  //     user?.email?.trim() ??
  //     ""
  //   );
  // };

  // const userNames = (users ?? []).map(getUserDisplayName).filter(Boolean);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Comments
        </label>
        <div className="max-h-30 space-y-2 overflow-y-auto rounded-md border border-border bg-muted/20 p-1">
          {comments.length === 0 ? (
            <p className="text-[11px] text-muted-foreground">
              No comments yet.
            </p>
          ) : (
            comments.map((comment, index) => (
              <div
                key={`${comment.createdAt}-${index}`}
                className="rounded-md border border-border bg-background p-2"
              >
                <p className="text-[11px] text-foreground">{comment.message}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {comment.author} • {formatDateTime(comment.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <textarea
          rows={1}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-[11px] resize-none"
          placeholder="Add a comment..."
          value={commentMessage}
          onChange={(event) => onCommentMessageChange(event.target.value)}
        />
        <div className="flex flex-col gap-1">
          {/* <select
            className="h-8 rounded-md border border-input bg-background px-3 text-[11px]"
            value={effectiveCommentAuthor}
            onChange={(event) => onCommentAuthorChange(event.target.value)}
            disabled={!canChooseAuthor}
          >
            {userNames.map((userName) => (
              <option key={userName} value={userName}>
                {userName}
              </option>
            ))}
          </select> */}
          <Button
            type="button"
            size="xs"
            onClick={onAddComment}
            disabled={!commentMessage.trim()}
            className="py-4"
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
