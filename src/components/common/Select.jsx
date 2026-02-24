export default function Select({
  label,
  name,
  options,
  register,
  error,
  required = false,
  validation = {},
  placeholder = "Select an option",
}) {
  return (
    <>
    <div className="flex flex-col gap-2 w-full">
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, validation)}
        className="border p-2 focus:outline-none focus:border-primary w-full"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
      
    </>
  );
}
