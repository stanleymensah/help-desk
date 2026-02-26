import { useForm } from "react-hook-form";
import Input from "../common/InputField";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import { PrimaryButton, SecondaryButton } from "../common/Button";

export default function EditTicketForm({ ticket, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: ticket.title,
      description: ticket.description,
      email: ticket.email,
      priority: ticket.priority,
      status: ticket.status,
    },
  });

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  const priorityOptions = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        name="title"
        register={register} 
        error={errors.title}
        required
        validation={{
          required: "Title is required",
          minLength: {
            value: 5,
            message: "Title must be at least 5 characters",
          },
        }}
      />

      <Textarea
        label="Description"
        name="description"
        register={register}
        error={errors.description}
        required
        rows={4}
        validation={{
          required: "Description is required",
        }}
      />

      <div className="flex justify-between gap-2">
        <Select
          label="Status"
          name="status"
          options={statusOptions}
          register={register}
          error={errors.status}
          required
          validation={{ required: "Status is required" }}
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

      <div className="flex justify-end gap-2 pt-4">
        <SecondaryButton name="Cancel" doWhat={onCancel} text="Cancel" />
        <PrimaryButton name="Save Changes" type="submit" text="Save Changes" />
      </div>
    </form>
  );
}
