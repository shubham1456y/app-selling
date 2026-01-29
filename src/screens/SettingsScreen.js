import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { user, Bell, Shield, FileText, ChevronRight, ArrowLeft, User, MapPin, Mail, Phone, Edit2, Save } from 'lucide-react-native';

export default function SettingsScreen({ navigation }) {
    const [viewState, setViewState] = useState('MENU'); // MENU, PROFILE
    const [isEditing, setIsEditing] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        name: 'John Doe',
        phone: '+1 234 567 8900',
        email: 'john@example.com',
        address: '123 Main St, New York, NY'
    });

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const renderMenu = () => {
        const settingsOptions = [
            { id: 1, title: 'Edit Profile', icon: User, action: () => setViewState('PROFILE') },
            { id: 2, title: 'Notifications', icon: Bell, action: () => { } },
            { id: 3, title: 'Privacy Policy', icon: Shield, action: () => { } },
            { id: 4, title: 'Terms of Service', icon: FileText, action: () => { } },
        ];

        return (
            <ScrollView style={styles.scrollContent}>
                <View style={styles.section}>
                    {settingsOptions.map((opt) => (
                        <TouchableOpacity key={opt.id} style={styles.optionRow} onPress={opt.action}>
                            <View style={styles.optionLeft}>
                                <opt.icon size={20} color={COLORS.text} />
                                <Text style={styles.optionText}>{opt.title}</Text>
                            </View>
                            <ChevronRight size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    title="Logout"
                    onPress={() => navigation.replace('Login')}
                    variant="secondary"
                    style={{ marginTop: 20, borderColor: COLORS.accent }}
                />
            </ScrollView>
        );
    };

    const renderProfile = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                <ProfileField
                    icon={User}
                    label="Full Name"
                    value={profile.name}
                    editable={isEditing}
                    onChange={(t) => handleChange('name', t)}
                />
                <ProfileField
                    icon={Phone}
                    label="Phone"
                    value={profile.phone}
                    editable={isEditing}
                    onChange={(t) => handleChange('phone', t)}
                />
                <ProfileField
                    icon={Mail}
                    label="Email"
                    value={profile.email}
                    editable={isEditing}
                    onChange={(t) => handleChange('email', t)}
                />
                <ProfileField
                    icon={MapPin}
                    label="Default Address"
                    value={profile.address}
                    editable={isEditing}
                    onChange={(t) => handleChange('address', t)}
                />
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {viewState === 'PROFILE' ? (
                    <TouchableOpacity onPress={() => setViewState('MENU')} style={styles.backBtn}>
                        <ArrowLeft color={COLORS.text} size={24} />
                    </TouchableOpacity>
                ) : <View style={{ width: 24 }} />}

                <Text style={styles.headerTitle}>
                    {viewState === 'MENU' ? 'Settings' : 'My Profile'}
                </Text>

                {viewState === 'PROFILE' ? (
                    <TouchableOpacity onPress={toggleEdit}>
                        {isEditing ? <Save color={COLORS.accent} size={24} /> : <Edit2 color={COLORS.text} size={24} />}
                    </TouchableOpacity>
                ) : <View style={{ width: 24 }} />}
            </View>

            {viewState === 'MENU' ? renderMenu() : renderProfile()}
        </SafeAreaView>
    );
}

const ProfileField = ({ icon: Icon, label, value, editable, onChange }) => (
    <View style={styles.fieldContainer}>
        <View style={styles.fieldHeader}>
            <Icon size={16} color={COLORS.textSecondary} />
            <Text style={styles.fieldLabel}>{label}</Text>
        </View>
        {editable ? (
            <Input
                value={value}
                onChangeText={onChange}
                placeholder={label}
                style={{ marginTop: 8 }}
            />
        ) : (
            <Text style={styles.fieldValue}>{value}</Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
    scrollContent: { padding: 16 },
    card: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 16 },

    // Menu Styles
    section: { backgroundColor: COLORS.surface, borderRadius: 12, overflow: 'hidden', marginBottom: 24 },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border
    },
    optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    optionText: { fontSize: 16, color: COLORS.text },

    // Field Styles
    fieldContainer: { marginBottom: 20 },
    fieldHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    fieldLabel: { color: COLORS.textSecondary, fontSize: 14 },
    fieldValue: { fontSize: 16, color: COLORS.text, fontWeight: '500', marginTop: 4 },
});
