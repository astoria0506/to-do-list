import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function Login() {
    return(
        <div className="flex gap-32 justify-center items-center min-h-screen bg-slate-600">
            <LoginForm></LoginForm>
            <RegisterForm></RegisterForm>
        </div>
    )
}