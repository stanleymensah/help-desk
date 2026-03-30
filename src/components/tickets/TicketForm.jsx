import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Input from "../common/InputField";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import { SecondaryButton } from "../common/Button";
import { useTickets } from "@/context/TicketContext";

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

  const userOptions = (users ?? []).map((name) => ({
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
      className="w-full max-w-md mx-auto space-y-3"
    >
      <div className="text-gray-500">
        (<span className="text-red-500">*</span>) Fields are required
      </div>

      <Input
        label="Title"
        name="title"
        register={register}
        error={errors.title}
        placeholder="Title must be at least 5 characters"
        required
        validation={{
          required: "Title is required",
          minLength: {
            value: 5,
            message: "Title must be at least 5 characters",
          },
        }}
      />

      <div className="flex justify-between gap-2">
        <Input
          label="User Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter a valid email"
          required
          validation={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          }}
        />

        <Select
          label="Priority"
          name="priority"
          options={priorityOptions}
          register={register}
          error={errors.priority}
          required
          validation={{ required: "Priority is required" }}
        />
        <Select
          label="Assign To"
          name="assignedTo"
          options={userOptions}
          register={register}
          error={errors.assignedTo}
          validation={{}}
        />
      </div>

      {isEdit && (
        <Select
          label="Status"
          name="status"
          options={statusOptionsForForm}
          register={register}
          error={errors.status}
          required
          validation={{ required: "Status is required" }}
        />
      )}

      <Textarea
        label="Description"
        name="description"
        register={register}
        error={errors.description}
        placeholder="Description must be at least 10 characters"
        required
        validation={{
          required: "Description is required",
          minLength: {
            value: 10,
            message: "Description must be at least 10 characters",
          },
        }}
      />

      <div className="flex justify-end gap-2 pt-1">
        <SecondaryButton name="Cancel" doWhat={onCancel} />
        <button
          type="submit"
          className={
            isEdit && !isDirty
              ? "opacity-50 cursor-not-allowed hover:bg-primary"
              : "text-xs bg-primary text-white p-2 rounded-md m-1 cursor-pointer hover:bg-primary-dark"
          }
          disabled={isEdit && !isDirty}
        >
          {isEdit ? "Save Changes" : "Create Ticket"}
        </button>
      </div>
    </form>
  );
}
