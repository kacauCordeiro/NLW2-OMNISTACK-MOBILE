import React, { useState, useEffect } from 'react';
import { View , ImageBackground, Text, StyleSheet, ScrollView} from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [weekday, setWeekday] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds =favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        })
        
    }
    useFocusEffect(() => {
        loadFavorites();
    });

    const [isFiltersvisible, setIsFilterVisible] = useState(false);

    function handlerToggelFilterVisible(){
        setIsFilterVisible(!isFiltersvisible);
    }

    async function handlerFiltersSubmit(){
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                weekday,
                time
            }
         });
 
         console.log(response.data)
         setIsFilterVisible(false);
         setTeachers(response.data)
    }

    return (
    <View style={styles.container}>
        <PageHeader title="Proffys disponíveis" headerRight={(
        <BorderlessButton onPress={handlerToggelFilterVisible}>
        <Feather name='filter' size={20} color ='#FFF'></Feather>
        </BorderlessButton>)}> 
       {/* { isFiltersvisible && ( */}
        <View style={styles.searchForm}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput
                style={styles.input}
                value={ subject }
                onChangeText={text  => {setSubject(text)}}
                placeholder="Qual a materia?"
                placeholderTextColor= '#c1bccc'></TextInput>
            <View style={styles.inputGroup}>
            <View style={styles.inputBlock}>
            <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                style={styles.input}
                value={ weekday }
                onChangeText={text  => {setWeekday(text)}}
                placeholder="Qual o dia?"
                placeholderTextColor= '#c1bccc'></TextInput>

            </View>
            <View style={styles.inputBlock}>
            <Text style={styles.label}>Horário</Text>
                <TextInput
                style={styles.input}
                value={ time }
                onChangeText={text  => {setTime(text)}}
                placeholder="Horário?"
                placeholderTextColor= '#c1bccc'></TextInput>

            </View>
            
            </View>
            <RectButton style={styles.submitButtom} onPress={handlerFiltersSubmit}>
                <Text style={styles.submitButtomText}>Filtrar</Text>
            </RectButton>
            </View>
       {/* )}; */}
        </PageHeader>

        <ScrollView style={styles.teacherList} contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16
        }}>
            {
                teachers.map((teacher: Teacher) => {
                    return (<TeacherItem  key={teacher.id} teacher={teacher}
                    favorited={
                        favorites.includes(teacher.id)
                    }></TeacherItem>)
                })
            }
            
           
        </ScrollView>
    </View>

    )
};

export default TeacherList;