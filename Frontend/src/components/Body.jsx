
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import ContactUs from "./ContactUs";
import Browse from "./Browse";
import Peepee from "./Peepee";
import TC from "./TC";
import CreateAnewAccount from "./CreateAnewAccount";
import EmailVerification from "./EmailVerification";
import GamerTag from "./GamerTag";
import Password from "./Password";
import PassRecovery from "./PassRecovery";
import IdentityVerify from "./IdentityVerify";
import ChangePass from "./ChangePass";
const Body = () => {
  const approuter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> },
    { path: "/Peepee", element: <Peepee /> },
    { path: "/Terms", element: <TC /> },
    { path: "/ContactUs", element: <ContactUs /> },
    { path: "/Register", element: <CreateAnewAccount /> },
    { path: "/EmailVerification", element: <EmailVerification /> },
    { path: "/GamerTag", element: <GamerTag /> },
    { path: "/Password", element: <Password /> },
    {path : "/PassRecovery" , element : <PassRecovery/>},
    {path : "identity-verify" , element : <IdentityVerify/>},
    {path : "/ChangePass" , element : <ChangePass/>} ,
  ]);

  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
};

export default Body;
