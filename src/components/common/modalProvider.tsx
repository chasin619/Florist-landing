"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { LoginModal } from "@/ui/home/sections/login";
import { ForgotModal } from "@/ui/home/sections/forgot";
import { CustomAlertDialog } from "@/components/common/alertDialog";

export default function ModalProvider() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);
    const [isPendingModalOpen, setPendingModalOpen] = useState(false);

    const toggleLoginModal = () => setLoginModalOpen((prev) => !prev);
    const toggleForgotModal = () => setForgotModalOpen((prev) => !prev);
    const hidePendingModal = () => setPendingModalOpen(false);

    const handleForgotClick = () => {
        setLoginModalOpen(false);
        setForgotModalOpen(true);
    };

    return (
        <>
            {/* Navbar now has direct access to toggleLoginModal */}
            <Navbar openModal={toggleLoginModal} />

            <LoginModal
                isOpen={isLoginModalOpen}
                onOpenChange={toggleLoginModal}
                onForgotClick={handleForgotClick}
            />
            <ForgotModal isOpen={isForgotModalOpen} onOpenChange={toggleForgotModal} />
            <CustomAlertDialog
                title="Admin Approval Required"
                description="Please contact the administrator to activate your account. Your account is currently pending approval and cannot be accessed until it is activated by an admin."
                isOpen={isPendingModalOpen}
                okText="Got it"
                onClose={hidePendingModal}
            />
        </>
    );
}
