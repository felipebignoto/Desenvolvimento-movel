import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Graficos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela de Gráficos</Text>
            <Text style={styles.subtitle}>Em breve, gráficos de pizza e barras aparecerão aqui!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    }
});