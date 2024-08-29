import { useState } from 'react';

export type ModalRefType = typeof useModalRef;

const useModalRef = () => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const open = () => {
    setShow(true);
  };

  return { show, setShow, close, open };
};

export default useModalRef;
