import CreateTicketForm from "./CreateTicketForm";

export default function CreateTicketPage() {
  

  return (
    <div className="container flex flex-col md:w-[50rem] min-h-[32rem]">
      {/* 2. Top Header (Takes only the space it needs) */}
      <div className="flex flex-col gap-1 pb-4">
        <span className="text-lg font-semibold">Create a Ticket</span>
        <span className="text-xs text-gray-500">
          Fill the form below to create a new form.
        </span>
      </div>

      <div className="formContainer text-xs flex-1 overflow-hidden p-4">
        {/* Form content goes here */}
        <CreateTicketForm />
      </div>
    </div>
  );
}
