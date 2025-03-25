const cron = require("node-cron");
const db = require("../config/db");

const updateClientStatus = async () => {
    try {
        const updateQuery = `
            UPDATE client_info
            SET client_status = 1
        `;
        
        await db.execute(updateQuery);
        console.log("Client status updated successfully on March 31st");
    } catch (error) {
        console.error("Error updating client status:", error.message);
    }
};

function runClientStatusCronJob() {
    cron.schedule("0 0 31 3 *", async () => {
    // cron.schedule("*/1 * * * *", async () => {
        console.log("Running client status update cron job...");
        await updateClientStatus();
    });
}

module.exports = {
    runClientStatusCronJob
};
