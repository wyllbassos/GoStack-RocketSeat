import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  SelectedDate,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const AppointmentDatePicker: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    return today;
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>(
    params.providerId,
  );
  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [selectedHour, setSelectedHour] = useState(0);

  const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        setSelectedHour(0);
      });
  }, [selectedProvider, selectedDate]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      // const date = new Date(year, month, day, selectedHour, 0, 0, 0);

      const date = `${year}-${month}-${day} ${selectedHour}:00:00`;

      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigation.navigate('AppointmentCreated', { date });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente!',
      );
    }
  }, [selectedProvider, selectedDate, selectedHour, navigation]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(status => !status);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabelereiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Container>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <SelectedDate>
            <Title>{format(selectedDate, 'dd/MM/yyyy')}</Title>
            <OpenDatePickerButton onPress={handleOpenDatePicker}>
              <OpenDatePickerButtonText>
                Selecionar Outra Data
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>
          </SelectedDate>

          {showDatePicker && (
            <DateTimePicker
              {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })} // < nessa linha
              mode="date"
              onChange={handleDateChanged}
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              value={selectedDate}
              minimumDate={minimumDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  available={available}
                  selected={hour === selectedHour}
                  onPress={() => setSelectedHour(hour)}
                  key={hourFormatted}
                >
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    available={available}
                    selected={hour === selectedHour}
                    onPress={() => setSelectedHour(hour)}
                    key={hourFormatted}
                  >
                    <HourText selected={hour === selectedHour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Container>
    </>
  );
};

export default AppointmentDatePicker;
