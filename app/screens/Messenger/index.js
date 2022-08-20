import React, {useState} from 'react';
import {RefreshControl, FlatList, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, ListThumbSquare} from '@components';
import styles from './styles';
import {MessagesData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Messenger({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);

  return (
    <View style={{flex: 1}}>
      <Header title={t('messenger')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={messenger}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <ListThumbSquare
              onPress={() => {
                navigation.navigate('Messages');
              }}
              image={item.image}
              txtLeftTitle={item.user}
              txtContent={item.message}
              txtRight={item.date}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
