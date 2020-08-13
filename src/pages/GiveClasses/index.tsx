import React from 'react';
import { View , ImageBackground, Text} from 'react-native';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){

    const { goBack } = useNavigation();

    function handlerNavigateBack(){
       goBack(); 
    }

    return (<View style={styles.container}>
        <ImageBackground resizeMode="contain"
         style={styles.content}
         source={giveClassesBgImage}>
        <Text style={styles.title}> 
        Quer ser um Proffy?
        </Text>
        <Text style={styles.description}> 
        Para começar, você precisa se cadastrar na nossa plataforma web!
        </Text>
        </ImageBackground>
        <RectButton style={styles.okButton} onPress={handlerNavigateBack}>
        <Text style={styles.okButtonText}>Dar aulas</Text>
    </RectButton>
    
    </View>

    )
};

export default GiveClasses;