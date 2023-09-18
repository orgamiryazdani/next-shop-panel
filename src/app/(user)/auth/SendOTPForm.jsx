import TextField from "@/common/TextField"
import Loading from "@/common/loading"

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
    return (
        <div className="w-[100vw] h-[80vh] flex items-center justify-center">
            <form className="space-y-10 w-96" onSubmit={onSubmit}>
                <TextField label="شماره موبایل" name="phoneNumber" onChange={onChange} value={phoneNumber} />
                <div>
                    {
                        isLoading ? <Loading /> : <button type="submit" className="btn btn--primary w-full">ارسال کد تایید</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default SendOTPForm