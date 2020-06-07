import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'; // Import de botoes
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'; // import de icones
// Instalar o navigation usando o comando : npm install @react-navigation/native

// Importa a navaçao para ser usada no botao
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'; // Api de email - expo install expo-mail-composer
//------------------------------------------------------------------------------------------

import api from '../../services/api';

interface RouteParams {
    point_id: number;
}

interface Data {
    point: {
        image: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[]// Diz q é um array de objeto
}

const Detail = () => {
    const navigation = useNavigation(); // Carrega a variavel

    const route = useRoute();
    const routeParams = route.params as RouteParams; // Faz com que o objeto route.params receba diretamente a interface de RouteParams, como se fose um Class Cast

    const [data, setData] = useState<Data>({} as Data);

    useEffect(() => {
        console.log(`points/${routeParams.point_id}`);
        api.get(`points/${routeParams.point_id}`).then(response => {
            console.log(response.data);
            setData(response.data);
        });
    }, []);

    function handlerBack() {
        navigation.goBack(); // Volta para a pagina anterior
        // navigation.navigate('Home');// Passa o name da tela criado no arquivo routes
    }


    function handlerMail() {
        MailComposer.composeAsync({
            subject: 'EColeta - Interesse em coleta de residuos',
            recipients: [data.point.email]
        });
    }

    function handlerWhats() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse em coletar resituos`);
    }

    if (!data.point) {// Caso o ponto ainda nao seja carregado, entao nao carrega a tela, ou carrega uma tela de loading
        return null;//Aqui poderia ser uma tela de loading, que seria o melhor caso
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlerBack}>
                    <Icon name='arrow-left' size={20} color="#34cb79" />
                </TouchableOpacity>
                <Image style={styles.pointImage} source={{ uri: data.point.image }} />
                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.pointItems}>
                    {data.items.map(item => item.title).join(', ')}
                    {/* uni os vetores e separa por virgula */}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>{data.point.uf}</Text>
                    <Text style={styles.addressContent}>{data.point.city}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button}>
                    <FontAwesome style={styles.buttonText}
                        onPress={handlerWhats}
                        name="whatsapp" size={20}
                        color="#FFF">Whatsapp</FontAwesome>
                </RectButton>
                <RectButton style={styles.button} onPress={handlerMail}>
                    <Icon style={styles.buttonText} name="mail" size={20} color="#FFF">Email</Icon>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },

    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;
