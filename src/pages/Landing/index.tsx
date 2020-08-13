import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from  '@react-navigation/native';
import { RectButton } from  'react-native-gesture-handler';

import styles from './styles'

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import purpleHeart from '../../assets/images/icons/heart.png';
import api from '../../services/api';


function Landing(){

    const { navigate } = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0);
    // Disparar quando houver alteração, recebe uma função e um array de condições. Mas se a necessidade for executar uma vez (ao carregar a pagina) o array condicional deve ficar vazio
    // Isto é um promise, então eu posso utilizar o then
    useEffect(() => {
    api.get('connections').then(response =>
        {
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, [] ); 

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handlerNavegateToStudy(){
        navigate('Study');
    }

    return (
    <View style={styles.container}>
    <Image source={landingImg} style={styles.banner}></Image>
    <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
    </Text>
    <View style={styles.buttonscontainer} >
    <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handlerNavegateToStudy}>
        <Image source={studyIcon}></Image>
        <Text style={styles.buttonText}>Estudar</Text>
    </RectButton>
    <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
        <Image source={giveClassesIcon}></Image>
        <Text style={styles.buttonText}>Dar aulas</Text>
    </RectButton>
    
    </View>
    <Text style={styles.totalConnections}>
    Total de {totalConnections} conexões já realizadas {' '}
        <Image source={purpleHeart}></Image>
       
    </Text>
    </View>
    )
};

export default Landing;