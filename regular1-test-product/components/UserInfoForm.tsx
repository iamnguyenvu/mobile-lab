import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface UserInfoFormProps {
  name: string;
  studentId: string;
  className: string;
  onNameChange: (text: string) => void;
  onStudentIdChange: (text: string) => void;
  onClassNameChange: (text: string) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  name,
  studentId,
  className,
  onNameChange,
  onStudentIdChange,
  onClassNameChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChangeText={onNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã số sinh viên"
        value={studentId}
        onChangeText={onStudentIdChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Lớp"
        value={className}
        onChangeText={onClassNameChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default UserInfoForm;