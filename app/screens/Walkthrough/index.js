import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, Text, Button, Image} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';

export default function Walkthrough({navigation}) {
  const [loading, setLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [slide] = useState([
    {key: 1, image: Images.trip2},
    {key: 2, image: Images.trip1},
    {key: 3, image: Images.trip3},
    {key: 4, image: Images.trip4},
  ]);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const authentication = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(true, response => {}));
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'left', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.contain}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }>
        <View style={styles.wrapper}>
          {/* Images Swiper */}
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.dividerColor,
            }}
            activeDotColor={colors.primary}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}>
            {slide.map((item, index) => {
              return (
                <View style={styles.slide} key={item.key}>
                  <Image source={item.image} style={styles.img} />
                  <Text body1 style={styles.textSlide}>
                    {t('pick_your_destication')}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={{width: '100%'}}>
          <Button
            full
            style={{
              backgroundColor: BaseColor.navyBlue,
              marginTop: 20,
            }}
            onPress={() => {
              authentication();
            }}>
            {t('login_facebook')}
          </Button>
          <Button
            full
            style={{marginTop: 20}}
            loading={loading}
            onPress={() => navigation.navigate('SignIn')}>
            {t('sign_in')}
          </Button>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text body1 grayColor>
                {t('not_have_account')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => authentication()}>
              <Text body1 primaryColor>
                {t('join_now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
