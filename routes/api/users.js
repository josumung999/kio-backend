const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


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
], (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  res.send('User routes')
});


module.exports = router;