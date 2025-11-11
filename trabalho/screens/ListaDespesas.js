import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../databases/Firebase';

export default function ListaDespesas({ navigation }) {
    const despesas = [
        { id: '1', descricao: 'Aluguel', valor: 1200.00, data: '05/10/2025' },
        { id: '2', descricao: 'Supermercado', valor: 350.00, data: '10/10/2025' },
        { id: '3', descricao: 'Conta de luz', valor: 150.00, data: '12/10/2025' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemCard}>
            <View style={styles.itemHeader}>
                <Text style={styles.itemDescricao}>{item.descricao}</Text>
                <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
            </View>
            <Text style={styles.itemData}>{item.data}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Minhas Despesas</Text>
                <Text style={styles.headerSubtitle}>Histórico de saídas</Text>
            </View>
            
            <View style={styles.content}>
                <FlatList
                    data={despesas}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhuma despesa cadastrada</Text>
                            <Text style={styles.emptySubtext}>Adicione sua primeira despesa!</Text>
                        </View>
                    }
                />
                
                <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => navigation.navigate('AdicionarDespesa')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.addButtonText}>+ Nova Despesa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#dc3545',
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    itemCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#dc3545',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemDescricao: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    itemValor: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#dc3545',
    },
    itemData: {
        fontSize: 12,
        color: '#999',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },
    addButton: {
        backgroundColor: '#dc3545',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});