import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.employee.deleteMany();
    await prisma.department.deleteMany();
    await prisma.role.deleteMany();

    const roles = await Promise.all([
        prisma.role.create({ data: { title: "Manager" } }),
        prisma.role.create({ data: { title: "Developer" } }),
        prisma.role.create({ data: { title: "Designer" } }),
        prisma.role.create({ data: { title: "QA Analyst" } }),
    ]);

    const departments = await Promise.all([
        prisma.department.create({ data: { name: "Engineering" } }),
        prisma.department.create({ data: { name: "Design" } }),
        prisma.department.create({ data: { name: "Operations" } }),
    ]);

    const roleMap = Object.fromEntries(roles.map((r) => [r.title, r.id]));
    const deptMap = Object.fromEntries(departments.map((d) => [d.name, d.id]));

    await prisma.employee.createMany({
        data: [
            {
                firstName: "Lucas",
                lastName: "Brown",
                email: "lucas.brown@example.com",
                phone: "204-555-1001",
                departmentId: deptMap["Engineering"],
                roleId: roleMap["Developer"],
            },
            {
                firstName: "Ava",
                lastName: "Smith",
                email: "ava.smith@example.com",
                phone: "204-555-1002",
                departmentId: deptMap["Engineering"],
                roleId: roleMap["QA Analyst"],
            },
            {
                firstName: "Mia",
                lastName: "Johnson",
                email: "mia.johnson@example.com",
                phone: "204-555-1003",
                departmentId: deptMap["Design"],
                roleId: roleMap["Designer"],
            },
            {
                firstName: "Noah",
                lastName: "Wilson",
                email: "noah.wilson@example.com",
                phone: "204-555-1004",
                departmentId: deptMap["Operations"],
                roleId: roleMap["Manager"],
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });