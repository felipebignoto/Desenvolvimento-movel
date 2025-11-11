import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import firebase from '../databases/Firebase';

const categoriasReceita = ['Salário', 'Rendimento', 'Investimentos', 'Extra'];


export default function AdicionarReceita({ navigation, route }) {

    const item = route.params?.item;
    const isEditing = !!item;
    const [descricao, setDescricao] = useState(item?.descricao || '');
    const [valor, setValor] = useState(item?.valor.toString() || '');
    const [data, setData] = useState(item?.data || new Date().toLocaleDateString('pt-BR'));
    const [categoria, setCategoria] = useState(item?.categoria || '');
    const [isLoading, setLoading] = useState(false);

    const handleSaveReceita = () => {
        if (!descricao || !valor || !data || !categoria) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos, incluindo a categoria.");
            return;
        }
        setLoading(true);
        
        const dadosReceita = {
            descricao,
            valor: parseFloat(valor.replace(',', '.')),
            data,
            categoria,
        };

        if (isEditing) {
            firebase.firestore().collection('receitas').doc(item.id).update(dadosReceita)
            .then(() => {
                Alert.alert("Sucesso!", "Receita atualizada.");
                navigation.navigate('ListaReceitas');
            })
            .catch(error => Alert.alert("Erro", "Não foi possível atualizar a receita."))
            .finally(() => setLoading(false));
        } else {
            firebase.firestore().collection('receitas').add({
                ...dadosReceita,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Sucesso!", "Receita adicionada.");
                navigation.goBack();
            })
            .catch(error => Alert.alert("Erro", "Não foi possível adicionar a receita."))
            .finally(() => setLoading(false));
        }
    };
    return (
        <ScrollView style={styles.container}> 
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{isEditing ? 'Editar Receita' : 'Adicionar Receita'}</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput style={styles.input} placeholder="Ex: Salário, Venda de item" value={descricao} onChangeText={setDescricao}/>
                
                <Text style={styles.label}>Categoria</Text>
                <View style={styles.categoriaContainer}>
                    {categoriasReceita.map((itemCategoria) => (
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
                
                <TouchableOpacity style={styles.button} onPress={handleSaveReceita} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : 
                    <Text style={styles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Salvar Receita'}</Text>
                    }
                </TouchableOpacity>
                {!isEditing && (
                    <TouchableOpacity 
                        style={styles.buttonSecondary} 
                        onPress={() => navigation.navigate('ListaReceitas')}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonTextSecondary}>Ver Lista de Receitas</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { backgroundColor: '#28a745', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
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
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    categoriaButtonText: {
        color: '#333',
        fontSize: 14,
    },
    categoriaButtonTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button: { backgroundColor: '#28a745', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    buttonSecondary: { backgroundColor: 'transparent', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#28a745' },
    buttonTextSecondary: { color: '#28a745', fontSize: 16, fontWeight: '600' },
});