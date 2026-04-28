import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";
import { NavLink, Outlet } from "react-router-dom";
import "./layout.css";

export type AppCtx = {
    departments: {
        id: number;
        name: string;
    }[];
    onAddEmployee: (data: {
        firstName: string;
        lastName: string;
        department: string;
    }) => Promise<{
        ok: boolean;
        errors: {
            firstName?: string[];
            department?: string[];
        };
    }>;
};

type Props = {
    context: AppCtx;
};

export default function Layout({ context }: Props) {
    return (
        <div className="app-shell">
            <header className="app-header">
                <h1 className="app-title">PiXELL River Financial</h1>

                <nav className="app-nav">
                    <div className="nav-links">
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                isActive ? "nav-link nav-link--active" : "nav-link"
                            }
                        >
                            Employees
                        </NavLink>

                        <NavLink
                            to="/organization"
                            className={({ isActive }) =>
                                isActive ? "nav-link nav-link--active" : "nav-link"
                            }
                        >
                            Organization
                        </NavLink>
                    </div>

                    <div className="nav-auth">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="nav-btn">Log In</button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </nav>
            </header>

            <main className="app-main">
                <Outlet context={context} />
            </main>

            <footer className="app-footer">
                <small>© {new Date().getFullYear()} PiXELL River Financial</small>
            </footer>
        </div>
    );
}