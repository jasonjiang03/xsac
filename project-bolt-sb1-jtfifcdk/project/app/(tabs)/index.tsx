import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu as MenuIcon, Camera, Users, Folder, Grid3x3, Clock, Plus, ChevronRight, Scan, FileImage, LayoutGrid as Layout, Globe, Settings, CircleHelp as HelpCircle, Crown, Languages } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const mockRecentScans = [
  { id: '1', name: 'Summer Dress', date: '2 hours ago', thumbnail: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Coat Pattern', date: '1 day ago', thumbnail: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Shirt Design', date: '3 days ago', thumbnail: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const mockFolders = [
  { id: '1', name: 'Dresses', count: 12, color: '#E8F5E8' },
  { id: '2', name: 'Outerwear', count: 8, color: '#E3F2FD' },
  { id: '3', name: 'Casual', count: 15, color: '#FFF3E0' },
];

const mockLayplans = [
  { id: '1', name: 'Summer Collection', efficiency: '92%', pieces: 12 },
  { id: '2', name: 'Formal Wear', efficiency: '88%', pieces: 8 },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const handleScanPress = () => {
    // Navigate to camera/scan screen
    router.push('/(tabs)/scan');
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const menuItems = [
    { icon: Languages, title: 'Language', subtitle: 'English' },
    { icon: Settings, title: 'Measurement Units', subtitle: 'Metric (cm)' },
    { icon: HelpCircle, title: 'About Us', subtitle: 'Learn more' },
    { icon: Crown, title: 'Premium', subtitle: 'Upgrade now' },
    { icon: HelpCircle, title: 'Help & Tutorial', subtitle: 'Get started' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: colors.surface }]} 
          onPress={handleMenuPress}
        >
          <MenuIcon size={20} color="#999999" strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>PatternScanner</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textTertiary }]}>Home</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.cameraButton, { backgroundColor: colors.surface }]} 
          onPress={handleScanPress}
        >
          <Camera size={20} color="#999999" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions - Swapped positions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            {/* Scan Action - Now on the left */}
            <TouchableOpacity 
              style={[styles.scanCard, { backgroundColor: '#4CAF50', shadowColor: '#4CAF50' }]}
              onPress={handleScanPress}
            >
              <View style={styles.scanIconContainer}>
                <Scan size={28} color="#FFFFFF" strokeWidth={2} />
              </View>
              <Text style={styles.scanTitle}>Scan Pattern</Text>
              <Text style={styles.scanSubtitle}>Start scanning</Text>
            </TouchableOpacity>

            {/* Community Feature - Now on the right */}
            <TouchableOpacity style={[styles.featureCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
              <View style={[styles.featureIconContainer, { backgroundColor: '#E8F5E8' }]}>
                <Users size={24} color="#4CAF50" strokeWidth={2} />
              </View>
              <Text style={[styles.featureTitle, { color: colors.text }]}>Community</Text>
              <Text style={[styles.featureSubtitle, { color: colors.textSecondary }]}>Coming Soon</Text>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>NEW</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Scans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Scans</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {mockRecentScans.map((scan) => (
              <TouchableOpacity key={scan.id} style={[styles.scanItem, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <Image source={{ uri: scan.thumbnail }} style={styles.scanThumbnail} />
                <View style={styles.scanOverlay}>
                  <FileImage size={16} color="#FFFFFF" strokeWidth={2} />
                </View>
                <View style={styles.scanInfo}>
                  <Text style={[styles.scanName, { color: colors.text }]} numberOfLines={1}>
                    {scan.name}
                  </Text>
                  <Text style={[styles.scanDate, { color: colors.textTertiary }]}>{scan.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={[styles.addScanItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Plus size={24} color={colors.textTertiary} strokeWidth={2} />
              <Text style={[styles.addScanText, { color: colors.textSecondary }]}>Add New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Folders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Folders</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/folder')}>
              <ChevronRight size={20} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.foldersGrid}>
            {mockFolders.map((folder) => (
              <TouchableOpacity 
                key={folder.id} 
                style={[styles.folderCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
              >
                <View style={[styles.folderIcon, { backgroundColor: folder.color }]}>
                  <Folder size={20} color="#4CAF50" strokeWidth={2} />
                </View>
                <Text style={[styles.folderName, { color: colors.text }]} numberOfLines={1}>
                  {folder.name}
                </Text>
                <Text style={[styles.folderCount, { color: colors.textSecondary }]}>
                  {folder.count} patterns
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Layplans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Layplans</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/layplan')}>
              <ChevronRight size={20} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
          
          {mockLayplans.map((layplan) => (
            <TouchableOpacity 
              key={layplan.id} 
              style={[styles.layplanCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
            >
              <View style={[styles.layplanIcon, { backgroundColor: colors.surface }]}>
                <Layout size={20} color="#4CAF50" strokeWidth={2} />
              </View>
              <View style={styles.layplanInfo}>
                <Text style={[styles.layplanName, { color: colors.text }]}>{layplan.name}</Text>
                <View style={styles.layplanStats}>
                  <Text style={[styles.layplanEfficiency, { color: '#4CAF50' }]}>
                    {layplan.efficiency} efficient
                  </Text>
                  <Text style={[styles.layplanPieces, { color: colors.textSecondary }]}>
                    {layplan.pieces} pieces
                  </Text>
                </View>
              </View>
              <ChevronRight size={16} color={colors.textTertiary} strokeWidth={2} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Menu Overlay */}
      {showMenu && (
        <View style={styles.menuOverlay}>
          <TouchableOpacity 
            style={styles.menuBackdrop} 
            onPress={() => setShowMenu(false)}
            activeOpacity={1}
          />
          <View style={[styles.menuContainer, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: colors.text }]}>Menu</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <Text style={[styles.menuClose, { color: colors.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={() => setShowMenu(false)}
              >
                <View style={[styles.menuItemIcon, { backgroundColor: `${colors.primary}20` }]}>
                  <item.icon size={18} color="#4CAF50" strokeWidth={2} />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={[styles.menuItemTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={16} color={colors.textTertiary} strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  scanCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  scanIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scanSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  featureCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    position: 'relative',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  scanItem: {
    width: 140,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scanThumbnail: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5F5F5',
  },
  scanOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanInfo: {
    padding: 12,
  },
  scanName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  scanDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  addScanItem: {
    width: 140,
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  addScanText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 8,
  },
  foldersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  folderCard: {
    width: cardWidth,
    padding: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  folderIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  folderName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  folderCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  layplanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  layplanIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  layplanInfo: {
    flex: 1,
  },
  layplanName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  layplanStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  layplanEfficiency: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  layplanPieces: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  bottomSpacing: {
    height: 32,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
    width: width * 0.75,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  menuClose: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});