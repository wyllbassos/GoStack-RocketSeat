import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import getValidationsErrors from '../../utils/getValidationsErrors';
import api from '../../services/api';
import Button from '../../components/Button';
import Input, { InputRef } from '../../components/Input';

import logoimg from '../../assets/logo.png';

import { Container, Title, BackToSingIn, BackToSingInText } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<InputRef>(null);
  const passwordInputRef = useRef<InputRef>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Email obrigatório')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer eu logon no GoBarber',
        );

        navigation.navigate('SignIn');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao fazer cadastro, Tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoimg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              ref={formRef}
              onSubmit={handleSignUp}
              style={{ width: '100%' }}
            >
              <Input
                autoCapitalize="words"
                autoCorrect={false}
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSingIn
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSingInText>Voltar para Logon</BackToSingInText>
      </BackToSingIn>
    </>
  );
};

export default SignUp;
