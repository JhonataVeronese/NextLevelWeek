import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'; // import de icones
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, LocalTile } from 'react-native-maps';
// para importar esse cara rodar o comando :expo install react-native-svg
import { SvgUri } from 'react-native-svg'; // Permite arquivos svg na app
import api from '../../services/api';

// Importar o location pelo expo
// expo install expo-location
import * as Location from 'expo-location'; // * as Location importa tudo para a variavel location

//---------------------------------------------------
// Interfaces para as tipagems dos item usados no useState
interface Item {
    id: number,
    title: string,
    image_url: string
}

interface Points {
    point_id: number;
    name: string;
    image: string;
    latitude: number;
    longitude: number
}

//------------------------------------------------------------------------
const Points = () => {
    const navigation = useNavigation(); // Carrega a variavel

    //Variavis para os estados
    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Points[]>([]);
    const [selectedItem, setSelectedItem] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    // Eventos para armazenar os estados
    // useEffect(() => { }, []); - Para armazenar os estados, igual é feito na web e fazer requisiçoes para a api
    useEffect(() => {
        // Chama uma rota e fica aguardando o retorno
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        // Criado uma funçao async pois pode demorar
        async function locationPosition() {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Oooops..', 'Precisamos saber onde você está');
                return
            }

            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;

            setInitialPosition([
                latitude,
                longitude
            ]);
        }

        // Funçao faz a chamada para que seja possivel utlizar o async
        locationPosition();
    }, []);

    useEffect(() => {
        api.get('points', {
            params: {
                city: 'Cascavel',
                uf: 'PR',
                items: selectedItem
            }
        }).then(response => {
            console.log(response.data);
            setPoints(response.data);
        })
    }, [selectedItem]);


    function handleSelectItem(id: number) {
        // Percore os itens selecionados verificando se o id do parametro ja existe nesse array
        const alreadySelected = selectedItem.findIndex(item => item === id);
        // Se retornar valor positivo entao existe no array ( > -1)
        if (alreadySelected >= 0) {
            // Filtra os itens que sao diferentes do id passado, para "remover" do array
            const fileredItems = selectedItem.filter(itemFiltrado => itemFiltrado !== id);
            setSelectedItem(fileredItems);// seta novamente no array

        } else {
            setSelectedItem([...selectedItem, id]);
        }
    }

    function handlerBack() {
        navigation.goBack(); // Volta para a pagina anterior
        // navigation.navigate('Home');// Passa o name da tela criado no arquivo routes
    }

    function handlerToDetail(id: number) {
        navigation.navigate('Detail', { point_id: id });// Rota com passagem de parametro
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlerBack}>
                    <Icon name='arrow-left' size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>Bem Vindo</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>

                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView
                            loadingEnabled={initialPosition[0] === 0}
                            style={styles.map} initialRegion={{
                                latitude: initialPosition[0],
                                longitude: initialPosition[1],
                                latitudeDelta: 0.014,
                                longitudeDelta: 0.014
                            }}>
                            {points.map(point => (
                                <Marker
                                    key={String(point.point_id)}
                                    onPress={() => handlerToDetail(point.point_id)}
                                    style={styles.mapMarker}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude,
                                    }}>
                                    <View style={styles.mapMarkerContainer}>
                                        <Image source={{ uri: point.image }} style={styles.mapMarkerImage}></Image>
                                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                    </View>
                                    {/* <View style={styles.mapMarkerContainer}>
                                        <Image source={{ uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60" }} style={styles.mapMarkerImage}></Image>
                                        <Text style={styles.mapMarkerTitle}>Mercado pegoraro</Text>
                                    </View> */}
                                </Marker>

                            ))}

                        </MapView>
                    )}
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}>
                    {items.map(item => (
                        <TouchableOpacity
                            key={String(item.id)}
                            // pode ser aplicado mais de um stilo desde que tenha o [] inclusive fazer condicionais para utilizalos
                            style={[
                                styles.item,
                                selectedItem.includes(item.id) ? styles.selectedItem : {}
                            ]}
                            activeOpacity={0.6}
                            onPress={() => handleSelectItem(item.id)}
                        >
                            <SvgUri width={42} height={42} uri={item.image_url}></SvgUri>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },

    title: {
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 4,
        fontFamily: 'Roboto_400Regular',
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    mapMarker: {
        width: 90,
        height: 80,
    },

    mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },

    mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
    },

    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
    },

    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },

    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        height: 120,
        width: 120,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

        textAlign: 'center',
    },

    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },

    itemTitle: {
        fontFamily: 'Roboto_400Regular',
        textAlign: 'center',
        fontSize: 13,
    },
});

export default Points;
