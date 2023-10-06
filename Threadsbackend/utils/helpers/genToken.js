const jwt = require("jsonwebtoken");

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, "wef", {
    expiresIn: '15d',
  });

  // Set the cookie options for cross-origin access
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    // Secure flag ensures the cookie is only sent over HTTPS
    secure: true,
    // SameSite=None allows cross-origin access
    sameSite: 'None',
    // You may need to specify the domain if you want to share the cookie across subdomains
    // domain: '.example.com', // Replace with your domain
  });
  return token;
}

module.exports = { genToken };
