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
  StatusBar,
} from 'react-native';
import firebase from '../databases/Firebase';

export default function LoginScreen({ navigation }) {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getMessageByErrorCode = (errorCode) => {
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/user-not-found':
        return 'Este e-mail não está cadastrado.';
      case 'auth/invalid-email':
        return 'O formato do e-mail é inválido.';
      case 'auth/weak-password':
        return 'A senha precisa ter no mínimo 6 caracteres.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso por outra conta.';
      default:
        return 'Ocorreu um erro. Tente novamente.';
    }
  };

  const tryLogin = () => {
    console.log('Tentando fazer o login...');

    if (!mail || !pass) {
      Alert.alert('Atenção', 'Por favor, preencha e-mail e senha.');
      return;
    }

    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then((userCredential) => {
        console.log('Usuário autenticado:', userCredential.user.email);
        navigation.navigate('Principal');
      })
      .catch((error) => {
        console.log('Erro na autenticação:', error.code);
        const errorMessage = getMessageByErrorCode(error.code);

        if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Usuário não encontrado',
            'Deseja cadastrar um novo usuário com este e-mail e senha?',
            [
              {
                text: 'Sim, cadastrar',
                onPress: () => {
                  setLoading(true);
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(mail, pass)
                    .then((userCredential) => {
                      console.log(
                        'Usuário cadastrado com sucesso:',
                        userCredential.user.email
                      );
                      navigation.navigate('Principal');
                    })
                    .catch((creationError) => {
                      console.log('Erro ao cadastrar:', creationError.code);
                      const creationErrorMessage = getMessageByErrorCode(
                        creationError.code
                      );
                      Alert.alert('Erro no Cadastro', creationErrorMessage);
                    })
                    .finally(() => setLoading(false));
                },
              },
              {
                text: 'Não',
                onPress: () =>
                  console.log('Usuário não quis criar conta.'),
                style: 'cancel',
              },
            ]
          );
        } else {
          Alert.alert('Erro no Login', errorMessage);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            onChangeText={setMail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
            onChangeText={setPass}
            editable={!isLoading}
          />
        </View>

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

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonSecondary,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={() => navigation.navigate('Cadastro')}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Cadastrar-se
          </Text>
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

  buttonSecondary: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#6c5ce7',
    elevation: 0,
    shadowOpacity: 0,
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
  },
});