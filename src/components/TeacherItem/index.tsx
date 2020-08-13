import React, { useState } from 'react';
import { View , Image, Text, Linking} from 'react-native';
import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import styles from './styles';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
export interface Teacher {
    name: string;
    bio: string;
    avatar: string; 
    cost: number;
    id: number;
    subject: string;
    whatsapp:  string;   
 
}

interface TeacherItemProps {
 teacher: Teacher;
 favorited: boolean
   
}
const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {  

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handlerLinkToWhatsApp() {
        api.post('connections', {
            user_id: teacher.id
        })
        Linking.openURL(`whatsapp://send?phone${teacher.whatsapp}`)
    }

   async function handlerToggleFavorite() {
      
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if (favorites){
           favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited){
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id = teacher.id
            })
            setIsFavorited(false);
            favoritesArray.splice(favoriteIndex, 1)
        }else{

            favoritesArray.push(teacher);
            setIsFavorited(true);
            
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (<View style={styles.container}>
        <View style={styles.profile}>
                <Image style={styles.avatar} source={{uri: teacher.avatar}} resizeMode='contain' />
            <Image source={logoImg} resizeMode='contain' />
        
        <View style={styles.profileInfo}>
    <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
        </View>
        <Text style={styles.bio}>{teacher.bio}</Text>
        <View style={styles.footer}>
            <Text  style={styles.price}>
                Preço/Hora {'   '}
                <Text style={styles.priceValue}> {teacher.cost}</Text>
            </Text>
            <View style={styles.buttonsContainer}>

            <RectButton onPress={handlerToggleFavorite} style={
                [styles.favoriteButton, isFavorited 
                    ? styles.favorited : {}]}>
                {/* <Image source={heartOutlineIcon}></Image> */}
                { isFavorited 
                ? <Image source={unFavoriteIcon}></Image>
                : <Image source={heartOutlineIcon}></Image>}
                </RectButton>

                <RectButton style={styles.contactButton} onPress={handlerLinkToWhatsApp}>
                <Image source={whatsappIcon}></Image>
                <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </View>
    </View>

    )
};

export default TeacherItem;