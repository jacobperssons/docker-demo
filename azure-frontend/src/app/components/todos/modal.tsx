import { ReactElement, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
    setIsOpen: (isOpen: boolean) => void;
    size: "sm" | "md" | "lg";
    children: ReactElement;
}

// bg color
// border-2 border-solid border-[#2F2F2F]
export default function Modal({ setIsOpen, size, children }: Props) {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            console.log('Escape key was pressed');
            setIsOpen(false);
          }
        };
    
        // Add event listener on component mount
        document.addEventListener('keydown', handleKeyDown);
    
        // Cleanup event listener on component unmount
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [setIsOpen]);

    return (
        <div>
            <div
                onClick={() => setIsOpen(false)}
                className="z-200 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen backdrop-blur-sm bg-[#0003]"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`${
                        size === "lg"
                            ? "mt-5 h-5/6 w-10/12"
                            : size == "md"
                            ? "mt-4 h-1/2 w-1/2"
                            : "mt-2 h-1/3 w-1/3"
                    } relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-start rounded-2xl overflow-auto bg-[#fff] shadow-lg`}
                > 
                    <div className="absolute flex top-4 right-4">
                        <button onClick={() => setIsOpen(false)}>
                            <XMarkIcon className="w-6" />
                        </button>
                    </div>

                    <div className="">{children}</div>
                </div>
            </div>
        </div>
    );
}
