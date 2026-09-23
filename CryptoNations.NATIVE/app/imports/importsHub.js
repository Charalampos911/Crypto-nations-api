// React and React Native Core Imports
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Alert,
  Platform,
} from 'react-native';

import { 
  createSlice, 
  createAsyncThunk
 } from '@reduxjs/toolkit';

// Navigation Imports
import { useRouter, Stack, Link } from 'expo-router';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

// Redux Imports
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from '../Redux/store';
import { apiRequest, setCurrentCountry, setCoinA, setCoinB, setClearExchange } from '../Redux/features/ApiReducer';

// Icon Libraries
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import Slider from '@react-native-community/slider';

// Exports
export {
  // React and React Native Core
  React,
  useState,
  useEffect,
  useCallback,
  useRef,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Alert,
  Platform,
  Slider,
  // Navigation
  useRouter,
  Stack,
  Link,
  useIsFocused,
  useFocusEffect,

  // Reducer
  createSlice, 
  createAsyncThunk,
  // Redux
  Provider,
  useSelector,
  useDispatch,
  store,
  apiRequest,
  setCurrentCountry,
  setCoinA,
  setCoinB,
  setClearExchange,

  // Icons
  Ionicons,
  Icon,
};
