const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const masterRoutes = require("./routes/masters");
const bodyParser = require("body-parser");
const path = require("path");
const { runAllCronJobs } = require("./cron/currencyCron");
const { runClientStatusCronJob } = require("./cron/clientStatusCron");
// const { runSalesManagerStatusCronJob } = require("./cron/saleManagerDeactivationCron");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
runAllCronJobs();
runClientStatusCronJob();
// runSalesManagerStatusCronJob();
app.use("/api/auth", authRoutes);
app.use("/api/masters", masterRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Serve generated credit notes PDFs
app.use('/creditnotes', express.static(path.join(__dirname, 'models', 'creditnotes')));

app.use('/invoices', express.static(path.join(__dirname, 'models', 'invoices')));

app.use('/taxinvoices', express.static(path.join(__dirname, 'models', 'taxinvoices')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
