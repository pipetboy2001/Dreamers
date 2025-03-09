import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface AddDreamModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dream: { title: string, description: string, emotion: string, date: Date }) => void;
}

const AddDreamModal: React.FC<AddDreamModalProps> = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emotion, setEmotion] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (title.trim() && description.trim() && emotion.trim()) {
      onSave({ title, description, emotion, date });
      setTitle('');
      setDescription('');
      setEmotion('');
      setDate(new Date());
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate || date);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Añadir un Sueño</Text>

          {/* Título */}
          <TextInput
            style={styles.input}
            placeholder="Título del sueño"
            value={title}
            onChangeText={setTitle}
          />

          {/* Sueño */}
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Escribe tu sueño aquí"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Emoción asociada */}
          <TextInput
            style={styles.input}
            placeholder="Emoción asociada"
            value={emotion}
            onChangeText={setEmotion}
          />

          {/* Fecha */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateText}>
                {date.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.buttonsContainer}>
            <Button title="Cancelar" onPress={onClose} color="#D9534F" />
            <Button title="Guardar" onPress={handleSave} color="#5bc0de" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddDreamModal;
