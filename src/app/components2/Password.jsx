// components/PasswordForm.js
import { useState } from 'react';
import Image from "next/image";
import logo from "../../../public/assets/login_logo.svg";



const PasswordForm = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <main className="flex w-[100vw] h-[100vh] flex-col items-center justify-between  font-custom2">

    <form onSubmit={handleSubmit}>


<div className=" w-[100vw] h-[100vh] bg-white flex flex-row">
        <div className="items-start justify-start hidden bg-bgImage bg-contain bg-no-repeat bg-center lg:flex flex-col gap-5 w-[50%] px-20  p-9">
          <div className="mb-9">
            {" "}
            <Image alt="alt" src={logo} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">VERSUS&#8482;</h1>
          </div>
          <div>
            <p className="text-md text-gray-600">
              Access user-friendly analysis and visualization of anonymised{" "}
              <br /> dispensing data collected from the retail pharmacies.
            </p>
          </div>
        </div>

        <div className="md:p-[5rem] px-2 lg:pt-0  w-full lg:w-auto">
          <div className="flex flex-col md:gap-5 my-10">
            <div className="mb-9 md:hidden">
              {" "}
              <Image alt="alt" src={logo} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Welcome To VERSUS&#8482;
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <section className=" my-9 flex flex-col gap-9 lg:w-[90%]">
                <div className=" flex flex-col gap-5">
                  <div className="flex flex-col">
                   <h1>ADMIN lOGIN</h1>
                  </div>
                  <div className='flex flex-col gap-3'>
                  <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full border-gray-300 rounded-md py-3 px-3 focus:outline-none focus:border-blue-500"

        />
      </label>
                  </div>

                  <button                     className="bg-primary py-3 text-white px-3 rounded-md "
 onClick={handleSubmit}>Submit</button>

                 
                </div>

                

          
              </section>
            </form>
          </div>
        </div>
      </div>


     
      
    </form>
    </main>

  );
};

export default PasswordForm;
