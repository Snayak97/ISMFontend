import { Route } from "react-router-dom";
import Signin from "../pages/auth/signin/Signin";
import Signup from "../pages/auth/signup/Signup";
import RegisterSuccess from "../pages/auth/RegisterSuccess/RegisterSuccess";
import RegisterEmailVerify from "../pages/auth/RegisterEmailVerify/RegisterEmailVerify";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import ForgotPasswordSent from "../pages/auth/ForgotPasswordSent/ForgotPasswordSent";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";
import ResetPasswordSuccess from "../pages/auth/ResetPasswordSuccess/ResetPasswordSuccess";
import ClientUser from "../pages/clientuser/ClientUser";
import ClientAdmin from "../pages/clientadmin/ClientAdmin";
import User from "../pages/users/User";
import SuperAdmin from "../pages/superadmin/SuperAdmin";

export const publicRoutes = (
  <>
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/verify-email/:token" element={<RegisterSuccess />} />
    <Route
      path="/RegisterEmailVerify/:email"
      element={<RegisterEmailVerify />}
    />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/forgot-success/:email" element={<ForgotPasswordSent />} />
    <Route path="/forgot-password-verify/:token" element={<ResetPassword />} />
    <Route path="/reset-success" element={<ResetPasswordSuccess />} />
    <Route path="/userpages" element={<User />} />
    <Route path="/clientuserpages" element={<ClientUser />} />
    <Route path="/superadminpages" element={<SuperAdmin />} />
  </>
);
