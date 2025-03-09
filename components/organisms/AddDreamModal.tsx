import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface AddDreamModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dream: { title: string, description: string, emotions: string[], date: Date }) => void;
}

const AddDreamModal: React.FC<AddDreamModalProps> = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Array of emotion objects that can be toggled
  const [emotions, setEmotions] = useState([
    { id: 1, label: '😊 Felicidad', selected: false },
    { id: 2, label: '😢 Tristeza', selected: false },
    { id: 3, label: '😨 Miedo', selected: false },
    { id: 4, label: '😡 Enojo', selected: false },
    { id: 5, label: '😲 Sorpresa', selected: false },
    { id: 6, label: '😌 Calma', selected: false },
    { id: 7, label: '🤔 Confusión', selected: false },
    { id: 8, label: '😳 Vergüenza', selected: false },
    { id: 9, label: '🌟 Místico', selected: false },
    { id: 10, label: '👾 Extraño', selected: false },
  ]);

  // Function to toggle emotion selection
  const toggleEmotion = (id: number) => {
    setEmotions(emotions.map(emotion => 
      emotion.id === id ? { ...emotion, selected: !emotion.selected } : emotion
    ));
  };

  // Simple calendar selection without DatePicker
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and total days in month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty slots for days before first of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleSave = () => {
    if (title.trim() && description.trim()) {
      const selectedEmotions = emotions
        .filter(emotion => emotion.selected)
        .map(emotion => emotion.label);
  
      // Pasar los datos al componente padre
      onSave({
        title,
        description,
        emotions: selectedEmotions,
        date,
      });
  
      // Resetear el formulario
      setTitle('');
      setDescription('');
      setEmotions(emotions.map(emotion => ({ ...emotion, selected: false })));
      setDate(new Date());
    }
  };
  

  const selectDate = (day: number) => {
    if (day) {
      const newDate = new Date();
      newDate.setDate(day);
      setDate(newDate);
      setShowCalendar(false);
    }
  };

  // Format date to display in Spanish
  const formatDate = (date: Date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
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
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>✨ Registrar un Sueño</Text>

            {/* Título */}
            <Text style={styles.label}>Título del sueño</Text>
            <TextInput
              style={styles.input}
              placeholder="¿Cómo llamarías a este sueño?"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={title}
              onChangeText={setTitle}
            />

            {/* Fecha */}
            <Text style={styles.label}>Fecha del sueño</Text>
            <TouchableOpacity 
              style={styles.datePickerContainer}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <Text style={styles.dateText}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>

            {showCalendar && (
              <View style={styles.calendarContainer}>
                <View style={styles.weekdaysRow}>
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                    <Text key={index} style={styles.weekdayText}>{day}</Text>
                  ))}
                </View>
                <View style={styles.daysContainer}>
                  {generateCalendarDays().map((day, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={[
                        styles.dayButton,
                        day === date.getDate() && styles.selectedDay,
                        !day && styles.emptyDay
                      ]}
                      onPress={() => day && selectDate(day)}
                      disabled={!day}
                    >
                      {day && <Text style={[
                        styles.dayText,
                        day === date.getDate() && styles.selectedDayText
                      ]}>{day}</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Descripción */}
            <Text style={styles.label}>Descripción del sueño</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Describe todo lo que recuerdes..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Emociones */}
            <Text style={styles.label}>Emociones experimentadas</Text>
            <View style={styles.emotionsContainer}>
              {emotions.map(emotion => (
                <TouchableOpacity
                  key={emotion.id}
                  style={[
                    styles.emotionChip,
                    emotion.selected && styles.emotionChipSelected
                  ]}
                  onPress={() => toggleEmotion(emotion.id)}
                >
                  <Text style={[
                    styles.emotionText,
                    emotion.selected && styles.emotionTextSelected
                  ]}>
                    {emotion.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 20,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    color: '#e2e2e2',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#a9c2cb',
    fontWeight: '500',
  },
  input: {
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  datePickerContainer: {
    padding: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#ffffff',
  },
  calendarContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    color: '#a9c2cb',
    fontSize: 14,
    width: 25,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayButton: {
    width: '14.28%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayText: {
    color: '#ffffff',
  },
  selectedDay: {
    backgroundColor: '#5c6bc0',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  emotionChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    margin: 5,
  },
  emotionChipSelected: {
    backgroundColor: 'rgba(92, 107, 192, 0.2)',
    borderColor: '#5c6bc0',
  },
  emotionText: {
    color: '#fff',
    fontSize: 14,
  },
  emotionTextSelected: {
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  saveButton: {
    backgroundColor: '#5c6bc0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddDreamModal;