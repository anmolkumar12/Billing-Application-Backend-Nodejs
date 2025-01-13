const cron = require("node-cron");
const axios = require("axios");
const db = require("../config/db");
const { getAllCurrencies } = require("../models/masterModel");


const API_URL = "https://v6.exchangerate-api.com/v6/1778dd608f3d037212203d50/latest/INR";


const updateExchangeRates = async () => {
    try {
      const response = await axios.get(API_URL);
      const currencies = await getAllCurrencies(); 
 
      const { result, conversion_rates } = response.data;
      if (result !== "success") {
        console.error("Failed to fetch exchange rates");
        return;
      }
  
      
      const existingCurrencyCodes = new Set(currencies.map((currency) => currency.currencyCode));
  
      for (const [currencyCode, exchangeRate] of Object.entries(conversion_rates)) {
        // Check if the currencyCode exists in the currency_master
        if (existingCurrencyCodes.has(currencyCode)) {
          // Update only existing records in currency_master
          const updateCurrencyMasterQuery = `
            UPDATE currency_master
            SET 
              exchangeRate = ?, 
              updated_at = CURRENT_TIMESTAMP
            WHERE currencyCode = ?
          `;
  
          await db.execute(updateCurrencyMasterQuery, [exchangeRate, currencyCode]);

        }
  
        // Insert all records into currency_exchange_table
        const insertCurrencyExchangeQuery = `
          INSERT INTO currency_exchange_table (currencyCode, exchangeRate, baseCurrency)
          VALUES (?, ?, 'INR')
        `;
  
        await db.execute(insertCurrencyExchangeQuery, [currencyCode, exchangeRate]);
     
      }
  

    } catch (error) {
      console.error("Error updating exchange rates:", error.message);
    }
  };
  

function runAllCronJobs(){
    cron.schedule("0 0 * * *", async () => {
        console.log("Running currency exchange rate update cron job...");
        await updateExchangeRates();
      });

}

module.exports = {
    runAllCronJobs,
    updateExchangeRates
}



