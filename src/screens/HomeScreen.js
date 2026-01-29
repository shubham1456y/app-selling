import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_SELLERS } from '../constants/data';
import { LiveCard } from '../components/LiveCard';

export default function HomeScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <LiveCard
            seller={item}
            onPress={() => navigation.navigate('LiveStream', { seller: item })}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Live Now</Text>
            </View>
            <FlatList
                data={MOCK_SELLERS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
    },
    list: {
        padding: 16,
    },
});
