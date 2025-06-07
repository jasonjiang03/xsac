import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Grid3x3, Menu as MenuIcon, Layers, RotateCcw, Save } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

const mockLayplans = [
  { id: '1', name: 'Summer Collection Layout', efficiency: '92%', pieces: 12, date: '2024-01-15' },
  { id: '2', name: 'Formal Wear Layout', efficiency: '88%', pieces: 8, date: '2024-01-14' },
  { id: '3', name: 'Casual Shirts Layout', efficiency: '95%', pieces: 15, date: '2024-01-13' },
];

export default function LayplanScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('recent');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.menuButton}>
            <MenuIcon size={24} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Layplans</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View style={[styles.tabsContainer, { backgroundColor: colors.surface }]}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'recent' && [styles.tabActive, { backgroundColor: colors.card, shadowColor: colors.shadow }]
            ]}
            onPress={() => setActiveTab('recent')}
          >
            <Text style={[
              styles.tabText,
              { color: colors.textSecondary },
              activeTab === 'recent' && { color: colors.text }
            ]}>
              Recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'create' && [styles.tabActive, { backgroundColor: colors.card, shadowColor: colors.shadow }]
            ]}
            onPress={() => setActiveTab('create')}
          >
            <Text style={[
              styles.tabText,
              { color: colors.textSecondary },
              activeTab === 'create' && { color: colors.text }
            ]}>
              Create New
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'recent' ? (
          <>
            {/* Recent Layplans */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Layplans</Text>
              {mockLayplans.map((layplan) => (
                <TouchableOpacity 
                  key={layplan.id} 
                  style={[
                    styles.layplanCard,
                    { 
                      backgroundColor: colors.card,
                      shadowColor: colors.shadow,
                    }
                  ]}
                >
                  <View style={[styles.layplanPreview, { backgroundColor: colors.surface }]}>
                    <Grid3x3 size={24} color={colors.primary} strokeWidth={1.5} />
                  </View>
                  <View style={styles.layplanInfo}>
                    <Text style={[styles.layplanName, { color: colors.text }]}>{layplan.name}</Text>
                    <Text style={[styles.layplanDate, { color: colors.textTertiary }]}>{layplan.date}</Text>
                    <View style={styles.layplanStats}>
                      <Text style={[styles.efficiency, { color: colors.primary }]}>Efficiency: {layplan.efficiency}</Text>
                      <Text style={[styles.pieces, { color: colors.textSecondary }]}>{layplan.pieces} pieces</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.layplanAction}>
                    <Layers size={20} color={colors.primary} strokeWidth={2} />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Create New Layplan */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Create New Layplan</Text>
              
              {/* Fabric Settings */}
              <View style={[styles.settingsCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <Text style={[styles.settingsTitle, { color: colors.text }]}>Fabric Settings</Text>
                <View style={styles.settingsRow}>
                  <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>Width (cm)</Text>
                  <TouchableOpacity style={[styles.settingsInput, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.settingsValue, { color: colors.text }]}>150</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.settingsRow}>
                  <Text style={[styles.settingsLabel, { color: colors.textSecondary }]}>Length (m)</Text>
                  <TouchableOpacity style={[styles.settingsInput, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.settingsValue, { color: colors.text }]}>2.5</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Pattern Selection */}
              <View style={[styles.settingsCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <Text style={[styles.settingsTitle, { color: colors.text }]}>Pattern Selection</Text>
                <TouchableOpacity style={[styles.patternSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Grid3x3 size={20} color={colors.primary} strokeWidth={2} />
                  <Text style={[styles.patternSelectorText, { color: colors.textSecondary }]}>Select Patterns (0 selected)</Text>
                  <Plus size={20} color={colors.textTertiary} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Layout Preview */}
              <View style={[styles.previewCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
                <Text style={[styles.previewTitle, { color: colors.text }]}>Layout Preview</Text>
                <View style={[styles.previewArea, { backgroundColor: colors.surface }]}>
                  <View style={styles.previewGrid}>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <View key={index} style={[styles.previewCell, { borderColor: colors.border }]} />
                    ))}
                  </View>
                  <Text style={[styles.previewText, { color: colors.textTertiary }]}>Select patterns to preview layout</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: colors.card, borderColor: colors.primary }]}>
                  <RotateCcw size={20} color={colors.primary} strokeWidth={2} />
                  <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Auto Arrange</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
                  <Save size={20} color="#FFFFFF" strokeWidth={2} />
                  <Text style={styles.primaryButtonText}>Save Layplan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  addButton: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
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
  layplanPreview: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  layplanInfo: {
    flex: 1,
  },
  layplanName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  layplanDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 8,
  },
  layplanStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  efficiency: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginRight: 12,
  },
  pieces: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  layplanAction: {
    padding: 8,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  settingsInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  settingsValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  patternSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  patternSelectorText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 12,
  },
  previewCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  previewTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  previewArea: {
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  previewGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewCell: {
    width: '8.33%',
    height: '16.66%',
    borderWidth: 0.5,
  },
  previewText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});