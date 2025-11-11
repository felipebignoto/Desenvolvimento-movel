import React from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    StatusBar, 
    ScrollView, 
    TextInput 
} from 'react-native';
import firebase from '../databases/Firebase';

export default function Principal({ navigation }) {
    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log('Usuário deslogado');
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                console.log('Erro ao fazer logout', error);
            });
    };
    const user = firebase.auth().currentUser;
    const userEmail = user ? user.email : 'Usuário';
    const mockReceitas = [
        { id: '1', descricao: 'Salário', valor: 'R$ 2500,00' },
        { id: '2', descricao: 'Venda Item', valor: 'R$ 150,00' },
    ];
    const mockDespesas = [
        { id: '3', descricao: 'Aluguel', valor: 'R$ 800,00' },
        { id: '4', descricao: 'Supermercado', valor: 'R$ 450,00' },
    ];

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {userEmail.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.welcomeText}>Olá!</Text>
                <Text style={styles.emailText}>{userEmail}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Informações da Conta</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Saldo</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>R$ 500,00</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={[styles.actionButton, styles.receitaButton]} onPress={() => navigation.navigate('AdicionarReceita')} activeOpacity={0.8}>
                        <Text style={styles.actionButtonText}>+ Receita</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.despesaButton]} onPress={() => navigation.navigate('AdicionarDespesa')} activeOpacity={0.8}>
                        <Text style={styles.actionButtonText}>- Despesa</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.graficoButton}
                    onPress={() => navigation.navigate('Graficos')}
                    activeOpacity={0.8}>
                    <Text style={styles.graficoButtonText}>Ver Gráficos</Text>
                </TouchableOpacity>
                <View style={styles.dateFilterContainer}>
                    <Text style={styles.filterTitle}>Histórico por Período</Text>
                    <View style={styles.dateInputsRow}>
                        <TextInput placeholder="Data Início (DD/MM/AA)" style={styles.dateInput} />
                        <TextInput placeholder="Data Fim (DD/MM/AA)" style={styles.dateInput} />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Últimas Receitas</Text>
                    {mockReceitas.map(item => (
                        <View key={item.id} style={styles.listItem}>
                            <View>
                                <Text style={styles.itemDescricao}>{item.descricao}</Text>
                                <Text style={styles.itemValorReceita}>{item.valor}</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editButtonText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Últimas Despesas</Text>
                    {mockDespesas.map(item => (
                        <View key={item.id} style={styles.listItem}>
                            <View>
                                <Text style={styles.itemDescricao}>{item.descricao}</Text>
                                <Text style={styles.itemValorDespesa}>{item.valor}</Text>
                            </View>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.editButtonText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}>
                    <Text style={styles.logoutButtonText}>Sair da Conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#6c5ce7', paddingTop: 60, paddingBottom: 40, paddingHorizontal: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
    avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
    welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    emailText: { color: '#fff', fontSize: 16 },
    content: { flex: 1, padding: 30 },
    infoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 30, elevation: 4, shadowOpacity: 0.1, shadowRadius: 8 },
    infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    infoLabel: { fontSize: 14, color: '#666' },
    statusBadge: { backgroundColor: '#d4edda', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    statusText: { fontSize: 12, color: '#28a745', fontWeight: '600' },
    actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    actionButton: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center', marginHorizontal: 5 },
    receitaButton: { backgroundColor: '#28a745' },
    despesaButton: { backgroundColor: '#dc3545' },
    actionButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
    graficoButton: {
        backgroundColor: '#007bff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    graficoButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateFilterContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        shadowOpacity: 0.1,
        shadowRadius: 8
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center'
    },
    dateInputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginHorizontal: 5,
        textAlign: 'center'
    },
    listContainer: {
        marginBottom: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    itemDescricao: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    itemValorReceita: {
        fontSize: 14,
        color: '#28a745',
        fontWeight: 'bold'
    },
    itemValorDespesa: {
        fontSize: 14,
        color: '#dc3545',
        fontWeight: 'bold'
    },
    editButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 12
    },
    logoutButton: { 
        backgroundColor: '#fff', 
        borderRadius: 12, 
        padding: 16, 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#6c5ce7',
        marginTop: 10,
    },
    logoutButtonText: { color: '#6c5ce7', fontSize: 16, fontWeight: 'bold' },
});