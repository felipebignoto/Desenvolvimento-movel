import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../databases/Firebase';

export default function SecondScreen({ navigation }) {
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

    return (
        <View style={styles.container}>
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
                <View style={styles.card}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.iconText}>✓</Text>
                    </View>
                    <Text style={styles.successTitle}>Login Realizado!</Text>
                    <Text style={styles.successSubtitle}>
                        Você está autenticado com sucesso
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Informações da Conta</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Status:</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>Ativo</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>E-mail verificado:</Text>
                        <Text style={styles.infoValue}>
                            {user?.emailVerified ? 'Sim' : 'Não'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
        backgroundColor: '#6c5ce7',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    emailText: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#d4edda',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconText: {
        fontSize: 28,
        color: '#28a745',
        fontWeight: 'bold',
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    statusBadge: {
        backgroundColor: '#d4edda',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        color: '#28a745',
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6c5ce7',
    },
    logoutButtonText: {
        color: '#6c5ce7',
        fontSize: 16,
        fontWeight: 'bold',
    },
});