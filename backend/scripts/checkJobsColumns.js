const { sequelize } = require('../models');

(async () => {
  try {
    const [rows] = await sequelize.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'Jobs' ORDER BY ordinal_position;"
    );
    console.log(rows.map((r) => r.column_name).join('\n'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
