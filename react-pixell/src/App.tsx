type Service = {
  id: number;
  name: string;
  description: string;
};

const services: Service[] = [
  { id: 1, name: "Online Banking", description: "24/7 access to accounts" },
  { id: 2, name: "Mobile App", description: "Bank on the go" },
  { id: 3, name: "Loans", description: "Personal and business loans" },
];

export default function App() {
  return (
    <main>
      <h1>PiXELL River Financial Services</h1>

      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <strong>{service.name}</strong> — {service.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
