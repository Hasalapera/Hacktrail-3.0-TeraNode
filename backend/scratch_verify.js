const bcrypt = require('bcrypt');
const { User } = require('./models');

async function test() {
  const user = await User.findOne({ where: { email: 'admin@unitasker.lk' } });
  if (!user) {
    console.log('Admin user not found');
    process.exit(1);
  }
  const isMatch = await bcrypt.compare('admin123', user.password);
  console.log(`Password match status for 'admin123': ${isMatch}`);
  process.exit(0);
}

test();
