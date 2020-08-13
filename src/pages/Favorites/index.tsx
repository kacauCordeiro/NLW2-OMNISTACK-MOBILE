import React, { useState, useEffect } from 'react';
import { View , ImageBackground, Text, AsyncStorage} from 'react-native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favorites(){
    const [favorites, setFavorites] = useState([]);
    
    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
               
                }
            });
        }

        useFocusEffect(() => {
        loadFavorites();
    });
    return (<View style={styles.container}>
        <PageHeader title="Proffys disponíveis"></PageHeader>
        <ScrollView style={styles.teacherList} contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16
        }}>
            {favorites.map((teacher: Teacher) => {
                return (<TeacherItem  key={teacher.id} 
                    teacher={teacher}
                    favorited={true}></TeacherItem>)
            })}
        </ScrollView>
    </View>

    )
};

export default Favorites;