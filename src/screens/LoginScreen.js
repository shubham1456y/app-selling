import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    const handleSendOtp = () => {
        if (phone.length < 10) return; // Simple validation
        setShowOtp(true);
    };

    const handleLogin = () => {
        // Mock login
        navigation.replace('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Watch live, buy instantly.</Text>
                </View>

                <View style={styles.form}>
                    {!showOtp ? (
                        <>
                            <Input
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                            <Button title="Send OTP" onPress={handleSendOtp} />
                        </>
                    ) : (
                        <>
                            <Input
                                label="Enter OTP"
                                placeholder="1234"
                                keyboardType="number-pad"
                                value={otp}
                                onChangeText={setOtp}
                            />
                            <Button title="Verify & Login" onPress={handleLogin} />
                        </>
                    )}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: COLORS.accent, fontWeight: 'bold', fontSize: 14 }}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    form: {
        width: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
});
