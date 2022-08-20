import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {useTheme, BaseSetting} from '@config';
import SplashScreen from 'react-native-splash-screen';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

/* Main Stack Navigator */
import Main from 'app/navigation/main';
/* Modal Screen only affect iOS */
import Loading from '@screens/Loading';
import Filter from '@screens/Filter';
import FlightFilter from '@screens/FlightFilter';
import BusFilter from '@screens/BusFilter';
import Search from '@screens/Search';
import SearchHistory from '@screens/SearchHistory';
import PreviewImage from '@screens/PreviewImage';
import SelectBus from '@screens/SelectBus';
import SelectCruise from '@screens/SelectCruise';
import CruiseFilter from '@screens/CruiseFilter';
import EventFilter from '@screens/EventFilter';
import SelectDarkOption from '@screens/SelectDarkOption';
import SelectFontOption from '@screens/SelectFontOption';

const RootStack = createStackNavigator();

export default function Navigator() {
  const language = useSelector(state => state.application.language);
  const {theme, colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [colors.primary, isDarkMode]);

  const forFade = ({current, closing}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Loading">
          <RootStack.Screen
            name="Loading"
            component={Loading}
            options={{gestureEnabled: false}}
          />
          <RootStack.Screen name="Main" component={Main} />
          <RootStack.Screen name="Filter" component={Filter} />
          <RootStack.Screen name="FlightFilter" component={FlightFilter} />
          <RootStack.Screen name="BusFilter" component={BusFilter} />
          <RootStack.Screen name="Search" component={Search} />
          <RootStack.Screen name="SearchHistory" component={SearchHistory} />
          <RootStack.Screen name="PreviewImage" component={PreviewImage} />
          <RootStack.Screen name="SelectBus" component={SelectBus} />
          <RootStack.Screen name="SelectCruise" component={SelectCruise} />
          <RootStack.Screen name="CruiseFilter" component={CruiseFilter} />
          <RootStack.Screen name="EventFilter" component={EventFilter} />
          <RootStack.Screen
            name="SelectDarkOption"
            component={SelectDarkOption}
            options={{
              presentation: 'transparentModal',
              cardStyleInterpolator: forFade,
              cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
              gestureEnabled: false,
            }}
          />
          <RootStack.Screen
            name="SelectFontOption"
            component={SelectFontOption}
            options={{
              presentation: 'transparentModal',
              cardStyleInterpolator: forFade,
              cardStyle: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
