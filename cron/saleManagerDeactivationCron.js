const cron = require("node-cron");
const db = require("../config/db");

const updateSalesManagerStatusOnDeactivationDate = async () => {
    try {
        const today = new Date().toISOString().split("T")[0];

        // Step 1: Get all rows scheduled for deactivation today
        const [rows] = await db.execute(`
      SELECT id, industryHeadIds, deactivatedIndustryIds, deactivationDate
      FROM sales_manager_master
      WHERE deactivationDate = ? AND isActive = 1
    `, [today]);

        for (const row of rows) {
            const { id, industryHeadIds, deactivatedIndustryIds } = row;

            const activeIds = industryHeadIds?.split(',').map(i => i.trim()).filter(Boolean) || [];
            const toDeactivateIds = deactivatedIndustryIds?.split(',').map(i => i.trim()).filter(Boolean) || [];

            // Remove deactivated IDs from active list
            const updatedActiveIds = activeIds.filter(id => !toDeactivateIds.includes(id));
            const updatedIndustryHeadStr = updatedActiveIds.length ? updatedActiveIds.join(',') : null;

            // Set isActive to 0 only if all industries are deactivated
            const isActive = updatedActiveIds.length > 0 ? 1 : 0;

            // Update DB
            await db.execute(`
        UPDATE sales_manager_master
        SET 
          industryHeadIds = ?,
          isActive = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
                updatedIndustryHeadStr,
                isActive,
                id
            ]);

            console.log(`[✔] Sales Manager ID ${id} updated: isActive = ${isActive}, industryHeadIds = ${updatedIndustryHeadStr}`);
        }

    } catch (error) {
        console.error("❌ Cron Job Error:", error.message);
    }
};

const updateAccountManagerStatusOnDeactivationDate = async () => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const [rows] = await db.execute(
            `SELECT id, industryHeadIds, deactivatedIndustryIds, deactivationDate
         FROM account_manager_master
         WHERE deactivationDate = ? AND isActive = 1`, [today]
        );

        for (const row of rows) {
            const { id, industryHeadIds, deactivatedIndustryIds } = row;

            const activeIds = industryHeadIds?.split(',').map(i => i.trim()).filter(Boolean) || [];
            const toDeactivateIds = deactivatedIndustryIds?.split(',').map(i => i.trim()).filter(Boolean) || [];

            const updatedActiveIds = activeIds.filter(id => !toDeactivateIds.includes(id));
            const updatedIndustryHeadStr = updatedActiveIds.length ? updatedActiveIds.join(',') : null;

            const isActive = updatedActiveIds.length > 0 ? 1 : 0;

            await db.execute(
                `UPDATE account_manager_master
           SET 
             industryHeadIds = ?,
             isActive = ?,
             updated_at = CURRENT_TIMESTAMP
           WHERE id = ?`,
                [updatedIndustryHeadStr, isActive, id]
            );

            console.log(`✔️ Account Manager ID ${id} updated: isActive = ${isActive}, industryHeadIds = ${updatedIndustryHeadStr}`);
        }

    } catch (error) {
        console.error("❌ Account Manager Cron Error:", error.message);
    }
};


function runSalesManagerStatusCronJob() {
    // For real run: "0 0 * * *" (every midnight)
    cron.schedule("0 0 * * *", async () => {
        console.log("🔁 Running Sales Manager Deactivation Cron Job...");
        await updateSalesManagerStatusOnDeactivationDate();
        await updateAccountManagerStatusOnDeactivationDate();
    });
}

module.exports = {
    runSalesManagerStatusCronJob
};
