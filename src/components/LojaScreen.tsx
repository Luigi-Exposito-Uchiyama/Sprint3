import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal';
import Icon from 'react-native-vector-icons/Ionicons'; 

type LojaScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LojaScreen: React.FC<LojaScreenProps> = ({ navigation }) => {
  const lojas = [
    { 
      nome: 'Burger King', 
      produtos: [
        { nome: 'Whopper', precoOriginal: 'R$35', precoPromocional: 'R$29', imagem: require('../../assets/hamburguer.jpg') },
        { nome: 'Cheeseburger', precoOriginal: 'R$20', precoPromocional: 'R$15', imagem: require('../../assets/hamburguer2.jpg') },
      ],
      localizacao: 'Avenida dos Queijos, 123'
    },
    { 
      nome: 'Pizza Hut', 
      produtos: [
        { nome: 'Pizza Calabresa', precoOriginal: 'R$45', precoPromocional: 'R$39', imagem: require('../../assets/pizza.jpg') },
        { nome: 'Pizza Marguerita', precoOriginal: 'R$40', precoPromocional: 'R$34', imagem: require('../../assets/pizza2.jpg') },
      ],
      localizacao: 'Rua da Pizza Gourmet, 456'
    },
    { 
      nome: 'Starbucks', 
      produtos: [
        { nome: 'Cappuccino', precoOriginal: 'R$20', precoPromocional: 'R$16', imagem: require('../../assets/bebidas1.jpg') },
        { nome: 'Latte', precoOriginal: 'R$22', precoPromocional: 'R$18', imagem: require('../../assets/bebidas2.jpg') },
      ],
      localizacao: 'Praça do Café, 789'
    },
  ];

  const handleShowLocation = () => {
    navigation.navigate('Localizacao');
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const renderProduto = ({ item }: { item: { nome: string; precoOriginal: string; precoPromocional: string; imagem: any } }) => (
    <View style={styles.produtoContainer}>
      <Image source={item.imagem} style={styles.produtoImagem} />
      <View style={styles.produtoInfo}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.precoOriginal}>{item.precoOriginal}</Text>
        <Text style={styles.precoPromocional}>{item.precoPromocional}</Text>
      </View>
    </View>
  );

  const renderLoja = ({ item }: { item: { nome: string; produtos: { nome: string; precoOriginal: string; precoPromocional: string; imagem: any }[]; localizacao: string } }) => (
    <View style={styles.lojaContainer}>
      <Text style={styles.lojaNome}>{item.nome}</Text>
      <Text style={styles.localizacaoText}>Localização: {item.localizacao}</Text>
      <FlatList
        data={item.produtos}
        renderItem={renderProduto}
        keyExtractor={(item) => item.nome}
        contentContainerStyle={styles.produtosList}
      />
      <TouchableOpacity
        style={styles.localizacaoButton}
        onPress={handleShowLocation}
      >
        <Text style={styles.localizacaoButtonText}>Mostrar Localização</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#007bff" /> 
            </TouchableOpacity>
            <Text style={styles.titulo}>Lojas e Ofertas</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={lojas}
            renderItem={renderLoja}
            keyExtractor={(item) => item.nome}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,  
    textAlign: 'center',  
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
  lojaContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  lojaNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  localizacaoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  produtosList: {
    marginTop: 10,
  },
  produtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  produtoImagem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  precoOriginal: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  precoPromocional: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  localizacaoButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  localizacaoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
});

export default LojaScreen;
