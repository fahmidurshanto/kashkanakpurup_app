import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// ─── Radio Button Component ────────────────────────────────────────
function RadioButton({
  selected,
  onPress,
  label,
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
}) {
  return (
    <TouchableOpacity style={styles.radioRow} onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Section Header ────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

// ─── Field Row ─────────────────────────────────────────────────────
function FieldRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.fieldRow}>{children}</View>;
}

function LabeledInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  flex = 1,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'phone-pad';
  flex?: number;
}) {
  return (
    <View style={[styles.fieldContainer, { flex }]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

// ─── Constants ─────────────────────────────────────────────────────
const GENDER_OPTIONS = ['পুরুষ', 'মহিলা'];

const CASTE_OPTIONS = [
  'প্রতিবেশী',
  'বংশ',
  'বিধবা',
  'মুক্তি যোদ্ধা',
  'মাতৃকালীন',
  'বিডিপিওতি',
  'টিসিবি পয়/রেশন',
  'আরডিএফ (জেলা)',
  'হতদরিদ্র',
  'অন্যান্য',
];

const INCOME_OPTIONS = [
  'কৃষি',
  'ব্যবসা',
  'চাকুরী',
  'প্রবাসী',
  'গৃহিণী',
  'দিন মজুর',
  'ড্রাইভার',
  'মিস্ত্রি',
  'অন্যান্য',
];

const HOUSE_TYPE_OPTIONS = [
  'টিনসেড',
  'কাচা',
  'পাকা',
  'আধাপাকা',
  '১ম তলা',
  '২য় তলা',
  'বহুতলা',
];

const WARD_OPTIONS = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// ─── Main Component ────────────────────────────────────────────────
export default function HoldingApplicationScreen() {
  // Personal Info
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [fatherBn, setFatherBn] = useState('');
  const [fatherEn, setFatherEn] = useState('');
  const [motherBn, setMotherBn] = useState('');
  const [motherEn, setMotherEn] = useState('');
  const [mobile, setMobile] = useState('');
  const [idNo, setIdNo] = useState('');
  const [gender, setGender] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [voterCount, setVoterCount] = useState('');
  const [caste, setCaste] = useState('');
  const [incomeSource, setIncomeSource] = useState('');

  // House Details
  const [buildingName, setBuildingName] = useState('');
  const [holdingNo, setHoldingNo] = useState('0');
  const [houseType, setHouseType] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [houseLand, setHouseLand] = useState('');
  const [paddyLand, setPaddyLand] = useState('');
  const [houseValue, setHouseValue] = useState('');
  const [assessedTax, setAssessedTax] = useState('0');

  // Address
  const [villageBn, setVillageBn] = useState('');
  const [villageEn, setVillageEn] = useState('');
  const [postBn, setPostBn] = useState('');
  const [postEn, setPostEn] = useState('');
  const [wardNo, setWardNo] = useState('');

  // Captcha
  const [captchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Images
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [nidUri, setNidUri] = useState<string | null>(null);

  const pickImage = async (setter: (uri: string | null) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setter(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Validate captcha
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      Alert.alert('ত্রুটি', 'ক্যাপচা সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }

    const formData = {
      'নাম (বাংলা)': nameBn,
      'নাম (English)': nameEn,
      'পিতা/স্বামী (বাংলা)': fatherBn,
      'পিতা/স্বামী (English)': fatherEn,
      'মাতা (বাংলা)': motherBn,
      'মাতা (English)': motherEn,
      'মোবাইল': mobile,
      'আইডি নং': idNo,
      'লিঙ্গ': gender,
      'মোট সদস্য': totalMembers,
      'ভোটার সংখ্যা': voterCount,
      'জাত': caste,
      'আয়ের প্রধান উৎস': incomeSource,
      'ভবনের নাম': buildingName,
      'হোল্ডিং নং': holdingNo,
      'বাড়ীর ধরন': houseType,
      'রুম কাউন্ট': roomCount,
      'বাড়ীর ভূমি কাঠা': houseLand,
      'ধানী ভূমি কাঠা': paddyLand,
      'গৃহের আনুমানিক মূল্যা': houseValue,
      'ধার্যকৃত কর': assessedTax,
      'গ্রাম/রাস্তা (বাংলা)': villageBn,
      'গ্রাম/রাস্তা (English)': villageEn,
      'পোস্ট (বাংলা)': postBn,
      'পোস্ট (English)': postEn,
      'ওয়ার্ড নং': wardNo,
      'ফটো': photoUri ? 'সংযুক্ত আছে' : 'নেই',
      'এনআইডি': nidUri ? 'সংযুক্ত আছে' : 'নেই',
    };

    const message = Object.entries(formData)
      .map(([key, val]) => `${key}: ${val || '—'}`)
      .join('\n');

    Alert.alert('আবেদন তথ্য', message);
  };

  const handleCancel = () => {
    Alert.alert('বাতিল', 'আবেদন বাতিল করা হয়েছে।');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbAccent} />
        <Text style={styles.breadcrumbText}>ই-সেবা » হোল্ডিং</Text>
      </View>

      {/* ════════ Personal Information ════════ */}
      <FieldRow>
        <LabeledInput label="নাম" placeholder="আবেদনকারীর নাম" value={nameBn} onChangeText={setNameBn} />
        <LabeledInput label="নাম (English)" placeholder="আবেদনকারীর নাম" value={nameEn} onChangeText={setNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পিতা/স্বামী" placeholder="পিতা/স্বামী" value={fatherBn} onChangeText={setFatherBn} />
        <LabeledInput label="পিতা/স্বামী (English)" placeholder="পিতা/স্বামী" value={fatherEn} onChangeText={setFatherEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মাতা" placeholder="মাতা" value={motherBn} onChangeText={setMotherBn} />
        <LabeledInput label="মাতা (English)" placeholder="মাতা" value={motherEn} onChangeText={setMotherEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মোবাইল" placeholder="মোবাইল" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
        <LabeledInput label="আইডি নর" placeholder="আইডি নর" value={idNo} onChangeText={setIdNo} />
      </FieldRow>

      {/* Gender */}
      <FieldRow>
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>লিঙ্গ</Text>
          <View style={styles.radioGroup}>
            {GENDER_OPTIONS.map((opt) => (
              <RadioButton key={opt} label={opt} selected={gender === opt} onPress={() => setGender(opt)} />
            ))}
          </View>
        </View>
        <LabeledInput label="মোট সদস্য" placeholder="মোট সদস্য" value={totalMembers} onChangeText={setTotalMembers} keyboardType="numeric" />
        <LabeledInput label="ভোটার সংখ্যা" placeholder="ভোটার সংখ্যা" value={voterCount} onChangeText={setVoterCount} keyboardType="numeric" />
      </FieldRow>

      {/* Caste */}
      <View style={styles.fieldContainerFull}>
        <Text style={styles.fieldLabel}>জাত</Text>
        <View style={styles.radioGroupWrap}>
          {CASTE_OPTIONS.map((opt) => (
            <RadioButton key={opt} label={opt} selected={caste === opt} onPress={() => setCaste(opt)} />
          ))}
        </View>
      </View>

      {/* Income Source */}
      <View style={styles.fieldContainerFull}>
        <Text style={styles.fieldLabel}>আয়ের প্রধান উৎস</Text>
        <View style={styles.radioGroupWrap}>
          {INCOME_OPTIONS.map((opt) => (
            <RadioButton key={opt} label={opt} selected={incomeSource === opt} onPress={() => setIncomeSource(opt)} />
          ))}
        </View>
      </View>

      {/* ════════ House Details ════════ */}
      <SectionHeader title="বাড়ির বিবরণ" />

      <FieldRow>
        <LabeledInput label="ভবনের নাম" placeholder="ভবনের নাম" value={buildingName} onChangeText={setBuildingName} />
        <LabeledInput label="হোল্ডিং নং" placeholder="0" value={holdingNo} onChangeText={setHoldingNo} keyboardType="numeric" />
      </FieldRow>

      {/* House Type */}
      <View style={styles.fieldContainerFull}>
        <Text style={styles.fieldLabel}>বাড়ীর ধরন</Text>
        <View style={styles.radioGroupWrap}>
          {HOUSE_TYPE_OPTIONS.map((opt) => (
            <RadioButton key={opt} label={opt} selected={houseType === opt} onPress={() => setHouseType(opt)} />
          ))}
        </View>
      </View>

      <FieldRow>
        <LabeledInput label="রুম কাউন্ট" placeholder="রুম কাউন্ট" value={roomCount} onChangeText={setRoomCount} keyboardType="numeric" />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="বাড়ীর ভূমি কাঠা" placeholder="বাড়ীর ভূমি" value={houseLand} onChangeText={setHouseLand} />
        <LabeledInput label="ধানী ভূমি কাঠা" placeholder="ধানী ভূমি" value={paddyLand} onChangeText={setPaddyLand} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="গৃহের আনুমানিক মূল্যা" placeholder="গৃহের আনুমানিক মূল্যা" value={houseValue} onChangeText={setHouseValue} keyboardType="numeric" />
        <LabeledInput label="ধার্যকৃত কর" placeholder="0" value={assessedTax} onChangeText={setAssessedTax} keyboardType="numeric" />
      </FieldRow>

      {/* ════════ Address ════════ */}
      <SectionHeader title="ঠিকানা" />

      <FieldRow>
        <LabeledInput label="গ্রাম/ রাস্তা" placeholder="গ্রাম/ রাস্তা" value={villageBn} onChangeText={setVillageBn} />
        <LabeledInput label="গ্রাম/ রাস্তা (English)" placeholder="গ্রাম/ রাস্তা" value={villageEn} onChangeText={setVillageEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পোস্ট" placeholder="পোস্ট" value={postBn} onChangeText={setPostBn} />
        <LabeledInput label="পোস্ট (English)" placeholder="পোস্ট" value={postEn} onChangeText={setPostEn} />
      </FieldRow>

      {/* Ward + Captcha */}
      <FieldRow>
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ওয়ার্ড নং</Text>
          <View style={styles.wardPicker}>
            {WARD_OPTIONS.map((w) => (
              <TouchableOpacity
                key={w}
                style={[styles.wardOption, wardNo === w && styles.wardOptionActive]}
                onPress={() => setWardNo(w)}
              >
                <Text style={[styles.wardOptionText, wardNo === w && styles.wardOptionTextActive]}>{w}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>
            {captchaNum1} + {captchaNum2}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="মোট"
            placeholderTextColor="#999"
            value={captchaAnswer}
            onChangeText={setCaptchaAnswer}
            keyboardType="numeric"
          />
        </View>
      </FieldRow>

      {/* ════════ Photo & NID ════════ */}
      <FieldRow>
        {/* Photo */}
        <View style={[styles.fieldContainer, { flex: 1, alignItems: 'center' }]}>
          <Text style={styles.fieldLabel}>ফটো</Text>
          <View style={styles.imagePreview}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>📷</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.selectImageBtn} onPress={() => pickImage(setPhotoUri)}>
            <Text style={styles.selectImageText}>Select image</Text>
          </TouchableOpacity>
        </View>

        {/* NID */}
        <View style={[styles.fieldContainer, { flex: 1, alignItems: 'center' }]}>
          <Text style={styles.fieldLabel}>এনআইডি</Text>
          <View style={styles.imagePreview}>
            {nidUri ? (
              <Image source={{ uri: nidUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>🪪</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.selectImageBtn} onPress={() => pickImage(setNidUri)}>
            <Text style={styles.selectImageText}>Select image</Text>
          </TouchableOpacity>
        </View>
      </FieldRow>

      {/* ════════ Buttons ════════ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 14,
  },

  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  breadcrumbAccent: {
    width: 5,
    minHeight: 32,
    backgroundColor: '#2e7d32',
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  // Section Header
  sectionHeader: {
    marginTop: 20,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#2e7d32',
    paddingBottom: 4,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  // Field Layout
  fieldRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldContainerFull: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#fafafa',
  },

  // Radio Buttons
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  radioGroupWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#2e7d32',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2e7d32',
  },
  radioLabel: {
    fontSize: 13,
    color: '#333',
  },

  // Ward Picker
  wardPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  wardOption: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  wardOptionActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  wardOptionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  wardOptionTextActive: {
    color: '#fff',
  },

  // Image Pickers
  imagePreview: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  selectImageBtn: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#fafafa',
  },
  selectImageText: {
    fontSize: 13,
    color: '#333',
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 6,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  cancelBtn: {
    backgroundColor: '#777',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 6,
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
