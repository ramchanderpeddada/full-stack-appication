import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.verify(token);
      req.userId = decodedData?.sub; //google auth
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
