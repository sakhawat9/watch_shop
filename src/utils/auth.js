import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    // Bearer xxx => xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Token is not valid" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token is not suppiled" });
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "User is not admin" });
  }
};

/**
 * Server-side guard for admin pages. Reads the `userInfo` cookie, verifies the
 * JWT, and returns a Next.js redirect when the visitor is not an admin.
 * Returns `null` when access is allowed.
 *
 * Usage inside getServerSideProps:
 *   const redirect = requireAdmin(context);
 *   if (redirect) return redirect;
 */
const requireAdmin = (context) => {
  const loginRedirect = {
    redirect: { destination: "/login?redirect=/dashboard", permanent: false },
  };
  try {
    const raw = context.req.cookies?.userInfo;
    if (!raw) return loginRedirect;
    const { token } = JSON.parse(raw);
    if (!token) return loginRedirect;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return null;
  } catch {
    return loginRedirect;
  }
};

/**
 * Server-side helper for user-scoped pages. Verifies the `userInfo` cookie's
 * JWT and returns the decoded payload (`{ _id, name, email, isAdmin, ... }`).
 * When not authenticated, returns a Next.js redirect object instead — callers
 * check `result.redirect` to distinguish the two.
 */
const requireAuthUser = (context) => {
  const loginRedirect = {
    redirect: { destination: "/login", permanent: false },
  };
  try {
    const raw = context.req.cookies?.userInfo;
    if (!raw) return loginRedirect;
    const { token } = JSON.parse(raw);
    if (!token) return loginRedirect;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return loginRedirect;
  }
};

export { signToken, isAuth, isAdmin, requireAdmin, requireAuthUser };
