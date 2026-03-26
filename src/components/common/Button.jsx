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
      className={`text-xs bg-transparent text-secondary border border-secondary p-2 rounded-md m-1 cursor-pointer hover:bg-secondary hover:text-primary ${className}`}
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
      className={`text-xs bg-transparent text-primary p-2 rounded-md m-1 border border-primary cursor-pointer hover:bg-primary hover:text-white ${className}`}
    >
      {name}
    </button>
  );
};
