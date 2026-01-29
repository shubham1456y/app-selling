import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, ScrollView, TouchableOpacity, TextInput, Animated } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { MOCK_SELLERS } from '../constants/data';
import { LiveCard } from '../components/LiveCard';
import { Search, Bell, MessageSquare } from 'lucide-react-native';

const CATEGORIES = [
    'All', 'Sneakers', 'Vintage', 'Tech', 'Cards', 'Toys', 'Fashion', 'Home'
];

export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const renderItem = ({ item }) => (
        <LiveCard
            seller={item}
            onPress={() => navigation.navigate('LiveStream', { seller: item })}
            style={styles.cardStyle}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Premium Header */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Search color={PREMIUM_COLORS.neutral.textSecondary} size={20} />
                    <TextInput
                        placeholder="Search live streams..."
                        placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                        style={styles.searchInput}
                    />
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Bell color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Inbox')}
                    >
                        <MessageSquare color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Premium Categories */}
            <View style={styles.categoriesSection}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categories}
                    style={{ flexGrow: 0 }}
                >
                    {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    isActive && styles.activeCategoryPill
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    isActive && styles.activeCategoryText
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Premium Grid */}
            <FlatList
                data={MOCK_SELLERS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        borderBottomWidth: 0, // Remove heavy border
        ...LAYOUT.shadow.xs, // Add subtle shadow instead
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        paddingHorizontal: LAYOUT.spacing.md,
        height: 44,
        marginRight: LAYOUT.spacing.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: LAYOUT.spacing.sm,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.regular,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.md,
    },
    iconButton: {
        position: 'relative',
        padding: LAYOUT.spacing.xs,
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        borderWidth: 2,
        borderColor: PREMIUM_COLORS.neutral.background,
    },
    categoriesSection: {
        position: 'absolute',
        top: 72, // Below header
        left: 0,
        right: 0,
        zIndex: 90,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        paddingBottom: LAYOUT.spacing.xs,
    },
    categories: {
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.sm,
        gap: LAYOUT.spacing.sm,
    },
    categoryPill: {
        paddingHorizontal: LAYOUT.spacing.lg,
        paddingVertical: LAYOUT.spacing.sm + 2,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.border,
        ...LAYOUT.shadow.xs,
    },
    activeCategoryPill: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        borderColor: PREMIUM_COLORS.primary.main,
        ...LAYOUT.shadow.sm,
    },
    categoryText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize + 2,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        letterSpacing: 0.3,
    },
    activeCategoryText: {
        color: PREMIUM_COLORS.neutral.surface,
    },
    list: {
        padding: LAYOUT.spacing.md,
        paddingTop: 136, // Header + Categories
        paddingBottom: 90, // Bottom tab bar clearance
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: LAYOUT.spacing.md,
    },
    cardStyle: {
        width: '48%',
        marginBottom: LAYOUT.spacing.lg, // Generous spacing
    },
});
