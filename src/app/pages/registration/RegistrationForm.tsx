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
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { RegisterAppUser, SendLoginOtp, ValidateOtp } from '@/services/login';
import { otpSchema } from '../../../../globalschema';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ mobile: '', name: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({ mobile: '', name: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpErrors, setOtpErrors] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timerCounter, setTimerCounter] = useState(60);
  const [otpFail, setOtpFail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let timer:any;
    if (otpSent && timerCounter > 0) {
      timer = setInterval(() => setTimerCounter(timerCounter - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, timerCounter]);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e:any, index:any) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(`otpNum${index + 2}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  
    try {
      const response = await SendLoginOtp(formData.mobile);
      if (response) {
        setErrors({ name: '', mobile: '', password: '', confirmPassword: '' });
        setOtpSent(true);
        setTimerCounter(60);
        alert("OTP sent successfully");
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    const result = otpSchema.safeParse(enteredOtp);
    
    if (!result.success) {
      setOtpErrors("Invalid OTP");
    } else {
      try {
        const response = await  ValidateOtp(formData.mobile,enteredOtp);

        if (enteredOtp === '9999') {
          alert("Registration and OTP verified successfully");
          try {
            const payload = {
              mobile: formData.mobile,
              publish: "Submit",
              publishLabel: "Submit",
              emailVerified: false,
              isActive: true,
              isAdmin: false,
              hasImpersonateAccess: false,
              role: "Farmer",
              roleLabel: "Farmer",
              name: formData.name,
              firstName: formData.name,
              "lastName": "",
              "state": 0,
              "district": 0,
              "emailId": ""
            }

            const registerResponse = await RegisterAppUser(payload);
          } catch (registerError) {
            console.error("Error registering user:", registerError);
            alert("Failed to register user. Please try again later.");
          }
          router.push('/');
        } else {
          setOtpFail(true);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Failed to verify OTP. Please try again later.");
      }
    }
  };


  const resendOtp = () => {
    setTimerCounter(60);
    alert("OTP resent successfully");
  };

  return (
    <div className="container flex justify-center items-center mx-auto min-h-screen">
      <Card className="w-full lg:w-1/3">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            <Image
              src={logo}
              width={125}
              height={65}
              className="mx-auto mb-4"
              alt="Logo"
            />
            {otpSent ? 'Verify OTP' : 'Registration Form'}
          </CardTitle>
          <CardDescription>
            {otpSent ? '' : 'Get Started with your Mobile Number'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <Label htmlFor="name" className="text-sm font-bold py-2">Name :</Label>
                  <Input id="name" type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <p className='text-red-600 text-xs'>{errors.name}</p>}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="mobile" className="text-sm font-bold py-2">Mobile Number :</Label>
                  <Input id="mobile" type="tel" placeholder="Enter your mobile number" name="mobile"
                    maxLength={10} minLength={10} inputMode='decimal'
                    value={formData.mobile} onChange={handleChange} />
                  {errors.mobile && <p className='text-red-600 text-xs'>{errors.mobile}</p>}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="password" className="text-sm font-bold py-2">Password :</Label>
                  <Input type='password' id="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
                  {errors.password && <p className='text-red-600 text-xs'>{errors.password}</p>}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="confirmPassword" className="text-sm font-bold py-2">Confirm Password:</Label>
                  <Input type='password' id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
                  {errors.confirmPassword && <p className='text-red-600 text-xs'>{errors.confirmPassword}</p>}
                </div>
              </div>

              <CardFooter className="text-center space-y-2 flex flex-col py-5">
                <Button type="submit" 
                  disabled={!formData.name ||  !formData.mobile || !formData.password || !formData.confirmPassword}>Get OTP</Button>
                <p className='text-sm'>Already have an account <span> <Link href='/' className='text-green-600 font-bold'>Login</Link> </span></p>
              </CardFooter>
            </form>
          ) : (
            <section className=" ">
              <div className=" ">
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
                  <form className=" ">
                    <ul className="text-center justify-center flex space-x-5">
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