function TextField({ label, name, value, onChange }) {
    return (
        <div>
            <label htmlFor={name} className="block mb-2">{label}</label>
            <input className="textField__input" autoComplete="off" type="text" name={name} id={name} value={value} onChange={onChange} />
        </div>
    )
}

export default TextField