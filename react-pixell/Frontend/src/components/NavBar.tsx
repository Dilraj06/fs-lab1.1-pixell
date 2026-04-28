import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
    const location = useLocation();

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                background: "#f5f5f5",
            }}
        >
            <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                    to="/employees"
                    style={{
                        fontWeight: location.pathname === "/employees" ? "bold" : "normal",
                    }}
                >
                    Employees
                </Link>

                <Link
                    to="/organization"
                    style={{
                        fontWeight: location.pathname === "/organization" ? "bold" : "normal",
                    }}
                >
                    Organization
                </Link>
            </div>

            <div>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button>Sign In</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/employees" />
                </SignedIn>
            </div>
        </nav>
    );
}