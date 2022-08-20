import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Button, Icon} from '@components';
import styles from './styles';
import Modal from 'react-native-modal';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function FormOption(props) {
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [option, setOption] = useState(
    props.option.map(item => {
      return {
        ...item,
        checked: item.value === props.value,
      };
    }),
  );
  const [value, setValue] = useState(props.value);
  const {colors} = useTheme();
  const {style, label, onCancel, onChange} = props;

  const openModal = () => {
    setModalVisible(true);
    setOption(
      option.map(item => {
        return {
          ...item,
          checked: item.value === value,
        };
      }),
    );
  };

  const onSelect = select => {
    setOption(
      option.map(item => {
        return {
          ...item,
          checked: item.value === select.value,
        };
      }),
    );
  };

  const onApply = () => {
    const selected = option.filter(item => item.checked);
    if (selected.length > 0) {
      setValue(selected[0].value);
      setModalVisible(false);
      onChange(selected[0].value);
    }
  };

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setOption(props.option);
          onCancel();
        }}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          {option.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.contentActionModalBottom,
                {borderBottomColor: colors.border},
              ]}
              key={item.value}
              onPress={() => onSelect(item)}>
              <Text body2 semibold primaryColor={item.checked}>
                {item.text}
              </Text>
              {item.checked && (
                <Icon name="check" size={14} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          <Button
            full
            style={{marginTop: 10, marginBottom: 20}}
            onPress={() => onApply()}>
            {t('apply')}
          </Button>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.contentForm, {backgroundColor: colors.card}, style]}
        onPress={() => openModal()}>
        <Text caption2 light style={{marginBottom: 5}}>
          {label}
        </Text>
        <Text body1 semibold>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

FormOption.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.array,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

FormOption.defaultProps = {
  style: {},
  label: 'Seat Class',
  value: 'Economy',
  option: [
    {
      value: 'Economy',
      text: 'Economy Class',
    },
    {
      value: 'Business',
      text: 'Business Class',
    },
    {
      value: 'First',
      text: 'First Class',
    },
    {
      value: 'Normal',
      text: 'Normal Class',
    },
  ],
  onCancel: () => {},
  onChange: () => {},
};
