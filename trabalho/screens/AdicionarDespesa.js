import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
import firebase from '../databases/Firebase';

export default function AdicionarDespesa({ navigation }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'));
    const [isLoading, setLoading] = useState(false);

    const handleSaveDespesa = () => {
        if (!descricao || !valor || !data) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }
        setLoading(true);
        const userId = firebase.auth().currentUser.uid;
        firebase.firestore().collection('despesas').add({
            userId,
            descricao,
            valor: parseFloat(valor.replace(',', '.')),
            data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert("Sucesso!", "Despesa adicionada.");
            navigation.goBack();
        })
        .catch(error => Alert.alert("Erro", "Não foi possível adicionar a despesa."))
        .finally(() => setLoading(false));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Adicionar Despesa</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.input} placeholder="Ex: Aluguel, Supermercado" value={descricao} onChangeText={setDescricao}/>
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput style={styles.input} placeholder="0,00" keyboardType="numeric" value={valor} onChangeText={setValor}/>
                <Text style={styles.label}>Data</Text>
                <TextInput style={styles.input} placeholder="DD/MM/AAAA" value={data} onChangeText={setData}/>
                <TouchableOpacity style={styles.button} onPress={handleSaveDespesa} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar Despesa</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#dc3545', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    form: { padding: 30 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e0e0e0' },
    button: { backgroundColor: '#dc3545', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});