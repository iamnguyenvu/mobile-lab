import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

interface ParkingSpotProps {
  spotNumber: number;
  isOccupied: boolean;
  isSelected: boolean;
  onPress: (spotNumber: number) => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ 
  spotNumber, 
  isOccupied, 
  isSelected, 
  onPress 
}) => {
  const handlePress = () => {
    if (isOccupied) {
      Alert.alert('Thông báo', `Chỗ ${spotNumber} đã bị đặt`);
      return;
    }
    onPress(spotNumber);
  };

  const getSpotColor = () => {
    if (isOccupied) return '#ff4444'; // Màu đỏ - đã đặt
    if (isSelected) return '#ffaa00'; // Màu cam - đang chọn
    return '#44ff44'; // Màu xanh - trống
  };

  return (
    <TouchableOpacity 
      style={[styles.spot, { backgroundColor: getSpotColor() }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.spotNumber}>{spotNumber}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  spot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  spotNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ParkingSpot;