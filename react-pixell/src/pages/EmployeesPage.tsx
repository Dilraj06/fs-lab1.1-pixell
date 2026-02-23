import { useOutletContext } from "react-router-dom";
import DepartmentList from "../components/DepartmentList/DepartmentList";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import type { AppCtx } from "../components/Layout/Layout";

export default function EmployeesPage() {
    const { departments, onAddEmployee } = useOutletContext<AppCtx>();

    const departmentNames = departments.map((d) => d.name);

    return (
        <>
            <h2>Employees</h2>

            <DepartmentList departments={departments} />

            <EmployeeForm departmentNames={departmentNames} onAddEmployee={onAddEmployee} />
        </>
    );
}
