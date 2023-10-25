import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, View, Text, Pressable, ViewStyle, TextStyle} from 'react-native';

export function LanguagePicker() {
  const [modalVisible, setModalVisible] = useState(false);
  const {i18n} = useTranslation(); //i18n instance

  //array with all supported languages
  const languages = [
    {name: 'en', label: 'English'},
    {name: 'vn', label: 'VietNam'},
  ];

  const LanguageItem = ({name, label}: {name: string; label: string}) => (
    <Pressable
      style={BUTTON}
      onPress={() => {
        i18n.changeLanguage(name); //changes the app language
        setModalVisible(!modalVisible);
      }}>
      <Text>{label}</Text>
    </Pressable>
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            {languages.map(lang => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </View>
      </Modal>
      <Pressable style={[BUTTON, BUTTON]} onPress={() => setModalVisible(true)}>
        <Text style={TEXT}>{i18n.language}</Text>
      </Pressable>
    </View>
  );
}

const BUTTON: ViewStyle = {
  backgroundColor: 'red',
  width: 100,
  height: 100,
};
const TEXT: TextStyle = {
  fontSize: 16,
};
