import { Helmet } from 'react-helmet-async';
import { SignupView } from 'src/sections/signup';

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> SignUp | iHRIS-v5 </title>
      </Helmet>

      <SignupView />
    </>
  );
}
