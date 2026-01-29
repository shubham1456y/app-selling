import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Globe, Users } from 'lucide-react-native';

export const LiveCard = ({ seller, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: seller.image }} style={styles.image} resizeMode="cover" />
                <View style={styles.liveBadge}>
                    <Text style={styles.liveText}>LIVE</Text>
                </View>
                <View style={styles.viewerBadge}>
                    <Users size={12} color="#FFF" />
                    <Text style={styles.viewerText}>{seller.viewers}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{seller.title}</Text>
                <Text style={styles.name}>{seller.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        height: 180,
        width: '100%',
        backgroundColor: COLORS.surface,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    liveBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: COLORS.accent,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    liveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    viewerBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewerText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    info: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    name: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
});
