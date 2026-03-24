export default function Textarea({
  label,
  name,
  placeholder,
  register,
  error,
  required = false,
  validation = {},
  rows = 4,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...register(name, validation)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full border rounded-md px-3 py-2 text-xs min-h-24 max-h-40 resize-y focus:outline-none focus:border-primary ${error ? "error-border" : "border-gray-300"}`}
      ></textarea>
    </div>
  );
}
