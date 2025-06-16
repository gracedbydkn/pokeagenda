import React from "react";
import PokeballBackground from "../components/PokeballBackground/PokeballBackground";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => { 
    return (
        <div className="pokeball-bg">
            <PokeballBackground />
            <div className="login-box">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;