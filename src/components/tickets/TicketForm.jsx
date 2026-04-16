import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTickets } from "@/context/TicketContext";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function FormLabel({ children, required = false }) {
  return (
    <label className="text-xs font-medium text-muted-foreground">
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  );
}

export default function TicketForm({
  ticket = null,
  mode = "create",
  onSubmit,
  onCancel,
  onDirtyChange,
}) {
  const isEdit = mode === "edit";
  const { users } = useTickets();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: ticket?.title ?? "",
      description: ticket?.description ?? "",
      email: ticket?.email ?? "",
      priority: ticket?.priority ?? "",
      status: ticket?.status ?? "open",
      assignedTo: ticket?.assignedTo ?? "",
    },
  });

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const assignedToValue = useWatch({ control, name: "assignedTo" });
  const canSetAssigned = Boolean(assignedToValue?.trim());
  const currentStatus = ticket?.status ?? "open";
  const statusOptionsForForm = (() => {
    if (!isEdit) return [];

    switch (currentStatus) {
      case "open":
        return canSetAssigned
          ? [
              { value: "open", label: "Open" },
              { value: "assigned", label: "Assigned" },
            ]
          : [{ value: "open", label: "Open" }];
      case "assigned":
        return [
          { value: "assigned", label: "Assigned" },
          { value: "in-progress", label: "In Progress" },
        ];
      case "in-progress":
        return [
          { value: "in-progress", label: "In Progress" },
          { value: "resolved", label: "Resolved" },
        ];
      case "resolved":
        return [
          { value: "resolved", label: "Resolved" },
          { value: "closed", label: "Closed" },
          { value: "reopened", label: "Reopened" },
        ];
      case "reopened":
        return [
          { value: "reopened", label: "Reopened" },
          { value: "in-progress", label: "In Progress" },
        ];
      case "closed":
      default:
        return [{ value: "closed", label: "Closed" }];
    }
  })();

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

  const userOptions = (users ?? [])
    .map((user) => getUserDisplayName(user))
    .filter(Boolean)
    .map((name) => ({
      value: name,
      label: name,
    }));

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleFormSubmit = (data) => {
    if (isEdit && !isDirty) return;
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto w-full max-w-md space-y-3"
    >
      <div className="flex flex-col gap-1">
        <FormLabel required>Title</FormLabel>
        <Input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
          placeholder="Title must be at least 5 characters"
          aria-invalid={!!errors.title}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <FormLabel required>User Email</FormLabel>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            type="email"
            placeholder="Enter a valid email"
            aria-invalid={!!errors.email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel required>Priority</FormLabel>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.priority}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <FormLabel>Assign To</FormLabel>
          <Controller
            name="assignedTo"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {userOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {isEdit && (
        <div className="flex flex-col gap-1">
          <FormLabel required>Status</FormLabel>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.status}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptionsForForm.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <FormLabel required>Description</FormLabel>
        <Textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          placeholder="Description must be at least 10 characters"
          rows={5}
          aria-invalid={!!errors.description}
          className="resize-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-muted-foreground text-xs">
          (<span className="text-destructive">*</span>) Fields are required
        </div>
        <div className="flex gap-2 pt-1">
          <Button size="sm" type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isEdit && !isDirty}>
            {isEdit ? "Save Changes" : "Create Ticket"}
          </Button>
        </div>
      </div>
    </form>
  );
}
