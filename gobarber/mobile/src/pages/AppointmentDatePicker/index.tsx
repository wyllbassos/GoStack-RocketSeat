import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { format } from 'date-fns';

import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
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
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>(
    params.providerId,
  );
  const [selectedDate, setSelectedDate] = useState(minimumDate);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleOpenDatePicker = useCallback(() => {
    setShowDatePicker(status => !status);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
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

  const formatedDate = useMemo(() => {
    const day = selectedDate.getDate();
    const month = selectedDate.getDate();
    const year = selectedDate.getDate();
  }, [selectedDate]);

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
      </Container>
    </>
  );
};

export default AppointmentDatePicker;
