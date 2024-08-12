import { useEffect } from "react";

const useResetFormModal = (isOpen: boolean, reset: () => void) => {
  useEffect(() => {
    const cleanupFunction = () => {
      reset();
    };

    if (isOpen) {
      // Perform any necessary setup here
    }

    // Return the cleanup function to be executed when the component unmounts or when isOpen changes
    return cleanupFunction;
  }, [isOpen, reset]);
};

export default useResetFormModal;
