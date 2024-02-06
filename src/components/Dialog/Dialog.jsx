import clsx from "clsx";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import ReactFocusLock from "react-focus-lock";

const DialogContext = createContext();
const useDialog = () => useContext(DialogContext);

function Dialog({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const value = {
    close,
    open,
    isOpen,
  };

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

const DialogTrigger = ({ children, className, ...delegated }) => {
  const { open } = useDialog();

  return (
    <button onClick={open} className={clsx(className)} {...delegated}>
      {children}
    </button>
  );
};
const DialogContent = ({ children, className, ...delegated }) => {
  const { isOpen, close } = useDialog();

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        onClick={close}
        className="absolute inset-0 bg-slate-700 bg-opacity-50"
      ></div>
      <ReactFocusLock returnFocus>
        <article
          className={clsx("z-40 bg-white p-4 relative", className)}
          {...delegated}
        >
          <button
            className="absolute top-[-40px] right-[-40px]  rounded-full p-2"
            onClick={close}
          >
            <X />
          </button>
          {children}
        </article>
      </ReactFocusLock>
    </div>,
    document.body
  );
};

Dialog.DialogTrigger = DialogTrigger;
Dialog.DialogContent = DialogContent;

export default Dialog;
