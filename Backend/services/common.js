const passport=require('passport');
exports.isAuth=(req, res, done)=>{
    return passport.authenticate("jwt"); 
}
exports.sanitizeUser=(user)=>{
    return {id:user.id,role:user.role}
}
exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODFkNmQzMmVmYzczNDk5ZTFmMmYyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA0NzIwNDM2fQ.LYbTe1YVP3CXu9xmAYDl4cqBfRTl-qhV6ULnG15sOUg";
  return token;
};
