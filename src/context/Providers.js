// src/context/Providers.js
import { AuthProvider } from "./AuthContext"
import { ErrorProvider } from "./ErrorContext"

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ErrorProvider>{children}</ErrorProvider>
    </AuthProvider>
  )
}

export default Providers
