import cors from "cors";
import express from "express";
import employeeRoutes from "./routes/employeeRoutes";
import organizationRoutes from "./routes/organizationRoutes";
import resetRoutes from "./routes/resetRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Backend is running" });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/organization", organizationRoutes);

export default app;