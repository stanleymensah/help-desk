import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/InputField";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import { PrimaryButton, SecondaryButton } from "../common/Button";

export default function TicketForm({
  ticket = null,
  mode = "create",
  onSubmit,
  onCancel,
  onDirtyChange,
}) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: ticket?.title ?? "",
      description: ticket?.description ?? "",
      email: ticket?.email ?? "",
      priority: ticket?.priority ?? "",
      status: ticket?.status ?? "open",
    },
  });

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleFormSubmit = (data) => {
    if (isEdit && !isDirty) return;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-md mx-auto space-y-3">

      <div className="text-gray-500">(<span className="text-red-500">*</span>) Fields are required</div>

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
</div>

      {isEdit && (
        <Select
          label="Status"
          name="status"
          options={statusOptions}
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
        <PrimaryButton
          name={isEdit ? "Save Changes" : "Create Ticket"}
          type="submit"
          className={isEdit && !isDirty ? "opacity-50 cursor-not-allowed hover:bg-primary" : ""}
          disabled={isEdit && !isDirty}
        />
      </div>
    </form>
  );
}