import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { VStack, Text, HStack, FlatList, Heading } from 'native-base'
import React, { useState } from 'react'

export function Home() {

    const [groups, setGroups] = useState(["Costa", "Ombro", "Bíceps", "Tríceps"])
    const [exercises, setExercises] = useState(["Puxada Frontal", "Remada curvada", "Remada Unilateral", "Levantamento terra"])
    const [groupSelected, setGroupSelected] = useState("costa")

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        onPress={() => setGroupSelected(item)}
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                my={10}
                maxHeight={10}
            />

            <VStack flex={1} px={8}>
                <HStack mb={5} justifyContent="space-between">
                    <Heading color="gray.200" fontSize="md">
                        Exercícios
                    </Heading>

                    <Text color="gray.200" fontSize="sm">
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard

                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{paddingBottom: 20}}
                />
            </VStack>
        </VStack>
    )
}