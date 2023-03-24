import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from "@assets/logo.svg"
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignUp() {

    const navigation = useNavigation()

    function handleGoBack(){
        navigation.goBack()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
            <VStack px={10} flex={1}>
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
                        Crie sua conta
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

                    <Input
                        placeholder='Nome'
                    />

                    <Button
                        title='Criar e acessar'
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