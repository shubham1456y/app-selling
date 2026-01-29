import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const Input = ({ label, placeholder, value, onChangeText, keyboardType, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={COLORS.textSecondary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: COLORS.text,
        backgroundColor: COLORS.background,
    },
});
