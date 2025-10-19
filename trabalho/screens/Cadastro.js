import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import firebase from '../databases/Firebase'; // Verifique se o caminho está correto

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isLoading, setLoading] = useState(false);


    const handleSignUp = () => {
        if (!nome || !mail || !pass || !confirmPass) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }
        if (pass !== confirmPass) {
            Alert.alert("Erro", "As senhas não conferem.");
            return;
        }
        setLoading(true);
        firebase.auth().createUserWithEmailAndPassword(mail, pass)
            .then(userCredential => {
                console.log('Usuário criado com sucesso:', userCredential.user.email);
                userCredential.user.updateProfile({
                    displayName: nome
                }).then(() => {
                    console.log('Nome do usuário salvo com sucesso.');
                    navigation.navigate("Principal");
                }).catch(error => {
                    console.error("Erro ao salvar o nome do usuário: ", error);
                    navigation.navigate("Principal");
                });
            })
            .catch(error => {
                console.log('Erro ao criar usuário:', error.code);
                const errorMessage = getMessageByErrorCode(error.code);
                Alert.alert('Erro no Cadastro', errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const getMessageByErrorCode = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'Este e-mail já está em uso por outra conta.';
            case 'auth/invalid-email':
                return 'O formato do e-mail é inválido.';
            case 'auth/weak-password':
                return 'A senha é muito fraca. Tente uma com pelo menos 6 caracteres.';
            default:
                return 'Ocorreu um erro inesperado. Tente novamente.';
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            
            <View style={styles.header}>
                <Text style={styles.title}>Crie sua Conta</Text>
                <Text style={styles.subtitle}>É rápido e fácil</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu nome"
                        placeholderTextColor="#999"
                        value={nome}
                        onChangeText={setNome}
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="seu@email.com"
                        placeholderTextColor="#999"
                        value={mail}
                        onChangeText={setMail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mínimo 6 caracteres"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={pass}
                        onChangeText={setPass}
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirmar Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a senha novamente"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={confirmPass}
                        onChangeText={setConfirmPass}
                        editable={!isLoading}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary, isLoading && styles.buttonDisabled]}
                    onPress={() => navigation.goBack()} 
                    disabled={isLoading}
                >
                    <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Já tenho uma conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 30,
        paddingBottom: 40,
        backgroundColor: '#6c5ce7',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    form: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 30, 
    },
    inputContainer: {
        marginBottom: 15, 
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    button: {
        backgroundColor: '#6c5ce7',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        marginTop: 15,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#6c5ce7', 
        fontWeight: '600'
    }
});