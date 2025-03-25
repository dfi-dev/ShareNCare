const userDTO = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  address: user.address,
  dob: user.dob,
  gender: user.gender
});

module.exports = userDTO;
