const getMasterDataWithUserQuery = async (tableName) => {
    try {
      const query = `
        SELECT 
          t.*,
          u.username AS updated_by
        FROM ${tableName} t
        LEFT JOIN users u ON t.updated_by = u.id
      `;
    //   const [data] = await db.execute(query);
      return query;
    } catch (err) {
      console.log(`Error retrieving data for table ${tableName}:`, err);
      throw err;
    }
  };

  module.exports = {
    getMasterDataWithUserQuery:getMasterDataWithUserQuery
  }
  