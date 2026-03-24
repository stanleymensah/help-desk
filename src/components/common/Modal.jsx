export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!isOpen) return null;

  const sizeMaxWidthMap = {
    sm: "22rem",
    md: "34rem",
    lg: "46rem",
    xl: "58rem",
    full: "90vw",
  };

  const modalMaxWidth = sizeMaxWidthMap[size] || sizeMaxWidthMap.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full p-6 z-10 text-xs max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: modalMaxWidth }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
}