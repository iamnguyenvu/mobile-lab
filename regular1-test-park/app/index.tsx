import {useMemo, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";
import UserForm from "@/components/UserForm";
import SpotGrid from "@/components/SpotGrid";

export default function Index() {
    const [name, setName] = useState(""),
        [stuId, setStuId] = useState(""),
        [klass, setKlass] = useState("");
    const locked = useMemo(() => new Set<number>([13, 15]), []);
    const [booked, setBooked] = useState<Set<number>>(new Set([13, 15]));
    const [msg, setMsg] = useState("");

    const onToggle = (n: number) => {
        if (locked.has(n)) return setMsg(`Chỗ ${n} đã bị đặt.`);
        setBooked(prev => {
            const next = new Set(prev);
            const was = next.has(n);
            was ? next.delete(n) : next.add(n);
            setMsg(`Bạn ${was ? "bỏ chọn" : "đã chọn"} chỗ ${n}.`);
            return next;
        });
    };

    const selected = useMemo(() => Array.from(booked)
        .filter(n => !locked.has(n)).sort((a, b) => a - b), [booked, locked]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#f4f4f5"}}>
            <UserForm name={name} id={stuId} klass={klass}
                      onChangeName={setName} onChangeId={setStuId} onChangeKlass={setKlass}/>
            <SpotGrid booked={booked} locked={locked} onToggle={onToggle}/>
            <View style={{padding: 12, margin: 8, backgroundColor: "#fff", borderRadius: 8}}>
                <Text style={{fontWeight: "700", marginBottom: 4}}>Thông tin:</Text>
                <Text>Họ tên: {name || "-"}</Text>
                <Text>MSSV: {stuId || "-"}</Text>
                <Text>Lớp: {klass || "-"}</Text>
                <Text style={{marginTop: 6}}>Đã chọn: {selected.length ? selected.join(", ") : "Chưa chọn"}</Text>
                {!!msg && <Text style={{marginTop: 6, color: "#2563eb"}}>{msg}</Text>}
            </View>
        </SafeAreaView>
    );
}
