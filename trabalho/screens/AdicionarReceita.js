import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar } from 'react-native';
import firebase from '../databases/Firebase';

export default function AdicionarReceita({ navigation }) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date().toLocaleDateString('pt-BR'));
    const [isLoading, setLoading] = useState(false);

    const handleSaveReceita = () => {
        if (!descricao || !valor || !data) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }
        setLoading(true);
        const userId = firebase.auth().currentUser.uid;
        firebase.firestore().collection('receitas').add({
            userId,
            descricao,
            valor: parseFloat(valor.replace(',', '.')),
            data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert("Sucesso!", "Receita adicionada.");
            navigation.goBack();
        })
        .catch(error => Alert.alert("Erro", "Não foi possível adicionar a receita."))
        .finally(() => setLoading(false));
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Adicionar Receita</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.input} placeholder="Ex: Salário, Venda de item" value={descricao} onChangeText={setDescricao}/>
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput style={styles.input} placeholder="0,00" keyboardType="numeric" value={valor} onChangeText={setValor}/>
                <Text style={styles.label}>Data</Text>
                <TextInput style={styles.input} placeholder="DD/MM/AAAA" value={data} onChangeText={setData}/>
                <TouchableOpacity style={styles.button} onPress={handleSaveReceita} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar Receita</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#28a745', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    form: { padding: 30 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e0e0e0' },
    button: { backgroundColor: '#28a745', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});