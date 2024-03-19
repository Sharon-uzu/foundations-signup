import React from 'react';
import celebrate from '../Images/work-hard-man-and-woman-in-good-mood-celebrating-a-holiday 1.png';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram} from "react-icons/fa";

const Congrat = () => {
  return (
    <div>
        <div className='congrat'>
            <h3><b style={{color:'green'}}>Registration successful.</b> <br /> An email will be sent to all selected candidates on or before May 1st, 2024. Follow us on social media for more update!</h3>
            <span>
              <a href="https://web.facebook.com/profile.php?id=100092355544441"><FaFacebook className='c-i'/></a>
              <a href="https://x.com/chudifoundation?t=kckurPvjMm_XGVY4n3LnRw&s=09"><FaTwitter className='c-i'/></a>
              <a href="https://www.instagram.com/chukwudidimkpafoundation?igsh=MWJteGptc2owajNydg=="><FaInstagram className='c-i'/></a>

            </span>
            <img src={celebrate} alt="Congratulations" />
            {/* <p>Keep an eye on your Email address, selected candidates would receive an email on January 10th, 2024.</p> */}
            
            {/* <a href="https://www.facebook.com/HarvoxxOfficial?mibextid=ZbWKwL" target='_blank'><button type="button">Get More Updates</button></a> */}
        </div>

    </div>
  )
}

export default Congrat