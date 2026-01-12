document.getElementById("year").textContent = new Date().getFullYear();

const departments = [
  {
    name: "Executive",
    employees: [
      { firstName: "Warren", lastName: "Black" },
      { firstName: "Lisa", lastName: "Chen" }
    ]
  },
  {
    name: "Technology",
    employees: [
      { firstName: "Elijah", lastName: "Wright" },
      { firstName: "Noor", lastName: "Khan" }
    ]
  }
];

const main = document.getElementById("employee-list");

departments.forEach(dept => {
  const section = document.createElement("section");
  section.className = "department";

  const title = document.createElement("h2");
  title.textContent = dept.name;

  const list = document.createElement("ul");

  dept.employees.forEach(emp => {
    const li = document.createElement("li");
    li.textContent = emp.firstName + " " + emp.lastName;
    list.appendChild(li);
  });

  section.appendChild(title);
  section.appendChild(list);
  main.appendChild(section);
});
