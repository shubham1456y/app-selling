import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_PRODUCT } from '../constants/data';
import { Button } from '../components/Button';
import { X, Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LiveScreen({ route, navigation }) {
    const { seller } = route.params;
    const [messages, setMessages] = useState([
        { id: 1, user: 'alex_99', text: 'How is the sizing?' },
        { id: 2, user: 'sarah_k', text: 'Cop or drop? 🔥' },
        { id: 3, user: 'mike_t', text: 'Shipping to CA?' },
    ]);

    return (
        <View style={styles.container}>
            {/* Background Video Placeholder */}
            <Image source={{ uri: seller.image }} style={styles.videoPlaceholder} resizeMode="cover" />
            <View style={styles.overlay} />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.sellerInfo}>
                        <Image source={{ uri: seller.image }} style={styles.avatar} />
                        <View>
                            <Text style={styles.sellerName}>{seller.name}</Text>
                            <View style={styles.liveTag}>
                                <Text style={styles.liveText}>LIVE</Text>
                                <Text style={styles.viewers}>{seller.viewers}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                        <X color="#FFF" size={24} />
                    </TouchableOpacity>
                </View>

                {/* Floating Interactions */}
                <View style={styles.contentContainer}>

                    {/* Messages Area (Simplified) */}
                    <View style={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <View key={msg.id} style={styles.messageRow}>
                                <Text style={styles.messageUser}>{msg.user}</Text>
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Product Card */}
                    <View style={styles.productCard}>
                        <Image source={{ uri: MOCK_PRODUCT.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName} numberOfLines={1}>{MOCK_PRODUCT.name}</Text>
                            <Text style={styles.productPrice}>${MOCK_PRODUCT.price}</Text>
                            <Text style={styles.productStock}>Only {MOCK_PRODUCT.stock} left!</Text>
                        </View>
                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={styles.buyButtonText}>BUY</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Actions */}
                    <View style={styles.actionsBar}>
                        <InputPlaceholder />
                        <View style={styles.actionButtons}>
                            <ActionButton icon={Heart} />
                            <ActionButton icon={Share2} />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
}

const ActionButton = ({ icon: Icon }) => (
    <TouchableOpacity style={styles.iconButton}>
        <Icon color="#FFF" size={24} />
    </TouchableOpacity>
);

const InputPlaceholder = () => (
    <View style={styles.inputContainer}>
        <Text style={{ color: 'rgba(255,255,255,0.7)' }}>Say something...</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoPlaceholder: {
        position: 'absolute',
        width: width,
        height: height,
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.accent,
    },
    sellerName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    liveTag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        color: '#FFF',
        backgroundColor: COLORS.accent,
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 4,
        borderRadius: 4,
        marginRight: 4,
    },
    viewers: {
        color: '#FFF',
        fontSize: 12,
    },
    closeButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    contentContainer: {
        padding: 16,
        justifyContent: 'flex-end',
    },
    messagesContainer: {
        height: 150,
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 12,
    },
    messageUser: {
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 'bold',
        marginRight: 6,
    },
    messageText: {
        color: '#FFF',
    },
    productCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    productImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    productInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    productPrice: {
        color: '#000',
        fontSize: 14,
    },
    productStock: {
        color: COLORS.accent,
        fontSize: 12,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: COLORS.accent,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buyButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    actionsBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        marginLeft: 12,
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
