import { BaseSyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, ContainerImage, SignInForm } from "../styles/SignIn.styles";
import { Button } from "../components/Button";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useSignIn } from "../hooks/useSignIn";
import { queryClient } from "../services/react-query";
import { getUser, saveUser } from "../hooks/userCookies";
import { useNavigate } from "react-router-dom";

// Essa constante é um schema de validação para os campos do formulário
const signInForm = z.object({
    user: z.string({ required_error: 'O campo usuário é obrigatório' }).min(2, { message: 'O campo usuário deve ter no mínimo 2 caracteres' }),
    password: z.string({ required_error: 'O campo senha é obrigatório' }).min(3, { message: 'O campo senha deve ter no mínimo 3 caracteres' }),
})
/**
 * Aqui estamos inferindo o tipo do schema de validação, para dizer quais são os tipos dos campos do formulário
 * Inferir é o mesmo que dizer que aquele é o tipo esperado
 */
export type SignInForm = z.infer<typeof signInForm>

type SignInResponse = {
    access_token: string
    user: string
}

export function SignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState } = useForm<SignInForm>({
        resolver: zodResolver(signInForm), // Aqui passamos o schema de validação para o useForm
    });

    const signInMutation = useSignIn()


    async function handleSignIn(data: SignInForm, event?: BaseSyntheticEvent | undefined) {
        event?.preventDefault()
        try {
            const { token, user } = await signInMutation({ user: data.user, password: data.password })
            if (token && user) {
                saveUser({ token, user })
                toast.success("Logado com sucesso!")
                navigate(`/ordens`)
            } else {
                throw new Error('Token ou usuário não informado')
            }
        } catch (error: any) {
            console.error(error);

            toast.error(error.response)
        }
    }

    useEffect(() => {
        // verificar se usuário já está logado
        const token = getUser()?.token
        console.log(token);

        if (token) {
            navigate('/ordens')
        }
    }, [])

    return (
        <Container>
            <ContainerImage>
                <img src="/assets/logo_horizontal.png" alt="" />
            </ContainerImage>

            <SignInForm>
                <span>Acesse sua conta</span>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div>
                        {/* <Label htmlFor="user">Usuário do Tasy</Label> */}
                        <input
                            {...register('user')}
                            id="user"
                            type="text"
                            placeholder="Usuário do Tasy"
                            required
                        />
                        {formState.errors.user && <span>{formState.errors.user.message}</span>}

                        {/* <Label htmlFor="password">Senha</Label> */}
                        <input
                            {...register('password')}
                            id="password"
                            type="password"
                            placeholder="Senha do Tasy"
                        />
                        {formState.errors.password && <span>{formState.errors.password.message}</span>}
                    </div>

                    <Button type="submit" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? <Loader className="animate-spin" /> : 'Entrar'}
                    </Button>
                </form>
            </SignInForm>

        </Container >
    )
}