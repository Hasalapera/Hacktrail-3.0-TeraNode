const { User } = require('./models');

async function test() {
  try {
    const users = await User.findAll();
    console.log('--- ALL USERS IN DB ---');
    if (users.length > 0) {
      console.log('User raw attributes:', Object.keys(users[0].dataValues));
    }
    console.log('-----------------------');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
