const { User } = require('./models');

async function test() {
  try {
    const users = await User.findAll();
    console.log('--- ALL USERS IN DB ---');
    users.forEach(u => {
      console.log(`ID: ${u.id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}, UniID: ${u.university_id}`);
    });
    console.log('-----------------------');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
