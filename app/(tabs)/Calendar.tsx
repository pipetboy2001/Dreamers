import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = new Date().getDate();

const Calendar: React.FC = () => {
    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day, index) => (
            <Text key={index} style={{ flex: 1, textAlign: 'center', padding: 5 }}>
                {day}
            </Text>
        ));
    };

    const renderDaysInMonth = () => {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <Text key={i} style={{ flex: 1, textAlign: 'center', padding: 10 }}>
                    {i}
                </Text>
            );
        }
        return days;
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {renderDaysOfWeek()}
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {renderDaysInMonth()}
            </View>
        </ScrollView>
    );
};

export default Calendar;