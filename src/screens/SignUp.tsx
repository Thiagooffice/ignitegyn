import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from '@services/api'
import axios from "axios"
import { Alert } from 'react-native'

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos."),
    password_confirm: yup.string().required("Confirme a senha").oneOf([yup.ref("password")], "A confirmação da senha nao confere.")
})

export function SignUp() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    const navigation = useNavigation()
    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({ email, name, password }: FormDataProps) {
        try {

            const response = await api.post("/users", { name, password, email })
            console.log(response.data);
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                Alert.alert(error.response?.data.message);
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
            <VStack px={10} flex={1}>
                <Image
                    alt='Pessoas treinando'
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
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
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Nome'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
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

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                placeholder='Confirme a senha'
                                onChangeText={onChange}
                                value={value}
                                type="password"
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
                                errorMessage={errors.password_confirm?.message}
                            />
                        }
                    />

                    <Button
                        title='Criar e acessar'
                        onPress={handleSubmit(handleSignUp)}
                    />

                </Center>

                <Button
                    mt={24}
                    title='Voltar para o login'
                    variant="outline"
                    onPress={handleGoBack}
                />

            </VStack>
        </ScrollView>
    )
}