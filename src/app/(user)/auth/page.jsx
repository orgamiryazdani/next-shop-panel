"use client"
import { useEffect, useState } from "react"
import SendOTPForm from "./SendOTPForm"
import { toast } from "react-hot-toast"
import { checkOtp, getOtp } from "@/services/authServices"
import { useMutation } from "@tanstack/react-query"
import CheckOTPForm from "./CheckOTPForm"
import { useRouter } from "next/navigation"

const RESEND_TIME = 90

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(2);
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter()
  const { data: otpResponse, error, isLoading, mutateAsync: mutateGetOtp } = useMutation({ mutationFn: getOtp })
  const { mutateAsync: mutateCheckOtp, isLoading: isCheckingOtp } = useMutation({ mutationFn: checkOtp })

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value)
  }

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message)
      setStep(2)
      setTime(RESEND_TIME)
      setOtp("")
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
       const { message, user } = await mutateCheckOtp({ phoneNumber: "09174510960", otp });
      // const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message)
      if (user.isActive) {
        router.push('/')
      } else {
        router.push('/complete-profile')
      }
      setStep(2)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    const timer = time > 0 && setInterval(() => {
      setTime((t) => t - 1)
    }, 1000);
    return () => {
      if (time) clearInterval(timer)
    }
  }, [time])

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <SendOTPForm isLoading={isLoading} phoneNumber={phoneNumber} onSubmit={sendOtpHandler} onChange={phoneNumberHandler} />
      case 2:
        return <CheckOTPForm isCheckingOtp={isCheckingOtp} otpResponse={otpResponse} onResendOtp={sendOtpHandler} time={time} onBack={() => setStep(s => s - 1)} onSubmit={checkOtpHandler} otp={otp} setOtp={setOtp} />
      default:
        return null
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full">
        {renderSteps()}
      </div>
    </div>
  )
}

export default AuthPage