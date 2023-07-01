import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Modal.module.css"
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useAppLocation } from "../../utils/tools/hooks";

type Props = {
  children: React.ReactNode;
  title: string;
  close: () => void;
};

export default function Modal (props: Props) {
  const modalRoot = document.getElementById("react-modals") as Element;
  const location = useAppLocation();

  useEffect(()=>{ 
    const closeModalByEsc = (evt: KeyboardEvent) => { 
      if (evt.key === "Escape") { 
        props.close(); 
      } 
    } 
    document.addEventListener("keydown", closeModalByEsc); 
    return () =>{ 
      document.removeEventListener("keydown", closeModalByEsc); 
    } 
  })

  return  ReactDOM.createPortal( (
    <ModalOverlay {...props}>
      <div className={style.Modal + " pl-10 pr-10 pt-10 pb-15"} >
        <div className={style.ModalTitle} >
          <h3 className={location.pathname.startsWith("/ingredients") ? "text text_type_main-large" : "text text_type_digits-default"} >
            {props.title}
          </h3>
          <CloseIcon 
            type="primary" 
            onClick={props.close}
          />
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  ), modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}; 