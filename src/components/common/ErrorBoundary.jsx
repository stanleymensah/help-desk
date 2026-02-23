export default function ErrorBoundary({ message }) {
  return (
    <div className="p-6 text-center">
      <p className="text-red-500 font-medium">{message}</p>
    </div>
  );
}
