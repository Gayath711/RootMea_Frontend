import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios if it's not already imported
import RootsLogo from '../image/root.png';
import TextBox from './common/TextBox'


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const user = {
      email: username,
      password: password
    };

    // Log request data before sending the request
    console.log('Login request data:', user);

    try {
      // Create the POST request
      const { data } = await axios.post(
        'http://192.168.3.24:8000/token/',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );


      console.log('Login response:', data);

      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);

    }
  };

  return (

    // <div className="w-[1920px] h-[1080px] relative bg-white bg-cover bg-center" style={{ "background-image: url('./login/image.png')"}}>
    <div className="w-[1920px] h-[1080px] relative bg-white bg-cover" style={{ backgroundImage: "url('./login/background.png')" }}>
      <div className="w-[591.04px] h-[798.75px] left-[664.48px] top-[170.60px] absolute bg-white rounded-[5px] shadow" />
      <div className="opacity-5 w-[112.80px] h-[111.16px] left-[1410.45px] top-[115.02px] absolute">
      </div>
      <div className="opacity-5 w-[128.61px] h-[127.10px] left-[381.34px] top-[581.55px] absolute">
      </div>
      <div className="w-[229.88px] h-[229.88px] left-[50.10px] top-[115.02px] absolute">
      </div>
      <div className="opacity-5 w-[269.86px] h-[269.86px] left-[1633.61px] top-[232.14px] absolute">
      </div>
      <div className="opacity-5 w-[163.01px] h-[154.67px] left-[179.53px] top-[861.91px] absolute">
      </div>
      <div className="opacity-5 w-[72.85px] h-[72.45px] left-[1491.28px] top-[761.95px] absolute">
      </div>
      <div className="opacity-10 w-[112.26px] h-[112.27px] left-[552.23px] top-[175.32px] absolute">
      </div>
      <div className="opacity-10 w-[99.08px] h-[99.08px] left-[1255.52px] top-[858.29px] absolute">
      </div>
      <div className="opacity-10 w-[112.26px] h-[112.27px] left-[618.42px] top-[932.54px] absolute">
      </div>
      <div className="opacity-10 w-[77.37px] h-[77.37px] left-[1356.18px] top-[355.52px] absolute">
      </div>
      <div className="opacity-10 w-[61.64px] h-[62.20px] left-[1564.13px] top-[658.15px] absolute">
      </div>
      <div className="w-20 h-20 left-[105.66px] top-[554.52px] absolute">
      </div>
      <div className="opacity-10 w-[64.98px] h-[64.98px] left-[1481.11px] top-[984.09px] absolute">
      </div>
      <div className="w-[522.80px] h-[456.72px] left-[698.60px] top-[213.26px] absolute">
        <div className="w-[365px] h-[161.51px] left-[78.90px] top-0 absolute">
          <div className="left-0 top-[119.51px] absolute text-black text-[28px] font-medium font-['Poppins']">Welcome to Sign IN Board</div>
          <img className="w-[116.86px] h-[94.84px] left-[124.07px] top-0 absolute" src={RootsLogo} />
        </div>
        <div className="w-[522.80px] h-[186.47px] left-0 top-[270.25px] absolute">
          <div className="w-[522.80px] h-[142.24px] left-0 top-0 absolute">
            <div className="w-[522.80px] h-[44.70px] left-0 top-0 absolute">
              <div className="w-[522.80px] h-[0px] left-0 top-[44.70px] absolute border border-black"></div>
              <div className="left-0 top-0 absolute text-gray-800 text-opacity-50 text-xs font-normal font-['Poppins']">Enter Roots Email Address</div>
              <div className="w-[522.80px] h-[24.36px] left-0 top-[20.33px] absolute">
                <input
                  class="border-b border-gray-800  focus:outline-none px-2 py-1 w-full top-[44.70px]"
                  type="text"
                  placeholder=""
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            <div className="w-[522.80px] h-[44.70px] left-0 top-[97.55px] absolute">
              <div className="left-0 top-0 absolute text-gray-800 text-opacity-50 text-xs font-normal font-['Poppins']">Enter Roots Password</div>
              <div className="w-[522.80px] h-[24.36px] left-0 top-[20.33px] absolute">
                {/* <div className="w-[522.80px] h-[0px] left-0 top-[24.36px] absolute border border-black"></div> */}
                <input
                  class="border-b border-gray-800  focus:outline-none px-2 py-1 w-full"
                  type="password"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="w-[17.90px] h-[15.67px] left-[504.89px] top-0 absolute">
                  <div className="w-[6.71px] h-[6.72px] left-[5.60px] top-[4.48px] absolute">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[519.11px] h-5 left-0 top-[166.47px] absolute">
            <div className="w-[145px] h-5 left-0 top-0 absolute">
              <div className="left-[60px] top-[1px] absolute text-gray-800 text-xs font-normal font-['Poppins']">Stay Signed In</div>
              <div className="w-[46.71px] h-5 left-0 top-0 absolute">
                <div className="w-[46.71px] h-5 left-0 top-0 absolute bg-zinc-300 rounded-[10.58px]" />
                <div className="w-5 h-5 left-0 top-0 absolute rounded-full border border-gray-800" />
              </div>
            </div>
            <div className="left-[395.11px] top-[1px] absolute text-black text-xs font-normal font-['Poppins']">Reset Your Password</div>
          </div>
        </div>
      </div>
      <div className="w-[215.89px] h-[56.43px] left-[852.05px] top-[721.26px] absolute">
        <div className="w-[215.89px] h-[56.43px] left-0 top-0 absolute bg-green-800 rounded-[3px]" />
        <button className="left-[78.95px] top-[16.21px] absolute text-white text-base font-medium font-['Poppins']" onClick={handleLogin}>SIGN IN</button>
      </div>
      <div className="w-[461px] h-[114px] left-[730.68px] top-[812.68px] absolute">
        <div className="w-[461px] h-[55px] left-0 top-[59px] absolute text-center text-black text-base font-normal font-['Poppins']">If you have loss your official email or password, Please contact your help desk support team.</div>
        <div className="left-[219px] top-0 absolute text-black text-base font-medium font-['Poppins']">OR</div>
      </div>
      <div className="w-44 h-[297.75px] left-[1709.02px] top-[782.25px] absolute">
        <img src="./login/flower-pot.png"></img>
      </div>
    </div>

    //Old Code
    //   <section className="vh-100">
    //     <div className="container h-100">
    //       <div className="row d-flex justify-content-center align-items-center h-100">
    //         <div className="col-md-9 col-lg-6 col-xl-5 text-center">
    //           <img src={RootsLogo} className="img-fluid" alt="Sample image" />
    //         </div>
    //         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
    //           <form>
    //             <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
    //               <p className="lead fw-normal mb-0 me-3 fw-bolder">  Welcome to Roots</p>
    //             </div>

    //             <div className="divider d-flex align-items-center my-4">
    //               <p className="text-center fw-bold mx-3 mb-0"></p>
    //             </div>

    //             <div className="form-outline mb-4">
    //               <label className="form-label" htmlFor="username">Email</label>
    //               <input
    //                 type="text"
    //                 id="username"
    //                 className="form-control form-control-lg"
    //                 placeholder="Enter your username"
    //                 value={username}
    //                 onChange={handleUsernameChange}
    //               />
    //             </div>

    //             <div className="form-outline mb-3">
    //               <label className="form-label" htmlFor="password">Password</label>
    //               <input
    //                 type="password"
    //                 id="password"
    //                 className="form-control form-control-lg"
    //                 placeholder="Enter your password"
    //                 value={password}
    //                 onChange={handlePasswordChange}
    //               />
    //             </div>

    //             <div className="d-flex justify-content-between align-items-center">
    //               <div className="form-check mb-0">
    //                 <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
    //                 <label className="form-check-label" htmlFor="form2Example3">
    //                   Remember me
    //                 </label>
    //               </div>
    //               <a href="/PasswordReset" className="text-body">Forgot password?</a>
    //             </div>

    //             <div className="text-center text-lg-start mt-4 pt-2">
    //               <button
    //                 type="button"
    //                 className="btn btn-primary btn-lg"
    //                 style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
    //                 onClick={handleLogin}
    //               >
    //                 Login
    //               </button>
    //               <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    //       <div className="text-white mb-3 mb-md-0">
    //         Copyright © 2020. All rights reserved.
    //       </div>
    //       <div>
    //         <a href="#!" className="text-white me-4">
    //           <i className="fab fa-facebook-f"></i>
    //         </a>
    //         <a href="#!" className="text-white me-4">
    //           <i className="fab fa-twitter"></i>
    //         </a>
    //         <a href="#!" className="text-white me-4">
    //           <i className="fab fa-google"></i>
    //         </a>
    //         <a href="#!" className="text-white">
    //           <i className="fab fa-linkedin-in"></i>
    //         </a>
    //       </div>
    //     </div>
    //   </section>
  );



};

export default LoginForm;