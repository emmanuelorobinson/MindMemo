import React from "react";

const AddButton = ({ onAddClick }) => {
  return (
    <div>
      {/* add circle with plus svg inner */}
      <div
        onClick={onAddClick}
        className=" w-fit bg-indigo-600 py-2 px-2 rounded-full text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <g clip-path="url(#clip0_92_58)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.0695 8.99834C21.4701 8.98756 22.6031 10.1161 22.6002 11.5196C22.5969 12.9228 21.459 14.0691 20.0586 14.08L13.9164 14.1229L13.8735 20.2833C13.8621 21.6748 12.7181 22.8016 11.3188 22.8C9.91911 22.7982 8.79433 21.6682 8.80581 20.2763L8.84829 14.1585L2.73069 14.2015C1.33046 14.2124 0.197284 13.0837 0.200201 11.6804C0.203482 10.2772 1.34158 9.13093 2.742 9.12016L8.88402 9.07705L8.92704 2.91673C8.93871 1.52522 10.0825 0.398352 11.4818 0.399996C12.8815 0.401639 14.0063 1.53179 13.9946 2.92367L13.9521 9.04144L20.0695 8.99834Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_92_58">
              <rect
                width="22.4"
                height="22.4"
                fill="white"
                transform="translate(0.200195 0.399994)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AddButton;
