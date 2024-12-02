'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from '@/assets/logo.png';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginMobile, SendLoginOtp, ValidateOtp } from '@/services/login';
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/actions/auth';
import { otpSchema } from '../../../../globalschema';
import { useStore } from '../../../../globalstate';


export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({ mobile: '', otp: '' });
  const [errors, setErrors] = useState({ mobile: '' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpErrors, setOtpErrors] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timerCounter, setTimerCounter] = useState(60);
  const [otpFail, setOtpFail] = useState(false);
  const {setOTPNumber,setMobileNumber} = useStore();

  useEffect(() => {
    let timer: any;
    if (otpSent && timerCounter > 0) {
      timer = setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, timerCounter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleOtpChange = (e: any, index: any) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    setFormData({ ...formData, otp: newOtp.join('') });

    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(`otpNum${index + 2}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await SendLoginOtp(formData.mobile);
      if (response) {
        setErrors({ mobile: '' });
        setOtpSent(true);
        setTimerCounter(60);
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      alert("Failed to send OTP. Please try again later.");
    }
  };


  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    const result = otpSchema.safeParse(enteredOtp);

    if (!result.success) {
      setOtpErrors("Invalid OTP");
      return;
    }

    try {      
      setMobileNumber(formData.mobile);
      setOTPNumber(formData.otp);
      await login(formData);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again later.");
    }
  };


  const resendOtp = () => {
    setTimerCounter(60);
    alert("OTP resent successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md md:w-2/3 lg:w-1/3">
        <CardHeader>
          <CardTitle className="">
            <Image
              src={logo}
              width={125}
              height={65}
              className="mx-auto mb-4"
              alt="Logo"
            />
            <h1 className=' text-center'>
              {otpSent ? 'Verify OTP' : 'Login Form'}
            </h1>
          </CardTitle>

          <CardDescription className="text-center">
            {otpSent ? '' : 'Get Started with your Mobile Number'}
          </CardDescription>

        </CardHeader>

        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Label htmlFor="mobile" className="text-sm font-bold py-2">Mobile Number : </Label>
                  <div className='flex'>
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                    <Input className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      id="mobile" type="tel" maxLength={10} minLength={10} inputMode='decimal'
                      name="mobile" value={formData.mobile} onChange={handleChange} />
                  </div>
                  {errors.mobile && <p className='text-red-600 text-xs'>{errors.mobile}</p>}
                  <Button type='submit' className="my-4 w-full bg-slate-400 text-white py-3 rounded-md font-bold"
                    disabled={!formData.mobile}>
                    Get OTP
                  </Button>
                </div>
              </div>

              <CardFooter>
                <div className="space-y-4">
                  <div className="flex flex-col">                   
                    <div className="text-sm text-center mt-3 mx-4">
                      Do not have an account?
                      <span className='text-center'>
                        <Link href='/custom/registration' className="text-green-800 font-bold mx-2">Register Now</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </form>
          ) : (
            <section className="authSection">
              <div className="authHeader">
                <div className="text-center text-sm">
                  <h1>We have sent a code to
                    <span className="mobileNo"> +91 {formData.mobile}.</span>
                  </h1>
                  <a className="text-green-700 cursor-pointer py-3" onClick={() => setOtpSent(false)}>Change Mobile Number</a>
                </div>
              </div>
              <div className=" ">
                <div className=" ">
                  <h1 className=' font-bold py-2 text-center'>Enter OTP</h1>
                  <form className="otpScreen space-y-4">
                    <ul className="text-center flex  justify-center space-x-5">
                      {otp.map((digit, index) => (
                        <li key={index}>
                          <Input                          
                            type="text"
                            id={`otpNum${index + 1}`}
                            name={`otpNum${index + 1}`}
                            value={digit}
                            maxLength={1}
                            autoComplete="off"
                            required
                            onChange={(e) => handleOtpChange(e, index)}
                            className="w-14 h-14  text-center"
                          />
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
                {otpErrors && <p className='text-red-600 text-xs'>{otpErrors}</p>}
                {otpFail && (
                  <div className="text-red-600 mt-2">
                    <small><i className="fas fa-exclamation-circle"></i> OTP is not matched / Expired</small>
                  </div>
                )}
                <div className=' text-center'>
                  <Button
                    id="otpVerify"
                    disabled={timerCounter <= 0 || !otp.every(num => num)}
                    onClick={handleVerifyOtp}
                    className=" bg-gray-400 text-black mt-4"
                  >
                    Verify
                  </Button>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className=' text-sm  py-4'>Didn&apos;t receive code?
                  <button
                    className=" text-green-600  mx-3"
                    disabled={timerCounter > 0}
                    onClick={resendOtp}
                  >
                    Resend
                  </button>
                </p>
                <p className="text-sm  py-4">
                  {timerCounter > 0 ? `OTP Expiring in ${timerCounter} seconds` : 'OTP expired'}
                </p>
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}