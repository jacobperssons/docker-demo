"use client"

import { useState } from "react";
import Modal from "../components/todos/modal";

export default function About() {
    const [showModal, setShowModal] = useState(true);

    return (
        <>
            <h1>About</h1>
            {showModal && (
                <Modal size="md" setIsOpen={() => setShowModal(false)}>
                    {showModal && <button>Hello</button>}
                </Modal>
            )}
        </>
    );
}
