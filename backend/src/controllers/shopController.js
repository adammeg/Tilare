const Shop = require("../models/shopModel")

// add shop 1
// login shop 1
// desactive un shop 0
// modifier un shop 0
// change verification status 0
// change apid status 0

const shopController = {
    // Signup
    async signup(req, res) {
        try {
            // Check if user already exists
            let shop = await Shop.findOne({ email: req.body.email });
            if (shop) {
                return res.status(400).send('shop already exists');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create new user
            user = new User({
                shopName: req.body.shopName,
                shopLocation: req.body.shopLocation,
                email: req.body.email,
                password: hashedPassword,
            });

            await user.save();

            res.status(201).send('Shop created successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Login
    async login(req, res) {
        try {
            const shop = await Shop.findOne({ email: req.body.email });
            if (!shop) {
                return res.status(400).send('Invalid email or password');
            }

            // Check password
            const validPassword = await bcrypt.compare(req.body.password, Shop.password);
            if (!validPassword) {
                return res.status(400).send('Invalid email or password');
            }

            // Generate JWT Token 
            const token = jwt.sign({ _id: Shop._id }, '123456789');

            res.status(200).send({ message: 'Logged in successfully', shop, token });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
}
module.exports = shopController;