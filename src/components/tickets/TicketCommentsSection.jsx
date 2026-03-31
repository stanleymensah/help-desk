import { Button } from "../ui/button";

export default function TicketCommentsSection({
  comments,
  users,
  commentMessage,
  onCommentMessageChange,
  effectiveCommentAuthor,
  onCommentAuthorChange,
  onAddComment,
  formatDateTime,
}) {
  return (
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
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
          placeholder="Add a comment..."
          value={commentMessage}
          onChange={(event) => onCommentMessageChange(event.target.value)}
        />
        <div className="flex flex-col gap-2">
          <select
            className="h-9 rounded-md border border-input bg-background px-3 text-xs"
            value={effectiveCommentAuthor}
            onChange={(event) => onCommentAuthorChange(event.target.value)}
          >
            {(users ?? []).map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <Button
            type="button"
            onClick={onAddComment}
            disabled={!commentMessage.trim() || !effectiveCommentAuthor}
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
