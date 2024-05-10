import { ReactNode, useEffect } from "react";

type SetToggleMenuType = (
  value: boolean | ((prev: boolean) => boolean)
) => void;

interface Props {
  setShowModal: SetToggleMenuType;
  children: ReactNode;
}

export default function Modal({ setShowModal, children }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    // Add event listener for keydown when the modal is open
    document.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when the modal is closed or unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        onClick={handleClose}
      ></div>

      <div className="fixed flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50">
        {children}
        {/* Close button */}
        <div className="absolute top-1 right-1">
          <button
            type="button"
            className="bg-transparent rounded-md m-3 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={handleClose}
            aria-label="Close"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* End of close button */}
      </div>
    </div>
  );
}
