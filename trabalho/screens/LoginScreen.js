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
import firebase from '../databases/Firebase';

export default function LoginScreen({ navigation }) {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const tryLogin = (() => {
        console.log("tentando fazer o login");
        
        setMessage('');
        setLoading(true);

        firebase.auth().signInWithEmailAndPassword(mail, pass)
        .then(user => {
            console.log('Usuário autenticado', user)
            setMessage('Sucesso')
            navigation.navigate("SecondScreen");
        })
        .catch(error => {
            console.log('Usuário não autenticado', error)
            setMessage(getMessageByErrorCode(error))

            if (error.code === 'auth/user-not-found') {
                Alert.alert('Não cadastrado',
                'Deseja cadastrar um novo usuário?', 
                [
                 {
                   text: 'Sim',
                   onPress: () => {
                     firebase.auth().createUserWithEmailAndPassword(mail, pass)
                     .then(user => {
                        console.log('Usuário autenticado', user)
                        setMessage('Sucesso')
                        navigation.navigate("SecondScreen");
                     })
                     .catch(error => {
                        console.log('Não foi possível cadastrar o usuário', error)
                        setMessage(getMessageByErrorCode(error))
                     })
                   }
                 }, 
                 {
                  text: 'Não',
                  onPress: () => {console.log('Usuário não quer criar conta')}
                }])
            }
        })
        .then(() => setLoading(false))
    })        

    const getMessageByErrorCode = ((errorCode) => {
        switch(errorCode) {
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/invalid-email':
                return 'E-mail inválido';
            case 'auth/weak-password':
                return 'Senha muito fraca (mínimo 6 caracteres)';
            default:
                return 'Erro na autenticação';
        }
    })

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            
            <View style={styles.header}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="seu@email.com"
                        placeholderTextColor="#999"
                        value={mail}
                        onChangeText={(texto) => setMail(texto)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={pass}
                        onChangeText={(texto) => setPass(texto)}
                        editable={!isLoading}
                    />
                </View>

                {message ? (
                    <View style={[
                        styles.messageContainer,
                        message === 'Sucesso' ? styles.successMessage : styles.errorMessage
                    ]}>
                        <Text style={styles.messageText}>{message}</Text>
                    </View>
                ) : null}

                <TouchableOpacity 
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={tryLogin}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
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
        paddingTop: 40,
    },
    inputContainer: {
        marginBottom: 20,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        backgroundColor: '#6c5ce7',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#6c5ce7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    messageContainer: {
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    successMessage: {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        borderWidth: 1,
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 1,
    },
    messageText: {
        color: '#333',
        fontSize: 14,
        textAlign: 'center',
    },
});