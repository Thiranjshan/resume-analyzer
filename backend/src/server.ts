import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./config/express";

const app = createApp();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));