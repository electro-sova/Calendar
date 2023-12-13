import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CalendarApp = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const isCurrentMonth = currentMonth === currentDate.getMonth();
  const isCurrentYear = currentYear === currentDate.getFullYear();
  const isCurrentDay = (date) =>
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getWeekday = (year, month, day) => new Date(year, month, day).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const nextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const nextTenYears = () => {
    setCurrentYear(currentYear + 10);
  };

  const selectDate = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);
  };

  const returnToCurrentMonth = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = getWeekday(currentYear, currentMonth, 0); // тут мы указываем 1 день 
    
    const monthDays = [];

    // Пустые дни за предыдущий месяц
    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push(<Text key={`empty-${i}`} style={styles.emptyDay}></Text>);
    }

    // Дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate.getDate() === i && isCurrentMonth && isCurrentYear;

      monthDays.push(
        <TouchableOpacity key={i} onPress={() => selectDate(i)} style={[styles.day, isSelected && styles.selectedDay]}>
          <Text
            style={[
              styles.text,
              isSelected && styles.selectedText,
              isCurrentDay(new Date(currentYear, currentMonth, i)) && styles.currentDayText,
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>,
      );
    }

    return monthDays;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={prevYear}>
          <Text style={styles.arrowButton}>&lt;&lt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.arrowButton}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{`${currentMonth + 1}.${currentYear}`}</Text>

        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.arrowButton}>&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextYear}>
          <Text style={styles.arrowButton}>&gt;&gt;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        <View style={styles.weekdays}>
          <Text style={styles.weekday}>Пн</Text>
          <Text style={styles.weekday}>Вт</Text>
          <Text style={styles.weekday}>Ср</Text>
          <Text style={styles.weekday}>Чт</Text>
          <Text style={styles.weekday}>Пт</Text>
          <Text style={[styles.weekday, styles.weekendText]}>Сб</Text>
          <Text style={[styles.weekday, styles.weekendText]}>Вс</Text>
        </View>
        <View style={styles.days}>{renderCalendar()}</View>
        <TouchableOpacity onPress={nextTenYears}>
          <Text style={styles.arrowButton}>+10</Text>
        </TouchableOpacity>
        {!isCurrentMonth || !isCurrentYear ? (
          <TouchableOpacity onPress={returnToCurrentMonth}>
            <Text style={styles.returnButton}>Вернуться к текущему месяцу</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  arrowButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  monthText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  returnButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  calendar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
  weekday: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    paddingVertical: 8,
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    backgroundColor: '#FFF',
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  currentDayText: {
    color: '#FF0000',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  selectedText: {
    color: '#FFF',
  },
};

export default CalendarApp;