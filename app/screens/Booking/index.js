import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, BookingHistory} from '@components';
import {BookingHistoryData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <BookingHistory
        name={item.name}
        checkIn={item.checkIn}
        checkOut={item.checkOut}
        total={item.total}
        price={item.price}
        style={{paddingVertical: 10, marginHorizontal: 20}}
        onPress={() => {
          navigation.navigate('BookingDetail');
        }}
      />
    );
  };

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  return (
    <View style={{flex: 1}}>
      <Header title={t('booking_history')} />
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
          data={bookingHistory}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
