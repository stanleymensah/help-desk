export const PrimaryButton = ({ name, type = "button" }) => {
  return (
    <>
      <button
        type={type}
        className="text-xs bg-primary text-white py-3 px-3 rounded-md m-1 cursor-pointer"
      >
        {name}
      </button>
    </>
  );
};

export const SecondaryButton = ({ name, type = "button" }) => {
  return (
    <>
      <button
        type={type}
        className="text-xs bg-tranparent text-secondary py-3 px-3 rounded-md m-1 border border-secondary cursor-pointer"
      >
        {name}
      </button>
    </>
  );
};
