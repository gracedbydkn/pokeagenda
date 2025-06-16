import React from "react";
import PokeballBackground from "../components/PokeballBackground/PokeballBackground";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import "../components/RegisterForm/RegisterForm.css";

const RegisterPage: React.FC = () => {
    return (
        <div className="pokeball-bg">
            <PokeballBackground />
            <div className="register-box">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;