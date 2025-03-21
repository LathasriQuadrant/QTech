import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MainHome from "./MainHome";
import MainHeader from "./MainHeader";
const Contact = () => {
  return (
    <>
     {/* <MainHeader/> */}
<div className="max-w-4xl mx-auto p-6 text-center mt-20">
<h2 className="text-3xl font-bold text-purple-800 mb-4">Contact Us</h2>
<p className="text-gray-700 text-s mb-4">
        Have any questions? Reach out to us, and we'll be happy to assist you!
</p>
<div className="text-lg text-gray-700 mb-4">
<p>Email: <a href="mailto:support@qtech.com" className="text-purple-800 font-semibold">support@qtech.com</a></p>
<p>Phone: <span className="font-semibold">+91 98765 43210</span></p>
<p>Address: <span className="font-semibold">Warangal, Telangana, India</span></p>
</div>
<h3 className="text-xl font-semibold text-black mb-3">Follow Us</h3>
<div className="flex justify-center gap-6 text-purple-800 text-2xl">
<FacebookIcon></FacebookIcon>
<InstagramIcon></InstagramIcon>
<LinkedInIcon></LinkedInIcon>

</div>
</div>
</>
  );
};
 
export default Contact;