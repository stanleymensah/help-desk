export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  validation = {},
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className={`w-full h-9 border rounded-md px-3 text-xs focus:outline-none focus:border-primary ${error ? "error-border" : "border-gray-300"}`}
      />
    </div>
  );
}
