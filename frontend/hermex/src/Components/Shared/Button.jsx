const Button = ({ children, className, type, value }) => {
  return (
    <button className={className} type={type} value={value}>
      {children}
    </button>
  )
}

export default Button
