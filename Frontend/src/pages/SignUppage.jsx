import {useState} from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from 'react-router-dom'

const SignUppage = () => {
  const [showpassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    Firstname : "",
    Lastname: "",
    Email: "",
    Password: "",
  })

  const { signup, isSigningUp } = useAuthStore()
    
  return (
    <div>
      
    </div>
  )
}

export default SignUppage
