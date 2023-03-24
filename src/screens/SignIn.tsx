import { VStack, Image, Text, Center, Heading } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
    return (
        <VStack px={10} flex={1} bg="gray.700">
            <Image
                alt='Pessoas treinando'
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

                <Input
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <Input
                    placeholder='Senha'
                    secureTextEntry
                />

                <Button
                title='Acessar'
                />

            </Center>

        </VStack>
    )
}