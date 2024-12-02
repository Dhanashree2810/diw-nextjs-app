'use server'
import { LoginMobile, ValidateOtp } from '@/services/login'
import { createSession, getSession, } from '../lib/session'
import { redirect } from 'next/navigation';

export async function login(formData: { mobile: string; otp: string }) {
    const { mobile, otp } = formData;

    const validateResponse = await ValidateOtp(mobile, otp);

    const response = await LoginMobile(mobile, otp);   
    
    await createSession(response?.token);
    await getSession();
    redirect('/custom/homes');
}