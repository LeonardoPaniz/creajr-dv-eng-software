import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiService } from "../../services/api";

import "./signUp.css";
import { useForm, useWatch } from "react-hook-form";

interface SignUpPageProps {
  setCredentialOperation: (value: number) => void;
}

interface FormData {
  name: string;
  cpf: string;
  phone: string;
  email_personal: string;
  email_university: string;
  ra: number;
  birth_date: number;
  university: string;
  campus: string;
  course: string;
  admission_date: number;
  sponsor: string;
  password: string;
  confirm_password: string;
}
export default function SignUpPage({
  setCredentialOperation,
}: SignUpPageProps) {
  const [focusPassword, setFocusPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormData>();

  const password = useWatch({ control, name: "password" });

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;
    if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${formatted.slice(0, 7)}.${formatted.slice(7)}`;
    }
    if (cleaned.length > 9) {
      formatted = `${formatted.slice(0, 11)}-${formatted.slice(11)}`;
    }
    return formatted.slice(0, 14);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const isMobile = cleaned.length > 10;
    let formatted = cleaned;
    if (cleaned.length > 0) {
      formatted = `(${cleaned.slice(0, 2)}`;
    }
    if (cleaned.length > 2) {
      formatted += `) ${cleaned.slice(2, isMobile ? 7 : 6)}`;
    }
    if (cleaned.length > (isMobile ? 7 : 6)) {
      formatted += `-${cleaned.slice(isMobile ? 7 : 6)}`;
    }
    return formatted.slice(0, 15);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const emailExists = await apiService.checkEmail(data.email_personal);
    if (emailExists) {
      alert("Email pessoal já está em uso");
      setIsLoading(false);
      return;
    } else {
      alert("Email disponível para cadastro"); // Adicione aqui se quiser feedback positivo
      try {
        const response = await apiService.registerMember({
          ...data,
          sponsor: data.sponsor || null,
        });

        console.log("Cadastro realizado com sucesso:", response);
        alert("Cadastro realizado com sucesso! Por favor, faça login.");
        setCredentialOperation(0); // Redireciona para o login
      } catch (error: any) {
        console.error("Erro completo:", {
          //Ele cai automaticamente aqui o erro de member not found, ele deveria seguir o fluxo padrão mesmo recebendo um 404.
          message: error.message,
          response: error.response?.data,
          stack: error.stack,
        });

        let userMessage = error.message;
        if (error.response?.data?.message) {
          userMessage = error.response.data.message;
        } else if (error.message.includes("409")) {
          userMessage = "Dados já cadastrados (CPF, RA ou email)";
        }

        alert(userMessage);
      } finally {
        setIsLoading(false);
      }
    }

    // Verificar se o email ja esta cadastrado, academico e pessoal
    //Verificar o email do usuario com código de validação
    // modal pra avisar de cadastro realizado com sucesso e clique para ir ao login
  };

  useEffect(() => {
    setValue("cpf", cpf);
  }, [cpf, setValue]);

  useEffect(() => {
    setValue("phone", phone);
  }, [phone, setValue]);
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   const hashedPassword = await bcrypt.hash(formData.password, 10);
  //   setFormData((prevData) => ({ ...prevData, password: hashedPassword }));
  //   console.log("Dados enviados:", { ...formData, password: hashedPassword });
  // };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logosContent">
          <Image
            src="/logos/logo-creajr-pr.png"
            width={200}
            height={60}
            alt=""
          />
          <Image src="/logos/sfwpreto.png" width={140} height={100} alt="" />
        </div>
        <p>
          Você está a um passo de distância de fazer parte da família CreaJr.
        </p>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nome completo</label>
            <input
              className={errors?.name && "inputError"}
              {...register("name", { required: true, minLength: 5 })}
              type="text"
              placeholder="Nome Sobrenome"
            />
            {errors?.name?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.name?.type === "minLength" && (
              <p className="errorMessage">Mínimo de 5 caracteres</p>
            )}
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              className={errors?.cpf && "inputError"}
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              onBlur={() =>
                register("cpf", {
                  required: true,
                  pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                })
              }
              type="text"
              placeholder="000.000.000-00"
            />
            {errors?.cpf?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.cpf?.type === "pattern" && (
              <p className="errorMessage">Formato inválido (000.000.000-00)</p>
            )}
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              className={errors?.phone && "inputError"}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onBlur={() =>
                register("phone", {
                  required: true,
                  pattern:
                    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
                })
              }
              type="text"
              placeholder="(99) 99999-9999"
            />
            {errors?.phone?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.phone?.type === "pattern" && (
              <p className="errorMessage">
                Formato inválido (ex: (99) 99999-9999)
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Email Pessoal</label>
            <input
              className={errors?.email_personal && "inputError"}
              {...register("email_personal", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              type="email"
              placeholder="email@gmail.com"
            />
            {errors?.email_personal?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.email_personal?.type === "pattern" && (
              <p className="errorMessage">E-mail inválido</p>
            )}
          </div>

          <div className="form-group">
            <label>Email Acadêmico</label>
            <input
              {...register("email_university")}
              type="email"
              placeholder="nome@alunos.utfpr.edu.br"
            />
          </div>

          <div className="form-group">
            <label>Data de Nascimento</label>
            <input
              {...register("birth_date", { required: true })}
              type="date"
            />
            {errors?.birth_date?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="">Universidade</label>
            <select {...register("university", { required: true })} id="">
              <option value="UTFPR">UTFPR</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Campus</label>
            <select {...register("campus", { required: true })} id="">
              <option value="Dois Vizinhos">Dois Vizinhos</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Curso</label>
            <select {...register("course", { required: true })} id="">
              <option value="Engenharia de Software">
                Engenharia de Software
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Data de admissão (curso)</label>
            <input
              {...register("admission_date", { required: true })}
              type="date"
            />
            {errors?.admission_date?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
          </div>

          <div className="form-group">
            <label>Registro de Aluno (RA)</label>
            <input
              {...register("ra", { required: true, pattern: /^\d{7}$/ })}
              type="text"
              placeholder="XXXXXXX"
            />
            {errors?.ra?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.ra?.type === "pattern" && (
              <p className="errorMessage">RA inválido (7 dígitos)</p>
            )}
          </div>

          <div className="form-group">
            <label>Indicação</label>
            <input
              {...register("sponsor")}
              type="text"
              placeholder="Nome do padrinho"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
              })}
              type={focusPassword ? "text" : "password"}
              onFocus={() => setFocusPassword(!focusPassword)}
              onBlur={() => setFocusPassword(!focusPassword)}
              placeholder="Minimo 8 caracteres, inclua letras e números"
            />
            {errors?.password?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.password?.type === "pattern" && (
              <p className="errorMessage">
                Minimo 8 caracteres, inclua letras e números
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              {...register("confirm_password", {
                required: true,
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
              type={focusPassword ? "text" : "password"}
              onFocus={() => setFocusPassword(!focusPassword)}
              onBlur={() => setFocusPassword(!focusPassword)}
              placeholder="Minimo 8 caracteres, inclua letras e números"
            />
            {errors?.confirm_password?.type === "required" && (
              <p className="errorMessage">Campo obrigatório</p>
            )}
            {errors?.confirm_password?.type === "validate" && (
              <p className="errorMessage">Senhas divergentes</p>
            )}
          </div>

          <div className="rowButtons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button type="button" onClick={() => setCredentialOperation(0)}>
              Faça login
            </button>
          </div>
        </form>
      </div>
      <div className="signup-image" />
    </div>
  );
}
