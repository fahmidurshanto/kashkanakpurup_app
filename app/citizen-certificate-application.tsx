import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

// ─── Reusable Components ───────────────────────────────────────────
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

function FieldRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.fieldRow}>{children}</View>;
}

const WARD_OPTIONS = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const RELIGION_OPTIONS = ['ইসলাম', 'হিন্দু', 'বৌদ্ধ', 'খ্রিস্টান', 'অন্যান্য'];

// ─── Main Component ────────────────────────────────────────────────
export default function CitizenCertificateApplicationScreen() {
  const router = useRouter();

  // Form fields
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [fatherNameBn, setFatherNameBn] = useState('');
  const [fatherNameEn, setFatherNameEn] = useState('');
  const [motherNameBn, setMotherNameBn] = useState('');
  const [motherNameEn, setMotherNameEn] = useState('');
  const [mobile, setMobile] = useState('');
  const [nidNo, setNidNo] = useState('');
  const [villageBn, setVillageBn] = useState('');
  const [villageEn, setVillageEn] = useState('');
  const [postBn, setPostBn] = useState('');
  const [postEn, setPostEn] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [religion, setReligion] = useState('ইসলাম');

  // Dropdowns state
  const [showWardPicker, setShowWardPicker] = useState(false);
  const [showReligionPicker, setShowReligionPicker] = useState(false);

  // Captcha
  const [captchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  // Image Upload
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Validate captcha
    if (parseInt(captchaAnswer, 10) !== captchaNum1 + captchaNum2) {
      Alert.alert('ত্রুটি', 'ক্যাপচা সঠিক নয়। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return;
    }

    const formData: Record<string, string> = {
      'ব্যাক্তির নাম': nameBn,
      'ব্যাক্তির নাম (English)': nameEn,
      'পিতা/স্বামী': fatherNameBn,
      'পিতা/স্বামী (English)': fatherNameEn,
      'মাতা': motherNameBn,
      'মাতা (English)': motherNameEn,
      'মোবাইল': mobile,
      'আইডি নং': nidNo,
      'গ্রাম/ রাস্তা': villageBn,
      'গ্রাম/ রাস্তা (English)': villageEn,
      'পোস্ট': postBn,
      'পোস্ট (English)': postEn,
      'ওয়ার্ড নং': wardNo,
      'ধর্ম': religion,
      'ফটো': photoUri ? 'সংযুক্ত আছে' : 'নেই',
    };

    const message = Object.entries(formData)
      .map(([key, val]) => `${key}: ${val || '—'}`)
      .join('\n');

    Alert.alert('আবেদন তথ্য', message);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbAccent} />
        <Text style={styles.breadcrumbText}>ই-সেবা » নাগরিক সনদপত্র</Text>
      </View>

      {/* ════════ Form Fields ════════ */}
      <FieldRow>
        <LabeledInput label="ব্যাক্তির নাম" placeholder="ব্যাক্তির নাম" value={nameBn} onChangeText={setNameBn} />
        <LabeledInput label="ব্যাক্তির নাম (English)" placeholder="ব্যাক্তির নাম" value={nameEn} onChangeText={setNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পিতা/স্বামী" placeholder="পিতা/স্বামী" value={fatherNameBn} onChangeText={setFatherNameBn} />
        <LabeledInput label="পিতা/স্বামী (English)" placeholder="পিতা/স্বামী" value={fatherNameEn} onChangeText={setFatherNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মাতা" placeholder="মাতা" value={motherNameBn} onChangeText={setMotherNameBn} />
        <LabeledInput label="মাতা (English)" placeholder="মাতা" value={motherNameEn} onChangeText={setMotherNameEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="মোবাইল" placeholder="মোবাইল" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
        <LabeledInput label="আইডি নং" placeholder="আইডি নং" value={nidNo} onChangeText={setNidNo} keyboardType="numeric" />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="গ্রাম/ রাস্তা" placeholder="গ্রাম/ রাস্তা" value={villageBn} onChangeText={setVillageBn} />
        <LabeledInput label="গ্রাম/ রাস্তা (English)" placeholder="গ্রাম/ রাস্তা" value={villageEn} onChangeText={setVillageEn} />
      </FieldRow>

      <FieldRow>
        <LabeledInput label="পোস্ট" placeholder="পোস্ট" value={postBn} onChangeText={setPostBn} />
        <LabeledInput label="পোস্ট (English)" placeholder="পোস্ট" value={postEn} onChangeText={setPostEn} />
      </FieldRow>

      <FieldRow>
        {/* Ward Dropdown */}
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ওয়ার্ড নং</Text>
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowWardPicker(!showWardPicker)}>
            <Text style={styles.dropdownBtnText}>{wardNo || 'ওয়ার্ড নং'}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showWardPicker && (
            <View style={styles.dropdownList}>
              {WARD_OPTIONS.map((w) => (
                <TouchableOpacity
                  key={w}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setWardNo(w);
                    setShowWardPicker(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{w}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Religion Dropdown */}
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ধর্ম</Text>
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowReligionPicker(!showReligionPicker)}>
            <Text style={styles.dropdownBtnText}>{religion || 'ধর্ম'}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showReligionPicker && (
            <View style={styles.dropdownList}>
              {RELIGION_OPTIONS.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setReligion(r);
                    setShowReligionPicker(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </FieldRow>

      <FieldRow>
        {/* Captcha */}
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>{captchaNum1} + {captchaNum2}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="মোট"
            placeholderTextColor="#999"
            value={captchaAnswer}
            onChangeText={setCaptchaAnswer}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1 }} />
      </FieldRow>

      <FieldRow>
        {/* Photo Upload */}
        <View style={[styles.fieldContainer, { flex: 1 }]}>
          <Text style={styles.fieldLabel}>ফটো</Text>
          <View style={styles.fileUploadRow}>
             <TextInput 
                style={[styles.textInput, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0}]} 
                editable={false} 
                placeholder="No file chosen" 
                value={photoUri ? 'File selected' : ''}
              />
             <TouchableOpacity style={styles.chooseFileBtn} onPress={pickImage}>
               <Text style={styles.chooseFileText}>Choose file</Text>
             </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </FieldRow>

      {/* ════════ Buttons ════════ */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Text style={styles.actionBtnText}>« আগের জায়গাই</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.actionBtnText}>সাবমিট ☁</Text>
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
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#689f38',
  },
  breadcrumbAccent: {
    width: 5,
    minHeight: 32,
    backgroundColor: '#558b2f',
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 6,
    textAlign: 'right', // matching screenshot layout
    paddingRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#b0c4de', // Light steel blue border from screenshot
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 13,
    color: '#333',
    backgroundColor: '#fff',
  },
  dropdownBtn: {
    borderWidth: 1,
    borderColor: '#b0c4de',
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnText: {
    fontSize: 13,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#333',
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: '#b0c4de',
    marginTop: 2,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 100,
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#333',
  },
  fileUploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseFileBtn: {
    backgroundColor: '#337ab7', // Bootstrap primary color
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  chooseFileText: {
    color: '#fff',
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  backBtn: {
    backgroundColor: '#26c6da', // Cyan color
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 2,
  },
  submitBtn: {
    backgroundColor: '#26c6da', // Cyan color
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 2,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
