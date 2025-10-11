import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserInfoForm from './UserInfoForm';
import ParkingGrid from './ParkingGrid';

const ParkingManager: React.FC = () => {
  // Quản lý thông tin người dùng
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [className, setClassName] = useState('');
  
  // Quản lý chỗ đậu xe được chọn
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  const handleSpotPress = (spotNumber: number) => {
    setSelectedSpot(selectedSpot === spotNumber ? null : spotNumber);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Đặt bàn tại nhà hàng</Text>
      
      <UserInfoForm
        name={name}
        studentId={studentId}
        className={className}
        onNameChange={setName}
        onStudentIdChange={setStudentId}
        onClassNameChange={setClassName}
      />
      
      <Text style={styles.subtitle}>Chọn chỗ đậu xe:</Text>
      
      <ParkingGrid
        selectedSpot={selectedSpot}
        onSpotPress={handleSpotPress}
      />
      
      {selectedSpot && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            {name ? `${name} ` : 'Bạn '}đã chọn chỗ số {selectedSpot}
          </Text>
          {studentId && (
            <Text style={styles.infoSubText}>
              MSSV: {studentId} - Lớp: {className}
            </Text>
          )}
        </View>
      )}
      
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Chú thích:</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#44ff44' }]} />
          <Text>Chỗ trống</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ffaa00' }]} />
          <Text>Đang chọn</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ff4444' }]} />
          <Text>Đã đặt</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  infoSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  legend: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ParkingManager;