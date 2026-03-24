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
    <div className="flex flex-col gap-1 w-full">
      <label className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, validation)}
        className={`w-full h-9 border rounded-md px-3 text-xs focus:outline-none focus:border-primary ${error ? "error-border" : "border-gray-300"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
