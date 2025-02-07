const bcryptjs = require("bcryptjs");
const Admin = require("./models/Admin");

const createSuperAdmin = async () => {
    await Admin.deleteOne({ email: "admin@email.com" }); 

    const hashedPassword = await bcryptjs.hash("ashwan@123", 10);

    await Admin.create({
        name: "Ashwanth",
        email: "admin@email.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("Super Admin account recreated with hashed password.");
};

module.exports = createSuperAdmin;
