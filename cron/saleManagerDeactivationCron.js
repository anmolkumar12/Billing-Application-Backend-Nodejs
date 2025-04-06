const cron = require("node-cron");
const db = require("../config/db");

const updateSalesManagerStatusOnDeactivationDate = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Fetch all sales managers where today is the deactivationDate and isActive is still 1
    const [rows] = await db.execute(`
      SELECT id, industryHeadIds, deactivatedIndustryIds
      FROM sales_manager_master
      WHERE deactivationDate = ? AND isActive = 1
    `, [today]);

    for (const row of rows) {
      const currentIds = row.industryHeadIds?.split(',').map(id => id.trim()).filter(Boolean) || [];
      const toDeactivate = row.deactivatedIndustryIds?.split(',').map(id => id.trim()).filter(Boolean) || [];

      // Remove the deactivating industry IDs
      const remainingIds = currentIds.filter(id => !toDeactivate.includes(id));

      // Mark inactive if no industryHeadIds left
      const isActive = remainingIds.length > 0 ? 1 : 0;

      await db.execute(`
        UPDATE sales_manager_master
        SET industryHeadIds = ?, isActive = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [remainingIds.join(','), isActive, row.id]);

      console.log(`Sales Manager ID ${row.id} updated. Remaining industries: [${remainingIds.join(',')}]`);
    }

  } catch (error) {
    console.error("Error updating Sales Manager status:", error.message);
  }
};

function runSalesManagerStatusCronJob() {
  // Run daily at midnight
//   cron.schedule("0 0 * * *", async () => {
  cron.schedule("*/2 * * * *", async () => { // For testing every minute
    console.log("Running Sales Manager deactivation cron job...");
    await updateSalesManagerStatusOnDeactivationDate();
  });
}

module.exports = {
  runSalesManagerStatusCronJob
};
