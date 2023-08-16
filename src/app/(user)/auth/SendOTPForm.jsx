import TextField from "@/common/TextField"

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
    return (
        <div>
            <form className="space-y-10" onSubmit={onSubmit}>
                <TextField label="شماره موبایل" name="phoneNumber" onChange={onChange} value={phoneNumber} />
                {
                    isLoading ? <p>loading...</p> : <button type="submit" className="btn btn--primary w-full">ارسال کد تایید</button>
                }
            </form>
        </div>
    )
}

export default SendOTPForm