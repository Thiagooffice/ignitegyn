import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useForm, Controller } from "react-hook-form"

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

export function SignUp() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({})

    const navigation = useNavigation()
    function handleGoBack() {
        navigation.goBack()
    }

    function handleSignUp(data: FormDataProps) {
        console.log(data)
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
                        rules={{
                            required: "Informe o nome"
                        }}
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
                        rules={{
                            required: "Informe o e-mail",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'E-mail inválido'
                            }
                        }}
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
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType='send'
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