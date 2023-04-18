import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react'

type FormDataProps = {
    password: string;
    email: string;
}

const signInSchema = yup.object({
    email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos."),
})

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    const { signIn } = useAuth()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema)
    })

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAcount() {
        navigation.navigate("signUp")
    }

    async function handleSignUp({ email, password }: FormDataProps) {
        try {
            setIsLoading(true)
            await signIn(email, password)
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde."

            setIsLoading(false)

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
            <VStack px={10} flex={1}>
                <Image
                    alt='Pessoas treinando'
                    defaultSource={BackgroundImg}
                    source={BackgroundImg}
                    resizeMode="contain"
                    position="absolute"
                />
                <Center my={24}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo
                    </Text>
                </Center>

                <Center>
                    <Heading fontSize="xl" mb={6} fontFamily="heading" color="gray.100">
                        Acesse sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        }
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                placeholder='Senha'
                                onChangeText={onChange}
                                value={value}
                                type='password'
                                errorMessage={errors.password?.message}
                            />
                        }
                    />

                    <Button
                        title='Acessar'
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />

                </Center>

                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>
                </Center>

                <Button
                    title='Criar conta'
                    variant="outline"
                    onPress={handleNewAcount}
                />

            </VStack>
        </ScrollView>
    )
}