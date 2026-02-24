export const PrimaryButton = ({ name, type = "button", doWhat = null }) => {
  return (
    <>
      <button
      onClick={doWhat}
        type={type}
        className="text-xs bg-primary text-white p-2 rounded-md m-1 cursor-pointer hover:bg-primary-dark"
      >
        {name}
      </button>
    </>
  );
};

export const SecondaryButton = ({ name, type = "button", doWhat = null}) => {
  return (
    <>
      <button
      onClick={doWhat}
        type={type}
        className="text-xs bg-tranparent text-secondary p-2 rounded-md m-1 border border-secondary cursor-pointer hover:bg-secondary hover:text-white"
      >
        {name}
      </button>
    </>
  );
};
