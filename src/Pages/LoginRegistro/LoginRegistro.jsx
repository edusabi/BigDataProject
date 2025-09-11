import { useState } from "react";
import { IMaskInput } from "react-imask";
import { NavLink } from "react-router-dom";
import axios from "axios";

const LoginRegistro = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [notLogin, setNotLogin] = useState(false);

    const submitLogin = async(e)=>{
        e.preventDefault();

        const User = {email, password};

        try {
            const response = await axios.post("http://localhost:3000/users/login", User, {withCredentials: true});
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const submitRegister = async(e)=>{
        e.preventDefault();
        
        const NewUser = {name, email, cpf, password};

        try {
         const response = await axios.post("http://localhost:3000/users/register", NewUser);
         if(response.status == 201){
            console.log("Registro feito com sucesso!")
         };
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>
        <h1>LoginRegistro</h1>
        {notLogin ? 
        <div>
            <form onSubmit={submitRegister}>
            <h2>Registro</h2>
            
            <label>
                <span>Nome</span>
                <input type="name" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required/>
            </label>

            <label>
                <span>E-mail</span>
                <input 
                type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required/>
            </label>
            
            <label>
                <span>CPF</span>
                <IMaskInput
                    mask="000.000.000-00"
                    value={cpf}
                    onAccept={(value) => setCpf(value)}
                    required
                />
            </label>

            <label>
                <span>Senha</span>
                <input type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required/>
            </label>

            <label>
                <span>Confirmar senha</span>
                <input type="password" 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required/>
            </label>

            <button>Registrar</button>

            <p>Já tem uma conta? <NavLink onClick={()=>setNotLogin(false)}>Clique aqui</NavLink></p>

        </form>

        </div> : 
        
        <div>
            <form onSubmit={submitLogin}>
                <h2>Login</h2>
                <label>
                    <span>E-mail</span>
                    <input type="email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>
                </label>

                <label>
                    <span>Senha</span>
                    <input type="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required/>
                </label>

                <button>Entrar</button>

                <p>Não tem uma conta? <NavLink onClick={()=>setNotLogin(true)}>Clique aqui</NavLink></p>
            </form>
        </div>}
        

    </div>
  )
}

export default LoginRegistro