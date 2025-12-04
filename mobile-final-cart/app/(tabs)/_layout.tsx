import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function TabsLayout() {
  const count = useSelector((s: RootState) => s.cart.items.reduce((a, i) => a + i.quantity, 0));
  const opt = (title: string, label: string) => ({ title, tabBarIcon: () => <></>, tabBarLabel: label });

  return (
    <Tabs>
      <Tabs.Screen name="index" options={opt('Trang chủ', ' Trang chủ')} />
      <Tabs.Screen name="cart" options={opt('Giỏ hàng', ` Giỏ hàng (${count})`)} />
      <Tabs.Screen name="profile" options={opt('Sinh viên', ' Sinh viên')} />
    </Tabs>
  );
}
