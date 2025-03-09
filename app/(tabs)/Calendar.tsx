import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from 'react-native';
import { StarBackground } from '@/components/Atoms/StarBackground';
import { useDreams } from '@/hooks/useDreams';

const Calendar = () => {
  const { dreams } = useDreams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDayDreams, setSelectedDayDreams] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  // Obtener el número de días en el mes actual
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Obtener el día de la semana en que comienza el mes (0 = Domingo, 1 = Lunes, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Verificar si hay sueños registrados para una fecha específica
  const hasDreamsForDate = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dreams.some(dream => {
      const dreamDate = new Date(dream.date);
      return dreamDate.getDate() === dateToCheck.getDate() && 
             dreamDate.getMonth() === dateToCheck.getMonth() &&
             dreamDate.getFullYear() === dateToCheck.getFullYear();
    });
  };
  
  // Obtener sueños para una fecha específica
  const getDreamsForDate = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    return dreams.filter(dream => {
      const dreamDate = new Date(dream.date);
      return dreamDate.getDate() === dateToCheck.getDate() && 
             dreamDate.getMonth() === dateToCheck.getMonth() &&
             dreamDate.getFullYear() === dateToCheck.getFullYear();
    });
  };
  
  // Manejar la selección de una fecha
  const handleDateSelect = (day) => {
    if (day === 0) return; // Espacios vacíos
    
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
    
    const dreamsForDay = getDreamsForDate(day);
    setSelectedDayDreams(dreamsForDay);
    
    if (dreamsForDay.length > 0) {
      setModalVisible(true);
    }
  };
  
  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Navegar al mes siguiente
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Renderizar los días del calendario
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    
    const calendarDays = [];
    
    // Agregar espacios vacíos para los días anteriores al primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <TouchableOpacity key={`empty-${i}`} style={styles.dayContainer} disabled>
          <Text style={styles.emptyDay}></Text>
        </TouchableOpacity>
      );
    }
    
    // Agregar los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === new Date().getDate() && 
        currentMonth === new Date().getMonth() && 
        currentYear === new Date().getFullYear();
      
      const hasDreams = hasDreamsForDate(day);
      
      calendarDays.push(
        <TouchableOpacity 
          key={`day-${day}`} 
          style={[
            styles.dayContainer,
            isToday && styles.todayContainer
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText
          ]}>
            {day}
          </Text>
          {hasDreams && <View style={styles.dreamIndicator} />}
        </TouchableOpacity>
      );
    }
    
    return calendarDays;
  };
  
  // Renderizar modal con sueños del día seleccionado
  const renderDreamModal = () => {
    if (!selectedDate) return null;
    
    const formattedDate = selectedDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sueños del {formattedDate}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            {selectedDayDreams.length > 0 ? (
              <FlatList
                data={selectedDayDreams}
                keyExtractor={(item, index) => `dream-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.dreamItem}>
                    <Text style={styles.dreamTitle}>{item.title}</Text>
                    <Text style={styles.dreamDescription}>{item.description}</Text>
                    <View style={styles.tagContainer}>
                      {item.tags && item.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noDreamsText}>No hay sueños registrados para esta fecha.</Text>
            )}
          </View>
        </View>
      </Modal>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StarBackground />
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>◀</Text>
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          
          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>▶</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekdaysRow}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>
        
        <View style={styles.daysGrid}>
          {renderCalendarDays()}
        </View>
        
        {renderDreamModal()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    color: '#e2e2e2',
    fontSize: 20,
  },
  monthTitle: {
    color: '#e2e2e2',
    fontSize: 20,
    fontWeight: '500',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    color: '#a9c2cb',
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayContainer: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    position: 'relative',
  },
  dayText: {
    color: '#e2e2e2',
  },
  emptyDay: {
    color: 'transparent',
  },
  todayContainer: {
    backgroundColor: 'rgba(92, 107, 192, 0.3)',
    borderRadius: 25,
  },
  todayText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dreamIndicator: {
    position: 'absolute',
    bottom: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5c6bc0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#1f1f3d',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 10,
  },
  modalTitle: {
    color: '#e2e2e2',
    fontSize: 18,
    fontWeight: '500',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#e2e2e2',
    fontSize: 24,
  },
  dreamItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dreamTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  dreamDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(92, 107, 192, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#a9c2cb',
    fontSize: 12,
  },
  noDreamsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    padding: 20,
  },
});

export default Calendar;