import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-4 items-center place-content-center">
            {children}
        </div>
    );
}
