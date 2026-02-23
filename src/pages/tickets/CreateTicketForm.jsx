import { PrimaryButton, SecondaryButton } from "../../components/common/Button";
import { useForm } from "react-hook-form";
import Input from "../../components/common/InputField";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import useCreateTicket from "../../hooks/useCreateTicket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTicketForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createTicket, isPending, error } = useCreateTicket();
  const navigate = useNavigate();

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const onSubmit = (data) => {
    createTicket(
      {
        ...data,
        status: "open",
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: async () => {
          toast.success("Ticket created!", {
            position: "top-center",
            autoClose: 2000,
          });
          reset();
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate("/tickets");
        },
      },
    );
  };


  return (
    <>
      {error && <p className="text-red-500">{error.message}</p>}
      {!error && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <div className="flex flex-col gap-2 w-1/2">
              <Input
                label="Ticket Title"
                name="title"
                type="text"
                placeholder="Title"
                register={register}
                error={errors.title}
                required
                validation={{
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Should be more than 5 characters",
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
              <Input
                label="User Email"
                name="email"
                type="text"
                placeholder="Email"
                register={register}
                error={errors.email}
                required
                validation={{
                  required: "Email is required",
                  minLength: {
                    value: 5,
                    message: "Should be more than 5 characters",
                  },
                }}
              />
            </div>
          </div>

          <div className="my-2">
            <div className="flex flex-col gap-2 w-1/2">
              <Select
                label="Ticket Priority"
                name="priority"
                options={priorityOptions}
                register={register}
                error={errors.priority}
                required
                placeholder="Select priority level"
                validation={{
                  required: "Select a Priority",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Textarea
              label="Ticket description"
              name="description"
              placeholder="Description"
              register={register}
              error={errors.description}
              required
              validation={{
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Must not be less than 10 characters",
                },
              }}
            />
          </div>

          <div className="buttons flex justify-end gap-3">
            <SecondaryButton name="Cancel" />
            <PrimaryButton
              name={`${isPending ? "Creating.." : "Create"}`}
              type="submit"
            />
          </div>
        </form>
      )}
    </>
  );
}
