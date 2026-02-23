import { NavLink, Outlet } from "react-router-dom";
import type { Department } from "../../data/departments";
import "./layout.css";

export type AppCtx = {
    departments: Department[];
    onAddEmployee: (data: { firstName: string; lastName: string; department: string }) => void;
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
