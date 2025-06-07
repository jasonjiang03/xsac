import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Grid3x3, Menu as MenuIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2;

const mockPatterns = [
  { id: '1', name: 'Summer Dress Pattern', date: '2024-01-15', size: '2.3 MB', type: 'Dress' },
  { id: '2', name: 'Coat Pattern v2', date: '2024-01-14', size: '1.8 MB', type: 'Outerwear' },
  { id: '3', name: 'Shirt Pattern', date: '2024-01-13', size: '1.5 MB', type: 'Top' },
  { id: '4', name: 'Pants Pattern', date: '2024-01-12', size: '2.1 MB', type: 'Bottom' },
  { id: '5', name: 'Skirt Pattern A-Line', date: '2024-01-11', size: '1.2 MB', type: 'Bottom' },
  { id: '6', name: 'Jacket Pattern', date: '2024-01-10', size: '2.8 MB', type: 'Outerwear' },
];

export default function FolderScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Dress', 'Top', 'Bottom', 'Outerwear'];

  const filteredPatterns = mockPatterns.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || pattern.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.menuButton}>
            <MenuIcon size={24} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Patterns</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={colors.primary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <Search size={20} color={colors.textTertiary} strokeWidth={2} />
          <Text style={[styles.searchPlaceholder, { color: colors.textTertiary }]}>Search patterns...</Text>
        </View>

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                { backgroundColor: colors.surface },
                selectedFilter === filter && { backgroundColor: colors.primary }
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterTabText,
                { color: colors.textSecondary },
                selectedFilter === filter && { color: '#FFFFFF' }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Pattern Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.patternsGrid}>
          {filteredPatterns.map((pattern) => (
            <TouchableOpacity 
              key={pattern.id} 
              style={[
                styles.patternCard,
                { 
                  backgroundColor: colors.card,
                  shadowColor: colors.shadow,
                }
              ]}
            >
              <View style={[styles.patternPreview, { backgroundColor: colors.surface }]}>
                <Grid3x3 size={32} color={colors.primary} strokeWidth={1.5} />
              </View>
              <View style={styles.patternInfo}>
                <Text style={[styles.patternName, { color: colors.text }]} numberOfLines={2}>
                  {pattern.name}
                </Text>
                <Text style={[styles.patternDate, { color: colors.textTertiary }]}>{pattern.date}</Text>
                <Text style={[styles.patternSize, { color: colors.textSecondary }]}>{pattern.size}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredPatterns.length === 0 && (
          <View style={styles.emptyState}>
            <Grid3x3 size={64} color={colors.border} strokeWidth={1} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>No patterns found</Text>
            <Text style={[styles.emptyStateText, { color: colors.textTertiary }]}>
              {searchQuery || selectedFilter !== 'All' 
                ? 'Try adjusting your search or filter'
                : 'Start by scanning your first pattern'}
            </Text>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  filtersContainer: {
    marginHorizontal: -20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  patternsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  patternCard: {
    width: itemWidth,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  patternPreview: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternInfo: {
    padding: 12,
  },
  patternName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  patternDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 2,
  },
  patternSize: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});