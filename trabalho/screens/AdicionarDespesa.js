import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import firebase from '../databases/Firebase';

const categoriasDespesa = ['Alimentação', 'Roupa', 'Lazer', 'Moradia', 'Transporte', 'Saúde', 'Outros'];

export default function AdicionarDespesa({ navigation, route }) {
    const item = route.params?.item;
    const isEditing = !!item;
    const [descricao, setDescricao] = useState(item?.descricao || '');
    const [valor, setValor] = useState(item?.valor.toString() || ''); 
    const [data, setData] = useState(item?.data || new Date().toLocaleDateString('pt-BR'));
    const [categoria, setCategoria] = useState(item?.categoria || '');
    const [isLoading, setLoading] = useState(false);

    const handleSaveDespesa = () => {
        if (!descricao || !valor || !data || !categoria) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos, incluindo a categoria.");
            return;
        }
        setLoading(true);

        const dadosDespesa = {
            descricao,
            valor: parseFloat(valor.replace(',', '.')),
            data,
            categoria,
        };

        if (isEditing) {
            firebase.firestore().collection('despesas').doc(item.id).update(dadosDespesa)
            .then(() => {
                Alert.alert("Sucesso!", "Despesa atualizada.");
                navigation.navigate('ListaDespesas');
            })
            .catch(error => Alert.alert("Erro", "Não foi possível atualizar a despesa."))
            .finally(() => setLoading(false));
        } else {
            firebase.firestore().collection('despesas').add({
                ...dadosDespesa,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Sucesso!", "Despesa adicionada.");
                navigation.goBack();
            })
            .catch(error => Alert.alert("Erro", "Não foi possível adicionar a despesa."))
            .finally(() => setLoading(false));
        }
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{isEditing ? 'Editar Despesa' : 'Adicionar Despesa'}</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.input} placeholder="Ex: Aluguel, Supermercado" value={descricao} onChangeText={setDescricao}/>
                
                <Text style={styles.label}>Categoria</Text>
                <View style={styles.categoriaContainer}>
                    {categoriasDespesa.map((itemCategoria) => (
                        <TouchableOpacity
                            key={itemCategoria}
                            style={[
                                styles.categoriaButton,
                                categoria === itemCategoria && styles.categoriaButtonSelected
                            ]}
                            onPress={() => setCategoria(itemCategoria)}
                        >
                            <Text style={[
                                styles.categoriaButtonText,
                                categoria === itemCategoria && styles.categoriaButtonTextSelected
                            ]}>{itemCategoria}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput style={styles.input} placeholder="0,00" keyboardType="numeric" value={valor} onChangeText={setValor}/>
                
                <Text style={styles.label}>Data</Text>
                <TextInput style={styles.input} placeholder="DD/MM/AAAA" value={data} onChangeText={setData}/>
                
                <TouchableOpacity style={styles.button} onPress={handleSaveDespesa} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : 
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Salvar Despesa'}</Text>
                    }
                </TouchableOpacity>
                {!isEditing && (
                    <TouchableOpacity 
                        style={styles.buttonSecondary} 
                        onPress={() => navigation.navigate('ListaDespesas')}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonTextSecondary}>Ver Lista de Despesas</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#dc3545', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    form: { padding: 30 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e0e0e0' },
    categoriaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoriaButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
    },
    categoriaButtonSelected: {
        backgroundColor: '#dc3545',
        borderColor: '#dc3545',
    },
    categoriaButtonText: {
        color: '#333',
        fontSize: 14,
    },
    categoriaButtonTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: { backgroundColor: '#dc3545', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    buttonSecondary: { backgroundColor: 'transparent', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#dc3545' },
    buttonTextSecondary: { color: '#dc3545', fontSize: 16, fontWeight: '600' },
});