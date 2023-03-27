import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { VStack, Text, HStack } from 'native-base'
import { useState } from 'react'

export function Home() {

    const [groupSelected, setGroupSelected] = useState("costa")

    return (
        <VStack flex={1}>
            <HomeHeader />

            <HStack>
                <Group
                    onPress={() => setGroupSelected("costa")}
                    name="costa"
                    isActive={groupSelected === "costa"}
                />
                <Group
                    onPress={() => setGroupSelected("ombro")}
                    name="ombro"
                    isActive={groupSelected === "ombro"}
                />
            </HStack>
        </VStack>
    )
}