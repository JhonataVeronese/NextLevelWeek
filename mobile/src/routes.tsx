import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Importa o tipo de navegaçao a ser usada Existe N
// Importa as paginas
import Home from './pages/home';
import Points from './pages/Points';
import Detail from './pages/Detail';


//Seguindo a documentaçao do navigator
const AppStack = createStackNavigator();

const Routs = () => {
    return (
        <NavigationContainer>
            {/* Cria as rotas*/}
            {/* Cria as rota remove o titulo da pagina que esta*/}
            <AppStack.Navigator headerMode='none' screenOptions={{
                cardStyle: {
                    // Colcando um "css" dentro de uma pagina toda de navegaçao
                    backgroundColor: '#f0f0f5'
                }
            }}>
                {/* Cria as rotas para cada pagina*/}
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
};
export default Routs;