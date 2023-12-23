import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: number;
    width?: number;
}

export const Modal = ({
    isOpen,
    onClose,
    children,
    position = 0,
    width = 30,
}: ModalProps): React.ReactNode => {
    const outsideReference = React.useRef(null);

    const handleCloseOnOverlay = (
        handle: React.MouseEvent<HTMLElement>,
    ): void => {
        if (handle.target === outsideReference.current) {
            onClose();
        }
    };

    return isOpen ? (
        <div className={"modal"} style={{ top: -position }}>
            <div
                ref={outsideReference}
                className={"modal__overlay"}
                onClick={handleCloseOnOverlay}
                style={{ top: position }}
            />
            <div className={"modal__box"} style={{ width: width + "%" }}>
                <button className={"modal__close"} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark as IconProp} />
                </button>
                {children}
            </div>
        </div>
    ) : null;
};
