export const PrimaryButton = ({
  name,
  type = "button",
  doWhat = null,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={doWhat}
      type={type}
      disabled={disabled}
      className={`text-xs bg-primary text-white p-2 rounded-md m-1 cursor-pointer hover:bg-primary-dark ${className}`}
    >
      {name}
    </button>
  );
};

export const SecondaryButton = ({
  name,
  type = "button",
  doWhat = null,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={doWhat}
      type={type}
      disabled={disabled}
      className={`text-xs bg-transparent text-secondary p-2 rounded-md m-1 border border-secondary cursor-pointer hover:bg-secondary hover:text-white ${className}`}
    >
      {name}
    </button>
  );
};
