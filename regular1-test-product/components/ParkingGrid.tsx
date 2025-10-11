import React from 'react';
import { View, StyleSheet } from 'react-native';
import ParkingSpot from './ParkingSpot';

interface ParkingGridProps {
  selectedSpot: number | null;
  onSpotPress: (spotNumber: number) => void;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ selectedSpot, onSpotPress }) => {
  // Chỗ 13 và 15 đã bị đặt theo yêu cầu
  const occupiedSpots = [13, 15];
  
  // Tạo 20 chỗ đậu xe
  const spots = Array.from({ length: 20 }, (_, index) => index + 1);

  const renderSpots = () => {
    const rows = [];
    for (let i = 0; i < spots.length; i += 4) {
      const row = spots.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.row}>
          {row.map((spotNumber) => (
            <ParkingSpot
              key={spotNumber}
              spotNumber={spotNumber}
              isOccupied={occupiedSpots.includes(spotNumber)}
              isSelected={selectedSpot === spotNumber}
              onPress={onSpotPress}
            />
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {renderSpots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

export default ParkingGrid;