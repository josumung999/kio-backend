const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');


// @route POST api/users
// @desc Register new user
// @access PUBLIC
router.post('/', [
  check('firstName', 'Votre Prénom est requis').not().isEmpty(),
  check('lastName', 'Votre nom de famille est requis').not().isEmpty(),
  check('email', 'Veuilez fournir une adresse email valide').isEmail(),
  check('password', 'Votre mot de passe doit contenir plus de 6 caractères').isLength({
    min: 6,
  }),
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }]});
    }

    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("User registered");
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

});


module.exports = router;